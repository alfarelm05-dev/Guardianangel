/* Guardian Angel UI — stable polish layer */
(function(){
  if(window.__GA_UI_LOADED)return; window.__GA_UI_LOADED=true;
  const s=document.createElement('style');
  s.textContent=`
/* HEADER: never allow brand text or account actions to collide */
header{display:grid!important;grid-template-columns:230px minmax(180px,1fr) auto!important;align-items:center!important;gap:16px!important;height:72px!important}
.brand{min-width:0!important;width:230px!important;display:flex!important;align-items:center!important;gap:10px!important;overflow:hidden!important}
.brand>div:last-child{min-width:0!important;overflow:hidden!important}
.brandName{display:block!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
.brandTag{display:block!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;font-size:8px!important;letter-spacing:.15px!important}
.topSearch{min-width:0!important;max-width:none!important}
.topActions{min-width:max-content!important;margin-left:0!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:6px!important;white-space:nowrap!important}
#userArea{display:flex!important;align-items:center!important;flex:0 0 auto!important}
#userArea button{white-space:nowrap!important}
.iconBtn{flex:0 0 40px!important;color:#52625a!important}
/* Restore visual distinction between navigation icons */
.layout>nav .navbtn:nth-child(1) .navIcon{color:#087a46!important}
.layout>nav .navbtn:nth-child(2) .navIcon{color:#a35a32!important}
.layout>nav .navbtn:nth-child(3) .navIcon{color:#2869a8!important}
.layout>nav .navbtn:nth-child(4) .navIcon{color:#7652a8!important}
.layout>nav .navbtn:nth-child(5) .navIcon{color:#c27b16!important}
.layout>nav .navbtn:nth-child(6) .navIcon{color:#357b68!important}
.layout>nav .navbtn.active .navIcon{color:#fff!important}
/* Social interaction row */
.actions{display:flex!important;align-items:center!important;padding:5px 8px!important;gap:3px!important}
.actions button{display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important;min-height:42px!important;border-radius:11px!important;font-weight:800!important;white-space:nowrap!important}
.ga-action-icon{width:17px;height:17px;display:inline-grid;place-items:center;flex:0 0 17px}
.ga-action-icon svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ga-action-count{font-size:11px!important;font-weight:900!important;color:#68766f!important}
.commentsInline{background:#fafcfb!important;border-top:1px solid #e1e9e4!important}
.commentLine{align-items:flex-start!important}
.commentBubble{background:#edf2ef!important;border-radius:5px 15px 15px 15px!important;padding:8px 10px!important}
.commentName{display:block!important;margin-bottom:2px!important;font-weight:900!important}
.commentForm{display:flex!important;align-items:center!important;gap:6px!important}
.commentForm input{height:40px!important;border-radius:999px!important;padding:0 14px!important}
.commentForm button{height:40px!important;border-radius:999px!important;background:#0b7a45!important;color:#fff!important;border:0!important;font-weight:900!important}
/* Messenger surface */
.message-list{border:1px solid #dfe8e2!important;border-radius:18px!important;background:linear-gradient(180deg,#f9fbfa,#eef5f1)!important;padding:14px!important;gap:9px!important}
.bubble{font-size:13px!important;padding:10px 13px!important;border-radius:16px 16px 16px 5px!important}
.bubble.mine{background:#0b7a45!important;color:#fff!important;border-radius:16px 16px 5px 16px!important}
.ga-section-label{display:flex!important;align-items:center!important;gap:8px!important;margin:16px 2px 8px!important;font-size:11px!important;font-weight:900!important;color:#365246!important}
.ga-section-label:before{content:"";width:24px;height:3px;border-radius:9px;background:#0b7a45!important}
.ga-pulse,.ga-float{display:none!important}
@media(max-width:760px){
 header{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:5px!important;height:62px!important}
 .brand{width:auto!important;min-width:0!important}.brandTag{display:none!important}.brandName{font-size:16px!important}
 .topSearch{display:none!important}.topActions{gap:1px!important}.iconBtn{width:35px!important;flex-basis:35px!important;height:35px!important}
 #userArea button{padding:8px 10px!important;min-height:36px!important;font-size:10px!important}
 .actions{overflow-x:auto!important;scrollbar-width:none!important}.actions::-webkit-scrollbar{display:none}
 .actions button{flex:1 0 auto!important;min-width:68px!important;font-size:10px!important}
}
`;
  document.head.appendChild(s);

  const icons={
    'Beranda':'<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/></svg>',
    'Ruang Doa':'<svg viewBox="0 0 24 24"><path d="M20.8 8.7c0 5.1-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z"/></svg>',
    'Teman Seiman':'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3.5 19c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5"/><path d="M14.5 15c2.7-.5 5 .8 6 3"/></svg>',
    'Pesan':'<svg viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.4-3.4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/></svg>',
    'Notifikasi':'<svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    'Profil':'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"/></svg>',
    'Admin':'<svg viewBox="0 0 24 24"><path d="M12 3 5 9v6c0 4 3 6 7 7 4-1 7-3 7-7V9z"/><path d="m9 13 2 2 4-5"/></svg>'
  };
  function fix(){
    document.querySelectorAll('.navbtn').forEach(b=>{const l=b.querySelector('.navLabel'),n=b.querySelector('.navIcon');if(l&&n&&icons[l.textContent.trim()])n.innerHTML=icons[l.textContent.trim()]});
    const main=document.getElementById('main');if(!main)return;
    const labels=[...main.querySelectorAll('.ga-section-label')];labels.slice(1).forEach(x=>x.remove());
    if(!labels.length){const h=main.querySelector('.sectionHead');if(h){const x=document.createElement('div');x.className='ga-section-label';x.textContent='Aktivitas komunitas';h.parentNode.insertBefore(x,h)}}
    document.querySelectorAll('.actions').forEach(a=>a.querySelectorAll('button').forEach(b=>{if(b.querySelector('.ga-action-icon'))return;const t=b.textContent.toLowerCase();let p='';if(t.includes('suka')||t.includes('like'))p='<path d="M20 8.5c0 4.7-7.9 9.5-7.9 9.5S4 13.2 4 8.5A4 4 0 0 1 11.6 7 4 4 0 0 1 20 8.5Z"/>';else if(t.includes('komentar')||t.includes('comment'))p='<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.4-3.4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/>';else if(t.includes('bagikan')||t.includes('share'))p='<path d="m12 3 7 7-7 7"/><path d="M19 10H9a6 6 0 0 0-6 6v2"/>';if(p){const q=document.createElement('span');q.className='ga-action-icon';q.innerHTML='<svg viewBox="0 0 24 24">'+p+'</svg>';b.prepend(q)}}));
  }
  let timer;function schedule(){clearTimeout(timer);timer=setTimeout(fix,100)}
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',schedule);setTimeout(schedule,300);
})();