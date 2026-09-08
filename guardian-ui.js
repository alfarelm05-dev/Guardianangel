/* Guardian Angel — premium UI layer
 * Loaded after the app runtime so it can enhance the existing pages without replacing data/auth logic.
 */
(function(){
  const style=document.createElement('style');
  style.textContent=`
    :root{
      --ga-primary:#0b7a45;--ga-primary-2:#075b35;--ga-soft:#eaf8f0;
      --ga-bg:#f3f7f4;--ga-card:rgba(255,255,255,.96);--ga-text:#15231b;
      --ga-muted:#728078;--ga-line:#dfeae3;--ga-shadow:0 14px 42px rgba(15,62,39,.09)
    }
    body{background:radial-gradient(circle at 50% -10%,#effaf4 0,#f3f7f4 38%,#f5f7f6 100%);color:var(--ga-text)}
    header{height:72px!important;background:rgba(255,255,255,.9)!important;border-bottom:1px solid rgba(20,70,45,.09)!important;box-shadow:0 4px 24px rgba(20,60,40,.05)!important}
    .brandMark{width:44px!important;height:44px!important;border-radius:15px!important;background:linear-gradient(145deg,#0d9a59,#075b35)!important;box-shadow:0 9px 22px rgba(11,122,69,.22)!important}
    .brandName{letter-spacing:-.35px!important}.brandTag{letter-spacing:.6px!important}
    .topSearch input{height:44px!important;background:#f4f8f5!important;border-color:#e1ebe5!important;border-radius:15px!important;transition:.2s}
    .topSearch input:focus{background:#fff!important;border-color:#9ed0b4!important;box-shadow:0 0 0 4px rgba(234,248,240,.9)}
    .iconBtn{transition:.18s transform,.18s background!important}.iconBtn:hover{transform:translateY(-1px)}
    .layout{gap:24px!important;padding-top:24px!important}
    .card{border-color:rgba(30,80,55,.1)!important;box-shadow:var(--ga-shadow)!important;border-radius:20px!important}
    .homeHero{position:relative;overflow:hidden;background:linear-gradient(135deg,#ffffff 0,#f2fbf6 62%,#e6f7ed 100%)!important}
    .homeHero:after{content:"";position:absolute;width:180px;height:180px;border-radius:50%;right:-80px;top:-80px;background:rgba(11,122,69,.07);pointer-events:none}
    .navbtn{min-height:49px!important;border-radius:15px!important;transition:.18s!important}.navbtn:hover{transform:translateX(2px)}
    .navbtn.active{box-shadow:inset 3px 0 var(--ga-primary),0 5px 15px rgba(11,122,69,.06)!important}
    .navIcon{border-radius:12px!important;transition:.18s}.navbtn.active .navIcon{box-shadow:0 5px 13px rgba(11,122,69,.2)}
    .primary{background:linear-gradient(135deg,#0c8b51,#075f39)!important;border-radius:13px!important;box-shadow:0 8px 18px rgba(11,122,69,.16)!important;transition:.18s}
    .primary:hover{transform:translateY(-1px);filter:saturate(1.08)}
    .ghost{border-radius:13px!important;transition:.18s}.ghost:hover{background:#edf8f2!important;border-color:#cfe4d7!important}
    .stories{padding-top:4px!important}.story{border-radius:18px!important;box-shadow:0 12px 24px rgba(20,65,43,.12)!important;transition:.2s transform,.2s box-shadow!important}.story:hover{transform:translateY(-3px);box-shadow:0 16px 28px rgba(20,65,43,.16)!important}
    .composerCard{border:1px solid rgba(20,80,50,.11)!important}.composer textarea{background:#f5f8f6!important;border:1px solid transparent!important;transition:.18s}.composer textarea:focus{background:#fff!important}
    .post{border:1px solid rgba(20,80,50,.09)!important;box-shadow:0 10px 30px rgba(15,62,39,.065)!important;transition:.2s transform,.2s box-shadow!important}.post:hover{box-shadow:0 15px 36px rgba(15,62,39,.09)!important}
    .actions button{border-radius:12px!important;transition:.16s!important}.actions button:hover{transform:translateY(-1px)}
    .right .card{background:linear-gradient(145deg,#fff,#f5fbf7)!important}
    .sideIcon{box-shadow:0 5px 14px rgba(11,122,69,.1)}
    .friendCard{transition:.18s transform,.18s box-shadow}.friendCard:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(15,62,39,.08)}
    .modal{background:rgba(6,28,18,.58)!important}.dialog{border:1px solid rgba(255,255,255,.7);box-shadow:0 28px 90px rgba(0,0,0,.26)!important}
    .sectionHead h3{letter-spacing:-.25px}
    .ga-section-label{display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:900;letter-spacing:.7px;text-transform:uppercase;color:var(--ga-primary);margin:3px 0 7px}
    .ga-section-label:before{content:"";width:22px;height:3px;border-radius:99px;background:var(--ga-primary)}
    .ga-pulse{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
    .ga-pulse-item{padding:10px 11px;border:1px solid #dceae2;border-radius:14px;background:rgba(255,255,255,.78)}
    .ga-pulse-value{font-size:18px;font-weight:950;color:var(--ga-primary);line-height:1}.ga-pulse-text{font-size:9px;color:var(--ga-muted);margin-top:3px}
    .ga-float{position:fixed;right:20px;bottom:20px;z-index:300;border:0;border-radius:999px;padding:11px 15px;background:linear-gradient(135deg,#0b8b4f,#075d37);color:#fff;font-weight:900;box-shadow:0 12px 28px rgba(8,87,50,.24);display:none}
    @media(max-width:760px){
      header{height:62px!important}.layout{padding-top:9px!important}.ga-pulse{grid-template-columns:repeat(3,1fr);gap:5px}.ga-pulse-item{padding:9px 7px}.ga-pulse-value{font-size:15px}.ga-pulse-text{font-size:8px}.ga-float{display:block;right:14px;bottom:76px}.right{display:none!important}
      .layout>nav{box-shadow:0 12px 34px rgba(20,35,28,.2)!important;border-color:rgba(20,60,40,.1)!important}
    }
  `;
  document.head.appendChild(style);

  function addHomePolish(){
    const main=document.getElementById('main'); if(!main) return;
    const hero=main.querySelector('.homeHero');
    if(hero && !hero.querySelector('.ga-pulse')){
      const pulse=document.createElement('div');
      pulse.className='ga-pulse';
      pulse.innerHTML='<div class="ga-pulse-item"><div class="ga-pulse-value">♡</div><div class="ga-pulse-text">Saling mendoakan</div></div><div class="ga-pulse-item"><div class="ga-pulse-value">✦</div><div class="ga-pulse-text">Saling menguatkan</div></div><div class="ga-pulse-item"><div class="ga-pulse-value">✓</div><div class="ga-pulse-text">Ruang aman</div></div>';
      hero.appendChild(pulse);
    }
    const firstHead=main.querySelector('.sectionHead');
    if(firstHead && !firstHead.querySelector('.ga-section-label')){
      const label=document.createElement('div'); label.className='ga-section-label'; label.textContent='Hari ini di komunitas';
      firstHead.parentNode.insertBefore(label,firstHead);
    }
  }

  function addFloatingAction(){
    if(document.querySelector('.ga-float')) return;
    const b=document.createElement('button'); b.className='ga-float'; b.innerHTML='＋ Bagikan';
    b.onclick=()=>{const t=document.querySelector('.composer textarea'); if(t){t.focus();t.scrollIntoView({behavior:'smooth',block:'center'})}};
    document.body.appendChild(b);
  }

  const decorate=()=>{addHomePolish();addFloatingAction()};
  new MutationObserver(()=>setTimeout(decorate,80)).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>setTimeout(decorate,250));
  setTimeout(decorate,300);
})();
