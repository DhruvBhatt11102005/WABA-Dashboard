/* ─── Sidebar JS ────────────────────────────────────────── */
(function () {
  'use strict';

  const layout    = document.querySelector('.app-layout');
  const sidebar   = document.querySelector('.sidebar');
  const toggle    = document.getElementById('sidebar-toggle');
  const mobileBtn = document.getElementById('mobile-menu-btn');

  // Create overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  /* ── Desktop collapse / expand ── */
  if (toggle) {
    toggle.addEventListener('click', () => {
      layout.classList.toggle('sidebar-collapsed');
      const collapsed = layout.classList.contains('sidebar-collapsed');
      localStorage.setItem('sidebar-collapsed', collapsed);
    });
  }

  // Restore state
  if (localStorage.getItem('sidebar-collapsed') === 'true') {
    layout.classList.add('sidebar-collapsed');
  }

  /* ── Mobile menu ── */
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    });
  }

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
  });

  /* ── Active nav item highlighting ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item[data-page]');

  navItems.forEach(item => {
    const page = item.getAttribute('data-page');
    if (page === currentPage || (currentPage === '' && page === 'index.html')) {
      item.classList.add('active');
    }
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* ── Live clock (header) ── */
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const clockEl = document.getElementById('live-clock-time');
    const bannerTimeEl = document.getElementById('banner-time');
    const bannerDateEl = document.getElementById('banner-date');

    if (clockEl) clockEl.textContent = timeStr;
    if (bannerTimeEl) bannerTimeEl.textContent = timeStr;
    if (bannerDateEl) bannerDateEl.textContent = dateStr;
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ── Animated counter ── */
  window.animateCounter = function (el, target, duration = 1200, prefix = '', suffix = '') {
    const start = performance.now();
    const from  = 0;

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current  = Math.floor(from + (target - from) * ease);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  /* ── Trigger counters on page load ── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      window.animateCounter(el, target, 1200, prefix, suffix);
    });
  });

  /* ── Toast helper ── */
  window.showToast = function (message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = {
      success: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
      error:   '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      info:    '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="3" stroke-linecap="round"/></svg>',
    };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  /* ── Copy to clipboard ── */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('data-copy'));
      if (target) {
        navigator.clipboard.writeText(target.textContent.trim()).then(() => {
          window.showToast('Copied to clipboard!', 'success');
        });
      }
    });
  });

})();
