/* Guardian Angel — premium UI layer */
(function(){
  if(window.__GA_UI_LOADED)return; window.__GA_UI_LOADED=true;
  const style=document.createElement('style');
  style.textContent=`
    :root{--ga-primary:#0b7a45;--ga-soft:#eaf8f0;--ga-muted:#728078;--ga-line:#dfeae3;--ga-shadow:0 14px 42px rgba(15,62,39,.09)}
    body{background:radial-gradient(circle at 50% -10%,#effaf4 0,#f3f7f4 38%,#f5f7f6 100%)}
    header{height:72px!important;background:rgba(255,255,255,.92)!important;border-bottom:1px solid rgba(20,70,45,.09)!important;box-shadow:0 4px 24px rgba(20,60,40,.05)!important}
    .brandMark{width:44px!important;height:44px!important;border-radius:15px!important;background:linear-gradient(145deg,#0d9a59,#075b35)!important;box-shadow:0 9px 22px rgba(11,122,69,.22)!important}
    .topSearch input{height:44px!important;background:#f4f8f5!important;border-color:#e1ebe5!important;border-radius:15px!important}
    .layout{gap:24px!important;padding-top:24px!important}.card{border-color:rgba(30,80,55,.1)!important;box-shadow:var(--ga-shadow)!important;border-radius:20px!important}
    .homeHero{position:relative;overflow:hidden;background:linear-gradient(135deg,#fff,#f2fbf6 62%,#e6f7ed)!important}
    .navbtn{min-height:49px!important;border-radius:15px!important}.navbtn.active{box-shadow:inset 3px 0 var(--ga-primary),0 5px 15px rgba(11,122,69,.06)!important}.navIcon{border-radius:12px!important}
    .primary{background:linear-gradient(135deg,#0c8b51,#075f39)!important;border-radius:13px!important;box-shadow:0 8px 18px rgba(11,122,69,.16)!important}
    .ghost{border-radius:13px!important}.story{border-radius:18px!important;box-shadow:0 12px 24px rgba(20,65,43,.12)!important}.post{border:1px solid rgba(20,80,50,.09)!important;box-shadow:0 10px 30px rgba(15,62,39,.065)!important}.actions button{border-radius:12px!important}.right .card{background:linear-gradient(145deg,#fff,#f5fbf7)!important}
    .ga-section-label{display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:900;letter-spacing:.7px;text-transform:uppercase;color:var(--ga-primary);margin:3px 0 7px}.ga-section-label:before{content:"";width:22px;height:3px;border-radius:99px;background:var(--ga-primary)}
    .ga-pulse{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.ga-pulse-item{padding:10px 11px;border:1px solid #dceae2;border-radius:14px;background:rgba(255,255,255,.78)}.ga-pulse-value{font-size:18px;font-weight:950;color:var(--ga-primary);line-height:1}.ga-pulse-text{font-size:9px;color:var(--ga-muted);margin-top:3px}
    .ga-float{position:fixed;right:20px;bottom:20px;z-index:300;border:0;border-radius:999px;padding:11px 15px;background:linear-gradient(135deg,#0b8b4f,#075d37);color:#fff;font-weight:900;box-shadow:0 12px 28px rgba(8,87,50,.24);display:none}
    @media(max-width:760px){header{height:62px!important}.layout{padding-top:9px!important}.right{display:none!important}.ga-pulse{gap:5px}.ga-pulse-item{padding:9px 7px}.ga-pulse-value{font-size:15px}.ga-pulse-text{font-size:8px}.ga-float{display:block;right:14px;bottom:76px}.layout>nav{box-shadow:0 12px 34px rgba(20,35,28,.2)!important;border-color:rgba(20,60,40,.1)!important}}
  `; document.head.appendChild(style);
  let scheduled=false;
  function decorate(){
    scheduled=false; const main=document.getElementById('main'); if(!main)return;
    /* Remove every label injected by older renders, then add exactly one. */
    main.querySelectorAll('.ga-section-label').forEach(x=>x.remove());
    const heads=main.querySelectorAll('.sectionHead');
    if(heads.length){const label=document.createElement('div');label.className='ga-section-label';label.textContent='Hari ini di komunitas';heads[0].parentNode.insertBefore(label,heads[0]);}
    /* Keep exactly one pulse panel. */
    const pulses=main.querySelectorAll('.ga-pulse'); for(let i=1;i<pulses.length;i++)pulses[i].remove();
    const hero=main.querySelector('.homeHero');
    if(hero&&!hero.querySelector('.ga-pulse')){const p=document.createElement('div');p.className='ga-pulse';p.innerHTML='<div class="ga-pulse-item"><div class="ga-pulse-value">♡</div><div class="ga-pulse-text">Saling mendoakan</div></div><div class="ga-pulse-item"><div class="ga-pulse-value">✦</div><div class="ga-pulse-text">Saling menguatkan</div></div><div class="ga-pulse-item"><div class="ga-pulse-value">✓</div><div class="ga-pulse-text">Ruang aman</div></div>';hero.appendChild(p);}
    if(!document.querySelector('.ga-float')){const b=document.createElement('button');b.className='ga-float';b.innerHTML='＋ Bagikan';b.onclick=()=>{const t=document.querySelector('.composer textarea');if(t){t.focus();t.scrollIntoView({behavior:'smooth',block:'center')}}};document.body.appendChild(b);}
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(decorate)}
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',schedule); setTimeout(schedule,300);
})();
