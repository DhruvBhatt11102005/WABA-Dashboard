/* =========================================================
   WABA Dashboard — Premium Animations Engine
   Handles: scroll-reveal, ripple, magnetic tilt, particles,
            staggered lists, typewriter, card-pop entrance
   ========================================================= */
(function () {
  'use strict';

  /* ── Wait for DOM ── */
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ──────────────────────────────────────────────────────
     1. SCROLL-REVEAL  (IntersectionObserver)
     .reveal / .reveal-left  → individual element
     .reveal-stagger          → parent; children cascade via CSS
  ────────────────────────────────────────────────────── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-stagger').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const opts = { threshold: 0.10, rootMargin: '0px 0px -32px 0px' };

    // Single elements
    const singles = document.querySelectorAll('.reveal, .reveal-left');
    const singleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          singleObserver.unobserve(entry.target);
        }
      });
    }, opts);
    singles.forEach(el => singleObserver.observe(el));

    // Stagger containers — add is-visible to the parent
    const staggerContainers = document.querySelectorAll('.reveal-stagger');
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, opts);
    staggerContainers.forEach(el => staggerObserver.observe(el));
  }


  /* ──────────────────────────────────────────────────────
     2. RIPPLE EFFECT on buttons / quick-action cards
     Adds class="ripple-host" and injects .ripple-wave on click.
  ────────────────────────────────────────────────────── */
  function initRipple() {
    const rippleSelectors = [
      '.btn-primary',
      '.btn-secondary',
      '.quick-action-card',
      '.view-all-btn',
      '.nav-item',
    ];

    document.querySelectorAll(rippleSelectors.join(', ')).forEach(el => {
      el.classList.add('ripple-host');

      el.addEventListener('click', function (e) {
        const rect   = el.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;

        const wave = document.createElement('span');
        wave.className  = 'ripple-wave';
        wave.style.left = x + 'px';
        wave.style.top  = y + 'px';
        el.appendChild(wave);

        wave.addEventListener('animationend', () => wave.remove());
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     3. MAGNETIC 3-D TILT on Quick-Action cards
     Gives a subtle perspective tilt tracking the mouse.
  ────────────────────────────────────────────────────── */
  function initMagneticTilt() {
    document.querySelectorAll('.quick-action-card').forEach(card => {
      card.addEventListener('mousemove', function (e) {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);  // -1 to 1
        const dy     = (e.clientY - cy) / (rect.height / 2);  // -1 to 1
        const tiltX  = -(dy * 8);   // max ±8deg
        const tiltY  =   dx * 8;

        card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
        card.style.boxShadow = `${-tiltY * 1.5}px ${tiltX * 1.5}px 20px rgba(37,99,235,0.15)`;
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';
        setTimeout(() => { card.style.transition = ''; }, 350);
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     3b. STAT CARD MOUSE GLOW
     Ambient light tracks the cursor on stat cards.
  ────────────────────────────────────────────────────── */
  function initStatCardGlow() {
    document.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%), var(--bg-card)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     4. FLOATING PARTICLES on the welcome banner
     Creates 6 soft-glowing orbs that drift freely.
  ────────────────────────────────────────────────────── */
  function initBannerParticles() {
    const banner = document.querySelector('.welcome-banner');
    if (!banner) return;

    const particles = [
      { w: 80,  h: 80,  top: '10%',  left: '55%', color: 'rgba(37,99,235,0.10)',  dur: '6s',  delay: '0s'    },
      { w: 50,  h: 50,  top: '60%',  left: '70%', color: 'rgba(14,165,233,0.12)', dur: '8s',  delay: '1.2s'  },
      { w: 35,  h: 35,  top: '20%',  left: '85%', color: 'rgba(37,99,235,0.10)', dur: '5s',  delay: '0.6s'  },
      { w: 60,  h: 60,  top: '70%',  left: '40%', color: 'rgba(37,99,235,0.07)',  dur: '7s',  delay: '2s'    },
      { w: 28,  h: 28,  top: '40%',  left: '60%', color: 'rgba(20,184,166,0.10)', dur: '9s',  delay: '0.3s'  },
      { w: 45,  h: 45,  top: '80%',  left: '80%', color: 'rgba(245,158,11,0.08)', dur: '6.5s',delay: '1.8s'  },
    ];

    particles.forEach(p => {
      const orb = document.createElement('span');
      orb.className = 'banner-particle';
      orb.style.cssText = [
        `width:${p.w}px`, `height:${p.h}px`,
        `top:${p.top}`, `left:${p.left}`,
        `background:${p.color}`,
        `--dur:${p.dur}`, `--delay:${p.delay}`,
        'filter:blur(2px)',
      ].join(';');
      banner.appendChild(orb);
    });
  }

  /* ──────────────────────────────────────────────────────
     5. STAGGERED LIST ROW ENTRANCE
     Cascades campaign and reply list rows in.
  ────────────────────────────────────────────────────── */
  function initStaggeredLists() {
    // Target direct children inside list containers
    const listContainers = document.querySelectorAll(
      '.stats-grid, .quick-actions-grid'
    );

    // Also target inline list rows (the campaign / replies rows)
    const rowContainers = document.querySelectorAll('.section-grid .card');

    rowContainers.forEach(card => {
      // Find flex column containers holding list rows
      const listDivs = card.querySelectorAll('div[style*="flex-direction: column"]');
      listDivs.forEach(listDiv => {
        Array.from(listDiv.children).forEach((row, i) => {
          row.classList.add('list-row-animate');
          row.style.animationDelay = `${0.05 + i * 0.10}s`;
          row.style.animationFillMode = 'both';
        });
      });
    });

    // Card grid children
    listContainers.forEach(container => {
      Array.from(container.children).forEach((child, i) => {
        child.style.animationDelay = `${0.05 + i * 0.08}s`;
        child.style.animationFillMode = 'both';
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     6. TYPEWRITER on welcome heading (h1 inside .welcome-banner)
     Types out the greeting text character by character.
  ────────────────────────────────────────────────────── */
  function initTypewriter() {
    const h1 = document.querySelector('.welcome-banner .welcome-text h1');
    if (!h1) return;

    const fullText = h1.textContent.trim();
    h1.textContent = '';
    h1.style.minHeight = '1.2em'; // prevent layout shift

    // Use Array.from so multi-byte emoji are treated as single characters
    const chars = Array.from(fullText);
    let i = 0;
    const speed = 40; // ms per character

    // Regex to match emoji / non-BMP characters
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

    function wrapEmojis(el) {
      // Replace textContent with innerHTML wrapping emojis in spans
      const raw = el.textContent;
      el.innerHTML = raw.replace(emojiRegex, (match) =>
        `<span class="h1-emoji">${match}</span>`
      );
    }

    function type() {
      if (i < chars.length) {
        h1.textContent += chars[i++];
        setTimeout(type, speed);
      } else {
        // Wrap emojis so they are visible over gradient clip
        wrapEmojis(h1);
        // Add blinking cursor class when done
        h1.classList.add('typewriter-done');
      }
    }

    // Delay slightly so the page paints first
    setTimeout(type, 350);
  }


  /* ──────────────────────────────────────────────────────
     7. CARD POP-IN ENTRANCE (section cards on load)
  ────────────────────────────────────────────────────── */
  function initCardPopIn() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.classList.add('card-pop');
      card.style.animationDelay = `${0.12 + i * 0.07}s`;
      card.style.animationFillMode = 'both';
    });
  }

  /* ──────────────────────────────────────────────────────
     8. HEADER AVATAR SPIN on click
  ────────────────────────────────────────────────────── */
  function initAvatarSpin() {
    const avatar = document.getElementById('user-avatar-btn');
    if (!avatar) return;

    avatar.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    avatar.style.cursor = 'pointer';

    avatar.addEventListener('click', function () {
      avatar.style.transform = 'rotate(360deg) scale(1.12)';
      setTimeout(() => {
        avatar.style.transform = '';
      }, 600);
    });

    avatar.addEventListener('mouseenter', function () {
      avatar.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.3)';
    });

    avatar.addEventListener('mouseleave', function () {
      avatar.style.boxShadow = '';
    });
  }

  /* ──────────────────────────────────────────────────────
     9. NOTIFICATION BELL WOBBLE on click
  ────────────────────────────────────────────────────── */
  function initBellWobble() {
    const btn = document.getElementById('notifications-btn');
    if (!btn) return;

    const wobbleStyle = document.createElement('style');
    wobbleStyle.textContent = `
      @keyframes bell-wobble {
        0%,100% { transform: rotate(0deg); }
        15%      { transform: rotate(15deg); }
        30%      { transform: rotate(-12deg); }
        45%      { transform: rotate(9deg); }
        60%      { transform: rotate(-6deg); }
        75%      { transform: rotate(4deg); }
      }
      .bell-ringing svg { animation: bell-wobble 0.55s ease; }
    `;
    document.head.appendChild(wobbleStyle);

    btn.addEventListener('click', function () {
      btn.classList.remove('bell-ringing');
      // Force reflow
      void btn.offsetWidth;
      btn.classList.add('bell-ringing');
      btn.addEventListener('animationend', () => btn.classList.remove('bell-ringing'), { once: true });
    });
  }

  /* ──────────────────────────────────────────────────────
     11. CURSOR BUBBLE TRACKER
  ────────────────────────────────────────────────────── */
  function initCursorTracker() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-bubble';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      
      // Randomly drop small bubbles while moving (increased density)
      if (Math.random() < 0.90) {
        createTrailingBubble(e.clientX, e.clientY);
        
        // Spawn an extra offset bubble occasionally for richness
        if (Math.random() < 0.40) {
          const offsetX = (Math.random() - 0.5) * 16;
          const offsetY = (Math.random() - 0.5) * 16;
          createTrailingBubble(e.clientX + offsetX, e.clientY + offsetY);
        }
      }
    });

    function animate() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function createTrailingBubble(x, y) {
      const bubble = document.createElement('div');
      bubble.className = 'cursor-trail-bubble';
      bubble.style.left = x + 'px';
      bubble.style.top = y + 'px';
      
      const size = Math.random() * 8 + 4;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      
      document.body.appendChild(bubble);
      
      // Animate float up and fade
      requestAnimationFrame(() => {
        bubble.style.transform = `translate(-50%, -150%) scale(1.5)`;
        bubble.style.opacity = '0';
      });

      setTimeout(() => {
        bubble.remove();
      }, 1000);
    }
  }

  /* ──────────────────────────────────────────────────────
     12. SMOOTH PAGE TRANSITION (fade-out on navigation)
  ────────────────────────────────────────────────────── */
  function initPageTransition() {
    // Fade in the page on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);

    // Fade out before navigating away
    document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('javascript') && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          document.body.style.opacity = '0';
          setTimeout(() => { window.location.href = href; }, 280);
        }
      });
    });
  }

  /* ── Bootstrap everything on DOM ready ── */
  onReady(function () {
    initScrollReveal();
    initRipple();
    initMagneticTilt();
    initStatCardGlow();
    initBannerParticles();
    initStaggeredLists();
    initTypewriter();
    initCardPopIn();
    initAvatarSpin();
    initBellWobble();
    initCursorTracker();
    initPageTransition();
  });

})();
