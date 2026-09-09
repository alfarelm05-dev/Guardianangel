/* Guardian Angel — production UX polish
   CSS-first, event-safe, no DOM rewriting. */
(function(){
  if(window.__GA_SIGNATURE_LOADED)return;
  window.__GA_SIGNATURE_LOADED=true;
  const style=document.createElement('style');
  style.id='guardian-angel-signature';
  style.textContent=`
:root{--ga-green:#087a45;--ga-deep:#064d32;--ga-mint:#eaf8f1;--ga-gold:#d8a84e;--ga-gold-soft:#fff7df;--ga-ink:#14201a;--ga-shadow:0 18px 48px rgba(13,61,40,.11)}
body{background:radial-gradient(circle at 8% 0%,#e4f7ed 0,transparent 27%),radial-gradient(circle at 92% 18%,rgba(216,168,78,.10),transparent 20%),#eef3f1!important}
body:after{content:"";position:fixed;inset:0;pointer-events:none;z-index:-1;background-image:radial-gradient(circle,rgba(8,122,69,.08) 1px,transparent 1px);background-size:34px 34px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.32),transparent 72%)}
header{box-shadow:0 8px 30px rgba(8,72,44,.08)!important}
.brand{position:relative}.brandMark{background:linear-gradient(145deg,#13a663,#087a45 55%,#064d32)!important;box-shadow:0 10px 30px rgba(8,122,69,.28),0 0 0 5px rgba(216,168,78,.10)!important}.brandMark:before{content:"";position:absolute;inset:-6px;border:1px solid rgba(216,168,78,.42);border-radius:20px;transform:rotate(7deg)}.brandName{color:#075b37!important}.brandTag{color:#9a875e!important}
.layout{padding-top:30px!important}.navbtn{position:relative}.navbtn.active:after{content:"";position:absolute;right:-5px;width:5px;height:24px;border-radius:99px;background:linear-gradient(#d8a84e,#087a45);box-shadow:0 0 14px rgba(216,168,78,.45)}.navIcon{position:relative}.navbtn.active .navIcon:after{content:"";position:absolute;inset:-3px;border:1px solid rgba(216,168,78,.45);border-radius:15px}
.homeHero{min-height:156px!important;background:linear-gradient(135deg,#fff 0%,#f2fbf6 53%,#dcefe4 100%)!important;border:1px solid #cfe5d8!important;box-shadow:0 18px 48px rgba(8,122,69,.13)!important}.homeHero:before{content:"✦  ✧  ✦"!important;right:24px!important;top:16px!important;font-size:25px!important;color:rgba(216,168,78,.42)!important;letter-spacing:10px}.homeHero:after{width:270px!important;height:270px!important;right:-140px!important;bottom:-160px!important;background:radial-gradient(circle,rgba(8,122,69,.18),rgba(216,168,78,.05) 42%,transparent 68%)!important}.homeHero .welcome{min-height:116px}.welcomeAvatar{position:relative;background:linear-gradient(145deg,#f5fffa,#ccebd9)!important;border:3px solid #fff;box-shadow:0 0 0 1px #b9dfc9,0 12px 25px rgba(8,122,69,.15)!important}.welcomeName:before{content:"✦";display:inline-block;margin-right:6px;color:var(--ga-gold);font-size:13px}
.sectionHead h3{display:flex;align-items:center;gap:7px}.sectionHead h3:before{content:"";width:7px;height:20px;border-radius:99px;background:linear-gradient(180deg,var(--ga-gold),var(--ga-green));box-shadow:0 0 12px rgba(216,168,78,.25)}
.stories{padding-top:4px!important}.story{border:1px solid rgba(255,255,255,.26)!important;box-shadow:0 15px 32px rgba(12,61,40,.17)!important;background:linear-gradient(160deg,#075d39,#18a565 60%,#7bd5a4)!important}.story:before{content:"✦";position:absolute;z-index:3;top:9px;right:10px;width:25px;height:25px;border:1px solid rgba(255,255,255,.38);border-radius:50%;display:grid;place-items:center;font-size:11px;color:#fff;background:rgba(255,255,255,.12)}.story.add{background:linear-gradient(160deg,#fff,#f8f0d9 130%)!important;border-color:#e6d3a3!important}.story.add:before{content:"✦"!important;background:linear-gradient(145deg,#d8a84e,#087a45)!important;color:#fff!important}.story.add:after{color:#896b31!important}
.composerCard{position:relative;border:1px solid #dbe9e1!important;box-shadow:var(--ga-shadow)!important}.composerCard:before{content:"GUARDIAN MOMENT";position:absolute;right:16px;top:13px;font-size:8px;letter-spacing:1.4px;font-weight:950;color:#b09357}.composer textarea{background:linear-gradient(145deg,#f3f7f5,#fff)!important;border-color:#e5ece8!important}.toolBtn:first-child:before{content:"✦";margin-right:5px;color:var(--ga-gold)}
.post{position:relative!important;box-shadow:0 13px 36px rgba(20,50,36,.085)!important}.post:before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:3px;border-radius:0 5px 5px 0;background:linear-gradient(180deg,var(--ga-gold),var(--ga-green),transparent);opacity:.7;z-index:4}.posthead{padding-left:20px!important}.actions button:hover{background:linear-gradient(135deg,#edf9f2,#fff8e7)!important;color:var(--ga-green)!important}.commentBubble{background:linear-gradient(145deg,#eef5f1,#f8f4e8)!important;border:1px solid #e3e9e5}
.right .card{position:relative;overflow:hidden}.right .card:first-child{background:linear-gradient(145deg,#fff,#f1faf5 62%,#fff8e8)!important}.right .card:first-child:after{content:"✦";position:absolute;right:-5px;bottom:-20px;font-size:90px;color:rgba(216,168,78,.09)}.sideIcon{background:linear-gradient(145deg,#eaf8f1,#fff7df)!important;color:#9a762d!important;border:1px solid #ead9ad}
.friendCard{position:relative;overflow:hidden}.friendCard:after{content:"✦";position:absolute;right:9px;top:7px;color:rgba(216,168,78,.5);font-size:12px}.friendAvatar{border:2px solid #fff;box-shadow:0 0 0 1px #c9e4d4,0 8px 18px rgba(8,122,69,.12)}
.message-list{background:radial-gradient(circle at 10% 0%,#fff,#eef6f2 55%,#f8f4e8)!important;border-color:#d5e5dc!important}.bubble.mine{background:linear-gradient(145deg,#087a45,#075d39)!important}.bubble.mine:after{content:"✦";margin-left:7px;color:#f5d88e;font-size:9px}
.profileCover{background:radial-gradient(circle at 78% 18%,#80ddb0 0,#168a52 40%,#064d32 100%)!important}.profileCover:before{content:"";position:absolute;width:340px;height:180px;left:-70px;bottom:-120px;border:1px solid rgba(255,255,255,.18);border-radius:50%;transform:rotate(-12deg);box-shadow:0 0 0 16px rgba(255,255,255,.035),0 0 0 34px rgba(216,168,78,.05)}.profileCover:after{content:"✦  ✧  ✦"!important;color:rgba(255,255,255,.2)!important;letter-spacing:12px!important}.profileAvatar{position:relative;border-color:#fff!important;box-shadow:0 0 0 2px rgba(216,168,78,.55),0 12px 30px rgba(8,65,40,.23)!important}.profileName:before{content:"✦";color:var(--ga-gold);font-size:15px;margin-right:7px}
.dialog{border:1px solid #e0e9e4!important;box-shadow:0 30px 90px rgba(7,40,24,.28)!important}.authLogoMark{background:linear-gradient(145deg,#0a9858,#075d39)!important;box-shadow:0 0 0 4px rgba(216,168,78,.11),0 10px 24px rgba(8,122,69,.2)}.googleBtn:hover{border-color:#c8dfd1;box-shadow:0 7px 18px rgba(20,50,36,.07)}
.ga-float{background:linear-gradient(135deg,#0b9858,#075d39)!important;box-shadow:0 0 0 4px rgba(216,168,78,.12),0 14px 32px rgba(8,87,50,.28)!important}.ga-float:before{content:"✦";color:#f5d88e;margin-right:6px}
/* Interaction polish */
button,a,[role=button],input,textarea{ -webkit-tap-highlight-color:transparent }
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid rgba(216,168,78,.34);outline-offset:2px}
.primary{min-height:44px!important;box-shadow:0 10px 22px rgba(8,122,69,.20)!important}.primary:hover{transform:translateY(-1px);filter:saturate(1.05)}
.actions button{transition:background .16s ease,color .16s ease,transform .16s ease}.actions button:active,.toolBtn:active,.primary:active,.ghost:active,.iconBtn:active{transform:scale(.97)}
.commentForm{align-items:center}.commentForm input{min-height:42px!important}.commentForm button{min-height:42px!important}
.message-list{scroll-behavior:smooth}
/* Keep the shell clean on narrow phones */
@media(max-width:760px){
 body{padding-bottom:88px;overflow-x:hidden}.layout{padding-top:10px!important;padding-left:7px!important;padding-right:7px!important}.homeHero{min-height:132px!important;padding:14px!important;border-radius:19px!important}.homeHero .welcome{min-height:100px}.homeHero:before{right:10px!important;top:8px!important;font-size:19px!important}.todayCard{font-size:9px!important;padding:7px 9px!important}.welcomeName{font-size:18px!important}.composerCard{padding:12px!important}.composerCard:before{display:none}.composerTools{grid-template-columns:1fr 1fr 1.15fr!important;gap:5px!important}.toolBtn{min-height:43px!important;font-size:10px!important;padding:7px 5px!important}.post{margin-bottom:10px!important;border-radius:17px!important}.post:before{top:13px;bottom:13px}.posthead{padding-left:18px!important}.postbody{font-size:13px!important;line-height:1.55!important}.actions{position:relative;padding:5px!important}.actions button{min-height:43px!important;font-size:11px!important}.commentsInline{padding:9px!important}.commentBubble{font-size:11px!important}.friendGrid{grid-template-columns:1fr 1fr!important;gap:7px!important}.friendCard{padding:10px!important;border-radius:15px!important}.friendAvatar{width:48px;height:48px}.profileCover{height:165px!important}.profileHead{padding:0 13px 13px!important}.profileName{font-size:21px!important}.profileAvatar{width:88px!important;height:88px!important;flex-basis:88px!important;margin-top:-44px!important}.dialog{border-radius:18px!important;padding:15px!important;max-height:90vh!important}
 .layout>nav{left:6px;right:6px;bottom:6px;top:auto;z-index:350;display:flex;gap:3px;padding:5px;overflow:hidden;border:1px solid rgba(216,168,78,.24);border-radius:20px;background:rgba(255,255,255,.96);box-shadow:0 14px 38px rgba(20,35,28,.20);backdrop-filter:blur(18px)}
 .layout>nav .navbtn{flex:1 1 0;width:auto;min-width:0;min-height:52px;margin:0;padding:4px 1px;border-radius:14px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:3px;text-align:center;font-size:8px;white-space:nowrap;overflow:hidden}.layout>nav .navbtn span:not(.navIcon){max-width:100%;overflow:hidden;text-overflow:ellipsis}.layout>nav .navbtn.active{box-shadow:inset 0 0 0 1px rgba(216,168,78,.32)!important;background:linear-gradient(145deg,#edf9f3,#fffaf0)!important}.layout>nav .navIcon{width:29px;height:29px;flex-basis:29px}.navbtn.active:after{display:none}.bottomNav{box-shadow:0 -10px 35px rgba(20,45,33,.14)!important}
}
@media(min-width:761px){.layout>nav .navbtn:hover{padding-left:12px}.right .card{border-radius:18px}}
@media(prefers-reduced-motion:no-preference){.brandMark,.homeHero,.story,.friendCard,.post{transition:transform .25s ease,box-shadow .25s ease}.brandMark:hover{transform:rotate(-2deg) scale(1.025)}.homeHero:hover{box-shadow:0 22px 55px rgba(8,122,69,.16)}.story:hover,.friendCard:hover{transform:translateY(-4px)}.post:hover{transform:translateY(-2px)}}
`;
  document.head.appendChild(style);
})();
(function(){
  const gaIcon = (kind) => {
    const common='viewBox="0 0 24 24" aria-hidden="true"';
    const icons={
      home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
      prayer:'<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z"/><path d="M12 7v7M9 11h6"/>',
      friends:'<circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3.5 19c.5-3 2.4-4.5 5.5-4.5s5 1.5 5.5 4.5"/><path d="M14 15.2c2.8-.4 5 .9 6 3.8"/>',
      chat:'<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.4-3.4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/>',
      bell:'<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
      profile:'<circle cx="12" cy="8" r="3.5"/><path d="M4.5 21c.7-4 3.2-6 7.5-6s6.8 2 7.5 6"/>'
    };
    return '<svg class="ga-nav-svg" '+common+'>'+icons[kind]+'</svg>';
  };
  const emblem = '<svg class="ga-emblem" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="gaG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#23a968"/><stop offset=".55" stop-color="#087a45"/><stop offset="1" stop-color="#064d32"/></linearGradient><linearGradient id="gaGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#d8a84e"/><stop offset="1" stop-color="#fff2a6"/></linearGradient></defs><circle cx="50" cy="50" r="47" fill="url(#gaG)" stroke="url(#gaGold)" stroke-width="3"/><ellipse cx="50" cy="25" rx="18" ry="7" fill="none" stroke="url(#gaGold)" stroke-width="4"/><path d="M49 43c-7-12-20-18-29-16 7 7 12 15 13 23-7-3-14-2-20 2 10 4 18 10 23 18 5-9 10-17 13-27Z" fill="#fff" opacity=".96"/><path d="M51 43c7-12 20-18 29-16-7 7-12 15-13 23 7-3 14-2 20 2-10 4-18 10-23 18-5-9-10-17-13-27Z" fill="#fff" opacity=".96"/><path d="M50 38c-10 0-18 7-18 17 0 12 10 21 18 30 8-9 18-18 18-30 0-10-8-17-18-17Z" fill="none" stroke="#a9ed63" stroke-width="4"/><path d="M50 48v22M41 59h18" stroke="#fff7b0" stroke-width="4" stroke-linecap="round"/><path d="M34 78c6 4 11 9 16 16 5-7 10-12 16-16" fill="none" stroke="url(#gaGold)" stroke-width="3"/></svg>';
  const style=document.createElement('style');
  style.id='ga-final-mobile-shell';
  style.textContent=`
    :root{--ga-green:#087a45;--ga-deep:#064d32;--ga-mint:#eaf8f1;--ga-gold:#d8a84e}
    .ga-emblem{width:100%;height:100%;display:block}
    .brandMark{display:grid!important;place-items:center!important;overflow:visible!important}
    .brandMark .icon{display:none!important}
    .brandMark{background:linear-gradient(145deg,#0b8b50,#064d32)!important;border:2px solid rgba(216,168,78,.8)!important}
    .ga-nav-svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
    .navIcon{font-size:0!important}
    .navIcon .ga-nav-svg{width:22px;height:22px}
    .mobileGreetingMark{width:54px;height:54px;flex:0 0 54px;border-radius:50%;padding:2px;background:linear-gradient(145deg,#fff4bd,#087a45);box-shadow:0 0 0 2px #fff,0 8px 20px rgba(8,122,69,.16)}
    @media(max-width:760px){
      body{background:linear-gradient(180deg,#eef8f3 0,#f5f8f6 38%,#f3f6f4 100%)!important;padding-bottom:94px!important}
      header{height:76px!important;padding:0 14px!important;background:linear-gradient(135deg,#075d39,#087a45 62%,#0c9154)!important;border:0!important;border-radius:0 0 24px 24px!important;box-shadow:0 10px 28px rgba(6,77,50,.18)!important}
      .brand{gap:9px!important;color:#fff!important}
      .brandMark{width:48px!important;height:48px!important;flex-basis:48px!important;border-radius:50%!important;box-shadow:0 0 0 3px rgba(255,241,172,.18),0 7px 18px rgba(0,0,0,.15)!important}
      .brandName{font-family:Georgia,serif!important;font-size:18px!important;color:#fff!important;letter-spacing:-.2px!important}
      .brandTag{display:block!important;font-size:8px!important;color:rgba(255,255,255,.78)!important;letter-spacing:.7px!important}
      .topActions{gap:2px!important}
      .topActions>.iconBtn{color:#fff!important;width:38px!important;height:38px!important}
      .topActions>.iconBtn:hover{background:rgba(255,255,255,.12)!important}
      .topSearch{display:none!important}
      #userArea{margin-left:2px!important}
      #userArea .primary{min-height:36px!important;padding:7px 10px!important;border:1px solid rgba(255,255,255,.25)!important;background:rgba(255,255,255,.12)!important;box-shadow:none!important;color:#fff!important;border-radius:12px!important;font-size:9px!important}
      #userArea .ghost{background:rgba(255,255,255,.12)!important;color:#fff!important;border-color:rgba(255,255,255,.2)!important;font-size:9px!important}
      .layout{padding:12px 9px 100px!important}
      .homeHero{border-radius:20px!important;margin-bottom:16px!important;box-shadow:0 12px 30px rgba(18,69,46,.09)!important}
      .homeHero .welcome{gap:11px!important}
      .welcomeAvatar{width:54px!important;height:54px!important;flex-basis:54px!important;border-radius:50%!important;padding:2px!important}
      .welcomeName{font-size:17px!important}
      .sectionHead h3{font-size:18px!important}
      .sectionHead h3:before{width:5px!important;height:21px!important}
      .story{min-width:112px!important;width:112px!important;height:168px!important;flex-basis:112px!important;border-radius:18px!important}
      .story.add:before{content:"+"!important;font-size:24px!important}
      .composerCard{border-radius:20px!important}
      .composer textarea{min-height:82px!important;border-radius:16px!important}
      .post{border-radius:20px!important}
      .layout>nav{left:8px!important;right:8px!important;bottom:8px!important;padding:6px!important;border-radius:22px!important;border:1px solid rgba(216,168,78,.28)!important;background:rgba(255,255,255,.97)!important;box-shadow:0 16px 38px rgba(14,40,27,.2)!important}
      .layout>nav .navbtn{min-height:57px!important;border-radius:16px!important}
      .layout>nav .navIcon{width:31px!important;height:31px!important;border-radius:50%!important}
      .layout>nav .navIcon .ga-nav-svg{width:20px!important;height:20px!important}
      .layout>nav .navbtn.active .navIcon{background:linear-gradient(145deg,#0a9657,#075d39)!important;box-shadow:0 5px 13px rgba(8,122,69,.2)!important}
      .layout>nav .navbtn.active{background:linear-gradient(145deg,#edf9f3,#fffaf0)!important}
      .navLabel{font-weight:800!important;font-size:8px!important}
    }
    @media(max-width:380px){.brandName{font-size:16px!important}.brandTag{font-size:7px!important}.brandMark{width:44px!important;height:44px!important;flex-basis:44px!important}.topActions>.iconBtn{width:34px!important}}
  `;
  document.head.appendChild(style);
  function apply(){
    const mark=document.querySelector('.brandMark'); if(mark&&!mark.querySelector('.ga-emblem')) mark.innerHTML=emblem;
    const wa=document.querySelector('.welcomeAvatar'); if(wa&&!wa.querySelector('.ga-emblem')){wa.innerHTML=emblem;wa.classList.add('mobileGreetingMark')}
    const pa=document.querySelector('.profileAvatar'); if(pa&&!pa.querySelector('.ga-emblem')&&!pa.querySelector('img')){pa.innerHTML=emblem}
    const map=['home','prayer','friends','chat','bell','profile'];
    document.querySelectorAll('.navbtn').forEach((b,i)=>{if(i<map.length){const n=b.querySelector('.navIcon');if(n&&!n.querySelector('.ga-nav-svg'))n.innerHTML=gaIcon(map[i])}});
  }
  apply();
  new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});
})();

<style id="ga-final-header-fix">
/* FINAL MOBILE HEADER — clean hierarchy, no crowding */
@media(max-width:760px){
  header{
    height:68px!important;
    min-height:68px!important;
    padding:8px 11px!important;
    gap:0!important;
    border-radius:0 0 20px 20px!important;
    overflow:hidden!important;
    align-items:center!important;
  }
  header .brand{
    min-width:0!important;
    width:auto!important;
    flex:1 1 auto!important;
    max-width:calc(100% - 142px)!important;
    gap:9px!important;
    overflow:hidden!important;
    align-items:center!important;
  }
  header .brandMark{
    width:43px!important;
    height:43px!important;
    flex:0 0 43px!important;
    border-radius:50%!important;
    padding:2px!important;
  }
  header .brand>div:last-child{
    min-width:0!important;
    overflow:hidden!important;
  }
  header .brandName{
    display:block!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    font-family:Georgia,serif!important;
    font-size:17px!important;
    line-height:1.05!important;
    color:#fff!important;
    letter-spacing:-.25px!important;
  }
  header .brandTag{display:none!important}
  header .topActions{
    flex:0 0 auto!important;
    margin-left:7px!important;
    gap:3px!important;
    height:100%!important;
    align-items:center!important;
  }
  header .topActions>.iconBtn{
    width:35px!important;
    height:35px!important;
    flex:0 0 35px!important;
    border-radius:11px!important;
    color:#fff!important;
  }
  /* Beranda is already in bottom navigation; remove duplicate from header. */
  header .topActions>.iconBtn:first-child{display:none!important}
  header #userArea{
    flex:0 0 auto!important;
    max-width:78px!important;
    min-width:0!important;
    margin-left:1px!important;
    overflow:hidden!important;
    font-size:0!important;
    display:flex!important;
    align-items:center!important;
  }
  header #userArea .primary,
  header #userArea .ghost{
    min-width:0!important;
    max-width:78px!important;
    min-height:35px!important;
    height:35px!important;
    padding:6px 10px!important;
    margin:0!important;
    border-radius:12px!important;
    font-size:9px!important;
    line-height:1!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    box-shadow:none!important;
  }
  /* If the signed-in area contains email text, keep it from pushing the header. */
  header #userArea>*{flex:0 0 auto!important}
  header #userArea .userEmail,
  header #userArea [class*="email"],
  header #userArea small,
  header #userArea span{
    display:none!important;
  }
  .layout{
    padding-top:12px!important;
  }
  .homeHero{
    margin-top:0!important;
  }
}
@media(max-width:380px){
  header{padding-left:9px!important;padding-right:9px!important}
  header .brand{max-width:calc(100% - 132px)!important}
  header .brandMark{width:40px!important;height:40px!important;flex-basis:40px!important}
  header .brandName{font-size:16px!important}
  header .topActions>.iconBtn{width:33px!important;height:33px!important;flex-basis:33px!important}
  header #userArea,.header #userArea{max-width:72px!important}
  header #userArea .primary,header #userArea .ghost{max-width:72px!important;padding-left:8px!important;padding-right:8px!important}
}
</style>
