(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const desktop = window.matchMedia('(min-width: 981px)').matches;
  const gsapReady = Boolean(window.gsap && window.ScrollTrigger);

  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress span');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#main-nav');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  const updatePageChrome = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };

  updatePageChrome();
  window.addEventListener('scroll', updatePageChrome, { passive: true });
  window.addEventListener('resize', updatePageChrome, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-split]').forEach((element) => {
    const text = element.textContent.trim();
    element.setAttribute('aria-label', text);
    element.innerHTML = text
      .split(/\s+/)
      .map((word) => `<span class="word">${[...word].map((char) => `<span class="char">${char}</span>`).join('')}</span>`)
      .join(' ');
  });

  if (reducedMotion || !gsapReady) {
    document.querySelectorAll('.reveal,.reveal-visual,.char,.step').forEach((element) => {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.style.filter = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  const mm = gsap.matchMedia();

  // Initial hero choreography. Text and visual surfaces are animated independently.
  gsap.set('.hero .char', { y: 92, opacity: 0, rotateX: -58, transformOrigin: '50% 100%' });
  gsap.set('.hero .reveal', { y: 34, opacity: 0 });
  gsap.set('.hero .reveal-visual', { y: 26, opacity: 0, scale: 0.965 });

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.hero .char', { y: 0, opacity: 1, rotateX: 0, duration: 1.15, stagger: 0.012 })
    .to('.hero .reveal', { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 }, '-=0.72')
    .to('.hero .reveal-visual', { y: 0, opacity: 1, scale: 1, duration: 1.2 }, '-=0.85');

  // Section reveals remain scrubbed and naturally reverse when scrolling upward.
  document.querySelectorAll('main > section:not(.hero)').forEach((section) => {
    const chars = section.querySelectorAll('.char');
    const reveals = section.querySelectorAll('.reveal');

    if (chars.length) {
      gsap.fromTo(chars,
        { y: 58, opacity: 0, rotateX: -42 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.006,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 88%', end: 'top 38%', scrub: 1.05 }
        }
      );
    }

    if (reveals.length) {
      gsap.fromTo(reveals,
        { y: 38, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 86%', end: 'top 42%', scrub: 0.9 }
        }
      );
    }
  });

  // Background motion uses long distances and low amplitudes for depth without visual noise.
  gsap.to('.ambient i:nth-child(1)', { x: -70, y: 52, scale: 1.12, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.ambient i:nth-child(2)', { x: 88, y: -44, scale: 0.92, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.contact-orbit', { rotate: 360, duration: 48, repeat: -1, ease: 'none' });

  gsap.to('.hero-grid', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });

  gsap.to('.portrait-frame', {
    yPercent: -5,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 }
  });

  // Decorative depth objects are created once and never interfere with content layout.
  document.querySelectorAll('main > section:not(.hero)').forEach((section, index) => {
    if (section.querySelector(':scope > .motion-decor')) return;
    const decor = document.createElement('div');
    decor.className = `motion-decor motion-decor-${(index % 3) + 1}`;
    decor.setAttribute('aria-hidden', 'true');
    decor.innerHTML = '<i class="motion-ring"></i><i class="motion-plane"></i><i class="motion-dot"></i>';
    section.prepend(decor);

    gsap.fromTo(decor.querySelector('.motion-ring'),
      { rotateX: 58, rotateZ: index % 2 ? -12 : 12, scale: 0.84, y: 45 },
      {
        rotateX: 24,
        rotateZ: index % 2 ? 16 : -16,
        scale: 1.06,
        y: -42,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.8 }
      }
    );

    gsap.fromTo(decor.querySelector('.motion-plane'),
      { y: 70, rotateY: index % 2 ? 20 : -20 },
      {
        y: -58,
        rotateY: index % 2 ? -14 : 14,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2.1 }
      }
    );

    gsap.fromTo(decor.querySelector('.motion-dot'),
      { y: 24, scale: 0.8 },
      {
        y: -54,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.35 }
      }
    );
  });

  // Hourglass and method narrative.
  gsap.to('.hourglass', {
    rotate: 11,
    y: -72,
    ease: 'none',
    scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });
  gsap.to('.sand-stream', { scaleY: 0.1, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 72%', end: 'bottom 30%', scrub: 1 } });
  gsap.to('.sand-top', { scaleY: 0.42, transformOrigin: 'bottom', ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 72%', end: 'bottom 30%', scrub: 1 } });
  gsap.to('.sand-bottom', { scaleY: 1.24, transformOrigin: 'bottom', ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 72%', end: 'bottom 30%', scrub: 1 } });

  gsap.utils.toArray('.step').forEach((step) => {
    gsap.fromTo(step,
      { x: 28, opacity: 0.22 },
      { x: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: step, start: 'top 80%', end: 'top 46%', scrub: 0.9 } }
    );
  });
  gsap.to('.method-meter span', { width: '100%', ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 68%', end: 'bottom 58%', scrub: 1 } });

  gsap.fromTo('.about-visual',
    { clipPath: 'inset(8% 8% 8% 8%)', scale: 1.045 },
    { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top 88%', end: 'center 48%', scrub: 1.15 } }
  );

  gsap.utils.toArray('.principles-grid article').forEach((card) => {
    gsap.fromTo(card,
      { y: 46, opacity: 0.25 },
      { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 62%', scrub: 1 } }
    );
  });

  // Desktop horizontal practice showcase; mobile remains a normal, touch-friendly flow.
  mm.add('(min-width: 981px)', () => {
    const rail = document.querySelector('.practice-rail');
    if (!rail) return;
    const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + window.innerWidth * 0.12);
    const tween = gsap.to(rail, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.practice',
        start: 'top top',
        end: () => `+=${distance() + window.innerHeight * 0.75}`,
        pin: true,
        scrub: 1.15,
        invalidateOnRefresh: true
      }
    });

    gsap.utils.toArray('.practice-card').forEach((card, index) => {
      gsap.fromTo(card,
        { rotateY: index % 2 ? 4 : -4, y: 50, opacity: 0.4 },
        {
          rotateY: 0,
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 92%',
            end: 'center 68%',
            scrub: true
          }
        }
      );
    });
  });

  // Floating cards: one controlled animation source only. This prevents Android transform conflicts.
  mm.add('(min-width: 981px) and (pointer: fine)', () => {
    gsap.set('.floating-card', { clearProps: 'transform' });
    gsap.to('.card-one', { y: -10, rotateZ: -0.8, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.card-two', { y: 10, rotateZ: 0.8, duration: 4.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  });

  mm.add('(max-width: 980px), (pointer: coarse)', () => {
    gsap.killTweensOf('.floating-card');
    gsap.set('.floating-card', {
      clearProps: 'transform',
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1
    });
  });

  // Subtle icon rotation is desktop-only to protect mobile battery and compositing.
  mm.add('(min-width: 981px)', () => {
    gsap.to('.practice-card .icon', { rotateY: 360, duration: 22, repeat: -1, ease: 'none', stagger: 2.4 });
  });

  // Surface tilt is limited to pointer devices and never changes text flow.
  if (finePointer && desktop) {
    document.querySelectorAll('.portrait-frame,.practice-card,.about-visual,.principles-grid article').forEach((surface) => {
      const strength = surface.matches('.portrait-frame,.about-visual') ? 5 : 3;
      surface.classList.add('tilt-surface');

      surface.addEventListener('pointermove', (event) => {
        const rect = surface.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        surface.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
        surface.style.setProperty('--my', `${(py + 0.5) * 100}%`);
        gsap.to(surface, {
          rotateY: px * strength,
          rotateX: -py * strength,
          x: px * 2,
          y: py * 2,
          transformPerspective: 1100,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      surface.addEventListener('pointerleave', () => {
        gsap.to(surface, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.75, ease: 'power3.out', overwrite: 'auto' });
      });
    });
  }

  document.querySelectorAll('.magnetic').forEach((button) => {
    if (!finePointer) return;
    button.addEventListener('mousemove', (event) => {
      const rect = button.getBoundingClientRect();
      gsap.to(button, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.1,
        y: (event.clientY - rect.top - rect.height / 2) * 0.14,
        duration: 0.3,
        overwrite: 'auto'
      });
    });
    button.addEventListener('mouseleave', () => gsap.to(button, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,.4)' }));
  });

  if (finePointer) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      window.addEventListener('mousemove', (event) => {
        gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.14, ease: 'power2.out' });
      });
      document.querySelectorAll('a,button,summary').forEach((element) => {
        element.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2, background: 'rgba(255,255,255,.14)', duration: 0.22 }));
        element.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, background: 'transparent', duration: 0.22 }));
      });
    }
  }

  // Refresh after fonts and layout settle to avoid stale mobile measurements.
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
})();
