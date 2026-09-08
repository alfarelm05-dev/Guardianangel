/* Guardian Angel — refined social UI layer */
(function(){
  if(window.__GA_UI_LOADED)return; window.__GA_UI_LOADED=true;
  const style=document.createElement('style');
  style.textContent=`
:root{--ga:#0b7a45;--ga2:#075b35;--ga-soft:#eaf8f0;--ga-bg:#f4f7f5;--ga-ink:#17231d;--ga-muted:#728078;--ga-line:#dce7e1;--ga-shadow:0 10px 30px rgba(15,62,39,.075)}
body{background:radial-gradient(circle at 50% -8%,#f0fbf5 0,#f4f7f5 42%,#f7f8f7 100%);color:var(--ga-ink)}
header{height:70px!important;padding:0 max(14px,calc((100vw - 1180px)/2))!important}
.brand{min-width:230px!important;gap:11px!important}.brandMark{position:relative!important;width:46px!important;height:46px!important;flex:0 0 46px!important;border-radius:14px!important;background:linear-gradient(145deg,#0b8b50,#075d37)!important;overflow:hidden!important}
.brandMark svg{display:none!important}.brandMark:after{content:"";position:absolute;inset:5px;background:url('/favicon.ico') center/contain no-repeat;filter:brightness(0) invert(1);opacity:.98}
.brandName{white-space:nowrap!important;line-height:1.05!important}.brandTag{white-space:nowrap!important;line-height:1.1!important;font-size:8px!important;letter-spacing:.42px!important;margin-top:4px!important}
.topActions{gap:7px!important}.iconBtn{width:42px!important;height:42px!important;border-radius:13px!important}.iconBtn svg{width:21px;height:21px}
.layout{gap:22px!important;padding-top:22px!important}.card{border:1px solid rgba(30,80,55,.09)!important;border-radius:20px!important;box-shadow:var(--ga-shadow)!important}
.navbtn{min-height:50px!important;border-radius:15px!important;margin:3px 0!important;font-weight:800!important}.navIcon{width:36px!important;height:36px!important;border-radius:12px!important;font-size:0!important;position:relative!important}.navIcon svg{width:19px;height:19px}.navbtn.active .navIcon{background:var(--ga)!important;color:#fff!important;box-shadow:0 6px 15px rgba(11,122,69,.2)!important}
.homeHero{border:1px solid #dcebe2!important;box-shadow:0 12px 34px rgba(11,92,53,.07)!important}
/* Remove the experimental clutter panel; the home feed should breathe. */
.ga-pulse{display:none!important}.ga-section-label{display:flex!important;align-items:center!important;gap:8px!important;margin:20px 2px 9px!important;font-size:11px!important;font-weight:900!important;letter-spacing:.55px!important;text-transform:none!important;color:#365246!important}.ga-section-label:before{content:"";width:26px;height:3px;border-radius:99px;background:var(--ga)!important}
.composerCard{border:1px solid #dbe8e0!important;box-shadow:0 10px 28px rgba(20,70,45,.06)!important}.composer textarea{background:#f5f8f6!important;border:1px solid #e3ebe6!important}.composer textarea:focus{background:#fff!important}
.post{border:1px solid #dce6e0!important;border-radius:19px!important;box-shadow:0 9px 28px rgba(15,62,39,.065)!important}.posthead{padding-bottom:3px!important}.postbody{font-size:14px!important;line-height:1.65!important}
.actions{padding:6px 8px!important;background:#fff!important;border-top:1px solid #e7eee9!important;gap:4px!important}.actions button{min-height:42px!important;border-radius:12px!important;font-weight:800!important;color:#56665e!important}.actions button:hover{background:var(--ga-soft)!important;color:var(--ga)!important}.ga-action-count{display:inline-flex;align-items:center;margin-left:3px;font-size:11px;font-weight:900;color:#6f7d76}
.commentsInline{padding:11px 13px!important;background:#f8faf9!important;border-top:1px solid #e2eae5!important}.commentLine{margin:8px 0!important}.commentBubble{background:#e9efeb!important;border-radius:4px 16px 16px 16px!important;padding:8px 10px!important;font-size:12px!important}.commentName{font-size:11px!important;color:#30453a!important;margin-bottom:2px!important}.commentForm{padding-top:4px!important}.commentForm input{height:40px!important;border:1px solid #d9e5de!important;border-radius:999px!important;padding:0 14px!important;background:#fff!important}.commentForm button{height:40px!important;min-width:82px!important;border:0!important;border-radius:999px!important;background:var(--ga)!important;color:#fff!important;font-weight:900!important}
/* Facebook-like interaction row: compact, obvious, count visible. */
.actions button{display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important;white-space:nowrap!important}.ga-action-icon{width:17px;height:17px;display:inline-grid;place-items:center}.ga-action-icon svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
/* Messages: clean conversation surface instead of a plain form. */
.message-list{min-height:340px!important;padding:14px!important;border:1px solid #dfe9e3!important;border-radius:18px!important;background:linear-gradient(180deg,#f8fbf9,#eef5f1)!important;gap:9px!important}.bubble{padding:10px 13px!important;font-size:13px!important;box-shadow:0 2px 7px rgba(20,60,40,.04)!important}.bubble.mine{background:#0b7a45!important;color:#fff!important}.ga-chat-note{font-size:10px;color:#819088;text-align:center;margin:5px 0 9px}
/* Give the composer a real messenger feel without touching the data layer. */
.message-list + form,.message-list + .row{margin-top:9px!important}.message-list + form input,.message-list + .row input{height:44px!important;border-radius:999px!important;border:1px solid #d7e4dc!important;padding:0 15px!important}.message-list + form button,.message-list + .row button{border-radius:999px!important}
.friendCard{border:1px solid #dce7e0!important;background:linear-gradient(145deg,#fff,#f7faf8)!important;box-shadow:0 5px 18px rgba(20,65,43,.045)!important}
.sideIcon{display:grid!important;place-items:center!important}.ga-float{display:none!important}
@media(max-width:760px){
 header{height:62px!important;padding:0 8px!important}.brand{min-width:0!important;gap:7px!important}.brandMark{width:38px!important;height:38px!important;flex-basis:38px!important;border-radius:11px!important}.brandMark:after{inset:4px}.brandName{font-size:16px!important}.brandTag{font-size:7px!important;letter-spacing:.18px!important}.topActions{gap:2px!important}.iconBtn{width:36px!important;height:36px!important}.layout{padding-top:8px!important}.layout>nav{box-shadow:0 12px 34px rgba(20,35,28,.2)!important}.layout>nav .navIcon{width:28px!important;height:28px!important;flex-basis:28px!important}.layout>nav .navIcon svg{width:16px;height:16px}.ga-section-label{margin-top:15px!important}.post{border-radius:17px!important}.actions{padding:5px!important}.actions button{min-width:72px!important;font-size:10px!important}.ga-action-count{font-size:9px}.commentForm button{min-width:70px!important}.message-list{min-height:300px!important;padding:11px!important}.bubble{max-width:88%!important}
}
`;
  document.head.appendChild(style);

  const icons={
    'Beranda':'<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/></svg>',
    'Ruang Doa':'<svg viewBox="0 0 24 24"><path d="M20.8 8.7c0 5.1-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z"/></svg>',
    'Teman Seiman':'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3.5 19c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5"/><path d="M14.5 15c2.7-.5 5 .8 6 3"/></svg>',
    'Pesan':'<svg viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.4-3.4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/></svg>',
    'Notifikasi':'<svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    'Profil':'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"/></svg>',
    'Admin':'<svg viewBox="0 0 24 24"><path d="M12 3 5 9v6c0 4 3 6 7 7 4-1 7-3 7-7V9z"/><path d="m9 13 2 2 4-5"/></svg>'
  };

  function fixBrand(){
    const mark=document.querySelector('.brandMark');
    if(mark)mark.setAttribute('aria-label','Logo Guardian Angel');
    document.querySelectorAll('.navbtn').forEach(btn=>{
      const label=btn.querySelector('.navLabel'); const box=btn.querySelector('.navIcon');
      if(label&&box){const text=label.textContent.trim(); if(icons[text])box.innerHTML=icons[text];}
    });
  }
  function addActionIcons(){
    const actionSets=document.querySelectorAll('.actions');
    actionSets.forEach(actions=>{
      const buttons=[...actions.querySelectorAll('button')];
      buttons.forEach(btn=>{
        if(btn.querySelector('.ga-action-icon'))return;
        const text=btn.textContent.trim();
        let svg='';
        if(/suka|like/i.test(text))svg='<path d="M20 8.5c0 4.7-7.9 9.5-7.9 9.5S4 13.2 4 8.5A4 4 0 0 1 11.6 7 4 4 0 0 1 20 8.5Z"/>';
        else if(/komentar|comment/i.test(text))svg='<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.4-3.4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/>';
        else if(/bagikan|share/i.test(text))svg='<path d="m12 3 7 7-7 7"/><path d="M19 10H9a6 6 0 0 0-6 6v2"/>';
        else if(/simpan|save/i.test(text))svg='<path d="M6 4h12v16l-6-3-6 3z"/>';
        if(svg){const span=document.createElement('span');span.className='ga-action-icon';span.innerHTML='<svg viewBox="0 0 24 24">'+svg+'</svg>';btn.prepend(span);}
      });
      const commentBtn=buttons.find(b=>/komentar|comment/i.test(b.textContent));
      if(commentBtn&&!commentBtn.querySelector('.ga-action-count')){
        const count=actions.closest('.post')?.querySelectorAll('.commentLine').length||0;
        if(count>0){const s=document.createElement('span');s.className='ga-action-count';s.textContent=count;commentBtn.appendChild(s);}
      }
    });
  }
  function cleanup(){
    const main=document.getElementById('main'); if(!main)return;
    fixBrand();
    const labels=[...main.querySelectorAll('.ga-section-label')];
    labels.slice(1).forEach(x=>x.remove());
    if(!labels.length){const head=main.querySelector('.sectionHead'); if(head){const label=document.createElement('div');label.className='ga-section-label';label.textContent='Aktivitas komunitas';head.parentNode.insertBefore(label,head);}}
    addActionIcons();
  }
  let timer=0;
  function schedule(){clearTimeout(timer);timer=setTimeout(cleanup,80)}
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',schedule); setTimeout(schedule,300);
})();