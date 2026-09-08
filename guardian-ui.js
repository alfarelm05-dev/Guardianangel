/* Guardian Angel UI polish: mobile layout + visible social counts */
(function(){
  const style=document.createElement('style');
  style.textContent=`
    @media(max-width:760px){
      html,body{width:100%;max-width:100%;overflow-x:hidden}
      header{position:sticky;top:0}
      .layout{width:100%;max-width:100%;overflow:hidden}
      main{width:100%;min-width:0}
      .card,.post,.composerCard,.homeHero,.friendCard{max-width:100%;min-width:0}
      .welcome{min-width:0}.welcomeText{min-width:0;overflow:hidden}
      .welcomeName{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .composerTools{grid-template-columns:1fr 1fr 1fr}
      .composerTools .primary,.composerTools .toolBtn{min-width:0;width:100%;white-space:nowrap}
      .actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:7px 8px;overflow:visible}
      .actions button{min-width:0!important;width:100%;font-size:11px!important;padding:7px 4px;border:1px solid var(--line)!important;background:#fff!important}
      .actions button:nth-child(n+4){display:none}
      .actions button:hover{background:var(--mint)!important}
      .commentForm{align-items:center}.commentForm .field{font-size:16px}
      .friendCard .row:last-child{display:grid;grid-template-columns:1.2fr 1fr 1fr}.friendCard .row:last-child>*{min-width:0}
      .filterRow input{font-size:16px}
      .profileTabs{max-width:100%}
      .message-list{min-height:240px}
    }
    .socialCount{font-weight:850;margin-left:2px}
    .commentCount{font-size:11px;color:var(--muted);margin:0 12px 7px}
  `;
  document.head.appendChild(style);

  const originalOpenComments=window.openComments;
  const originalLoadComments=window.loadComments;
  const originalRenderHome=window.renderHome;

  async function decorateCommentCounts(){
    const posts=document.querySelectorAll('article.post[id^="post-"]');
    for(const post of posts){
      const id=post.id.replace('post-','');
      try{
        const {count,error}=await sb.from('comments').select('id',{count:'exact',head:true}).eq('post_id',id).neq('status','rejected');
        if(error) continue;
        const actions=post.querySelector('.actions');
        const commentButton=actions?.querySelector('button:nth-child(2)');
        if(commentButton) commentButton.innerHTML='💬 <span>Komentar</span> <span class="socialCount">${count||0}</span>';
        const box=post.querySelector('.commentsInline');
        if(box && !box.classList.contains('hidden')){
          let meta=box.querySelector('.commentCount');
          if(!meta){meta=document.createElement('div');meta.className='commentCount';box.prepend(meta)}
          meta.textContent=`${count||0} komentar`;
        }
      }catch(e){console.warn('comment count',e)}
    }
  }

  window.openComments=async function(id){
    const box=document.getElementById('comments-'+id);
    if(!box)return;
    box.classList.toggle('hidden');
    if(!box.classList.contains('hidden')){
      await window.loadComments(id);
      let meta=box.querySelector('.commentCount');
      if(!meta){meta=document.createElement('div');meta.className='commentCount';box.prepend(meta)}
      try{const {count}=await sb.from('comments').select('id',{count:'exact',head:true}).eq('post_id',id).neq('status','rejected');meta.textContent=`${count||0} komentar`;}catch(e){}
    }
  };

  window.loadComments=async function(id){
    const box=document.getElementById('comments-'+id); if(!box)return;
    const {data,error}=await sb.from('comments').select('id,user_id,body,created_at,status').eq('post_id',id).neq('status','rejected').order('created_at');
    if(error){box.innerHTML='<div class="notice dangerbox">Komentar belum dapat dimuat.</div>';return}
    const ids=[...new Set((data||[]).map(x=>x.user_id))];
    const {data:pub}=ids.length?await sb.from('public_profiles').select('id,name,avatar_url').in('id',ids):{data:[]};
    const map=Object.fromEntries((pub||[]).map(x=>[x.id,x]));
    const count=data?.length||0;
    box.innerHTML=`<div class="commentCount">${count} komentar</div>`+(data||[]).map(c=>`<div class="commentLine"><div class="avatar" style="width:32px;height:32px;flex-basis:32px">${map[c.user_id]?.avatar_url?`<img class="avatar" src="${esc(map[c.user_id].avatar_url)}">`:initials(map[c.user_id]?.name)}</div><div class="commentBubble"><div class="commentName">${esc(map[c.user_id]?.name||'Pengguna')}</div><div>${esc(c.body)}</div></div></div>`).join('')+`<div class="commentForm"><input id="commentInput-${id}" class="field" placeholder="Tulis komentar…" onkeydown="if(event.key==='Enter')submitComment('${id}')"><button class="primary" onclick="submitComment('${id}')">Kirim</button></div>`;
  };

  window.renderHome=async function(){
    await originalRenderHome();
    await decorateCommentCounts();
  };

  // Re-apply count decoration after navigation renders.
  const observer=new MutationObserver(()=>{if(document.getElementById('main')) setTimeout(decorateCommentCounts,80)});
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
