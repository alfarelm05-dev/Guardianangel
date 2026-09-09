/* Guardian Angel — clean presentation layer
   Mobile-first visual system. No DOM rewriting, observers, or runtime layout mutations. */
(function(){
  const style=document.createElement('style');
  style.id='guardian-angel-clean-ui';
  style.textContent=`
:root{--ga-green:#087a45;--ga-deep:#064d32;--ga-mint:#eaf8f1;--ga-gold:#d8a84e;--ga-ink:#14201a}
body{background:radial-gradient(circle at 8% 0%,#e7f7ee 0,transparent 28%),radial-gradient(circle at 92% 18%,rgba(216,168,78,.08),transparent 22%),#eef4f1!important}
.brandMark{background:linear-gradient(145deg,#13a663,#087a45 58%,#064d32)!important;box-shadow:0 8px 22px rgba(8,122,69,.22),0 0 0 3px rgba(216,168,78,.12)!important}
.brandName{color:#075b37!important}
.layout{padding-top:24px!important}
.homeHero{background:linear-gradient(135deg,#fff,#f1faf5 58%,#e1f3e9)!important;border:1px solid #cfe5d8!important;box-shadow:0 14px 38px rgba(8,122,69,.10)!important}
.sectionHead h3{display:flex;align-items:center;gap:7px}
.sectionHead h3:before{content:"";width:6px;height:20px;border-radius:99px;background:linear-gradient(180deg,var(--ga-gold),var(--ga-green))}
.story{background:linear-gradient(160deg,#075d39,#18a565 62%,#70d19c)!important;box-shadow:0 12px 25px rgba(12,61,40,.13)!important}
.story.add{background:linear-gradient(160deg,#fffdf7,#f4f9f5)!important;border-color:#e1d2a7!important}
.composerCard,.post{border-color:#dce9e2!important;box-shadow:0 12px 30px rgba(15,62,39,.07)!important}
.post{overflow:hidden}
.actions button:hover{background:var(--ga-mint)!important;color:var(--ga-green)!important}
button,a,[role=button],input,textarea{-webkit-tap-highlight-color:transparent}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid rgba(216,168,78,.28);outline-offset:2px}

@media(max-width:760px){
  html,body{width:100%;overflow-x:hidden!important}
  body{padding-bottom:94px!important}
  header{
    position:sticky!important;top:0!important;z-index:120!important;
    width:100%!important;height:74px!important;min-height:74px!important;max-height:74px!important;
    padding:8px 12px!important;display:flex!important;align-items:center!important;
    gap:0!important;overflow:hidden!important;border:0!important;border-radius:0 0 20px 20px!important;
    background:linear-gradient(135deg,#087a45,#079455)!important;
    box-shadow:0 8px 24px rgba(6,77,50,.16)!important;
  }
  .brand{min-width:0!important;flex:1 1 auto!important;height:58px!important;gap:9px!important;overflow:hidden!important}
  .brandMark{width:46px!important;height:46px!important;min-width:46px!important;flex:0 0 46px!important;border-radius:50%!important;padding:2px!important;background:#075d39!important;border:2px solid rgba(255,239,169,.82)!important;box-shadow:0 5px 16px rgba(0,0,0,.18)!important}
  .brand>div:last-child{min-width:0!important;max-width:140px!important}
  .brandName{color:#fff!important;font-family:Georgia,serif!important;font-size:18px!important;line-height:1.05!important;font-weight:900!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .brandTag,.topSearch{display:none!important}
  .topActions{height:58px!important;flex:0 0 auto!important;gap:4px!important;margin:0!important;display:flex!important;align-items:center!important}
  .topActions>.iconBtn:first-child{display:none!important}
  .topActions>.iconBtn{display:grid!important;place-items:center!important;width:34px!important;height:34px!important;min-width:34px!important;flex:0 0 34px!important;padding:0!important;border-radius:11px!important;color:#fff!important;background:rgba(255,255,255,.08)!important}
  #userArea{width:62px!important;min-width:62px!important;max-width:62px!important;height:36px!important;margin-left:2px!important;overflow:hidden!important;display:flex!important;align-items:center!important}
  #userArea>*{display:none!important}
  #userArea button{display:flex!important;align-items:center!important;justify-content:center!important;width:62px!important;min-width:62px!important;height:36px!important;margin:0!important;padding:0 6px!important;border-radius:12px!important;font-size:9px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;color:#fff!important;background:rgba(255,255,255,.13)!important;border:1px solid rgba(255,255,255,.24)!important;box-shadow:none!important}
  .layout{display:block!important;width:100%!important;margin:0!important;padding:14px 12px 112px!important}
  .layout>nav{
    position:fixed!important;left:10px!important;right:10px!important;bottom:9px!important;top:auto!important;z-index:350!important;
    width:auto!important;height:72px!important;margin:0!important;padding:5px!important;
    display:flex!important;align-items:center!important;justify-content:space-between!important;gap:2px!important;
    overflow:hidden!important;border:1px solid rgba(216,168,78,.28)!important;border-radius:24px!important;
    background:rgba(255,255,255,.98)!important;box-shadow:0 14px 38px rgba(13,52,36,.20)!important;backdrop-filter:blur(16px)!important;
  }
  .layout>nav .navbtn{
    flex:1 1 0!important;width:auto!important;min-width:0!important;height:60px!important;min-height:0!important;
    margin:0!important;padding:4px 1px!important;border-radius:17px!important;
    display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;
    text-align:center!important;white-space:nowrap!important;overflow:hidden!important;font-size:8px!important;
  }
  .layout>nav .navIcon{width:31px!important;height:31px!important;min-width:31px!important;flex:0 0 31px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#f0f4f2!important}
  .layout>nav .navIcon svg{width:20px!important;height:20px!important}
  .layout>nav .navbtn.active{background:linear-gradient(145deg,#edf9f3,#fffaf0)!important;box-shadow:inset 0 0 0 1px rgba(216,168,78,.28)!important;color:var(--ga-green)!important}
  .layout>nav .navbtn.active .navIcon{background:var(--ga-green)!important;color:#fff!important}
  .layout>nav .navbtn span:not(.navIcon){font-size:8px!important;line-height:1!important;max-width:100%!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .homeHero{margin:0 0 18px!important;padding:16px!important;min-height:154px!important;border-radius:22px!important}
  .homeHero .welcome{min-height:120px!important;gap:12px!important}
  .welcomeAvatar{width:60px!important;height:60px!important;min-width:60px!important;flex:0 0 60px!important;border-radius:50%!important;padding:2px!important;border:2px solid #fff!important;box-shadow:0 0 0 1px #b9dfc9,0 8px 18px rgba(8,122,69,.13)!important}
  .welcomeName{font-family:Georgia,serif!important;font-size:18px!important;line-height:1.2!important}
  .quote{font-size:10px!important;line-height:1.45!important}
  .todayCard{display:none!important}
  .sectionHead{margin:17px 2px 8px!important;align-items:center!important}
  .sectionHead h3{font-family:Georgia,serif!important;font-size:20px!important}
  .sectionDesc{font-size:10px!important}
  .stories{gap:10px!important;padding:2px 0 8px!important;overflow-x:auto!important;scrollbar-width:none!important}
  .stories::-webkit-scrollbar{display:none!important}
  .story{width:126px!important;min-width:126px!important;height:186px!important;flex:0 0 126px!important;border-radius:20px!important}
  .story.add{padding:13px!important}
  .story.add:before{top:13px!important;left:13px!important;width:40px!important;height:40px!important;border-radius:13px!important;font-size:27px!important}
  .story.add:after{top:62px!important;left:13px!important;font-size:10px!important}
  .story.add>div{left:13px!important;right:10px!important;bottom:13px!important;font-size:16px!important;line-height:1.4!important}
  .storyContent{padding:11px!important;font-size:12px!important}
  .storyContent small{font-size:9px!important}
  .composerCard{padding:15px!important;border-radius:21px!important}
  .composerCard:before{display:none!important}
  .composerTop{gap:10px!important}
  .composer textarea{min-height:90px!important;margin-top:11px!important;padding:13px!important;border-radius:16px!important;font-size:14px!important}
  .composerTools{grid-template-columns:1fr 1fr 1.1fr!important;gap:7px!important;margin-top:8px!important}
  .toolBtn,.primary,.ghost{min-height:46px!important;border-radius:13px!important;font-size:10px!important;padding:8px 6px!important}
  .post{border-radius:21px!important;margin-bottom:13px!important}
  .posthead{padding:14px 14px 0!important}
  .postbody{padding:0 14px!important;font-size:13px!important}
  .actions{padding:5px!important}
  .actions button{min-height:42px!important;font-size:10px!important}
}
@media(max-width:390px){
  header{height:68px!important;min-height:68px!important;max-height:68px!important;padding:7px 9px!important}
  .brandMark{width:42px!important;height:42px!important;min-width:42px!important;flex-basis:42px!important}
  .brandName{font-size:16px!important}
  .topActions{gap:2px!important}
  .topActions>.iconBtn{width:31px!important;height:31px!important;min-width:31px!important;flex-basis:31px!important}
  #userArea,#userArea button{width:59px!important;min-width:59px!important;max-width:59px!important}
  #userArea button{height:34px!important}
  .layout{padding-left:9px!important;padding-right:9px!important}
  .homeHero{padding:14px!important;min-height:148px!important}
  .welcomeAvatar{width:56px!important;height:56px!important;min-width:56px!important;flex-basis:56px!important}
  .story{width:120px!important;min-width:120px!important;height:180px!important}
  .layout>nav{left:7px!important;right:7px!important;bottom:7px!important;height:70px!important}
}
`;
  document.head.appendChild(style);
})();