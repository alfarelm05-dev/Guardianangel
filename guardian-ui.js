/* Guardian Angel — stable visual system
   Intentionally CSS-first: no MutationObserver and no DOM rewriting.
   Existing application event handlers and Supabase logic remain untouched. */
(function(){
  if(window.__GA_UI_LOADED)return;
  window.__GA_UI_LOADED=true;

  const style=document.createElement('style');
  style.id='guardian-angel-ui';
  style.textContent=`
/* ---------- desktop shell ---------- */
header{
  display:grid!important;
  grid-template-columns:230px minmax(180px,1fr) auto!important;
  align-items:center!important;
  gap:16px!important;
}
.brand{min-width:0!important;width:230px!important;overflow:hidden!important}
.brand>div:last-child{min-width:0!important;overflow:hidden!important}
.brandName,.brandTag{display:block!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
.topSearch{min-width:0!important;max-width:none!important}
.topActions{min-width:max-content!important;margin-left:0!important;display:flex!important;align-items:center!important;gap:5px!important;white-space:nowrap!important}
#userArea{display:flex!important;align-items:center!important;min-width:0!important;flex:0 0 auto!important}
#userArea button{white-space:nowrap!important}
.iconBtn{flex:0 0 40px!important}

/* ---------- navigation ---------- */
.layout>nav .navIcon{transition:transform .18s ease,box-shadow .18s ease}
.layout>nav .navbtn:nth-child(1) .navIcon{color:#087a46!important}
.layout>nav .navbtn:nth-child(2) .navIcon{color:#a35a32!important}
.layout>nav .navbtn:nth-child(3) .navIcon{color:#2869a8!important}
.layout>nav .navbtn:nth-child(4) .navIcon{color:#7652a8!important}
.layout>nav .navbtn:nth-child(5) .navIcon{color:#c27b16!important}
.layout>nav .navbtn:nth-child(6) .navIcon{color:#357b68!important}
.layout>nav .navbtn:nth-child(7) .navIcon{color:#6b4b9b!important}
.layout>nav .navbtn.active .navIcon{color:#fff!important}
.layout>nav .navbtn:hover .navIcon{transform:translateY(-1px)}

/* ---------- social actions ---------- */
.actions{display:flex!important;align-items:center!important;gap:3px!important;padding:5px 8px!important}
.actions button{
  display:flex!important;align-items:center!important;justify-content:center!important;
  gap:6px!important;min-height:42px!important;border-radius:11px!important;
  font-weight:800!important;white-space:nowrap!important
}

/* ---------- comments ---------- */
.commentsInline{background:#fafcfb!important;border-top:1px solid #e1e9e4!important}
.commentLine{align-items:flex-start!important}
.commentBubble{background:#edf2ef!important;border-radius:5px 15px 15px 15px!important;padding:8px 10px!important}
.commentName{display:block!important;margin-bottom:2px!important;font-weight:900!important}
.commentForm{display:flex!important;align-items:center!important;gap:6px!important}
.commentForm input{height:40px!important;border-radius:999px!important;padding:0 14px!important}
.commentForm button{height:40px!important;min-width:68px!important;border-radius:999px!important;background:#0b7a45!important;color:#fff!important;border:0!important;font-weight:900!important}

/* ---------- messenger ---------- */
.message-list{
  border:1px solid #dfe8e2!important;border-radius:18px!important;
  background:linear-gradient(180deg,#f9fbfa,#eef5f1)!important;
  padding:14px!important;gap:9px!important
}
.bubble{max-width:82%!important;font-size:13px!important;padding:10px 13px!important;border-radius:16px 16px 16px 5px!important}
.bubble.mine{background:#0b7a45!important;color:#fff!important;border-radius:16px 16px 5px 16px!important}

/* ---------- safe visual polish ---------- */
.card{box-shadow:0 10px 30px rgba(15,62,39,.065)!important}
.primary{transition:transform .16s ease,box-shadow .16s ease!important}
.primary:active,.ghost:active,.iconBtn:active,.navbtn:active{transform:scale(.98)!important}

/* ---------- mobile-first layout ---------- */
@media(max-width:760px){
  body{padding-bottom:88px!important;overflow-x:hidden}
  header{
    height:62px!important;padding:0 8px!important;gap:5px!important;
    grid-template-columns:minmax(0,1fr) auto!important
  }
  .brand{width:auto!important;min-width:0!important;gap:8px!important}
  .brandMark{width:37px!important;height:37px!important;flex:0 0 37px!important;border-radius:11px!important}
  .brandName{font-size:16px!important;line-height:1.05!important}
  .brandTag,.topSearch{display:none!important}
  .topActions{gap:2px!important;min-width:0!important}
  .iconBtn{width:35px!important;height:35px!important;flex-basis:35px!important;border-radius:10px!important}
  /* Home is already present in the bottom navigation; reclaim header space. */
  .topActions>.iconBtn:first-child{display:none!important}
  #userArea{max-width:88px!important;overflow:hidden!important}
  #userArea button{max-width:88px!important;min-height:35px!important;padding:7px 9px!important;font-size:10px!important;overflow:hidden!important;text-overflow:ellipsis!important}

  .layout{display:block!important;width:100%!important;padding:8px 6px 100px!important}
  .layout>main{min-width:0!important}
  .layout>aside.right{display:none!important}

  /* Floating bottom navigation is the only persistent mobile navigation. */
  .layout>nav{
    position:fixed!important;left:6px!important;right:6px!important;bottom:6px!important;top:auto!important;
    z-index:350!important;display:flex!important;align-items:stretch!important;gap:2px!important;
    padding:5px!important;border:1px solid rgba(20,40,30,.10)!important;border-radius:19px!important;
    background:rgba(255,255,255,.97)!important;box-shadow:0 12px 34px rgba(20,35,28,.20)!important;
    backdrop-filter:blur(15px)!important;overflow-x:auto!important;scrollbar-width:none!important
  }
  .layout>nav::-webkit-scrollbar{display:none}
  .layout>nav .navbtn{
    flex:1 0 58px!important;width:auto!important;min-width:58px!important;min-height:50px!important;
    margin:0!important;padding:4px 2px!important;border-radius:13px!important;
    display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;
    gap:3px!important;text-align:center!important;font-size:9px!important;line-height:1.1!important
  }
  .layout>nav .navbtn.active{background:#eaf8f0!important;box-shadow:none!important}
  .layout>nav .navIcon{width:28px!important;height:28px!important;flex-basis:28px!important;border-radius:10px!important;background:#f0f4f1!important}
  .layout>nav .navbtn.active .navIcon{background:#0b7a45!important;box-shadow:0 5px 13px rgba(11,122,69,.20)!important}
  .layout>nav .navLabel{max-width:62px!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}

  .card{padding:12px!important;border-radius:17px!important}
  .homeHero{padding:14px!important;margin-bottom:12px!important}
  .welcome{gap:10px!important}
  .welcomeAvatar{width:50px!important;height:50px!important;flex-basis:50px!important}
  .welcomeName{font-size:17px!important}
  .quote{font-size:9px!important}
  .todayCard{display:none!important}

  .sectionHead{margin:13px 1px 7px!important}
  .sectionHead h3{font-size:15px!important}
  .sectionDesc{font-size:9px!important}
  .stories{gap:7px!important;padding-bottom:6px!important}
  .story{min-width:94px!important;width:94px!important;height:148px!important;flex-basis:94px!important;border-radius:16px!important}

  .composerCard{padding:12px!important}
  .composer textarea{font-size:16px!important;min-height:66px!important;margin-top:8px!important}
  .composerTools{grid-template-columns:1fr 1fr 1.12fr!important;gap:5px!important}
  .toolBtn,.primary,.ghost{min-height:42px!important;font-size:10px!important;padding:8px 7px!important}

  .post{margin-bottom:10px!important;border-radius:17px!important}
  .posthead{padding:12px 11px 0!important}
  .postbody{padding:0 11px!important;font-size:13px!important;line-height:1.55!important;margin:9px 0!important}
  .actions{overflow-x:auto!important;scrollbar-width:none!important;padding:5px 7px!important}
  .actions::-webkit-scrollbar{display:none}
  .actions button{flex:1 0 auto!important;min-width:70px!important;font-size:10px!important}

  .commentsInline{padding:9px 10px!important}
  .commentBubble{font-size:12px!important;max-width:calc(100% - 45px)!important}
  .commentForm input{font-size:16px!important}

  .friendGrid{grid-template-columns:1fr!important;gap:8px!important}
  .friendCard{padding:12px!important}
  .filterRow{display:block!important}
  .filterRow>*{margin-bottom:6px!important}

  .message-list{min-height:48vh!important;max-height:62vh!important;padding:10px!important;border-radius:16px!important}
  .bubble{max-width:86%!important;font-size:13px!important;padding:10px 12px!important}

  .profileCover{height:155px!important}
  .profileHead{padding:0 13px 13px!important}
  .profileAvatar{width:90px!important;height:90px!important;flex-basis:90px!important;margin-top:-45px!important}
  .profileName{font-size:22px!important}
  .profileTabs{overflow-x:auto!important;scrollbar-width:none!important}
  .profileTabs::-webkit-scrollbar{display:none}

  .dialog{width:100%!important;max-height:calc(100vh - 20px)!important;padding:15px!important;border-radius:18px!important}
  .authField input,.googleBtn{height:46px!important;font-size:16px!important}
}

@media(max-width:380px){
  .brandName{font-size:15px!important}
  .iconBtn{width:33px!important;flex-basis:33px!important}
  #userArea{max-width:78px!important}
  #userArea button{max-width:78px!important;padding-left:7px!important;padding-right:7px!important}
  .layout{padding-left:4px!important;padding-right:4px!important}
  .layout>nav{left:4px!important;right:4px!important}
  .layout>nav .navbtn{min-width:54px!important;flex-basis:54px!important;font-size:8px!important}
  .story{min-width:88px!important;width:88px!important;flex-basis:88px!important}
}
`;
  document.head.appendChild(style);
})();