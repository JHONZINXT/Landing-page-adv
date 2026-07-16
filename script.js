const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const progress = document.querySelector('.progress span');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');

document.querySelector('#year').textContent = new Date().getFullYear();
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 30);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
});
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.querySelectorAll('[data-split]').forEach(el => {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.innerHTML = [...text].map(c => c === ' ' ? '<span class="char">&nbsp;</span>' : `<span class="char">${c}</span>`).join('');
});

if (!reduced && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.hero .char', {y: 90, opacity: 0, rotateX: -70, transformOrigin:'50% 100%'});
  gsap.set('.hero .reveal', {y: 35, opacity: 0});
  gsap.set('.hero .reveal-visual', {x: 80, opacity: 0, scale: .94});
  const intro = gsap.timeline({defaults:{ease:'power4.out'}});
  intro.to('.hero .char',{y:0,opacity:1,rotateX:0,duration:1.25,stagger:.018})
       .to('.hero .reveal',{y:0,opacity:1,duration:.9,stagger:.12},'-=.75')
       .to('.hero .reveal-visual',{x:0,opacity:1,scale:1,duration:1.3},'-=1.05');

  document.querySelectorAll('section:not(.hero)').forEach(section => {
    const chars = section.querySelectorAll('.char');
    if(chars.length) gsap.fromTo(chars,{y:65,opacity:0,rotateX:-55},{y:0,opacity:1,rotateX:0,stagger:.012,duration:.95,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 78%',end:'top 35%',toggleActions:'play none none reverse'}});
    const reveals = section.querySelectorAll('.reveal');
    if(reveals.length) gsap.fromTo(reveals,{y:45,opacity:0},{y:0,opacity:1,duration:1,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 76%',end:'top 30%',toggleActions:'play none none reverse'}});
  });

  gsap.utils.toArray('.reveal-card').forEach((card,i) => gsap.fromTo(card,{y:70,opacity:0,rotateY:i%2?7:-7},{y:0,opacity:1,rotateY:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 88%',toggleActions:'play none none reverse'}}));
  gsap.utils.toArray('.reveal-visual').slice(1).forEach(el => gsap.fromTo(el,{clipPath:'inset(12% 12% 12% 12%)',scale:1.08,opacity:.2},{clipPath:'inset(0% 0% 0% 0%)',scale:1,opacity:1,duration:1.4,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 82%',toggleActions:'play none none reverse'}}));

  gsap.to('.portrait-frame',{yPercent:-7,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
  gsap.to('.card-one',{y:-70,rotate:-2,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.5}});
  gsap.to('.card-two',{y:55,rotate:2,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.5}});
  gsap.to('.hourglass',{rotate:10,y:-70,scrollTrigger:{trigger:'.manifesto',start:'top bottom',end:'bottom top',scrub:1.5}});
  gsap.to('.sand-stream',{scaleY:.15,transformOrigin:'top',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 30%',scrub:1}});
  gsap.to('.sand-top',{scaleY:.45,transformOrigin:'bottom',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 30%',scrub:1}});
  gsap.to('.sand-bottom',{scaleY:1.2,transformOrigin:'bottom',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 30%',scrub:1}});

  gsap.utils.toArray('.step').forEach(step => ScrollTrigger.create({trigger:step,start:'top 62%',end:'bottom 40%',toggleClass:'active'}));
  gsap.to('.contact-orbit',{rotate:180,duration:30,repeat:-1,ease:'none'});
  gsap.set('.contact-orbit i:nth-child(1)',{left:'50%',top:0});
  gsap.set('.contact-orbit i:nth-child(2)',{right:'8%',top:'28%'});
  gsap.set('.contact-orbit i:nth-child(3)',{left:'14%',bottom:'18%'});

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {const r=btn.getBoundingClientRect();gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.18,duration:.35});});
    btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.55,ease:'elastic.out(1,.35)'}));
  });
} else {
  document.querySelectorAll('.reveal,.reveal-card,.reveal-visual,.char').forEach(el => {el.style.opacity=1;el.style.transform='none'});
}
