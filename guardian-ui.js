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
