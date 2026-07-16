const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const header=document.querySelector('.site-header'),progress=document.querySelector('.progress span'),menuButton=document.querySelector('.menu-button'),nav=document.querySelector('#main-nav');document.querySelector('#year').textContent=new Date().getFullYear();addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>30);const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`},{passive:true});menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));document.querySelectorAll('[data-split]').forEach(el=>{const text=el.textContent.trim();el.setAttribute('aria-label',text);el.innerHTML=text.split(/\s+/).map(word=>`<span class="word">${[...word].map(c=>`<span class="char">${c}</span>`).join('')}</span>`).join(' ')});
if(!reduced&&window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.config({nullTargetWarn:false});const mm=gsap.matchMedia();
const intro=gsap.timeline({defaults:{ease:'power4.out'}});gsap.set('.hero .char',{y:110,opacity:0,rotateX:-80,transformOrigin:'50% 100%'});gsap.set('.hero .reveal',{y:45,opacity:0});gsap.set('.hero .reveal-visual',{x:100,opacity:0,scale:.9,rotateY:-8});intro.to('.hero .char',{y:0,opacity:1,rotateX:0,duration:1.35,stagger:.014}).to('.hero .reveal',{y:0,opacity:1,duration:1,stagger:.12},'-=.8').to('.hero .reveal-visual',{x:0,opacity:1,scale:1,rotateY:0,duration:1.5},'-=1.15');
// Continuous premium motion
gsap.to('.card-one',{y:-16,rotate:-1.8,duration:3.2,repeat:-1,yoyo:true,ease:'sine.inOut'});gsap.to('.card-two',{y:18,rotate:1.6,duration:3.8,repeat:-1,yoyo:true,ease:'sine.inOut'});gsap.to('.ambient i:nth-child(1)',{x:-90,y:70,scale:1.15,duration:10,repeat:-1,yoyo:true,ease:'sine.inOut'});gsap.to('.ambient i:nth-child(2)',{x:110,y:-50,scale:.9,duration:12,repeat:-1,yoyo:true,ease:'sine.inOut'});gsap.to('.contact-orbit',{rotate:360,duration:38,repeat:-1,ease:'none'});gsap.set('.contact-orbit i:nth-child(1)',{left:'50%',top:0});gsap.set('.contact-orbit i:nth-child(2)',{right:'8%',top:'28%'});gsap.set('.contact-orbit i:nth-child(3)',{left:'14%',bottom:'18%'});
// Bidirectional, scroll-linked reveals
 document.querySelectorAll('section:not(.hero)').forEach(section=>{const chars=section.querySelectorAll('.char');if(chars.length)gsap.fromTo(chars,{y:75,opacity:0,rotateX:-65},{y:0,opacity:1,rotateX:0,stagger:.008,ease:'none',scrollTrigger:{trigger:section,start:'top 86%',end:'top 32%',scrub:1.2}});const reveals=section.querySelectorAll('.reveal');if(reveals.length)gsap.fromTo(reveals,{y:55,opacity:0,filter:'blur(8px)'},{y:0,opacity:1,filter:'blur(0px)',stagger:.08,ease:'none',scrollTrigger:{trigger:section,start:'top 84%',end:'top 38%',scrub:1}})});
 gsap.to('.portrait-frame',{yPercent:-9,rotate:.8,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.4}});gsap.to('.hero-grid',{yPercent:18,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.5}});gsap.to('.hourglass',{rotate:16,y:-110,scrollTrigger:{trigger:'.manifesto',start:'top bottom',end:'bottom top',scrub:1.5}});gsap.to('.sand-stream',{scaleY:.08,transformOrigin:'top',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 30%',scrub:1}});gsap.to('.sand-top',{scaleY:.35,transformOrigin:'bottom',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 30%',scrub:1}});gsap.to('.sand-bottom',{scaleY:1.28,transformOrigin:'bottom',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 30%',scrub:1}});
 mm.add('(min-width: 981px)',()=>{const rail=document.querySelector('.practice-rail');const cards=gsap.utils.toArray('.practice-card');const distance=()=>Math.max(0,rail.scrollWidth-innerWidth+innerWidth*.12);gsap.to(rail,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:'.practice',start:'top top',end:()=>`+=${distance()+innerHeight*.8}`,pin:true,scrub:1.2,invalidateOnRefresh:true}});cards.forEach((card,i)=>gsap.fromTo(card,{rotateY:i%2?7:-7,y:80,opacity:.25},{rotateY:0,y:0,opacity:1,ease:'none',scrollTrigger:{trigger:card,containerAnimation:gsap.getTweensOf(rail)[0],start:'left 90%',end:'center 65%',scrub:true}}))});
 gsap.utils.toArray('.step').forEach((step,i)=>{gsap.to(step,{opacity:1,x:0,ease:'none',scrollTrigger:{trigger:step,start:'top 76%',end:'top 42%',scrub:1}})});gsap.to('.method-meter span',{width:'100%',ease:'none',scrollTrigger:{trigger:'.timeline',start:'top 65%',end:'bottom 55%',scrub:1}});gsap.fromTo('.about-visual',{clipPath:'inset(10% 10% 10% 10%)',scale:1.08},{clipPath:'inset(0% 0% 0% 0%)',scale:1,ease:'none',scrollTrigger:{trigger:'.about',start:'top 85%',end:'center 45%',scrub:1.2}});gsap.utils.toArray('.principles-grid article').forEach((card,i)=>{gsap.fromTo(card,{y:70,opacity:.2},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:card,start:'top 90%',end:'top 58%',scrub:1}});gsap.to(card.querySelector(':scope:after'),{})});
 document.querySelectorAll('.magnetic').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.18,duration:.35})});btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.6,ease:'elastic.out(1,.35)'}))});
 if(matchMedia('(pointer:fine)').matches){const cursor=document.querySelector('.cursor');addEventListener('mousemove',e=>gsap.to(cursor,{x:e.clientX,y:e.clientY,duration:.16,ease:'power2.out'}));document.querySelectorAll('a,button,summary').forEach(el=>{el.addEventListener('mouseenter',()=>gsap.to(cursor,{scale:2.2,background:'rgba(255,255,255,.18)',duration:.25}));el.addEventListener('mouseleave',()=>gsap.to(cursor,{scale:1,background:'transparent',duration:.25}))})}
}else document.querySelectorAll('.reveal,.char').forEach(el=>{el.style.opacity=1;el.style.transform='none'});

// Spatial interaction layer: decorative 3D only, preserving text legibility and scroll performance.
if(!reduced&&window.gsap&&window.ScrollTrigger){
  const sections=gsap.utils.toArray('main > section:not(.hero)');
  sections.forEach((section,index)=>{
    const ring=document.createElement('i'); ring.className='depth-object depth-ring';
    const plane=document.createElement('i'); plane.className='depth-object depth-plane';
    const dot=document.createElement('i'); dot.className='depth-object depth-dot';
    section.prepend(ring,plane,dot);
    gsap.fromTo(ring,{rotateX:62,rotateZ:index%2?-18:18,scale:.78},{rotateX:18,rotateZ:index%2?22:-22,scale:1.08,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1.8}});
    gsap.fromTo(plane,{y:90,rotateY:index%2?28:-28},{y:-70,rotateY:index%2?-18:18,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:2.1}});
    gsap.fromTo(dot,{y:35,scale:.7},{y:-80,scale:1.35,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1.35}});
  });

  gsap.to('.portrait-frame:before',{}); // keeps pseudo-layer compositing warm in GSAP-enabled browsers
  gsap.to('.floating-card:before',{});
  gsap.to('.card-one',{rotateY:5,rotateX:-2,x:5,duration:4.8,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.card-two',{rotateY:-5,rotateX:2,x:-5,duration:5.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.practice-card .icon',{rotateY:360,duration:18,repeat:-1,ease:'none',stagger:{each:1.8,repeat:-1}});
  gsap.to('.about-visual:after',{});

  // Soft sheen sweeps are intentionally infrequent to keep the design luxurious, not flashy.
  const sweep=()=>{
    gsap.fromTo('.floating-card:before',{xPercent:-20},{xPercent:245,duration:1.5,stagger:.22,ease:'power2.inOut'});
    gsap.fromTo('.about-visual:after',{xPercent:-10},{xPercent:235,duration:2.1,ease:'power2.inOut',delay:.35});
  };
  sweep(); const sweepTimer=setInterval(sweep,9000);
  addEventListener('pagehide',()=>clearInterval(sweepTimer),{once:true});

  // Pointer-based perspective is desktop-only and affects visual surfaces, never individual text glyphs.
  if(matchMedia('(pointer:fine) and (min-width:981px)').matches){
    const tiltTargets=gsap.utils.toArray('.portrait-frame,.practice-card,.about-visual,.principles-grid article');
    tiltTargets.forEach((surface)=>{
      surface.classList.add('tilt-surface');
      const strength=surface.matches('.portrait-frame,.about-visual')?7:4;
      surface.addEventListener('pointermove',(event)=>{
        const rect=surface.getBoundingClientRect();
        const px=(event.clientX-rect.left)/rect.width-.5;
        const py=(event.clientY-rect.top)/rect.height-.5;
        surface.classList.add('is-tilting');
        surface.style.setProperty('--mx',`${(px+.5)*100}%`);
        surface.style.setProperty('--my',`${(py+.5)*100}%`);
        gsap.to(surface,{rotateY:px*strength,rotateX:-py*strength,x:px*3,y:py*2,transformPerspective:1000,duration:.22,ease:'power2.out',overwrite:'auto'});
      });
      surface.addEventListener('pointerleave',()=>{
        surface.classList.remove('is-tilting');
        gsap.to(surface,{rotateY:0,rotateX:0,x:0,y:0,duration:.8,ease:'power3.out',overwrite:'auto'});
      });
    });
  }

  // Scroll-linked object depth; mild values retain mobile fluidity.
  gsap.fromTo('.hero-visual',{rotateX:2,rotateY:-3},{rotateX:-2,rotateY:3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:2}});
  gsap.fromTo('.practice-card:after',{},{});
  gsap.utils.toArray('.principles-grid article').forEach((panel,i)=>{
    gsap.fromTo(panel,{z:-24,rotateY:i%2?-2.5:2.5},{z:0,rotateY:0,ease:'none',scrollTrigger:{trigger:panel,start:'top 92%',end:'top 58%',scrub:1.4}});
  });
  ScrollTrigger.refresh();
}
