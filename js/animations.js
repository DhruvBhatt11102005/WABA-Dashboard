/* =========================================================
   WABA Dashboard — Motion Engine v6
   Theme ambient · Orchestrated entrances · Spring UX
   ========================================================= */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function staggerDelay(i, base = 0.05, step = 0.06) {
    return `${base + i * step}s`;
  }

  /* ── Theme ambient orbs ── */
  function initThemeAmbient() {
    if (reduced || document.querySelector('.theme-ambient')) return;

    const layer = document.createElement('div');
    layer.className = 'theme-ambient';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = `
      <span class="ambient-orb ambient-orb-1"></span>
      <span class="ambient-orb ambient-orb-2"></span>
      <span class="ambient-orb ambient-orb-3"></span>
    `;
    document.body.prepend(layer);
  }

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-stagger, .chart-container');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  /* ── Ripple ── */
  function initRipple() {
    if (reduced) return;

    document.querySelectorAll(
      '.btn-primary, .btn-secondary, .quick-action-card, .view-all-btn, .nav-item, .activity-row.is-clickable'
    ).forEach(el => {
      el.classList.add('ripple-host');
      el.addEventListener('click', function (e) {
        const rect = el.getBoundingClientRect();
        const wave = document.createElement('span');
        wave.className = 'ripple-wave';
        wave.style.left = (e.clientX - rect.left) + 'px';
        wave.style.top  = (e.clientY - rect.top) + 'px';
        el.appendChild(wave);
        wave.addEventListener('animationend', () => wave.remove());
      });
    });
  }

  /* ── Magnetic tilt (subtle) ── */
  function initMagneticTilt() {
    if (reduced) return;

    document.querySelectorAll('.quick-action-card').forEach(card => {
      card.addEventListener('mousemove', function (e) {
        const rect  = card.getBoundingClientRect();
        const dx    = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy    = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        const tiltX = -(dy * 4);
        const tiltY =   dx * 4;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ── Stat card cursor glow ── */
  function initStatCardGlow() {
    if (reduced) return;

    document.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--glow-x', `${x}%`);
        card.style.setProperty('--glow-y', `${y}%`);
      });
    });
  }

  /* ── Banner particles ── */
  function initBannerParticles() {
    if (reduced) return;

    const banner = document.querySelector('.welcome-banner');
    if (!banner) return;

    [
      { w: 70, top: '12%', left: '58%', color: 'rgba(37,99,235,0.09)',  dur: '7s',  delay: '0s'   },
      { w: 45, top: '65%', left: '72%', color: 'rgba(14,165,233,0.10)', dur: '9s',  delay: '1s'   },
      { w: 30, top: '25%', left: '88%', color: 'rgba(37,99,235,0.08)', dur: '6s',  delay: '0.5s' },
    ].forEach(p => {
      const orb = document.createElement('span');
      orb.className = 'banner-particle';
      orb.style.cssText = `width:${p.w}px;height:${p.w}px;top:${p.top};left:${p.left};background:${p.color};--dur:${p.dur};--delay:${p.delay}`;
      banner.appendChild(orb);
    });
  }

  /* ── Orchestrated welcome entrance ── */
  function initWelcomeEntrance() {
    const banner = document.querySelector('.welcome-banner');
    if (!banner) return;

    const items = [
      banner.querySelector('.welcome-text h1'),
      banner.querySelector('.welcome-text p'),
      ...banner.querySelectorAll('.welcome-actions > *'),
    ].filter(Boolean);

    if (reduced) return;

    items.forEach((el, i) => {
      el.classList.add('enter-item');
      el.style.transitionDelay = staggerDelay(i, 0.1, 0.08);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('is-entered'));
      });
    });
  }

  /* ── Sidebar nav stagger ── */
  function initSidebarStagger() {
    if (reduced) return;

    document.querySelectorAll('.nav-item').forEach((item, i) => {
      item.classList.add('enter-item');
      item.style.transitionDelay = staggerDelay(i, 0.15, 0.03);
      requestAnimationFrame(() => {
        setTimeout(() => item.classList.add('is-entered'), 50);
      });
    });
  }

  /* ── Staggered lists ── */
  function initStaggeredLists() {
    document.querySelectorAll('.activity-list').forEach(list => {
      Array.from(list.children).forEach((row, i) => {
        row.classList.add('list-row-animate');
        row.style.animationDelay = staggerDelay(i, 0.1, 0.08);
      });
    });
  }

  /* ── Card pop-in ── */
  function initCardPopIn() {
    if (reduced) {
      document.querySelectorAll('.card').forEach(c => c.style.opacity = '1');
      return;
    }

    document.querySelectorAll('.card').forEach((card, i) => {
      card.classList.add('card-pop');
      card.style.animationDelay = staggerDelay(i, 0.18, 0.07);
      card.style.animationFillMode = 'both';
    });
  }

  /* ── Page content entrance ── */
  function initPageEntrance() {
    const content = document.querySelector('.page-content');
    if (!content) return;

    if (reduced) {
      content.classList.add('is-entered');
      return;
    }

    content.classList.add('is-entering');
    requestAnimationFrame(() => {
      content.classList.remove('is-entering');
      content.classList.add('is-entered');
    });
  }

  /* ── Enhanced counter with tick ── */
  function enhanceCounters() {
    const original = window.animateCounter;
    if (!original) return;

    window.animateCounter = function (el, target, duration, prefix, suffix) {
      let last = 0;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(target * ease);
        if (current !== last) {
          el.textContent = (prefix || '') + current.toLocaleString() + (suffix || '');
          if (!reduced) {
            el.classList.remove('is-counting');
            void el.offsetWidth;
            el.classList.add('is-counting');
          }
          last = current;
        }
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
  }

  /* ── Avatar & bell micro-interactions ── */
  function initAvatarSpin() {
    const avatar = document.getElementById('user-avatar-btn');
    if (!avatar || reduced) return;

    avatar.addEventListener('click', () => {
      avatar.style.transform = 'rotate(360deg) scale(1.1)';
      setTimeout(() => { avatar.style.transform = ''; }, 500);
    });
  }

  function initBellWobble() {
    const btn = document.getElementById('notifications-btn');
    if (!btn || reduced) return;

    btn.addEventListener('click', () => {
      btn.classList.remove('bell-ringing');
      void btn.offsetWidth;
      btn.classList.add('bell-ringing');
    });

    if (!document.getElementById('bell-wobble-style')) {
      const style = document.createElement('style');
      style.id = 'bell-wobble-style';
      style.textContent = `
        @keyframes bell-wobble {
          0%,100% { transform: rotate(0); }
          20% { transform: rotate(12deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(6deg); }
          80% { transform: rotate(-4deg); }
        }
        .bell-ringing svg { animation: bell-wobble 0.5s ease; }
      `;
      document.head.appendChild(style);
    }
  }

  /* ── Bootstrap ── */
  onReady(function () {
    initThemeAmbient();
    initPageEntrance();
    initScrollReveal();
    initRipple();
    initMagneticTilt();
    initStatCardGlow();
    initBannerParticles();
    initWelcomeEntrance();
    initSidebarStagger();
    initStaggeredLists();
    initCardPopIn();
    initAvatarSpin();
    initBellWobble();
    enhanceCounters();

    // Re-run sidebar stagger after nav injects
    setTimeout(initSidebarStagger, 120);
  });

})();
