/* Guardian Angel — mobile-first navigation + presentation system
   Inspired by familiar social-app patterns: thumb-first bottom navigation,
   clear active state, compact labels, safe-area spacing, and role-gated admin.
   Does not rewrite page content or depend on layout observers. */
(function(){
  const style=document.createElement('style');
  style.id='guardian-angel-clean-ui-v2';
  style.textContent=`
:root{
  --ga-green:#087a45;
  --ga-green-2:#0b9858;
  --ga-deep:#064d32;
  --ga-mint:#eaf8f1;
  --ga-gold:#d8a84e;
  --ga-ink:#14201a;
}
body{
  background:
    radial-gradient(circle at 8% 0%,#e7f7ee 0,transparent 28%),
    radial-gradient(circle at 92% 18%,rgba(216,168,78,.08),transparent 22%),
    #eef4f1!important;
}
.brandMark{
  background:linear-gradient(145deg,#13a663,#087a45 58%,#064d32)!important;
  box-shadow:0 8px 22px rgba(8,122,69,.22),0 0 0 3px rgba(216,168,78,.12)!important;
}
.brandName{color:#075b37!important}
.homeHero{
  background:linear-gradient(135deg,#fff,#f1faf5 58%,#e1f3e9)!important;
  border:1px solid #cfe5d8!important;
  box-shadow:0 14px 38px rgba(8,122,69,.10)!important;
}
.sectionHead h3{display:flex;align-items:center;gap:7px}
.sectionHead h3:before{
  content:"";width:6px;height:20px;border-radius:99px;
  background:linear-gradient(180deg,var(--ga-gold),var(--ga-green));
}
.story{
  background:linear-gradient(160deg,#075d39,#18a565 62%,#70d19c)!important;
  box-shadow:0 12px 25px rgba(12,61,40,.13)!important;
}
.story.add{
  background:linear-gradient(160deg,#fffdf7,#f4f9f5)!important;
  border-color:#e1d2a7!important;
}
.composerCard,.post{
  border-color:#dce9e2!important;
  box-shadow:0 12px 30px rgba(15,62,39,.07)!important;
}
button,a,[role=button],input,textarea{-webkit-tap-highlight-color:transparent}
button:focus-visible,input:focus-visible,textarea:focus-visible{
  outline:3px solid rgba(216,168,78,.28);outline-offset:2px;
}

/* Admin is invisible until the authenticated admin check succeeds. */
html:not(.ga-admin-allowed) #adminNav{display:none!important}
html.ga-admin-allowed #adminNav{display:flex!important}

/* MOBILE */
@media(max-width:760px){
  html,body{width:100%;overflow-x:hidden!important}
  body{
    padding-bottom:calc(92px + env(safe-area-inset-bottom))!important;
  }

  header{
    position:sticky!important;top:0!important;z-index:120!important;
    width:100%!important;height:70px!important;min-height:70px!important;max-height:70px!important;
    padding:7px 11px!important;display:flex!important;align-items:center!important;
    gap:0!important;overflow:hidden!important;border:0!important;
    border-radius:0 0 20px 20px!important;
    background:linear-gradient(135deg,#087a45,#079455)!important;
    box-shadow:0 7px 22px rgba(6,77,50,.16)!important;
  }
  .brand{
    min-width:0!important;flex:1 1 auto!important;height:56px!important;
    gap:9px!important;overflow:hidden!important;
  }
  .brandMark{
    width:45px!important;height:45px!important;min-width:45px!important;
    flex:0 0 45px!important;border-radius:50%!important;padding:2px!important;
    background:#075d39!important;border:2px solid rgba(255,239,169,.82)!important;
    box-shadow:0 5px 16px rgba(0,0,0,.18)!important;
  }
  .brand>div:last-child{min-width:0!important;max-width:145px!important}
  .brandName{
    color:#fff!important;font-family:Georgia,serif!important;
    font-size:17px!important;line-height:1.05!important;font-weight:900!important;
    white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;
  }
  .brandTag,.topSearch{display:none!important}
  .topActions{
    height:56px!important;flex:0 0 auto!important;gap:4px!important;
    margin:0!important;display:flex!important;align-items:center!important;
  }
  .topActions>.iconBtn:first-child{display:none!important}
  .topActions>.iconBtn{
    display:grid!important;place-items:center!important;
    width:34px!important;height:34px!important;min-width:34px!important;flex:0 0 34px!important;
    padding:0!important;border-radius:11px!important;
    color:#fff!important;background:rgba(255,255,255,.10)!important;
  }
  #userArea{
    width:62px!important;min-width:62px!important;max-width:62px!important;
    height:36px!important;margin-left:2px!important;overflow:hidden!important;
    display:flex!important;align-items:center!important;
  }
  #userArea>*{display:none!important}
  #userArea button{
    display:flex!important;align-items:center!important;justify-content:center!important;
    width:62px!important;min-width:62px!important;height:35px!important;
    margin:0!important;padding:0 6px!important;border-radius:12px!important;
    font-size:9px!important;white-space:nowrap!important;overflow:hidden!important;
    text-overflow:ellipsis!important;color:#fff!important;
    background:rgba(255,255,255,.13)!important;
    border:1px solid rgba(255,255,255,.24)!important;box-shadow:none!important;
  }

  .layout{
    display:block!important;width:100%!important;margin:0!important;
    padding:13px 11px calc(112px + env(safe-area-inset-bottom))!important;
  }

  /* Facebook-like shortcut bar: simple, thumb-friendly, equal-width tabs. */
  .layout>nav{
    position:fixed!important;
    left:8px!important;right:8px!important;
    bottom:calc(7px + env(safe-area-inset-bottom))!important;
    top:auto!important;z-index:350!important;
    width:auto!important;height:70px!important;margin:0!important;padding:5px!important;
    display:flex!important;align-items:stretch!important;justify-content:space-between!important;
    gap:2px!important;overflow:hidden!important;
    border:1px solid rgba(20,70,45,.10)!important;
    border-radius:22px!important;
    background:rgba(255,255,255,.97)!important;
    box-shadow:0 10px 34px rgba(13,52,36,.20),0 2px 8px rgba(13,52,36,.08)!important;
    backdrop-filter:blur(18px)!important;
    -webkit-backdrop-filter:blur(18px)!important;
  }

  .layout>nav .navbtn{
    position:relative!important;
    flex:1 1 0!important;width:auto!important;min-width:0!important;
    height:60px!important;min-height:0!important;margin:0!important;
    padding:4px 1px!important;border-radius:16px!important;
    display:flex!important;flex-direction:column!important;
    align-items:center!important;justify-content:center!important;gap:3px!important;
    text-align:center!important;white-space:nowrap!important;overflow:hidden!important;
    color:#64716b!important;font-size:8px!important;font-weight:750!important;
    transition:background .16s ease,color .16s ease,transform .16s ease!important;
  }
  .layout>nav .navbtn:active{transform:scale(.95)!important}
  .layout>nav .navIcon{
    width:31px!important;height:31px!important;min-width:31px!important;
    flex:0 0 31px!important;border-radius:50%!important;
    display:grid!important;place-items:center!important;
    background:#f0f4f2!important;color:#52625a!important;
    transition:background .16s ease,color .16s ease,box-shadow .16s ease!important;
  }
  .layout>nav .navIcon svg{width:19px!important;height:19px!important}
  .layout>nav .navbtn.active{
    background:#edf8f2!important;color:var(--ga-green)!important;
    box-shadow:inset 0 0 0 1px rgba(8,122,69,.08)!important;
  }
  .layout>nav .navbtn.active .navIcon{
    background:var(--ga-green)!important;color:#fff!important;
    box-shadow:0 5px 12px rgba(8,122,69,.20)!important;
  }
  .layout>nav .navbtn span:not(.navIcon){
    font-size:8px!important;line-height:1!important;
    max-width:100%!important;overflow:hidden!important;text-overflow:ellipsis!important;
  }

  /* Short mobile labels keep the six main shortcuts readable. */
  .layout>nav .navbtn[data-page="friends"] .navLabel,
  .layout>nav .navbtn[data-page="prayer"] .navLabel{
    font-size:0!important;
  }
  .layout>nav .navbtn[data-page="friends"] .navLabel:after{
    content:"Teman";font-size:8px!important;
  }
  .layout>nav .navbtn[data-page="prayer"] .navLabel:after{
    content:"Doa";font-size:8px!important;
  }

  /* Admin remains a role-only shortcut; if present, give it the same treatment. */
  html.ga-admin-allowed #adminNav{display:flex!important}
  #adminNav .navIcon{background:#f7f1df!important;color:#8a6722!important}
  #adminNav.active .navIcon{background:#8a6722!important;color:#fff!important}
  #adminNav .navLabel{font-size:8px!important}

  .homeHero{
    margin:0 0 18px!important;padding:15px!important;
    min-height:150px!important;border-radius:22px!important;
  }
  .homeHero .welcome{min-height:116px!important;gap:12px!important}
  .welcomeAvatar{
    width:58px!important;height:58px!important;min-width:58px!important;flex:0 0 58px!important;
    border-radius:50%!important;padding:2px!important;border:2px solid #fff!important;
    box-shadow:0 0 0 1px #b9dfc9,0 8px 18px rgba(8,122,69,.13)!important;
  }
  .welcomeName{
    font-family:Georgia,serif!important;font-size:18px!important;line-height:1.2!important;
  }
  .quote{font-size:10px!important;line-height:1.45!important}
  .todayCard{display:none!important}
  .sectionHead{margin:17px 2px 8px!important;align-items:center!important}
  .sectionHead h3{font-family:Georgia,serif!important;font-size:20px!important}
  .sectionDesc{font-size:10px!important}
  .stories{
    gap:10px!important;padding:2px 0 8px!important;
    overflow-x:auto!important;scrollbar-width:none!important;
  }
  .stories::-webkit-scrollbar{display:none!important}
  .story{
    width:126px!important;min-width:126px!important;height:186px!important;
    flex:0 0 126px!important;border-radius:20px!important;
  }
  .story.add{padding:13px!important}
  .story.add:before{
    top:13px!important;left:13px!important;width:40px!important;height:40px!important;
    border-radius:13px!important;font-size:27px!important;
  }
  .story.add:after{top:62px!important;left:13px!important;font-size:10px!important}
  .story.add>div{
    left:13px!important;right:10px!important;bottom:13px!important;
    font-size:16px!important;line-height:1.4!important;
  }
  .storyContent{padding:11px!important;font-size:12px!important}
  .storyContent small{font-size:9px!important}
  .composerCard{padding:15px!important;border-radius:21px!important}
  .composer textarea{
    min-height:90px!important;margin-top:11px!important;padding:13px!important;
    border-radius:16px!important;font-size:14px!important;
  }
  .composerTools{grid-template-columns:1fr 1fr 1.1fr!important;gap:7px!important;margin-top:8px!important}
  .toolBtn,.primary,.ghost{
    min-height:46px!important;border-radius:13px!important;
    font-size:10px!important;padding:8px 6px!important;
  }
  .post{border-radius:21px!important;margin-bottom:13px!important}
  .posthead{padding:14px 14px 0!important}
  .postbody{padding:0 14px!important;font-size:13px!important}
  .actions{padding:5px!important}
  .actions button{min-height:42px!important;font-size:10px!important}
}

@media(max-width:390px){
  header{
    height:66px!important;min-height:66px!important;max-height:66px!important;
    padding:6px 8px!important;
  }
  .brandMark{
    width:41px!important;height:41px!important;min-width:41px!important;flex-basis:41px!important;
  }
  .brandName{font-size:16px!important}
  .topActions{gap:2px!important}
  .topActions>.iconBtn{
    width:31px!important;height:31px!important;min-width:31px!important;flex-basis:31px!important;
  }
  #userArea,#userArea button{
    width:58px!important;min-width:58px!important;max-width:58px!important;
  }
  #userArea button{height:33px!important}
  .layout{padding-left:8px!important;padding-right:8px!important}
  .homeHero{padding:14px!important;min-height:146px!important}
  .welcomeAvatar{
    width:55px!important;height:55px!important;min-width:55px!important;flex-basis:55px!important;
  }
  .layout>nav{
    left:6px!important;right:6px!important;
    height:68px!important;bottom:calc(6px + env(safe-area-inset-bottom))!important;
  }
  .layout>nav .navbtn{height:58px!important;border-radius:15px!important}
  .layout>nav .navIcon{
    width:29px!important;height:29px!important;min-width:29px!important;flex-basis:29px!important;
  }
  .layout>nav .navIcon svg{width:18px!important;height:18px!important}
  .layout>nav .navbtn span:not(.navIcon),
  .layout>nav .navbtn[data-page="friends"] .navLabel:after,
  .layout>nav .navbtn[data-page="prayer"] .navLabel:after{
    font-size:7.5px!important;
  }
}

@media(max-width:340px){
  .layout>nav .navbtn span:not(.navIcon),
  .layout>nav .navbtn[data-page="friends"] .navLabel:after,
  .layout>nav .navbtn[data-page="prayer"] .navLabel:after{
    font-size:7px!important;
  }
  .layout>nav .navIcon{
    width:27px!important;height:27px!important;min-width:27px!important;flex-basis:27px!important;
  }
}
`;
  document.head.appendChild(style);

  /* Independent role gate: visitors never get an Admin shortcut.
     The database remains the authority; UI visibility is only a presentation layer. */
  const CONFIG=window.GUARDIAN_ANGEL_CONFIG||{};
  let adminClient=null;
  function setAdminVisible(allowed){
    document.documentElement.classList.toggle('ga-admin-allowed',!!allowed);
    const el=document.getElementById('adminNav');
    if(el && !allowed){
      el.classList.add('hidden');
      el.setAttribute('aria-hidden','true');
    }else if(el && allowed){
      el.classList.remove('hidden');
      el.setAttribute('aria-hidden','false');
    }
  }
  async function syncAdminVisibility(){
    try{
      setAdminVisible(false);
      if(!window.supabase || !CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_PUBLISHABLE_KEY) return;
      if(!adminClient){
        adminClient=window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_PUBLISHABLE_KEY);
      }
      const {data:{session}}=await adminClient.auth.getSession();
      if(!session?.user) return;
      const {data,error}=await adminClient.rpc('is_admin');
      if(!error && data===true) setAdminVisible(true);
    }catch(e){
      setAdminVisible(false);
    }
  }
  function bindAdminAuth(){
    if(!window.supabase || !CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_PUBLISHABLE_KEY) return;
    try{
      if(!adminClient){
        adminClient=window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_PUBLISHABLE_KEY);
      }
      adminClient.auth.onAuthStateChange(()=>{setTimeout(syncAdminVisibility,0)});
    }catch(e){}
    syncAdminVisibility();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',bindAdminAuth,{once:true});
  }else{
    bindAdminAuth();
  }
})();

/* Guardian Angel Profile — dedicated component layer */
(function(){
 const s=document.createElement('style');s.id='guardian-profile-design-v1';s.textContent=`
.profilePage{display:flex;flex-direction:column;gap:14px}.profileHeroCard{padding:0!important;overflow:hidden!important}.profileCoverNew{position:relative;aspect-ratio:3.4/1;min-height:150px;background:radial-gradient(circle at 80% 20%,#65d39a,#159458 48%,#075b35);background-size:cover;background-position:center}.profileCoverShade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,56,34,.05),rgba(4,56,34,.24))}.profileIdentity{position:relative;padding:0 20px 0}.profileAvatarWrap{position:relative;width:104px;height:104px;margin-top:-52px}.profileAvatarNew{width:104px!important;height:104px!important;min-width:104px!important;flex-basis:104px!important;border:5px solid #fff;box-shadow:0 8px 24px rgba(15,62,39,.18);background:#e7f6ee}.profileCamera{position:absolute;right:-2px;bottom:3px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#087a45;border:1px solid #d5e7dd;box-shadow:0 4px 12px rgba(0,0,0,.12);font-weight:900;cursor:pointer}.profileCamera input{display:none}.profileMainInfo h1{font-family:Georgia,serif;font-size:27px;line-height:1.15;margin:8px 0 4px;letter-spacing:-.3px}.profileBio{margin:0;color:#65736b;font-size:13px;line-height:1.5}.profileLocation{margin-top:6px;color:#637169;font-size:11px}.profileStats{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:14px}.profileStats button{border:0;background:transparent;padding:11px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;color:#53635b}.profileStats b{font-size:16px;color:#14201a}.profileStats span{font-size:9px}.profileActions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}.profileActions button{min-height:44px}.profileStatus{margin:0 20px 14px;padding:11px 12px;border-radius:15px;background:linear-gradient(135deg,#f9f5e9,#f2faf5);border:1px solid #eadbb5;display:flex;gap:9px;align-items:flex-start}.profileStatus>span{color:#b6862e;font-size:18px}.profileStatus small,.profileStatus b{display:block}.profileStatus small{font-size:9px;color:#7a817a;margin-bottom:2px}.profileStatus b{font-size:12px;line-height:1.4}.profileTabsNew{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);padding:0 8px}.profileTab{position:relative;border:0;background:transparent;min-height:48px;color:#69766f;font-weight:800;font-size:12px}.profileTab.active{color:#087a45}.profileTab.active:after{content:"";position:absolute;left:18%;right:18%;bottom:0;height:3px;border-radius:3px;background:#087a45}.profileEditor{padding:17px!important}.profileEditorHead{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:14px}.profileEditor h2,.profileSectionTitle h2{font-family:Georgia,serif;margin:0;font-size:21px}.profileEditorHead p,.profileSectionTitle span{margin:3px 0 0;color:#77837d;font-size:10px}.profileEditAvatar{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--line);border-radius:15px;background:#f8fbf9;margin-bottom:12px}.profileEditAvatar .avatar{width:54px;height:54px;flex-basis:54px}.profileEditAvatar>div:nth-child(2){flex:1;min-width:0}.profileEditAvatar b,.profileEditAvatar span{display:block}.profileEditAvatar span{font-size:9px;color:#7a8780;margin-top:2px}.profileEditor label{display:block;font-size:10px;font-weight:800;color:#53635b;margin-top:10px}.profileEditor .field{margin-top:5px}.profileEditorActions{display:grid;grid-template-columns:1fr 1.3fr;gap:8px;margin-top:14px}.profilePanel{min-width:0}.profileSectionTitle{display:flex;justify-content:space-between;align-items:end;margin:4px 2px 8px}.profileEmpty{min-height:190px;border:1px dashed #cfe2d6;border-radius:18px;background:#fbfdfc;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:22px;gap:6px;color:#64716b}.profileEmpty b{font-family:Georgia,serif;font-size:17px;color:#26352d}.profileEmpty span{max-width:280px;font-size:10px;line-height:1.5}.profileEmpty .primary{margin-top:8px}.profileEmptyIcon{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:#eaf8f1;color:#087a45;font-size:20px;margin-bottom:4px}.profilePhotoGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;border-radius:18px;overflow:hidden}.profilePhoto{aspect-ratio:1;border:0;padding:0;background:#e9f1ed;overflow:hidden;cursor:pointer}.profilePhoto img,.profilePhoto video{width:100%;height:100%;object-fit:cover;display:block}.profileFriendList{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:#fff}.profileFriendRow{border:0;border-bottom:1px solid var(--line);background:#fff;display:flex;align-items:center;gap:10px;padding:11px;text-align:left}.profileFriendRow:last-child{border-bottom:0}.profileFriendRow .avatar{width:46px;height:46px;flex-basis:46px}.profileFriendRow>div:nth-child(2){flex:1;min-width:0}.profileFriendRow b,.profileFriendRow span{display:block}.profileFriendRow b{font-size:12px}.profileFriendRow span{font-size:9px;color:#78847e}.profileFriendRow>span:last-child{font-size:22px;color:#a0aaa5}.profileMediaDialog{max-width:680px!important;background:#10251b!important}.profileMediaFull{display:block;max-width:100%;max-height:72vh;margin:auto;object-fit:contain;border-radius:12px}
@media(max-width:760px){.profilePage{gap:11px}.profileCoverNew{aspect-ratio:2.35/1;min-height:145px}.profileIdentity{padding:0 14px}.profileAvatarWrap,.profileAvatarNew{width:92px!important;height:92px!important;min-width:92px!important;flex-basis:92px!important}.profileAvatarWrap{margin-top:-46px}.profileMainInfo h1{font-size:23px}.profileBio{font-size:12px}.profileStats{margin-top:12px}.profileStats b{font-size:15px}.profileStats span{font-size:8px}.profileActions{gap:7px;margin:10px 0}.profileActions button{font-size:10px;min-height:43px}.profileStatus{margin:0 14px 12px}.profileTabsNew{padding:0 4px}.profileTab{font-size:10px;min-height:46px}.profileTab.active:after{left:16%;right:16%}.profileEditor{padding:14px!important}.profileEditAvatar{align-items:center}.profileEditAvatar label{margin-top:0!important;flex:0 0 auto}.profileSectionTitle h2{font-size:19px}.profileSectionTitle span{font-size:9px}.profilePhotoGrid{gap:3px}.profileFriendRow{padding:10px}.profileFriendRow .avatar{width:42px;height:42px;flex-basis:42px}}
@media(max-width:360px){.profileCoverNew{min-height:132px}.profileMainInfo h1{font-size:21px}.profileActions button{font-size:9px;padding:7px 5px}.profileStats b{font-size:14px}.profileTab{font-size:9px}}
`;document.head.appendChild(s);
})();

/* ===== Guardian Angel warm green-gold authentication ===== */
(function(){const s=document.createElement('style');s.id='guardian-auth-warm-v1';s.textContent=`
.gaAuthDialog{position:relative!important;width:min(430px,calc(100vw - 24px))!important;padding:28px 24px 20px!important;border-radius:28px!important;overflow:hidden!important;background:linear-gradient(155deg,#fffef9 0%,#fff 48%,#f3fbf6 100%)!important;border:1px solid rgba(180,145,65,.20)!important;box-shadow:0 30px 90px rgba(19,62,39,.25)!important}.gaAuthGlow{position:absolute;right:-90px;top:-100px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(216,168,78,.24),rgba(216,168,78,0) 68%);pointer-events:none}.gaAuthClose{position:absolute;right:14px;top:12px;width:34px;height:34px;border:0;border-radius:50%;background:#f2f7f3;color:#5f6d65;font-size:23px;line-height:1}.gaAuthBrand{display:flex;align-items:center;justify-content:center;gap:10px;margin:1px 0 20px}.gaAuthMark{width:58px;height:58px;border-radius:18px;padding:4px;background:linear-gradient(145deg,#0b8b50,#075b35);border:2px solid #d8a84e;box-shadow:0 10px 24px rgba(8,91,53,.18)}.gaAuthMark svg{width:100%;height:100%}.gaAuthBrandName{font-family:Georgia,serif;font-size:21px;font-weight:900;color:#08663c;letter-spacing:-.3px}.gaAuthBrandTag{font-size:8px;color:#8b7440;font-weight:800;letter-spacing:.35px;margin-top:3px}.gaAuthIntro{text-align:center;margin-bottom:16px}.gaAuthKicker{font-size:8px;letter-spacing:1.7px;font-weight:900;color:#b0832b;margin-bottom:5px}.gaAuthIntro h2{font-family:Georgia,serif;font-size:25px;color:#1b2d24;margin:0 0 6px}.gaAuthIntro p{font-size:11px;line-height:1.55;color:#748079;margin:0 auto;max-width:330px}.gaAuthDialog .authField{margin-top:10px}.gaAuthDialog .authField label{display:block;font-size:9px;font-weight:900;color:#4e6257;margin:0 0 5px 2px}.gaAuthDialog .authField input{height:48px;border:1px solid #d9e6de;border-radius:14px;background:#fbfdfc;padding:0 13px;font-size:13px;transition:.18s}.gaAuthDialog .authField input:focus{border-color:#b8d7c3;box-shadow:0 0 0 4px rgba(216,168,78,.10),0 0 0 5px rgba(11,122,69,.05);background:#fff}.gaAuthPrimary{width:100%!important;margin-top:14px!important;min-height:48px!important;border-radius:14px!important;background:linear-gradient(135deg,#0b8b50,#075d37)!important;font-size:12px!important;box-shadow:0 11px 22px rgba(8,95,54,.18)!important}.gaAuthLinks{margin-top:10px!important}.gaAuthLinks .linkBtn{font-size:10px}.gaOr{display:flex;align-items:center;gap:8px;margin:16px 0 10px;color:#9a8a63;font-size:9px}.gaOr span{height:1px;flex:1;background:#e6ddc9}.gaGoogle{height:46px!important;border-radius:14px!important;background:#fff!important;border-color:#dce7e1!important;color:#33463d!important;font-size:11px!important}.gaGoogleG{font-weight:900;font-size:15px;color:#4285f4;margin-right:3px}.gaFaithNote{display:flex;gap:9px;align-items:flex-start;margin-top:10px;padding:11px 12px;border-radius:15px;background:linear-gradient(135deg,#fffaf0,#f1faf5);border:1px solid #ebdfc4}.gaFaithNote>span{width:27px;height:27px;border-radius:9px;display:grid;place-items:center;background:#f0dfb5;color:#8a6722}.gaFaithNote b,.gaFaithNote small{display:block}.gaFaithNote b{font-size:10px;color:#475b50}.gaFaithNote small{font-size:8px;color:#7a867f;line-height:1.4;margin-top:2px}.gaAuthFooter{text-align:center;margin-top:13px;font-size:8px;line-height:1.5;color:#929b96}.gaSignupOnly.hidden{display:none!important}@media(max-width:760px){.gaAuthDialog{width:calc(100vw - 18px)!important;padding:23px 18px 17px!important;border-radius:25px!important}.gaAuthBrand{margin-bottom:16px}.gaAuthMark{width:52px;height:52px}.gaAuthBrandName{font-size:19px}.gaAuthIntro h2{font-size:23px}.gaAuthIntro p{font-size:10px}.gaAuthDialog .authField input{height:49px;font-size:16px}.gaAuthPrimary{min-height:49px!important}.gaAuthFooter{font-size:7.5px}}
`;document.head.appendChild(s)})();

/* ===== Guardian Angel complete warm green-gold visual system ===== */
(function(){const s=document.createElement('style');s.id='guardian-warm-complete-v2';s.textContent=`
:root{--g:#0a7543;--g2:#064d32;--mint:#e8f5ed;--bg:#f7f5ed;--ink:#182a20;--muted:#727d76;--line:#e5e0d2;--gold:#c99a3b;--gold-soft:#f6ecd2;--shadow:0 16px 42px rgba(30,68,48,.09)}
body{background:radial-gradient(circle at 50% -15%,#fffdf6 0,#f7f5ed 42%,#f5f7f4 100%)}
header{background:rgba(255,253,247,.94);border-bottom-color:rgba(172,132,50,.16)}
.brandMark{background:linear-gradient(145deg,#0b8c50,#064d32);border:2px solid #d8a84e;box-shadow:0 10px 24px rgba(8,91,53,.22)}
.brandName{color:#075d38}.brandTag{color:#8d733e}
.topSearch input{background:#faf9f4;border-color:#e2dccb}.iconBtn:hover{background:#f4ecd9;color:#8b6725}
.navbtn{color:#526158}.navbtn:hover{background:#f1f7f2;color:var(--g)}.navbtn.active{background:linear-gradient(90deg,#e8f5ed,#f5f1e4);color:var(--g);box-shadow:inset 3px 0 #b7892f,0 5px 15px rgba(11,122,69,.06)}.navbtn.active .navIcon{background:linear-gradient(145deg,#0b8b50,#075d37);color:#fff;box-shadow:0 5px 13px rgba(11,122,69,.2)}
.card{border-color:rgba(156,119,46,.12);box-shadow:var(--shadow)}.homeHero{background:linear-gradient(135deg,#fffdf7 0,#f3fbf6 58%,#e8f4e8 100%);border-color:#e6ddc7}.primary{background:linear-gradient(135deg,#0b8b50,#075d37)}.ghost{background:#fbfaf5;border-color:#e1dac8}.toolBtn:hover,.actions button:hover{background:#f6efdc;color:#8a6829}
.sectionHead h3{font-family:Georgia,serif;color:#244136}.sideTitle{color:#284336}.sideIcon{background:linear-gradient(145deg,#f5e7bf,#e7c979);color:#7a5b1f}.sideQuote{color:#2c4336}.right .card{background:linear-gradient(145deg,#fffdf7,#f2faf5)}
.stories .story{box-shadow:0 12px 26px rgba(28,68,47,.14)}
@media(max-width:760px){.layout>nav{background:rgba(255,253,247,.97);border-color:rgba(172,132,50,.20)}.layout>nav .navbtn.active{background:#edf6ef}.layout>nav .navbtn.active .navIcon{background:#0a7543}}
`;document.head.appendChild(s)})();
