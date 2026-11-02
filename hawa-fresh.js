/* Hawa Fresh v6 — progressive UX and motion, designed for food discovery. */
(function(){
  "use strict";
  const $=(q,root=document)=>root.querySelector(q);
  const $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const images={"kacchi-biryani":"assets/hawa-kacchi-biryani.webp","chicken-tikka":"assets/hawa-grilled-platter.webp","sizzling-platter":"assets/hawa-grilled-platter.webp","beef-roast":"assets/hawa-beef-roast.webp","firni":"assets/hawa-sweets-drinks.webp"};
  const fallbacks={"kacchi-biryani":"assets/dish-biryani.jpg","chicken-tikka":"assets/dish-grill.jpg","sizzling-platter":"assets/dish-grill.jpg","beef-roast":"assets/dish-biryani.jpg","firni":"assets/dish-biryani.jpg"};
  const initial={"beef-roast":"Roast","polao":"Polao","firni":"Firni","chicken-biryani":"Rice","thai-curry":"Thai","seekh-kebab":"Kebab"};
  const money=n=>"৳"+Number(n).toLocaleString("en-BD");
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  /* Missing media fails over cleanly while imagery is being published. */
  document.addEventListener("error",function(event){
    const image=event.target;
    if(!image||image.tagName!=="IMG")return;
    const fallback=image.dataset.fallback;
    if(fallback){delete image.dataset.fallback;image.src=fallback;}
  },true);
  function initNav(){
    const h=$("#siteHeader"),toggle=$("#menuToggle"),nav=$("#primaryNav"),back=$("#backTop"),progress=$("#scrollProgress");
    let frame=0;
    function update(){
      frame=0;
      const top=window.scrollY||0;
      if(h)h.classList.toggle("is-scrolled",top>20);
      if(back)back.classList.toggle("is-visible",top>650);
      if(progress){
        const max=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);
        progress.style.width=Math.min(100,100*top/max)+"%";
      }
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(update);}
    addEventListener("scroll",schedule,{passive:true});
    addEventListener("resize",schedule,{passive:true});
    update();
    if(back)back.addEventListener("click",()=>window.scrollTo({top:0,behavior:reduced.matches?"instant":"smooth"}));
    function menu(open){
      if(!nav||!toggle)return;
      nav.classList.toggle("is-open",open);
      document.body.classList.toggle("nav-open",open);
      toggle.setAttribute("aria-expanded",String(open));
      toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
      if(open)nav.querySelector("a")?.focus(); else toggle.focus();
    }
    if(toggle)toggle.addEventListener("click",()=>menu(!nav?.classList.contains("is-open")));
    if(nav)nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{if(nav.classList.contains("is-open"))menu(false);}));
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav?.classList.contains("is-open"))menu(false);});
  }
  function bindCartAdd(container){
    if(!container||!window.HAWA)return;
    container.addEventListener("click",event=>{
      const btn=event.target.closest("[data-add]");
      if(!btn||!container.contains(btn))return;
      const id=btn.getAttribute("data-add");
      const item=window.HAWA.MENU.find(x=>x.id===id);
      if(!item||!item.price)return;
      window.HAWA.addToCart(id);
      window.HAWA.toast(item.name+" added to your request");
      const label=btn.hasAttribute("aria-label")?btn.getAttribute("aria-label"):null;
      btn.textContent="✓";
      btn.setAttribute("aria-label",item.name+" added");
      setTimeout(()=>{
        btn.textContent="+";
        if(label)btn.setAttribute("aria-label",label);
      },750);
    });
  }
  function renderFeatured(){
    if(!window.HAWA)return;
    const menu=window.HAWA.MENU;
    const featured=$("#featuredGrid");
    const items=["kacchi-biryani","chicken-tikka","sizzling-platter"].map(id=>menu.find(x=>x.id===id)).filter(Boolean);
    if(featured){
      featured.innerHTML=items.map((m,i)=>{
        const photo=images[m.id];
        return '<article class="product-card">'+
         '<div class="product-card__media '+(i===1?'product-card__media--grill':i===2?'product-card__media--platter':'')+'">'+
         (photo?'<img src="'+photo+'" data-fallback="'+(fallbacks[m.id]||"assets/dish-biryani.jpg")+'" alt="Illustrative '+esc(m.name)+'" loading="lazy" decoding="async">':'<span class="product-card__placeholder">'+esc(m.name.slice(0,1))+'</span>')+'</div>'+
         '<div class="product-card__body"><div class="product-card__top"><span class="product-tag">ON THE MENU</span><span class="product-tag product-tag--muted">0'+(i+1)+'</span></div>'+
         '<h3>'+esc(m.name)+'</h3><p>'+esc(m.desc)+'</p><div class="product-card__bottom"><span class="product-price">'+money(m.price)+'</span>'+
         '<button class="product-add" type="button" data-add="'+esc(m.id)+'" aria-label="Add '+esc(m.name)+' to your request">+</button></div></div></article>';
      }).join("");
      bindCartAdd(featured);
    }
    const mini=$("#miniMenu");
    const ids=["chicken-biryani","beef-roast","polao","thai-curry","firni","seekh-kebab"];
    if(mini){
      mini.innerHTML=ids.map(id=>menu.find(x=>x.id===id)).filter(Boolean).map((m,i)=>{
        return '<article class="mini-card"><div class="mini-card__photo">'+
          (images[m.id]?'<img src="'+images[m.id]+'" data-fallback="'+(fallbacks[m.id]||"assets/dish-biryani.jpg")+'" alt="" loading="lazy">':'<span class="mini-card__initial">'+esc(initial[m.id]||m.name.slice(0,1))+'</span>')+
          '</div><div class="mini-card__details"><h3>'+esc(m.name)+'</h3><p>'+esc(m.desc)+'</p><span class="mini-card__price">'+money(m.price)+'</span></div>'+
          '<button class="mini-card__button" type="button" data-add="'+esc(m.id)+'" aria-label="Add '+esc(m.name)+' to your request">+</button></article>';
      }).join("");
      bindCartAdd(mini);
    }
  }
  function animate(){
    if(reduced.matches||!window.gsap||!window.ScrollTrigger)return;
    const gsap=window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const hero=$(".hero");
    if(hero){
      gsap.timeline({delay:document.documentElement.classList.contains("hawa-intro-on")?1.05:0,defaults:{ease:"power3.out"}})
        .from(".hero-eyebrow",{y:16,opacity:0,duration:.55})
        .from(".hero h1",{y:52,opacity:0,duration:.85},"-=.22")
        .from(".hero-description",{y:22,opacity:0,duration:.62},"-=.46")
        .from(".hero-buttons>*",{y:18,opacity:0,stagger:.1,duration:.5},"-=.32")
        .from(".hero-platter",{scale:.76,rotation:-25,opacity:0,duration:1.1,ease:"back.out(1.15)"},"-=.92")
        .from(".hero-food-note,.hero-venue-chip",{y:38,scale:.84,opacity:0,stagger:.13,duration:.7},"-=.55");
      gsap.to(".hero-platter",{y:92,rotation:5,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.15}});
      gsap.to(".hero-food-note",{y:-32,rotation:-12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.4}});
    }
    $$(".section-intro,.categories-top,.gatherings-copy,.visit-grid").forEach(el=>{
      gsap.from(el,{y:42,opacity:0,duration:.78,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 87%",once:true}});
    });
    $$(".promo,.product-card,.mini-card,.category-chip").forEach((el,i)=>{
      gsap.from(el,{y:36,opacity:0,duration:.62,delay:(i%3)*.055,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 92%",once:true}});
    });
    if($(".category-center")){
      gsap.to(".category-center img",{rotation:13,scale:1.29,ease:"none",scrollTrigger:{trigger:".categories-section",start:"top bottom",end:"bottom top",scrub:1}});
    }
    if($(".gatherings-photo img")){
      gsap.to(".gatherings-photo img",{yPercent:-10,ease:"none",scrollTrigger:{trigger:".gatherings",start:"top bottom",end:"bottom top",scrub:1.1}});
    }
    if($(".menu-banner__photo img")){
      gsap.from(".menu-banner__photo img",{scale:1.15,opacity:.8,duration:.95,ease:"power3.out",scrollTrigger:{trigger:".menu-banner",start:"top 85%",once:true}});
    }
  }
  function restoreMissingMedia(){
    document.querySelectorAll("img[data-fallback]").forEach(function(img){
      if(img.complete&&img.naturalWidth===0&&img.dataset.fallback){
        const backup=img.dataset.fallback;
        delete img.dataset.fallback;
        img.src=backup;
      }
    });
  }
  function start(){
    restoreMissingMedia();
    if(document.documentElement.classList.contains("hawa-intro-on")){
      try{sessionStorage.setItem("hawa-fresh-intro","1");}catch(e){}
      setTimeout(()=>document.documentElement.classList.remove("hawa-intro-on"),1560);
    }
    initNav();
    renderFeatured();
    animate();
    const year=$("#year");if(year)year.textContent=new Date().getFullYear();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();