const PRIVATE_SOS_POLICY = true;
const CONFIG=window.GUARDIAN_ANGEL_CONFIG||{};
const hasConfig=!!(CONFIG.SUPABASE_URL && CONFIG.SUPABASE_PUBLISHABLE_KEY && !CONFIG.SUPABASE_URL.includes('YOUR-'));
const sb=hasConfig?window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_PUBLISHABLE_KEY):null;
let session=null,user=null,profile=null,currentPage='home',currentConversation=null,realtimeChannel=null;
let cache={posts:[],stories:[],prayers:[],friends:[],comments:{},likes:new Set(),prayered:new Set(),messages:[],following:new Set(),followStats:{}};

const $=id=>document.getElementById(id);
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function msg(text,type='notice'){return `<div class="${type==='error'?'notice dangerbox':type==='ok'?'notice okbox':'notice'}">${esc(text)}</div>`}
function initials(n){return esc((n||'?').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}
function normalizePhone(v){v=v.trim().replace(/[^\d+]/g,''); if(v.startsWith('08')) v='+62'+v.slice(1); return v}

async function boot(){
 if(!sb){$('app').style.display='block';$('main').innerHTML=msg('Konfigurasi Supabase belum dipasang. Salin config.example.js menjadi config.js, lalu isi Project URL dan Publishable Key.','error');return}
 const {data}=await sb.auth.getSession(); session=data.session; user=session?.user||null;
 sb.auth.onAuthStateChange(async (_e,s)=>{session=s;user=s?.user||null;await afterAuth()});
 await afterAuth();
}
async function afterAuth(){
 if(!user){$('app').style.display='none';$('userArea').innerHTML='<button class="primary" onclick="openAuth()">Masuk / Daftar</button>';return}
 $('app').style.display='block';
 await loadProfile();
 if(profile && ['banned','suspended'].includes(profile.account_status)){
   $('userArea').innerHTML=`<span class="muted">${esc(profile.name||user.email||'Pengguna')}</span> <button class="ghost" onclick="logout()">Keluar</button>`;
   $('main').innerHTML=msg(`Akun Anda berstatus ${profile.account_status}. Akses aplikasi sementara dibatasi oleh Guardian Moderation.`,'error');
   return;
 }
 $('userArea').innerHTML=`<span class="muted">${esc(profile?.name||user.email||'Pengguna')}</span> <button class="ghost" onclick="logout()">Keluar</button>`;
 if(await isAdmin()) $('adminNav').classList.remove('hidden'); else $('adminNav').classList.add('hidden');
 bindNav(); showPage(currentPage); startUnreadBadges();
}
async function loadProfile(){
 profile=null;
 for(let attempt=0;attempt<4;attempt++){
   const {data,error}=await sb.from('profiles').select('*').eq('id',user.id).maybeSingle();
   if(error){console.error(error);return}
   if(data){profile=data;return}
   // Profile is created by the auth.users trigger; never forge profile rows from the browser.
   if(attempt<3) await new Promise(r=>setTimeout(r,250*(attempt+1)));
 }
}
const PRODUCTION_URL='https://guardian-angel-mvp-03-supabase-conn.vercel.app';
function authRedirect(){
  return window.location.origin + window.location.pathname;
}
function openAuth(){if(!sb){alert('Supabase belum dikonfigurasi.');return}$('authModal').classList.add('show');$('authError').classList.add('hidden');}
function closeAuth(){$('authModal').classList.remove('show')}
function authValues(){return {email:$('authEmail').value.trim().toLowerCase(),password:$('authPassword').value}}
async function signInEmail(){
 if(!sb)return showAuthError('Supabase belum dikonfigurasikan.');
 const {email,password}=authValues();
 if(!email||!password)return showAuthError('Masukkan email dan password.');
 $('authError').classList.add('hidden');
 const {error}=await sb.auth.signInWithPassword({email,password});
 if(error)return showAuthError(error.message);
 closeAuth();
}
async function signUpEmail(){
 if(!sb)return showAuthError('Supabase belum dikonfigurasikan.');
 const {email,password}=authValues();
 if(!email||!password)return showAuthError('Masukkan email dan password.');
 if(password.length<6)return showAuthError('Password minimal 6 karakter.');
 $('authError').classList.add('hidden');
 const redirectTo=authRedirect();
 const {data,error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:redirectTo}});
 if(error)return showAuthError(error.message);
 if(data.session){closeAuth();return;}
 showAuthError('Pendaftaran berhasil. Periksa email Anda untuk konfirmasi, lalu kembali ke Guardian Angel.');
}
async function resetPassword(){
 if(!sb)return showAuthError('Supabase belum dikonfigurasikan.');
 const email=$('authEmail').value.trim().toLowerCase();
 if(!email)return showAuthError('Masukkan email terlebih dahulu.');
 const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:authRedirect()});
 if(error)return showAuthError(error.message);
 showAuthError('Link reset password sudah dikirim ke email Anda.');
}
async function signInWithGoogle(){
 if(!sb)return showAuthError('Supabase belum dikonfigurasikan.');
 $('authError').classList.add('hidden');
 const redirectTo=authRedirect();
 const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo,queryParams:{access_type:'offline',prompt:'select_account'}}});
 if(error)return showAuthError(error.message);
}
function showAuthError(t){$('authError').textContent=t;$('authError').classList.remove('hidden')}
async function logout(){if(realtimeChannel)await sb.removeChannel(realtimeChannel);await sb.auth.signOut();currentConversation=null}

let gaBadgeTimer=null;
function gaSetBadge(selector,count){
 const el=document.querySelector(selector); if(!el)return;
 let b=el.querySelector('.gaUnreadBadge');
 count=Math.max(0,Number(count)||0);
 if(!count){if(b)b.remove();return}
 if(!b){b=document.createElement('span');b.className='gaUnreadBadge';el.appendChild(b)}
 b.textContent=count>99?'99+':String(count);
}
async function refreshUnreadBadges(){
 if(!user||!sb)return;
 try{
  const n=await sb.from('notifications').select('id',{count:'exact',head:true}).eq('user_id',user.id).is('read_at',null);
  gaSetBadge('.navbtn[data-page="notifications"]',n.count||0); gaSetBadge('.topActions .iconBtn[aria-label="Notifikasi"]',n.count||0);
 }catch(e){console.warn('notification badge:',e)}
 try{
  const {data:convs}=await sb.from('conversations').select('id').or('user1_id.eq.'+user.id+',user2_id.eq.'+user.id);
  const ids=(convs||[]).map(x=>x.id);
  let count=0;
  if(ids.length){
   const q=await sb.from('messages').select('id',{count:'exact',head:true}).in('conversation_id',ids).neq('sender_id',user.id).is('read_at',null);
   count=q.count||0;
  }
  gaSetBadge('.navbtn[data-page="chat"]',count); gaSetBadge('.topActions .iconBtn[aria-label="Pesan"]',count);
 }catch(e){console.warn('message badge:',e)}
}
function startUnreadBadges(){
 refreshUnreadBadges(); if(gaBadgeTimer)clearInterval(gaBadgeTimer); gaBadgeTimer=setInterval(refreshUnreadBadges,12000);
 if(window.__gaBadgeChannel)sb.removeChannel(window.__gaBadgeChannel);
 window.__gaBadgeChannel=sb.channel('guardian-unread-'+user.id)
  .on('postgres_changes',{event:'*',schema:'public',table:'notifications',filter:'user_id=eq.'+user.id},refreshUnreadBadges)
  .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},(payload)=>{
    if(payload?.new?.sender_id && payload.new.sender_id!==user.id) refreshUnreadBadges();
  })
  .subscribe();
}
function bindNav(){document.querySelectorAll('.navbtn').forEach(b=>{b.onclick=()=>{currentPage=b.dataset.page;document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');showPage(currentPage)}})}
async function showPage(page){currentPage=page;document.querySelectorAll('.navbtn').forEach(x=>x.classList.toggle('active',x.dataset.page===page));$('main').innerHTML='<div class="card">Memuat...</div>';if(page==='home')await renderHome();if(page==='prayer')await renderPrayer();if(page==='friends')await renderFriends();if(page==='chat')await renderChat();if(page==='notifications')await renderNotifications();if(page==='profile')await renderProfile();if(page==='admin')await renderAdmin()}

async function moderateText(text){
 const value=String(text||'').trim();
 if(!value)return {level:0,category:'safe'};
 try{
   const {data,error}=await sb.functions.invoke('moderate-content',{body:{text:value}});
   if(!error&&data)return data;
 }catch(e){console.warn('Moderation Edge Function unavailable; database trigger remains authoritative.',e)}
 // Never claim a moderation pass when the Edge Function is unavailable.
 return {level:2,category:'review_required',details:'Pemeriksaan server tambahan diperlukan.'};
}
async function createPost(){
 const text=$('postText').value.trim(), file=$('postMedia')?.files?.[0]; if(!text && !file)return;
 if(file && file.size>50*1024*1024)return alert('Ukuran media maksimal 50 MB.');
 const mod=await moderateText(text);
 if(mod.level>=4){alert('Posting ditolak karena pelanggaran berat.');return}
 if(mod.level>=2 && !confirm('Posting ini terdeteksi berpotensi melanggar Pedoman Komunitas. Tetap kirim untuk ditinjau?'))return;
 let image_url=null,video_url=null;
 if(file){
   const isVideo=file.type.startsWith('video/');
   const ext=(file.name.split('.').pop()||'bin').toLowerCase();
   const path=`${user.id}/${crypto.randomUUID()}.${ext}`;
   const {error:up}=await sb.storage.from('post-media').upload(path,file,{upsert:false,contentType:file.type});
   if(up)return alert(up.message);
   const {data:pub}=sb.storage.from('post-media').getPublicUrl(path);
   if(isVideo) video_url=pub.publicUrl; else image_url=pub.publicUrl;
 }
 const {error}=await sb.from('posts').insert({user_id:user.id,body:text||' ',image_url,video_url});
 if(error)return alert(error.message);
 await renderHome();
}
async function loadStories(){
 const {data,error}=await sb.from('stories').select('id,user_id,body,image_url,video_url,status,moderation_level,created_at,expires_at').order('created_at',{ascending:false}).limit(30);
 if(error){console.warn('Stories unavailable:',error.message);cache.stories=[];return []}
 const visible=(data||[]).filter(x=>x.user_id===user.id || (x.status==='published' && new Date(x.expires_at).getTime()>Date.now()));
 const ids=[...new Set(visible.map(x=>x.user_id))];
 const {data:pub}=ids.length?await sb.from('public_profiles').select('id,name,avatar_url').in('id',ids):{data:[]};
 const map=Object.fromEntries((pub||[]).map(x=>[x.id,x]));
 cache.stories=visible.map(x=>({...x,profile:map[x.user_id]}));
 return cache.stories;
}

async function createStory(){
 const text=$('storyText')?.value.trim()||'', file=$('storyMedia')?.files?.[0];
 if(!text && !file)return alert('Isi cerita atau pilih foto/video terlebih dahulu.');
 if(file && file.size>50*1024*1024)return alert('Ukuran media maksimal 50 MB.');
 const mod=await moderateText(text);
 if(mod.level>=4)return alert('Story ditolak karena pelanggaran berat.');
 if(mod.level>=2 && !confirm('Story ini terdeteksi perlu pemeriksaan moderasi. Tetap kirim untuk ditinjau?'))return;
 let image_url=null,video_url=null;
 if(file){
   const isVideo=file.type.startsWith('video/');
   const ext=(file.name.split('.').pop()||'bin').toLowerCase();
   const path=`${user.id}/stories/${crypto.randomUUID()}.${ext}`;
   const {error:up}=await sb.storage.from('post-media').upload(path,file,{upsert:false,contentType:file.type});
   if(up)return alert(up.message);
   const {data:pub}=sb.storage.from('post-media').getPublicUrl(path);
   if(isVideo) video_url=pub.publicUrl; else image_url=pub.publicUrl;
 }
 const {error}=await sb.from('stories').insert({user_id:user.id,body:text,image_url,video_url,expires_at:new Date(Date.now()+24*60*60*1000).toISOString()});
 if(error)return alert(error.message);
 closeStoryComposer();
 await renderHome();
}
function openStoryComposer(){const m=$('storyModal');if(m){m.classList.add('show');$('storyText').value='';$('storyMedia').value='';$('storyError').classList.add('hidden');$('storyText').focus()}}
function closeStoryComposer(){const m=$('storyModal');if(m)m.classList.remove('show')}
function openStory(id){const story=cache.stories.find(x=>x.id===id);if(!story)return;const m=$('storyViewer');if(!m)return;const u=story.profile||{};$('storyViewerContent').innerHTML=`<div class="storyViewerHead"><div class="avatar">${u.avatar_url?`<img src="${esc(u.avatar_url)}">`:initials(u.name||'Pengguna')}</div><div><b>${esc(u.name||'Pengguna')}</b><div class="muted">${new Date(story.created_at).toLocaleString('id-ID')}</div></div></div>${story.image_url?`<img class="storyViewerMedia" src="${esc(story.image_url)}" alt="Story">`:''}${story.video_url?`<video class="storyViewerMedia" controls autoplay src="${esc(story.video_url)}"></video>`:''}${story.body?`<div class="storyViewerText">${esc(story.body)}</div>`:''}`;m.classList.add('show')}
function closeStoryViewer(){const m=$('storyViewer');if(m)m.classList.remove('show')}

async function renderHome(){
 const stories=await loadStories();
 const {data:posts,error}=await sb.from('posts').select('id,user_id,body,image_url,video_url,status,moderation_level,created_at').order('created_at',{ascending:false}).limit(50);
 if(error){$('main').innerHTML=msg(error.message,'error');return}
 cache.posts=posts||[];
 const ids=[...new Set(cache.posts.map(p=>p.user_id))];
 const {data:pub}=ids.length?await sb.from('public_profiles').select('id,name,avatar_url,guardian_score').in('id',ids):{data:[]};
 const map=Object.fromEntries((pub||[]).map(x=>[x.id,x]));
 const {data:likes}=cache.posts.length?await sb.from('post_likes').select('post_id,user_id').in('post_id',cache.posts.map(p=>p.id)):{data:[]};
 cache.likes=new Set((likes||[]).filter(x=>x.user_id===user.id).map(x=>x.post_id));
 const counts={};(likes||[]).forEach(x=>counts[x.post_id]=(counts[x.post_id]||0)+1);
 const avatar=profile?.avatar_url?`<img src="${esc(profile.avatar_url)}">`:initials(profile?.name||user.email);
 $('main').innerHTML=`<section class="homeHero card"><div class="welcome"><div class="welcomeAvatar">${avatar}</div><div class="welcomeText"><div class="welcomeKicker">Selamat datang kembali,</div><div class="welcomeName">${esc(profile?.name||'Sahabat Guardian')} ✨</div><div class="quote">“Tuhan selalu punya rencana yang indah untuk hidupmu.”</div></div><div class="todayCard"><b>🌿 Hari ini</b><span>Jangan lupa berdoa ya ♥</span></div></div></section><section class="homeSection"><div class="sectionHead"><div><h3>◉ Stories</h3><p class="sectionDesc">Cerita singkat yang hilang setelah 24 jam.</p></div></div><div class="storyWrap"><div class="stories"><button class="story add" onclick="openStoryComposer()"><div><div style="margin-top:42px;font-size:14px;font-weight:850">Buat Story</div><small class="muted">Bagikan momen imanmu</small></div></button>${stories.slice(0,8).map(s=>storyHTML(s)).join('')}</div></div></section><section class="homeSection"><div class="sectionHead compact"><div><h3>✎ Buat posting</h3><p class="sectionDesc">Bagikan doa, kesaksian, foto, atau kata-kata yang menguatkan.</p></div></div><section class="composerCard card"><div class="composerTop"><div class="avatar">${avatar}</div><div style="flex:1;min-width:0"><b>Bagikan sesuatu kepada teman</b><div class="muted" style="font-size:12px;margin-top:2px">Tuliskan apa yang sedang ingin kamu bagikan.</div></div></div><div class="composer"><textarea id="postText" placeholder="Apa yang ingin kamu bagikan?"></textarea><div class="composerTools"><label class="toolBtn">▧ Foto/Video<input id="postMedia" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" style="display:none"></label><button class="toolBtn" onclick="document.getElementById('postText').value='🙏 Mohon doakan saya dan keluarga hari ini.';document.getElementById('postText').focus()">♧ Doa</button><button class="primary" onclick="createPost()">➤ Bagikan</button></div></div></section></section><section class="homeSection feedSection"><div class="sectionHead compact"><div><h3>▤ Feed Penguatan</h3><p class="sectionDesc">Posting lengkap dari komunitas, tempat kita membaca, menyukai, memberi komentar, dan berbagi.</p></div></div>`+(cache.posts.length?cache.posts.map(p=>postHTML(p,map[p.user_id],counts[p.id]||0)).join(''):'<div class="card empty">Belum ada postingan. Jadilah yang pertama berbagi penguatan. ✨</div>')+`</section>`;
}
function storyHTML(s){const u=s.profile||{};const name=esc(u.name||'Pengguna');const text=esc(String(s.body||'').replace(/\s+/g,' ').trim().slice(0,58));const media=s.image_url?`<img class="storyMedia" src="${esc(s.image_url)}" alt="">`:s.video_url?`<video class="storyMedia" muted playsinline preload="metadata" src="${esc(s.video_url)}"></video>`:'';return `<button class="story community" onclick="openStory('${s.id}')">${media}<div class="storyShade"></div><div class="storyContent"><div class="avatar">${u.avatar_url?`<img src="${esc(u.avatar_url)}">`:initials(u.name||'Pengguna')}</div><div>${name}</div><small>${text||'Berbagi penguatan hari ini'}</small></div></button>`}
function postHTML(p,u,count){const own=p.user_id===user.id;return `<article id="post-${p.id}" class="card post"><div class="posthead"><div class="row"><div class="avatar">${u?.avatar_url?`<img class="avatar" src="${esc(u.avatar_url)}">`:initials(u?.name)}</div><div><b>${esc(u?.name||'Pengguna')}</b><div class="muted" style="font-size:12px">Guardian Score ${u?.guardian_score??100}</div></div></div><span class="pill">${p.status==='published'?'Penguatan':p.status==='hidden'?'Ditinjau':'Disimpan'}</span></div><div class="postbody">${esc(p.body)}</div>${p.image_url?`<img class="media" src="${esc(p.image_url)}">`:''}${p.video_url?`<video class="media" controls src="${esc(p.video_url)}"></video>`:''}<div class="actions"><button onclick="toggleLike('${p.id}')">${cache.likes.has(p.id)?'💜':'🤍'} ${count}</button><button onclick="openComments('${p.id}')">Komentar</button><button onclick="sharePost('${p.id}')">Bagikan</button><button onclick="reportTarget('post','${p.id}')">Laporkan</button>${own?`<button onclick="deletePost('${p.id}')">Hapus</button>`:`<button onclick="blockUser('${p.user_id}')">Blokir</button>`}</div><div id="comments-${p.id}" class="commentsInline hidden"></div></article>`}
async function sharePost(id){
 const url=new URL(window.location.href);url.hash=`post-${id}`;
 try{if(navigator.share){await navigator.share({title:'Guardian Angel',text:'Lihat penguatan ini di Guardian Angel.',url:url.toString()});return}if(navigator.clipboard){await navigator.clipboard.writeText(url.toString());alert('Tautan posting disalin.');return}alert(url.toString())}catch(e){if(e?.name!=='AbortError')alert('Tautan posting: '+url.toString())}
}
async function deletePost(id){if(!confirm('Hapus posting ini?'))return;const {error}=await sb.from('posts').delete().eq('id',id).eq('user_id',user.id);if(error)return alert(error.message);await renderHome()}
async function toggleLike(id){if(cache.likes.has(id)){await sb.from('post_likes').delete().eq('post_id',id).eq('user_id',user.id)}else{await sb.from('post_likes').insert({post_id:id,user_id:user.id})}await renderHome()}
async function loadComments(id){
 const box=$('comments-'+id); if(!box)return;
 const {data,error}=await sb.from('comments').select('id,user_id,body,created_at,status').eq('post_id',id).eq('status','published').order('created_at');
 if(error){box.innerHTML=msg(error.message,'error');return}
 const ids=[...new Set((data||[]).map(x=>x.user_id))];
 const {data:pub}=ids.length?await sb.from('public_profiles').select('id,name,avatar_url').in('id',ids):{data:[]};
 const map=Object.fromEntries((pub||[]).map(x=>[x.id,x]));
 box.innerHTML=(data||[]).map(c=>`<div class="commentLine"><div class="avatar" style="width:32px;height:32px;flex-basis:32px">${map[c.user_id]?.avatar_url?`<img class="avatar" src="${esc(map[c.user_id].avatar_url)}">`:initials(map[c.user_id]?.name)}</div><div class="commentBubble"><div class="commentName">${esc(map[c.user_id]?.name||'Pengguna')}</div><div>${esc(c.body)}</div></div></div>`).join('')+
 `<div class="commentForm"><input id="commentInput-${id}" class="field" placeholder="Tulis komentar untuk semua yang melihat postingan ini…" onkeydown="if(event.key==='Enter')submitComment('${id}')"><button class="primary" onclick="submitComment('${id}')">Kirim</button></div>`;
}
async function openComments(id){
 const box=$('comments-'+id);
 if(!box)return;
 box.classList.toggle('hidden');
 if(!box.classList.contains('hidden'))await loadComments(id);
}
async function submitComment(id){
 const input=$('commentInput-'+id); const body=input?.value.trim(); if(!body)return;
 const mod=await moderateText(body); if(mod.level>=4)return alert('Komentar ditolak karena pelanggaran berat.');
 if(mod.level>=2 && !confirm('Komentar akan masuk pemeriksaan moderasi. Tetap kirim?'))return;
 const {error}=await sb.from('comments').insert({post_id:id,user_id:user.id,body});
 if(error)return alert(error.message);
 input.value=''; await loadComments(id); await renderHome();
}
async function reportUser(id){const reason=prompt('Alasan laporan untuk akun ini:');if(!reason?.trim())return;const {error}=await sb.from('reports').insert({reporter_id:user.id,reported_user_id:id,reason:reason.trim()});if(error)alert(error.message);else alert('Laporan akun diterima dan akan ditinjau.')}
async function reportTarget(type,id){const reason=prompt('Alasan laporan:');if(!reason)return;const row={reporter_id:user.id,reason:reason.trim()};row[type+'_id']=id;const {error}=await sb.from('reports').insert(row);if(error)alert(error.message);else alert('Laporan diterima dan akan ditinjau.')}
async function blockUser(id){if(!confirm('Blokir pengguna ini? Posting dan permintaan doanya tidak akan tampil untuk Anda.'))return;const {error}=await sb.from('blocks').insert({blocker_id:user.id,blocked_id:id});if(error?.code==='23505')return;await renderHome()}

async function renderPrayer(){
 const {data,error}=await sb.from('prayer_requests').select('*').in('status',['open','answered']).order('created_at',{ascending:false}).limit(50);
 if(error){$('main').innerHTML=msg(error.message,'error');return}
 cache.prayers=data||[];
 const ids=cache.prayers.map(x=>x.id);
 const {data:r}=ids.length?await sb.from('prayer_reactions').select('prayer_id,user_id').in('prayer_id',ids):{data:[]};
 cache.prayered=new Set((r||[]).filter(x=>x.user_id===user.id).map(x=>x.prayer_id));
 const counts={};(r||[]).forEach(x=>counts[x.prayer_id]=(counts[x.prayer_id]||0)+1);
 const pids=[...new Set(cache.prayers.map(x=>x.user_id))];
 const {data:pub}=pids.length?await sb.from('public_profiles').select('id,name').in('id',pids):{data:[]};
 const names=Object.fromEntries((pub||[]).map(x=>[x.id,x.name]));
 $('main').innerHTML=`<div class="card prayer"><h1>Ruang Doa</h1><p class="muted">Bagikan pergumulan. Komunitas dapat ikut mendoakan dan menulis dukungan.</p><textarea id="prayerText" class="field" style="min-height:110px" placeholder="Tuliskan pokok doa…"></textarea><label class="row" style="margin-top:8px"><input id="prayerAnon" type="checkbox"> Kirim secara anonim</label><div class="row" style="justify-content:flex-end;margin-top:8px"><button class="primary" onclick="createPrayer()">Kirim Pokok Doa</button></div></div>`+
 (cache.prayers.length?cache.prayers.map(p=>`<div class="card post"><div class="row" style="justify-content:space-between"><b>${p.is_anonymous?'Pengguna anonim':esc(names[p.user_id]||'Pengguna')}</b><span class="pill">${p.status==='answered'?'Terjawab':'Terbuka'}</span></div><div class="postbody">${esc(p.body)}</div><div class="actions"><button onclick="togglePrayer('${p.id}')">♡ Saya mendoakan · ${counts[p.id]||0}</button><button onclick="togglePrayerComments('${p.id}')">Dukungan</button>${p.user_id===user.id?`<button onclick="deletePrayer('${p.id}')">Hapus</button>`:''}<button onclick="reportTarget('prayer','${p.id}')">Laporkan</button></div><div id="prayer-comments-${p.id}" class="commentsInline hidden"></div></div>`).join(''):'<div class="card empty">Belum ada permintaan doa.</div>');
}
async function togglePrayerComments(id){
 const box=$('prayer-comments-'+id);if(!box)return;
 box.classList.toggle('hidden');if(box.classList.contains('hidden'))return;
 const {data,error}=await sb.from('prayer_comments').select('id,user_id,body,created_at').eq('prayer_id',id).eq('status','published').order('created_at');
 if(error){box.innerHTML=msg('Dukungan tertulis belum tersedia. Terapkan migration social notifications terlebih dahulu.','error');return}
 const ids=[...new Set((data||[]).map(x=>x.user_id))];
 const {data:pub}=ids.length?await sb.from('public_profiles').select('id,name,avatar_url').in('id',ids):{data:[]};
 const map=Object.fromEntries((pub||[]).map(x=>[x.id,x]));
 box.innerHTML=(data||[]).map(c=>`<div class="commentLine"><div class="avatar" style="width:32px;height:32px;flex-basis:32px">${map[c.user_id]?.avatar_url?`<img class="avatar" src="${esc(map[c.user_id].avatar_url)}">`:initials(map[c.user_id]?.name)}</div><div class="commentBubble"><div class="commentName">${esc(map[c.user_id]?.name||'Pengguna')}</div>${esc(c.body)}</div></div>`).join('')+
 `<div class="commentForm"><input id="prayerCommentInput-${id}" class="field" placeholder="Tulis dukungan…" onkeydown="if(event.key==='Enter')submitPrayerComment('${id}')"><button class="primary" onclick="submitPrayerComment('${id}')">Kirim</button></div>`;
}
async function submitPrayerComment(id){
 const input=$('prayerCommentInput-'+id);const body=input?.value.trim();if(!body)return;
 const mod=await moderateText(body);if(mod.level>=4)return alert('Dukungan ditolak karena pelanggaran berat.');
 if(mod.level>=2&&!confirm('Dukungan akan masuk pemeriksaan moderasi. Tetap kirim?'))return;
 const {error}=await sb.from('prayer_comments').insert({prayer_id:id,user_id:user.id,body});
 if(error)return alert(error.message);
 await togglePrayerComments(id); await togglePrayerComments(id);
}
async function createPrayer(){const body=$('prayerText').value.trim();if(!body)return;const mod=await moderateText(body);if(mod.level>=4)return alert('Permintaan doa ditolak karena pelanggaran berat.');const {error}=await sb.from('prayer_requests').insert({user_id:user.id,body:body,is_anonymous:$('prayerAnon').checked});if(error)return alert(error.message);await renderPrayer()}
async function deletePrayer(id){if(!confirm('Hapus pokok doa ini?'))return;const {error}=await sb.from('prayer_requests').delete().eq('id',id).eq('user_id',user.id);if(error)return alert(error.message);await renderPrayer()}
async function togglePrayer(id){if(cache.prayered.has(id))await sb.from('prayer_reactions').delete().eq('prayer_id',id).eq('user_id',user.id);else await sb.from('prayer_reactions').insert({prayer_id:id,user_id:user.id});await renderPrayer()}

async function loadFollowStats(ids=[]){
 const unique=[...new Set((ids||[]).filter(Boolean))];
 if(!user||!unique.length)return;
 const {data,error}=await sb.rpc('guardian_follow_stats',{p_user_ids:unique});
 if(error){console.warn('Follow stats unavailable:',error.message);return}
 cache.followStats=Object.fromEntries((data||[]).map(x=>[x.user_id,{followers:Number(x.followers_count||0),following:Number(x.following_count||0)}]));
 const {data:mine,error:mineError}=await sb.from('profile_follows').select('following_id').eq('follower_id',user.id).in('following_id',unique);
 if(!mineError) cache.following=new Set((mine||[]).map(x=>x.following_id));
}
function followStatsHTML(id){const s=cache.followStats?.[id]||{followers:0,following:0};return `<div class="followStats"><span><b>${s.followers}</b> Followers</span><span><b>${s.following}</b> Mengikuti</span></div>`}
async function toggleFollow(target){
 if(!target||target===user.id)return;
 const {data,error}=await sb.rpc('guardian_toggle_follow',{target_user:target});
 if(error)return alert(error.message);
 const followed=!!data;
 if(followed)cache.following.add(target);else cache.following.delete(target);
 await loadFollowStats([target,user.id]);
 if(currentPage==='friends')await renderFriends();
 else if(currentPage==='profile')await renderProfile();
 else await viewPublicProfile(target);
}
function followButtonHTML(id){const following=cache.following.has(id);return `<button class="${following?'ghost':'primary'} followBtn" onclick="toggleFollow('${id}')">${following?'✓ Mengikuti':'＋ Ikuti'}</button>`}

async function renderFriends(){
 const {data,error}=await sb.from('public_profiles').select('id,name,avatar_url,city,purpose,guardian_score,account_status').neq('id',user.id).neq('account_status','banned').order('guardian_score',{ascending:false}).limit(50);
 if(error){$('main').innerHTML=msg(error.message,'error');return}
 cache.friends=data||[];
 await loadFollowStats([user.id,...cache.friends.map(f=>f.id)]);
 const q=(window.guardianFriendQuery||'').toLowerCase();
 const filtered=cache.friends.filter(f=>!q || [f.name,f.city,f.purpose].some(v=>String(v||'').toLowerCase().includes(q)));
 const cards=filtered.map(f=>`<div class="friendCard"><div class="row" style="align-items:flex-start"><div class="friendAvatar">${f.avatar_url?`<img src="${esc(f.avatar_url)}">`:initials(f.name)}</div><div style="min-width:0;flex:1"><b>${esc(f.name||'Pengguna')}</b><div class="friendMeta">${esc(f.city||'Komunitas Guardian Angel')} · Score ${f.guardian_score??100}</div>${followStatsHTML(f.id)}</div></div><div class="friendTags"><span class="friendTag">Saling menguatkan</span>${f.purpose?`<span class="friendTag">${esc(f.purpose).slice(0,34)}</span>`:''}</div><div class="row"><button class="primary" style="flex:1" onclick="startChat('${f.id}')">Sapa</button>${followButtonHTML(f.id)}<button class="ghost" onclick="viewPublicProfile('${f.id}')">Lihat</button></div></div>`).join('');
 $('main').innerHTML=`<div class="card discoveryHero"><div class="featureTitle">Teman Seiman</div><p class="featureText">Temukan koneksi yang punya semangat untuk saling mendoakan, berbagi cerita, dan bertumbuh bersama.</p><div class="filterRow"><input id="friendSearch" class="field" style="min-width:220px" value="${esc(window.guardianFriendQuery||'')}" placeholder="Cari nama, kota, atau minat" oninput="window.guardianFriendQuery=this.value;renderFriends()"><button class="ghost" onclick="window.guardianFriendQuery='';renderFriends()">Reset</button></div></div><div class="friendGrid">${cards||'<div class="card empty" style="grid-column:1/-1">Belum ada koneksi yang cocok. Coba kata kunci lain.</div>'}</div>`;
}
async function viewPublicProfile(id){
 const f=cache.friends.find(x=>x.id===id); if(!f)return;
 await loadFollowStats([id,user.id]);
 $('main').innerHTML=`<div class="card"><button class="ghost" onclick="renderFriends()">← Kembali</button><div style="text-align:center;padding:18px 0"><div class="friendAvatar" style="width:92px;height:92px;margin:auto">${f.avatar_url?`<img src="${esc(f.avatar_url)}">`:initials(f.name)}</div><h1 style="margin-top:10px">${esc(f.name)}</h1><div class="muted">${esc(f.city||'')}</div>${followStatsHTML(f.id)}<p>${esc(f.purpose||'Ingin menjadi bagian dari komunitas yang saling menguatkan.')}</p><div class="row" style="justify-content:center">${followButtonHTML(f.id)}<button class="primary" onclick="startChat('${f.id}')">Mulai percakapan</button><button class="ghost" onclick="blockUser('${f.id}')">Blokir</button><button class="ghost" onclick="reportUser('${f.id}')">Laporkan</button></div></div></div>`;
}
async function startChat(other){
 const {data:found,error}=await sb.rpc('start_direct_conversation',{target_user:other});
 if(error)return alert(error.message);
 currentConversation=found;currentPage='chat';
 document.querySelectorAll('.navbtn').forEach(x=>x.classList.toggle('active',x.dataset.page==='chat'));
 await renderChat()
}

async function renderChat(){
 const {data:members}=await sb.from('conversation_members').select('conversation_id,user_id').eq('user_id',user.id);const convIds=[...(members||[])].map(x=>x.conversation_id);
 const {data:allMembers}=convIds.length?await sb.from('conversation_members').select('conversation_id,user_id').in('conversation_id',convIds):{data:[]};
 const otherIds=[...new Set((allMembers||[]).filter(x=>x.user_id!==user.id).map(x=>x.user_id))];const {data:pub}=otherIds.length?await sb.from('public_profiles').select('id,name').in('id',otherIds):{data:[]};const names=Object.fromEntries((pub||[]).map(x=>[x.id,x.name]));
 const list=[...new Set((allMembers||[]).filter(x=>x.user_id!==user.id).map(x=>x.conversation_id))];
 if(!currentConversation)currentConversation=list[0]||null;
 $('main').innerHTML=`<div class="card"><h1>Pesan</h1><div class="tabs">${list.map(id=>{const other=(allMembers||[]).find(x=>x.conversation_id===id&&x.user_id!==user.id);return `<button class="${id===currentConversation?'primary':'ghost'}" onclick="selectConversation('${id}')">${esc(names[other?.user_id]||'Percakapan')}</button>`}).join('')||'<span class="muted">Belum ada percakapan. Buka Teman Seiman untuk menyapa seseorang.</span>'}</div></div>${currentConversation?chatBoxHTML():'<div class="card empty">Pilih percakapan untuk mulai mengobrol.</div>'}`;
 if(currentConversation){await loadMessages();subscribeMessages()}
}
async function selectConversation(id){currentConversation=id;await renderChat()}
async function loadMessages(){const {data,error}=await sb.from('messages').select('id,sender_id,body,status,created_at').eq('conversation_id',currentConversation).order('created_at');if(error)return alert(error.message);cache.messages=data||[];const ids=[...new Set(cache.messages.map(x=>x.sender_id))];const {data:pub}=ids.length?await sb.from('public_profiles').select('id,name').in('id',ids):{data:[]};const names=Object.fromEntries((pub||[]).map(x=>[x.id,x.name]));const box=$('messageList');if(box){box.innerHTML=cache.messages.map(m=>`<div class="bubble ${m.sender_id===user.id?'mine':''}"><b>${esc(names[m.sender_id]||'Pengguna')}</b><br>${esc(m.body||'')}</div>`).join('');box.scrollTop=box.scrollHeight}}
function chatBoxHTML(){return `<div class="card"><div id="messageList" class="message-list"><div class="empty">Memuat pesan...</div></div><div class="row"><input id="messageText" class="field" style="flex:1" placeholder="Tulis pesan..." onkeydown="if(event.key==='Enter')sendMessage()"><button class="primary" onclick="sendMessage()">Kirim</button></div></div>`}
async function sendMessage(){const body=$('messageText').value.trim();if(!body||!currentConversation)return;const mod=await moderateText(body);if(mod.level>=4)return alert('Pesan ditolak karena pelanggaran berat.');const {error}=await sb.from('messages').insert({conversation_id:currentConversation,sender_id:user.id,body:body});if(error)return alert(error.message);$('messageText').value='';await loadMessages()}
function subscribeMessages(){if(realtimeChannel)sb.removeChannel(realtimeChannel);realtimeChannel=sb.channel('guardian-chat-'+currentConversation).on('postgres_changes',{event:'*',schema:'public',table:'messages',filter:`conversation_id=eq.${currentConversation}`},()=>loadMessages()).subscribe()}

async function shareProfile(){
  const url=new URL(window.location.href); url.hash='profile';
  const name=profile?.name||'Sahabat Guardian';
  try{if(navigator.share){await navigator.share({title:name+' — Guardian Angel',text:'Lihat profil ini di Guardian Angel.',url:url.toString()});return}
  if(navigator.clipboard){await navigator.clipboard.writeText(url.toString());alert('Tautan profil disalin.');return}
  prompt('Salin tautan profil:',url.toString());}catch(e){if(e?.name!=='AbortError')alert('Tautan profil: '+url.toString())}
}
function toggleProfileEditor(){document.getElementById('profileEditor')?.classList.toggle('hidden')}
function markProfileDirty(){window.guardianProfileDirty=true}
async function openProfileTab(tab){
  const tabs=['posts','photos','friends']; if(!tabs.includes(tab))tab='posts';
  document.querySelectorAll('.profileTab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  document.querySelectorAll('.profilePanel').forEach(p=>p.classList.toggle('hidden',p.dataset.panel!==tab));
  if(tab==='photos') await renderProfilePhotos();
  if(tab==='friends') await renderProfileFriends();
}
async function renderProfilePhotos(){
  const panel=document.querySelector('.profilePanel[data-panel="photos"]'); if(!panel)return;
  const {data,error}=await sb.from('posts').select('id,image_url,video_url,created_at').eq('user_id',user.id).or('image_url.not.is.null,video_url.not.is.null').order('created_at',{ascending:false}).limit(60);
  if(error){panel.innerHTML=msg('Foto belum dapat dimuat.','error');return}
  const items=data||[];
  panel.innerHTML=items.length?'<div class="profilePhotoGrid">'+items.map(x=>x.image_url?'<button class="profilePhoto" onclick="openProfileMedia('+JSON.stringify(x.image_url)+')"><img src="'+esc(x.image_url)+'" alt="Foto"></button>':'<button class="profilePhoto" onclick="openProfileMedia('+JSON.stringify(x.video_url)+')"><video muted playsinline preload="metadata" src="'+esc(x.video_url)+'"></video></button>').join('')+'</div>':'<div class="profileEmpty"><div class="profileEmptyIcon">◫</div><b>Belum ada foto</b><span>Foto dari postinganmu akan muncul di sini.</span></div>';
}
function openProfileMedia(url){
  if(!url)return; const modal=document.getElementById('profileMediaModal'); if(!modal)return;
  const box=document.getElementById('profileMediaContent');
  const isVideo=/\.(mp4|webm|mov)(\?|$)/i.test(url);
  box.innerHTML=isVideo?'<video controls autoplay playsinline class="profileMediaFull" src="'+esc(url)+'"></video>':'<img class="profileMediaFull" src="'+esc(url)+'" alt="Foto">';
  modal.classList.add('show');
}
function closeProfileMedia(){document.getElementById('profileMediaModal')?.classList.remove('show')}
async function renderProfileFriends(){
  const panel=document.querySelector('.profilePanel[data-panel="friends"]'); if(!panel)return;
  const {data,error}=await sb.from('friend_connections').select('requester_id,addressee_id,status').eq('status','accepted').or('requester_id.eq.'+user.id+',addressee_id.eq.'+user.id).limit(100);
  if(error){panel.innerHTML=msg('Daftar teman belum dapat dimuat.','error');return}
  const ids=[...new Set((data||[]).map(x=>x.requester_id===user.id?x.addressee_id:x.requester_id))];
  if(!ids.length){panel.innerHTML='<div class="profileEmpty"><div class="profileEmptyIcon">◌</div><b>Belum ada Teman Seiman</b><span>Temukan saudara seiman untuk mulai membangun koneksi.</span><button class="primary" onclick="currentPage=\'friends\';showPage(\'friends\')">Temukan Teman</button></div>';return}
  const {data:pub}=await sb.from('public_profiles').select('id,name,avatar_url,city,guardian_score').in('id',ids);
  panel.innerHTML='<div class="profileFriendList">'+(pub||[]).map(f=>'<button class="profileFriendRow" onclick="viewPublicProfile(\''+f.id+'\')"><div class="avatar">'+(f.avatar_url?'<img src="'+esc(f.avatar_url)+'">':initials(f.name))+'</div><div><b>'+esc(f.name||'Pengguna')+'</b><span>'+esc(f.city||'Guardian Angel')+' · Score '+(f.guardian_score??0)+'</span></div><span>›</span></button>').join('')+'</div>';
}
async function renderProfile(){
 const p=profile||{};
 const {data:posts,error:postsError}=await sb.from('posts').select('id,user_id,body,image_url,video_url,status,created_at').eq('user_id',user.id).order('created_at',{ascending:false}).limit(30);
 if(postsError){$('main').innerHTML=msg('Profil tidak dapat dimuat. Silakan coba lagi.','error');return}
 await loadFollowStats([user.id]);
 const s=cache.followStats?.[user.id]||{followers:0,following:0};
 const avatar=p.avatar_url?'<img src="'+esc(p.avatar_url)+'">':initials(p.name||user.email);
 $('main').innerHTML='<section class="profilePage">'+
 '<div class="profileHeroCard card">'+
 '<div class="profileCoverNew" style="'+(p.cover_url?'background-image:url("'+esc(p.cover_url)+'")':'')+'"><div class="profileCoverShade"></div></div>'+
 '<div class="profileIdentity">'+
 '<div class="profileAvatarWrap"><div class="avatar profileAvatarNew">'+avatar+'</div><label class="profileCamera" title="Ubah foto profil">✎<input id="avatarFileTop" type="file" accept="image/jpeg,image/png,image/webp"></label></div>'+
 '<div class="profileMainInfo"><h1>'+esc(p.name||'Pengguna Guardian Angel')+'</h1><p class="profileBio">'+esc(p.bio||'Saling menguatkan, mendoakan, dan bertumbuh bersama.')+'</p>'+
 (p.city?'<div class="profileLocation">⌖ '+esc(p.city)+'</div>':'')+
 '<div class="profileStats"><button onclick="currentPage=\'friends\';showPage(\'friends\')"><b>'+s.followers+'</b><span>Pengikut</span></button><button onclick="alert(\'Daftar akun yang kamu ikuti tersedia di Teman Seiman.\')"><b>'+s.following+'</b><span>Mengikuti</span></button><button onclick="alert(\'Guardian Score mengukur kontribusi positif dan interaksi sehat di komunitas.\')"><b>'+(p.guardian_score??0)+'</b><span>Score</span></button></div>'+
 '<div class="profileActions"><button class="primary" onclick="toggleProfileEditor()">Edit Profil</button><button class="ghost" onclick="shareProfile()">Bagikan Profil</button></div>'+
 '</div></div>'+
 (p.status_text?'<div class="profileStatus"><span>✦</span><div><small>Status hari ini</small><b>'+esc(p.status_text)+'</b></div></div>':'')+
 '<div class="profileTabsNew"><button class="profileTab active" data-tab="posts" onclick="openProfileTab(\'posts\')">Postingan</button><button class="profileTab" data-tab="photos" onclick="openProfileTab(\'photos\')">Foto</button><button class="profileTab" data-tab="friends" onclick="openProfileTab(\'friends\')">Teman</button></div>'+
 '</div>'+
 '<section id="profileEditor" class="card profileEditor hidden">'+
 '<div class="profileEditorHead"><div><h2>Edit Profil</h2><p>Perbarui identitasmu di komunitas.</p></div><button class="ghost" onclick="toggleProfileEditor()">Tutup</button></div>'+
 '<div class="profileEditAvatar"><div class="avatar">'+avatar+'</div><div><b>Foto profil</b><span>JPG, PNG, atau WebP · maks. 5 MB</span></div><label class="ghost">Ubah Foto<input id="avatarFile" type="file" accept="image/jpeg,image/png,image/webp" hidden></label></div>'+
 '<label>Nama<input id="pname" class="field" value="'+esc(p.name||'')+'" oninput="markProfileDirty()"></label>'+
 '<label>Bio<textarea id="bio" class="field" rows="3" oninput="markProfileDirty()">'+esc(p.bio||'')+'</textarea></label>'+
 '<label>Kota<input id="city" class="field" value="'+esc(p.city||'')+'" oninput="markProfileDirty()"></label>'+
 '<label>Tentang / Tujuan<input id="purpose" class="field" value="'+esc(p.purpose||'')+'" oninput="markProfileDirty()"></label>'+
 '<label>Status hari ini<input id="statusText" class="field" maxlength="160" value="'+esc(p.status_text||'')+'" placeholder="Contoh: Tetap percaya, Tuhan sedang bekerja." oninput="markProfileDirty()"></label>'+
 '<div class="profileEditorActions"><button class="ghost" onclick="toggleProfileEditor()">Batal</button><button class="primary" onclick="saveProfile()">Simpan Perubahan</button></div>'+
 '</section>'+
 '<section class="profilePanel" data-panel="posts"><div class="profileSectionTitle"><div><h2>Postingan</h2><span>Bagikan dan lihat kembali hal yang menguatkan.</span></div></div>'+
 (posts.length?posts.map(x=>postHTML(x,p,0)).join(''):'<div class="profileEmpty"><div class="profileEmptyIcon">✦</div><b>Belum ada posting</b><span>Bagikan sesuatu yang menguatkan kepada komunitas.</span><button class="primary" onclick="currentPage=\'home\';showPage(\'home\')">Buat Posting</button></div>')+
 '</section><section class="profilePanel hidden" data-panel="photos"></section><section class="profilePanel hidden" data-panel="friends"></section>'+
 '</section>'+
 '<div class="modal" id="profileMediaModal" onclick="if(event.target===this)closeProfileMedia()"><div class="dialog profileMediaDialog"><div class="row" style="justify-content:flex-end"><button class="ghost" onclick="closeProfileMedia()">Tutup</button></div><div id="profileMediaContent"></div></div></div>';
 window.guardianProfileDirty=false;
}
async function saveProfile(){
 const patch={name:$('pname').value.trim()||'Pengguna Guardian Angel',city:$('city').value.trim()||null,purpose:$('purpose').value.trim()||null,bio:$('bio').value.trim(),status_text:$('statusText').value.trim()||null};
 const file=$('avatarFile')?.files?.[0] || $('avatarFileTop')?.files?.[0];
 if(file){
   if(file.size>5*1024*1024)return alert('Ukuran avatar maksimal 5 MB.');
   const ext=(file.name.split('.').pop()||'jpg').toLowerCase();
   const path=user.id+'/avatar-'+crypto.randomUUID()+'.'+ext;
   const {error:up}=await sb.storage.from('avatars').upload(path,file,{upsert:false,contentType:file.type});
   if(up)return alert('Foto profil gagal disimpan: '+up.message);
   const {data:pub}=sb.storage.from('avatars').getPublicUrl(path); patch.avatar_url=pub.publicUrl;
 }
 const {error}=await sb.from('profiles').update(patch).eq('id',user.id);
 if(error){console.error(error);return alert('Profil belum tersimpan. Silakan coba lagi.')}
 window.guardianProfileDirty=false;
 await loadProfile(); await renderProfile();
 alert('Profil berhasil diperbarui.');
}
async function renderNotifications(){
 const {data,error}=await sb.from('notifications').select('id,type,title,body,read_at,created_at,actor_id').eq('user_id',user.id).order('created_at',{ascending:false}).limit(50);
 if(error){$('main').innerHTML=msg('Notifikasi belum tersedia di server. Terapkan migration 20260907_guardian_social_notifications.sql.','error');return}
 const unread=(data||[]).filter(n=>!n.read_at);
 $('main').innerHTML=`<div class="card"><div class="row" style="justify-content:space-between"><div><h1>Notifikasi</h1><div class="muted">${unread.length?`${unread.length} notifikasi belum dibaca`:'Semua sudah dibaca'}</div></div>${unread.length?`<button class="ghost" onclick="markAllNotificationsRead()">Tandai semua dibaca</button>`:''}</div>${(data||[]).map(n=>`<div class="notificationItem ${n.read_at?'':'unread'}"><div class="dot"></div><div style="flex:1"><b>${esc(n.title||'Notifikasi')}</b><div>${esc(n.body||'')}</div><div class="muted" style="font-size:12px">${new Date(n.created_at).toLocaleString('id-ID')}</div></div></div>`).join('')||'<div class="empty">Belum ada notifikasi.</div>'}</div>`;
 if(unread.length)await sb.from('notifications').update({read_at:new Date().toISOString()}).eq('user_id',user.id).is('read_at',null);
}
async function markAllNotificationsRead(){await sb.from('notifications').update({read_at:new Date().toISOString()}).eq('user_id',user.id).is('read_at',null);await renderNotifications()}

async function isAdmin(){const {data}=await sb.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();return !!data}
async function renderAdmin(){
 if(!(await isAdmin())){$('main').innerHTML=msg('Akses admin ditolak.','error');return}
 const {data:reports}=await sb.from('reports').select('*').order('created_at',{ascending:false}).limit(100);const {data:users}=await sb.from('profiles').select('id,name,phone,account_status,guardian_score,created_at').order('created_at',{ascending:false}).limit(100);
 $('main').innerHTML=`<div class="card admin"><h1>Guardian Admin</h1><p class="muted">Panel dasar untuk laporan dan status akun.</p></div><div class="card"><h2>Laporan</h2>${(reports||[]).map(r=>`<div class="post" style="border-bottom:1px solid var(--line);padding-bottom:10px"><b>${esc(r.reason)}</b><div class="muted">${esc(r.status)} • ${new Date(r.created_at).toLocaleString('id-ID')}</div><button class="ghost" onclick="resolveReport('${r.id}','resolved')">Tandai selesai</button></div>`).join('')||'<div class="empty">Tidak ada laporan.</div>'}</div><div class="card"><h2>Pengguna</h2>${(users||[]).map(u=>`<div class="row" style="justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line)"><div><b>${esc(u.name)}</b><div class="muted">${u.account_status}</div></div><div class="row"><button class="ghost" onclick="setAccountStatus('${u.id}','restricted')">Batasi</button><button class="danger" onclick="setAccountStatus('${u.id}','banned')">Blokir</button><button class="ghost" onclick="setAccountStatus('${u.id}','active')">Aktifkan</button></div></div>`).join('')}</div>`;
}
async function setAccountStatus(id,status){if(!confirm(`Ubah status menjadi ${status}?`))return;const {error}=await sb.rpc('admin_set_account_status',{target_user:id,new_status:status});if(error)return alert(error.message);await renderAdmin()}
async function resolveReport(id,status){const {error}=await sb.rpc('admin_resolve_report',{report_id:id,new_status:status});if(error)return alert(error.message);await renderAdmin()}

boot();


/* ===== Guardian Angel Social Experience V2 ===== */
(function(){
  const SPIRIT_PROMPTS=[
    "Apa yang Tuhan taruh di hati Anda hari ini?",
    "Bagikan satu hal yang membuat Anda bersyukur hari ini…",
    "Ada renungan atau ayat yang ingin menguatkan seseorang?",
    "Ceritakan kesaksian kecil yang ingin Anda bagikan…"
  ];
  let promptIndex=0;
  window.nextSpiritualPrompt=function(){
    const el=document.getElementById("postText");
    if(el){ promptIndex=(promptIndex+1)%SPIRIT_PROMPTS.length; el.placeholder=SPIRIT_PROMPTS[promptIndex]; el.focus(); }
  };

  // Public comments: comments are rendered in the post, and the existing backend
  // functions can consume these helpers when the current post/comment tables are present.
  window.renderPublicComments=function(container, comments){
    if(!container) return;
    container.innerHTML="";
    (comments||[]).forEach(c=>{
      const row=document.createElement("div"); row.className="comment";
      const a=document.createElement("div"); a.className="avatar"; a.textContent=(c.author_name||"G").slice(0,1).toUpperCase();
      const b=document.createElement("div"); b.className="commentBubble";
      b.innerHTML="<div class='commentName'></div><div></div>";
      b.children[0].textContent=c.author_name||"Guardian";
      b.children[1].textContent=c.content||"";
      row.append(a,b); container.appendChild(row);
    });
  };

  // Non-intrusive moderation queue marker. It does not expose moderation status to users.
  window.guardianModeration={
    privateMessages:true,
    reviewIncomingMessage:function(message){
      const t=(message||"").toString().trim();
      const blocked=[/self[- ]?harm/i,/exploit/i,/minor/i,/sexual abuse/i];
      return !blocked.some(r=>r.test(t));
    }
  };

  // Enable native media selection from the composer without changing authentication.
  window.enableGuardianMedia=function(input){
    if(input){ input.accept="image/*,video/*"; input.multiple=true; input.click(); }
  };
})();
