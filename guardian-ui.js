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

/* ===== Guardian Angel GOLDEN WARMTH — locked visual correction ===== */
(function(){const s=document.createElement('style');s.id='guardian-gold-warm-v3';s.textContent=`
:root{--g:#16734a;--g2:#2f5f49;--mint:#eef6ee;--bg:#fbf8ef;--ink:#26352d;--muted:#7b8178;--line:#e8dfcb;--gold:#c79a43;--gold2:#e2bd68;--gold-soft:#f5e8c8}
body{background:linear-gradient(180deg,#fffdf7 0%,#faf8f0 48%,#f3f7f2 100%)!important;color:var(--ink)}
header{background:rgba(255,252,244,.97)!important;border-bottom:2px solid rgba(199,154,67,.28)!important;box-shadow:0 5px 22px rgba(95,76,38,.06)}
.brandMark{background:linear-gradient(145deg,#237d55,#146342)!important;border:2px solid var(--gold2)!important;box-shadow:0 0 0 3px rgba(226,189,104,.18),0 10px 25px rgba(65,83,57,.16)!important}.brandName{color:#3d5f4c!important}.brandTag{color:#a07832!important}
.topSearch input{background:#fffdf8!important;border-color:#e4d7b8!important}.iconBtn{color:#6f725f!important}.iconBtn:hover{background:#f5ead0!important;color:#936f29!important}
.navbtn{color:#59675e!important}.navbtn:hover{background:#f8efd9!important;color:#48705a!important}.navbtn.active{background:linear-gradient(90deg,#edf5ee 0%,#fbf2dc 100%)!important;color:#386b50!important;box-shadow:inset 4px 0 var(--gold),0 5px 16px rgba(183,143,55,.08)!important}.navbtn.active .navIcon{background:linear-gradient(145deg,#d6ad59,#b9872f)!important;color:#fff!important;box-shadow:0 6px 14px rgba(173,126,37,.24)!important}
.card{background:rgba(255,254,249,.96)!important;border:1px solid rgba(199,154,67,.22)!important;box-shadow:0 12px 35px rgba(83,77,53,.07)!important}.homeHero{background:linear-gradient(125deg,#fffdf7 0%,#f8f0dc 38%,#edf5ed 100%)!important;border:1px solid rgba(199,154,67,.30)!important}.homeHero:before{background:radial-gradient(circle,rgba(224,188,102,.28),transparent 68%)!important}
.primary{background:linear-gradient(135deg,#b88a35,#d4ab58)!important;color:#fff!important;box-shadow:0 10px 22px rgba(168,122,38,.20)!important}.primary:hover{background:linear-gradient(135deg,#a97b29,#c99b43)!important}.ghost{background:#fffdf8!important;border-color:#decda7!important;color:#5d684f!important}.toolBtn:hover,.actions button:hover{background:#f7edd6!important;color:#8b6728!important}
.sectionHead h3,.sideTitle{font-family:Georgia,serif;color:#45604f!important}.sideIcon{background:linear-gradient(145deg,#f5dfaa,#d5a94f)!important;color:#fff!important;box-shadow:0 7px 16px rgba(176,130,40,.16)}.sideQuote{color:#4d5f53!important}.right .card{background:linear-gradient(145deg,#fffdf8,#f1f7f1)!important}
.story,.stories .story{border:2px solid #d6ad59!important;box-shadow:0 10px 24px rgba(102,81,37,.13)!important}.stories .story:first-child{border-color:#b88a35!important}
.authModal,.modal{background:rgba(38,48,40,.38)!important}.gaAuthDialog{background:linear-gradient(145deg,#fffdf7 0%,#fbf4e2 48%,#eef6ef 100%)!important;border:2px solid rgba(199,154,67,.38)!important}.gaAuthMark{background:linear-gradient(145deg,#2b8058,#176443)!important;border-color:#e0b85e!important;box-shadow:0 0 0 4px rgba(224,184,94,.15),0 12px 28px rgba(55,80,60,.16)!important}.gaAuthBrandName{color:#46644f!important}.gaAuthBrandTag{color:#a47b31!important}.gaAuthKicker{color:#a77929!important}.gaAuthIntro h2{color:#34483d!important}.gaAuthPrimary{background:linear-gradient(135deg,#b88935,#d8b25e)!important}.gaGoogle{border-color:#ddcfad!important;background:#fffdf8!important}
button{transition:all .18s ease}a{color:#9a732d}
`;document.head.appendChild(s)})();

/* ===== GOLDEN IDENTITY v4 — no green UI ===== */
(function(){const s=document.createElement('style');s.id='guardian-golden-identity-v4';s.textContent=`
:root{--g:#a87316!important;--g2:#7f5710!important;--mint:#fbf0d3!important;--bg:#fbf8ef!important;--ink:#332b1e!important;--muted:#7d7567!important;--line:#eadfc8!important;--gold:#c9952e;--gold2:#e4bd63;--gold-soft:#f6e8c6;--shadow:0 16px 42px rgba(104,75,20,.10)!important}
body{background:linear-gradient(180deg,#fffdf7 0%,#fbf8ef 52%,#f7f0df 100%)!important;color:#332b1e!important}
header{background:rgba(255,252,244,.97)!important;border-bottom:2px solid rgba(201,149,46,.28)!important;box-shadow:0 5px 22px rgba(104,75,20,.07)!important}
.brandMark{background:linear-gradient(145deg,#e5bd62,#a87316)!important;border:2px solid #f2d58d!important;box-shadow:0 0 0 3px rgba(228,189,99,.20),0 10px 25px rgba(130,91,17,.18)!important;color:#fff!important}.brandName{color:#9a6b16!important}.brandTag{color:#ad812f!important}
.topSearch input{background:#fffdf8!important;border-color:#e6d8b9!important}.searchIcon,.iconBtn{color:#8a734b!important}.iconBtn:hover{background:#f8edd4!important;color:#a87316!important}
.navbtn{color:#6c6251!important}.navbtn:hover{background:#fbf1d9!important;color:#a87316!important}.navbtn.active{background:linear-gradient(90deg,#fff7e4,#f6e7c4)!important;color:#986a17!important;box-shadow:inset 4px 0 #c9952e,0 5px 16px rgba(183,133,36,.10)!important}.navbtn.active .navIcon{background:linear-gradient(145deg,#e0b65a,#ae7a18)!important;color:#fff!important;box-shadow:0 6px 14px rgba(173,126,37,.24)!important}.navIcon{background:#f6eedc!important;color:#a87316!important}
.card{background:rgba(255,254,249,.98)!important;border:1px solid rgba(201,149,46,.23)!important;box-shadow:0 12px 35px rgba(104,75,20,.07)!important}.homeHero{background:linear-gradient(125deg,#fffdf7 0%,#fff3d5 48%,#fbefd3 100%)!important;border:1px solid rgba(201,149,46,.32)!important}.welcomeAvatar,.avatar,.friendAvatar{background:#f7e8c5!important;color:#a87316!important}.todayCard{border-color:#e6d5b0!important;background:#fffaf0!important}
.primary{background:linear-gradient(135deg,#b77e19,#ddb45a)!important;color:#fff!important;box-shadow:0 10px 22px rgba(168,122,38,.20)!important}.primary:hover{background:linear-gradient(135deg,#a56e12,#c8952e)!important}.ghost{background:#fffdf8!important;border-color:#dfcda5!important;color:#806225!important}.field{border-color:#e6d9bf!important;background:#fffdf8!important}.field:focus{border-color:#d7aa50!important;box-shadow:0 0 0 4px #fbf0d3!important}.toolBtn{border-color:#e6d9bf!important;background:#fffdf8!important;color:#776548!important}.toolBtn:hover,.actions button:hover{background:#fbf0d3!important;color:#9a6b16!important}
.sectionHead h3,.sideTitle{font-family:Georgia,serif;color:#6e531f!important}.sectionDesc,.friendMeta,.quote{color:#837967!important}.sideIcon{background:linear-gradient(145deg,#f3d88f,#c9952e)!important;color:#fff!important;box-shadow:0 7px 16px rgba(176,130,40,.16)!important}.sideQuote{color:#5f4a23!important}.right .card{background:linear-gradient(145deg,#fffdf8,#fbf2dd)!important}
.stories .story,.story{background:linear-gradient(160deg,#f0c968 0%,#b77b16 54%,#7f5410 100%)!important;border:2px solid #e5bc60!important;box-shadow:0 12px 28px rgba(112,79,17,.18)!important}.story.add{background:linear-gradient(160deg,#fffaf0,#f4e2b6)!important;border:2px solid #d5a94f!important;color:#5d4923!important}.story.add:before{background:linear-gradient(145deg,#d8ad4e,#a87316)!important;color:#fff!important}.story.add:after{color:#9b6d18!important}.storyShade{background:linear-gradient(to top,rgba(54,35,8,.78),rgba(120,75,8,.04) 68%)!important}.storyContent{color:#fffdf4!important}
.post{border-color:rgba(201,149,46,.18)!important}.actions{border-top-color:#eadfc8!important}.commentsInline{border-top-color:#eadfc8!important;background:#fffaf0!important}.commentBubble{background:#f6ead0!important}.bubble{background:#f4ead3!important;color:#4e422d!important}.bubble.mine{background:#ead09a!important;color:#463719!important}
.profileEmptyIcon{background:#f5e4bd!important;color:#a87316!important}.profileFriendList{border-color:#eadfc8!important}.profileFriendRow{border-bottom-color:#eadfc8!important;background:#fffdf8!important}
.gaAuthDialog{background:linear-gradient(145deg,#fffdf7 0%,#fbf0d9 52%,#fffaf0 100%)!important;border:2px solid rgba(201,149,46,.40)!important}.gaAuthMark{background:linear-gradient(145deg,#e5bd62,#a87316)!important;border-color:#f1d28a!important}.gaAuthBrandName{color:#966a1a!important}.gaAuthBrandTag,.gaAuthKicker{color:#a47727!important}.gaAuthIntro h2{color:#4e3d1f!important}.gaAuthPrimary{background:linear-gradient(135deg,#b77e19,#ddb45a)!important}.gaFaithNote{background:linear-gradient(135deg,#fff8e8,#f7e9c9)!important;border-color:#ead7ad!important}.gaGoogle{border-color:#dfd0ae!important;background:#fffdf8!important}
.bottomNav,.mobileNav{background:rgba(255,252,244,.98)!important;border-top-color:rgba(201,149,46,.24)!important}
a{color:#a87316!important}
`;document.head.appendChild(s)})();

/* ===== GUARDIAN ANGEL SIGNATURE — EMERALD + SUNLIT GOLD + IVORY ===== */
(function(){const s=document.createElement('style');s.id='guardian-signature-v5';s.textContent=`
:root{--ga-emerald:#155c3b;--ga-emerald2:#0d432d;--ga-gold:#c99a32;--ga-gold2:#f0cc72;--ga-ivory:#fffaf0;--ga-cream:#f5ead0;--ga-text:#29392f;--ga-muted:#77786e}
body{background:linear-gradient(180deg,#fffdf7 0%,#fff9ed 45%,#eef4ec 100%)!important;color:var(--ga-text)!important}
header{background:rgba(255,252,244,.96)!important;border-bottom:1px solid rgba(201,154,50,.28)!important}
.brandMark{background:linear-gradient(145deg,var(--ga-emerald),var(--ga-emerald2))!important;border:2px solid var(--ga-gold2)!important;box-shadow:0 0 0 3px rgba(240,204,114,.22),0 10px 24px rgba(13,67,45,.18)!important}.brandName{color:var(--ga-emerald)!important}.brandTag{color:#a67a28!important}
.topSearch input{background:#fffdf8!important;border-color:#e6d8b8!important}.iconBtn{color:#536b5d!important}.iconBtn:hover{background:#f7edd8!important;color:#9b7226!important}
.navbtn{color:#53675b!important}.navbtn:hover{background:#f5ead2!important;color:var(--ga-emerald)!important}.navbtn.active{background:linear-gradient(90deg,#edf5ee,#fbefd2)!important;color:#245f43!important;box-shadow:inset 4px 0 var(--ga-gold),0 5px 16px rgba(183,143,55,.10)!important}.navbtn.active .navIcon{background:linear-gradient(145deg,var(--ga-gold2),var(--ga-gold))!important;color:#fff!important;box-shadow:0 6px 14px rgba(173,126,37,.24)!important}.navIcon{background:#edf4ee!important;color:var(--ga-emerald)!important}
.card{background:rgba(255,254,249,.98)!important;border:1px solid rgba(201,154,50,.20)!important;box-shadow:0 14px 34px rgba(53,66,52,.08)!important}.homeHero{background:linear-gradient(135deg,#fffdf7 0%,#fff2cf 43%,#edf5ed 100%)!important;border-color:rgba(201,154,50,.30)!important}.primary{background:linear-gradient(135deg,#b77f18,#e0b95f)!important;color:#fff!important;box-shadow:0 10px 22px rgba(169,121,35,.20)!important}.ghost{background:#fffdf8!important;border-color:#decda7!important;color:#6a562e!important}
.sectionHead h3,.sideTitle{font-family:Georgia,serif;color:#3c5c49!important}.sideIcon{background:linear-gradient(145deg,#f2d47f,#c18d26)!important;color:#fff!important}.right .card{background:linear-gradient(145deg,#fffdf7,#f1f7ef)!important}
/* Stories: emerald base, gold halo, warm light — matching the new concept */
.stories .story,.story{background:linear-gradient(155deg,#194f38 0%,#176845 42%,#c18c27 100%)!important;border:2px solid #e4bb5f!important;box-shadow:0 12px 28px rgba(66,73,45,.18),0 0 0 2px rgba(240,204,114,.12)!important}.stories .story:before,.story:before{background:radial-gradient(circle at 72% 22%,rgba(255,224,133,.72),transparent 33%)!important}.story.add{background:linear-gradient(145deg,#fff9ea,#f0dfb5)!important;border-color:#d3a64b!important;color:#53634f!important}.story.add:before{background:linear-gradient(145deg,#e2bd67,#a87316)!important}.storyShade{background:linear-gradient(to top,rgba(9,51,34,.82),rgba(9,51,34,.05) 72%)!important}.storyContent{color:#fffdf4!important}
.post{border-color:rgba(201,154,50,.18)!important}.actions{border-top-color:#eadfc9!important}.commentsInline{background:#fffaf0!important;border-top-color:#eadfc9!important}.commentBubble{background:#f4ead4!important}.bubble{background:#edf3ed!important;color:#334d3f!important}.bubble.mine{background:#e9d19a!important;color:#463719!important}
.gaAuthDialog{background:linear-gradient(145deg,#fffdf7 0%,#fff2d5 48%,#edf6ee 100%)!important;border:2px solid rgba(201,154,50,.38)!important}.gaAuthMark{background:linear-gradient(145deg,#1c734b,#0c442e)!important;border-color:#efc969!important}.gaAuthBrandName{color:#175b3d!important}.gaAuthBrandTag,.gaAuthKicker{color:#a47625!important}.gaAuthIntro h2{color:#294536!important}.gaAuthPrimary{background:linear-gradient(135deg,#b77f18,#e0b95f)!important}.gaFaithNote{background:linear-gradient(135deg,#fff8e7,#edf6ee)!important;border-color:#e7d7b0!important}.gaGoogle{border-color:#ddcfad!important;background:#fffdf8!important}
.bottomNav,.mobileNav{background:rgba(255,252,244,.98)!important;border-top-color:rgba(201,154,50,.26)!important}.bottomNav .active,.mobileNav .active{color:#a87316!important}
`;document.head.appendChild(s)})();

/* ===== PROFESSIONAL STORY CARD v6 — media and text clearly separated ===== */
(function(){const s=document.createElement('style');s.id='guardian-story-professional-v6';s.textContent=`
.stories{display:flex!important;gap:18px!important;align-items:stretch!important;padding:4px 2px 12px!important}
.stories .story,.story{position:relative!important;overflow:hidden!important;border-radius:18px!important;min-height:184px!important;background:#fffdf8!important;border:1px solid #e3d5b7!important;box-shadow:0 8px 24px rgba(67,55,31,.09)!important;color:#403621!important}
/* uploaded/photo story: image occupies a clean media area, never behind the text */
.stories .story:not(.add),.story:not(.add){display:flex!important;flex-direction:column!important;background:#fffdf8!important;padding:0!important}
.stories .story:not(.add) .storyImage,.story:not(.add) .storyImage,.stories .story:not(.add) img{position:relative!important;inset:auto!important;width:100%!important;height:112px!important;min-height:112px!important;object-fit:cover!important;display:block!important;border-radius:17px 17px 0 0!important;filter:saturate(.92)!important}
.stories .story:not(.add) .storyShade,.story:not(.add) .storyShade{display:none!important}
.stories .story:not(.add) .storyContent,.story:not(.add) .storyContent{position:relative!important;inset:auto!important;display:flex!important;flex-direction:column!important;gap:6px!important;padding:12px 13px 14px!important;background:#fffdf8!important;color:#4a3c23!important;text-shadow:none!important;min-height:60px!important;justify-content:center!important}
.stories .story:not(.add) .storyContent *,.story:not(.add) .storyContent *{position:relative!important;color:#4a3c23!important;text-shadow:none!important}
/* text-only story: elegant ivory card with a distinct gold band */
.stories .story.textStory,.story.textStory{background:linear-gradient(145deg,#fffaf0,#f8edcf)!important;border:1px solid #d7b15b!important}
.stories .story.textStory .storyContent,.story.textStory .storyContent{padding:18px 15px!important;color:#5b4821!important;font-family:Georgia,serif!important;line-height:1.55!important}
.stories .story.textStory:before,.story.textStory:before{content:""!important;position:absolute!important;left:0!important;top:0!important;width:5px!important;height:100%!important;background:linear-gradient(180deg,#f0cc72,#b77f18)!important;z-index:2!important}
/* Add/upload card is clearly separated from stories */
.stories .story.add,.story.add{display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;background:#fffdf8!important;border:1px dashed #c99a32!important;color:#9a6b18!important;padding:14px!important;box-shadow:none!important}
.stories .story.add:before{position:relative!important;inset:auto!important;width:48px!important;height:48px!important;border-radius:14px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:linear-gradient(145deg,#e7c36e,#bd8926)!important;box-shadow:0 7px 16px rgba(173,126,37,.18)!important}
.stories .story.add:after{position:relative!important;display:block!important;color:#8f681e!important;font-size:12px!important;font-weight:700!important;letter-spacing:.01em!important}
/* Story text spacing */
.storyText,.storyMessage,.storyCaption{display:block!important;margin:0!important;padding:0!important;line-height:1.55!important;letter-spacing:.01em!important;white-space:normal!important;overflow-wrap:anywhere!important}
.storyAuthor{display:block!important;margin-top:7px!important;font-size:11px!important;font-weight:700!important;color:#9b752c!important}
.storyDate{display:block!important;margin-top:3px!important;font-size:10px!important;color:#948773!important}
@media(max-width:760px){.stories{gap:12px!important;padding-bottom:10px!important}.stories .story,.story{min-height:172px!important;border-radius:16px!important}.stories .story:not(.add) .storyImage,.story:not(.add) img{height:104px!important;min-height:104px!important}.stories .story:not(.add) .storyContent,.story:not(.add) .storyContent{padding:10px 11px 12px!important;line-height:1.5!important}}
`;document.head.appendChild(s)})();

/* ===== STORY REFINEMENT v7 — editorial, spacious, professional ===== */
(function(){const s=document.createElement('style');s.id='guardian-story-refinement-v7';s.textContent=`
/* desktop story rail */
.stories{display:grid!important;grid-auto-flow:column!important;grid-auto-columns:156px!important;grid-template-rows:220px!important;gap:16px!important;align-items:stretch!important;overflow-x:auto!important;overflow-y:hidden!important;padding:5px 4px 15px!important;scroll-snap-type:x proximity!important}
.stories .story,.story{width:156px!important;min-width:156px!important;height:220px!important;min-height:220px!important;flex:none!important;border-radius:20px!important;scroll-snap-align:start!important}
/* image and text are two deliberately separate visual zones */
.stories .story:not(.add),.story:not(.add){display:flex!important;flex-direction:column!important;justify-content:flex-start!important;background:#fffdf8!important;border:1px solid #dfcfaa!important;overflow:hidden!important}
.stories .story:not(.add) img,.story:not(.add) img{width:100%!important;height:108px!important;min-height:108px!important;object-fit:cover!important;display:block!important;border-radius:19px 19px 0 0!important;background:#efe8d9!important}
.stories .story:not(.add) .storyImage,.story:not(.add) .storyImage{width:100%!important;height:108px!important;min-height:108px!important;flex:0 0 108px!important;position:relative!important;border-radius:19px 19px 0 0!important;overflow:hidden!important;background:linear-gradient(135deg,#f2e5c6,#fffaf0)!important}
.stories .story:not(.add) .storyShade,.story:not(.add) .storyShade{display:none!important}
.stories .story:not(.add) .storyContent,.story:not(.add) .storyContent{position:relative!important;inset:auto!important;flex:1 1 auto!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;gap:0!important;padding:14px 14px 15px!important;background:#fffdf8!important;color:#443922!important;text-shadow:none!important;border-top:1px solid #eee4ce!important;overflow:hidden!important}
.stories .story:not(.add) .storyContent *,.story:not(.add) .storyContent *{position:relative!important;color:#443922!important;text-shadow:none!important;line-height:1.45!important}
.storyText,.storyMessage,.storyCaption{margin:0!important;padding:0!important;line-height:1.55!important;word-spacing:2px!important;letter-spacing:.005em!important;white-space:normal!important;overflow-wrap:anywhere!important}
.storyAuthor{margin:0 0 5px!important;font-size:12px!important;line-height:1.25!important;font-weight:800!important;color:#6c521f!important;letter-spacing:.01em!important}
.storyDate{margin:6px 0 0!important;font-size:10px!important;line-height:1.3!important;color:#9a8b72!important}
/* text-only story cards: no fake image/green background */
.stories .story.textStory,.story.textStory{background:linear-gradient(160deg,#fffaf0,#f8edcf)!important;border:1px solid #d7b15b!important}
.stories .story.textStory .storyContent,.story.textStory .storyContent{height:100%!important;border-top:0!important;padding:24px 18px!important;justify-content:center!important;font-family:Georgia,serif!important;font-size:14px!important;line-height:1.65!important;color:#5c471d!important}
.stories .story.textStory:before,.story.textStory:before{content:""!important;left:0!important;top:0!important;width:4px!important;height:100%!important;background:linear-gradient(180deg,#f1cf78,#b9821c)!important;z-index:3!important}
/* create-story tile */
.stories .story.add,.story.add{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:11px!important;background:linear-gradient(160deg,#fffdf8,#fbf2df)!important;border:1px dashed #c99a32!important;padding:20px 15px!important;color:#8e671d!important;box-shadow:none!important}
.stories .story.add:before{position:relative!important;inset:auto!important;width:52px!important;height:52px!important;flex:0 0 52px!important;border-radius:16px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:linear-gradient(145deg,#e9c56d,#bd8b2a)!important;color:#fff!important;box-shadow:0 8px 18px rgba(173,126,37,.18)!important}
.stories .story.add:after{position:relative!important;inset:auto!important;display:block!important;color:#9a6d1c!important;font-size:12px!important;font-weight:800!important;letter-spacing:.02em!important;text-align:center!important}
.stories .story.add>div{position:relative!important;inset:auto!important;margin:0!important;text-align:center!important;font-size:14px!important;line-height:1.55!important;color:#80632a!important}
@media(max-width:760px){.stories{grid-auto-columns:142px!important;grid-template-rows:202px!important;gap:12px!important;padding:4px 2px 12px!important}.stories .story,.story{width:142px!important;min-width:142px!important;height:202px!important;min-height:202px!important;border-radius:18px!important}.stories .story:not(.add) img,.story:not(.add) img,.stories .story:not(.add) .storyImage,.story:not(.add) .storyImage{height:96px!important;min-height:96px!important;flex-basis:96px!important;border-radius:17px 17px 0 0!important}.stories .story:not(.add) .storyContent,.story:not(.add) .storyContent{padding:12px 12px 13px!important}.storyAuthor{font-size:11px!important}.storyText,.storyMessage,.storyCaption{font-size:11px!important;line-height:1.5!important;word-spacing:1px!important}.storyDate{font-size:9px!important}}
`;document.head.appendChild(s)})();

/* ===== FINAL STORY + TODAY POLISH v8 ===== */
(function(){const s=document.createElement('style');s.id='guardian-story-final-v8';s.textContent=`
/* The story media class is .storyMedia in the actual renderer. Keep media and copy completely separate. */
.stories .story.community{display:flex!important;flex-direction:column!important;justify-content:flex-start!important;align-items:stretch!important;padding:0!important;background:#fffdf8!important;border:1px solid #decda8!important;border-radius:20px!important;overflow:hidden!important;color:#403722!important;text-align:left!important}
.stories .story.community .storyMedia{display:block!important;position:relative!important;width:100%!important;height:112px!important;min-height:112px!important;max-height:112px!important;object-fit:cover!important;margin:0!important;border:0!important;border-radius:19px 19px 0 0!important;background:#eee7d8!important;flex:0 0 112px!important}
.stories .story.community video.storyMedia{object-fit:cover!important}
.stories .story.community .storyShade{display:none!important;position:static!important}
.stories .story.community .storyContent{position:relative!important;inset:auto!important;left:auto!important;right:auto!important;bottom:auto!important;top:auto!important;width:auto!important;height:auto!important;min-height:91px!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:flex-start!important;gap:0!important;padding:12px 13px 13px!important;background:#fffdf8!important;border-top:1px solid #eee5d2!important;color:#403722!important;text-shadow:none!important;flex:1 1 auto!important;overflow:hidden!important}
.stories .story.community .storyContent .avatar{width:27px!important;height:27px!important;min-width:27px!important;min-height:27px!important;border:2px solid #e3c36f!important;margin:0 0 7px!important;align-self:flex-start!important}
.stories .story.community .storyContent>div:not(.avatar){font-family:Arial,sans-serif!important;font-size:12px!important;font-weight:800!important;line-height:1.25!important;color:#3e382b!important;margin:0 0 5px!important;white-space:nowrap!important;max-width:100%!important;overflow:hidden!important;text-overflow:ellipsis!important}
.stories .story.community .storyContent small{font-family:Arial,sans-serif!important;font-size:11px!important;font-weight:500!important;line-height:1.48!important;color:#766b58!important;white-space:normal!important;display:block!important;margin:0!important;max-height:34px!important;overflow:hidden!important}
/* text-only stories remain warm gold/ivory, never green */
.stories .story.textStory .storyContent{background:linear-gradient(160deg,#fffaf0,#f7e9c9)!important}
/* Create Story: clean and centered */
.stories .story.add{width:156px!important;min-width:156px!important;background:linear-gradient(160deg,#fffdf9,#fbf2df)!important;border:1px dashed #c99a32!important;border-radius:20px!important;box-shadow:none!important;text-align:center!important}
.stories .story.add>div{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:7px!important;margin:0!important;padding:0!important;color:#7d6127!important}
.stories .story.add>div>div{margin:0!important;font-size:14px!important;line-height:1.25!important;font-weight:850!important;color:#8f691d!important}
.stories .story.add small{font-size:11px!important;line-height:1.4!important;color:#91836d!important}
/* Fix the welcome reminder: deliberate spacing between label and message */
.todayCard{display:flex!important;align-items:center!important;gap:10px!important;padding:10px 14px!important;white-space:nowrap!important}
.todayCard b{display:inline-flex!important;align-items:center!important;gap:5px!important;line-height:1.2!important;color:#9a6d1b!important;flex:0 0 auto!important}
.todayCard span{display:inline-block!important;margin-left:2px!important;padding-left:10px!important;border-left:1px solid #e6d6b5!important;line-height:1.35!important;color:#4e4738!important;letter-spacing:.005em!important}
@media(max-width:760px){
.stories .story.community .storyMedia{height:96px!important;min-height:96px!important;max-height:96px!important;flex-basis:96px!important}
.stories .story.community .storyContent{min-height:82px!important;padding:10px 11px 11px!important}
.stories .story.community .storyContent .avatar{width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;margin-bottom:6px!important}
.stories .story.community .storyContent>div:not(.avatar){font-size:11px!important;margin-bottom:4px!important}
.stories .story.community .storyContent small{font-size:10px!important;line-height:1.45!important;max-height:30px!important}
.todayCard{gap:7px!important;padding:8px 10px!important;white-space:normal!important}.todayCard b{font-size:11px!important}.todayCard span{padding-left:7px!important;font-size:11px!important}
}
`;document.head.appendChild(s)})();
