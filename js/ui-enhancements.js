/* ─── WABA Dashboard — UI/UX Enhancements ───────────────── */
(function () {
  'use strict';

  const PAGES_PREFIX = window.PAGES_PREFIX || '';
  const P = PAGES_PREFIX;
  const SETTINGS_KEY = 'waba-settings';

  const COMMANDS = [
    { title: 'Dashboard', desc: 'Overview & analytics', href: P + 'index.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
    { title: 'My Devices', desc: 'Manage WhatsApp devices', href: P + 'pages/my-devices.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="3" stroke-linecap="round"/></svg>' },
    { title: 'My Templates', desc: 'Message templates', href: P + 'pages/my-templates.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
    { title: 'Send Message', desc: 'Compose & send', href: P + 'pages/send-message.html', group: 'Actions', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' },
    { title: 'Live Chat', desc: 'Real-time conversations', href: P + 'pages/live-chat.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' },
    { title: 'Campaigns', desc: 'Bulk messaging', href: P + 'pages/campaigns.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
    { title: 'Drip Campaigns', desc: 'Automated sequences', href: P + 'pages/drip-campaigns.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>' },
    { title: 'Auto Reply', desc: 'Automation rules', href: P + 'pages/auto-reply.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6l4 2"/></svg>' },
    { title: 'Message Reports', desc: 'Delivery analytics', href: P + 'pages/message-reports.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
    { title: 'Message Response', desc: 'Incoming replies', href: P + 'pages/message-response.html', group: 'Pages', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>' },
    { title: 'API Credentials', desc: 'Keys & webhooks', href: P + 'pages/api-credentials.html', group: 'Settings', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>' },
    { title: 'New Campaign', desc: 'Start a broadcast', href: P + 'pages/campaigns.html', group: 'Actions', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' },
    { title: 'Open Settings', desc: 'Preferences & account', action: 'open-settings', group: 'Actions', icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
  ];

  const NOTIFICATIONS = [
    { icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>', type: 'blue', title: 'New reply from Rahul', desc: 'Yes please send more details!', time: '2 min ago', unread: true },
    { icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>', type: 'green', title: 'Campaign delivered', desc: 'Summer Sale 2026 — 98% delivery rate', time: '15 min ago', unread: true },
    { icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="3" stroke-linecap="round"/></svg>', type: 'amber', title: 'Device reconnect needed', desc: 'One device went offline', time: '1 hour ago', unread: false },
  ];

  const SETTINGS_SVG = {
    bell: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
    gear: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  };

  let openSettingsModal = null;

  function getSettings() {
    try {
      return { emailAlerts: true, soundAlerts: false, compactSidebar: false, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
    } catch { return { emailAlerts: true, soundAlerts: false, compactSidebar: false }; }
  }

  function saveSettings(data) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...getSettings(), ...data }));
  }

  /* ── Normalize header buttons on all pages ── */
  function initHeaderButtons() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    const avatar = headerRight.querySelector('.header-avatar');
    if (avatar && !avatar.id) {
      avatar.id = 'user-avatar-btn';
      avatar.style.cursor = 'pointer';
    }

    if (!document.getElementById('notifications-btn')) {
      const existing = headerRight.querySelector('.header-btn[title="Notifications"]');
      if (existing) {
        existing.id = 'notifications-btn';
        existing.setAttribute('aria-label', 'Notifications');
      } else {
        const btn = document.createElement('button');
        btn.className = 'header-btn';
        btn.id = 'notifications-btn';
        btn.setAttribute('aria-label', 'Notifications');
        btn.innerHTML = SETTINGS_SVG.bell + '<span class="notif-dot"></span>';
        headerRight.insertBefore(btn, avatar);
      }
    }

    if (!document.getElementById('settings-btn')) {
      const existing = headerRight.querySelector('.header-btn[aria-label="Settings"]');
      if (existing) {
        existing.id = 'settings-btn';
      } else {
        const btn = document.createElement('button');
        btn.className = 'header-btn';
        btn.id = 'settings-btn';
        btn.setAttribute('aria-label', 'Settings');
        btn.innerHTML = SETTINGS_SVG.gear;
        headerRight.insertBefore(btn, avatar);
      }
    } else {
      const s = document.getElementById('settings-btn');
      if (!s.getAttribute('aria-label')) s.setAttribute('aria-label', 'Settings');
    }
  }

  /* ── Page progress bar ── */
  function initPageProgress() {
    const bar = document.createElement('div');
    bar.className = 'page-progress';
    document.body.appendChild(bar);

    requestAnimationFrame(() => { bar.style.width = '70%'; });
    window.addEventListener('load', () => {
      bar.style.width = '100%';
      setTimeout(() => { bar.style.opacity = '0'; }, 300);
      setTimeout(() => bar.remove(), 600);
    });

    document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('javascript') || e.ctrlKey || e.metaKey) return;
        const bar2 = document.createElement('div');
        bar2.className = 'page-progress';
        document.body.appendChild(bar2);
        requestAnimationFrame(() => { bar2.style.width = '40%'; });
      });
    });
  }

  /* ── Dashboard skeleton loaders ── */
  function initDashboardSkeleton() {
    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid) return;

    const skeleton = document.createElement('div');
    skeleton.className = 'dashboard-skeleton';
    skeleton.innerHTML = `
      <div class="skeleton-stats">
        ${[1, 2, 3, 4].map(() => `
          <div class="skeleton-stat-card">
            <div class="seawind-skeleton circle" style="width:44px;height:44px;"></div>
            <div class="seawind-skeleton title" style="width:60%;margin-top:16px;"></div>
            <div class="seawind-skeleton text" style="width:40%;margin-top:8px;"></div>
          </div>
        `).join('')}
      </div>
    `;

    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
      pageContent.classList.add('is-skeleton-loading');
      pageContent.prepend(skeleton);
    }

    setTimeout(() => {
      skeleton.style.opacity = '0';
      setTimeout(() => {
        skeleton.remove();
        pageContent?.classList.remove('is-skeleton-loading');
      }, 300);
    }, 650);
  }

  /* ── Header search + command palette ── */
  function initCommandPalette() {
    const header = document.querySelector('.header');
    if (!header || document.getElementById('header-search-trigger')) return;

    const headerLeft = header.querySelector('.header-left');
    const headerRight = header.querySelector('.header-right');
    if (!headerLeft || !headerRight) return;

    const center = document.createElement('div');
    center.className = 'header-center';
    center.innerHTML = `
      <div class="header-search" id="header-search-trigger" role="button" tabindex="0" aria-label="Search pages and actions">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Search pages, actions…" readonly aria-hidden="true"/>
        <kbd>Ctrl K</kbd>
      </div>
    `;
    headerLeft.after(center);

    const overlay = document.createElement('div');
    overlay.className = 'command-palette-overlay';
    overlay.id = 'command-palette';
    overlay.innerHTML = `
      <div class="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="command-palette-header">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" id="command-input" placeholder="Type to search…" autocomplete="off"/>
        </div>
        <div class="command-palette-results" id="command-results"></div>
        <div class="command-palette-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#command-input');
    const results = overlay.querySelector('#command-results');
    let selectedIndex = 0;
    let filtered = [...COMMANDS];

    function runCommand(cmd) {
      if (cmd.action === 'open-settings') {
        closePalette();
        openSettingsModal && openSettingsModal();
        return;
      }
      if (cmd.href) window.location.href = cmd.href;
    }

    function renderResults(items) {
      filtered = items;
      selectedIndex = 0;
      const groups = {};
      items.forEach(item => {
        if (!groups[item.group]) groups[item.group] = [];
        groups[item.group].push(item);
      });

      results.innerHTML = Object.entries(groups).map(([group, cmds]) => `
        <div class="command-group-label">${group}</div>
        ${cmds.map((cmd) => {
          const idx = items.indexOf(cmd);
          const tag = cmd.href ? 'a' : 'button';
          const hrefAttr = cmd.href ? `href="${cmd.href}"` : 'type="button"';
          return `
            <${tag} ${hrefAttr} class="command-item${idx === selectedIndex ? ' is-selected' : ''}" data-index="${idx}"${cmd.action ? ` data-action="${cmd.action}"` : ''}>
              <span class="command-item-icon">${cmd.icon}</span>
              <span class="command-item-text">
                <div class="command-item-title">${cmd.title}</div>
                <div class="command-item-desc">${cmd.desc}</div>
              </span>
            </${tag}>
          `;
        }).join('')}
      `).join('') || '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">No results found</div>';

      results.querySelectorAll('.command-item').forEach(el => {
        el.addEventListener('click', e => {
          if (el.dataset.action) {
            e.preventDefault();
            runCommand({ action: el.dataset.action });
          } else {
            closePalette();
          }
        });
      });
    }

    function openPalette() {
      overlay.classList.add('is-open');
      input.value = '';
      renderResults(COMMANDS);
      setTimeout(() => input.focus(), 50);
      document.body.style.overflow = 'hidden';
    }

    function closePalette() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function filterCommands(query) {
      const q = query.toLowerCase().trim();
      if (!q) return COMMANDS;
      return COMMANDS.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
      );
    }

    function updateSelection(delta) {
      if (!filtered.length) return;
      selectedIndex = (selectedIndex + delta + filtered.length) % filtered.length;
      results.querySelectorAll('.command-item').forEach(el => {
        el.classList.toggle('is-selected', parseInt(el.dataset.index, 10) === selectedIndex);
      });
      const selected = results.querySelector('.command-item.is-selected');
      if (selected) selected.scrollIntoView({ block: 'nearest' });
    }

    document.getElementById('header-search-trigger').addEventListener('click', openPalette);
    document.getElementById('header-search-trigger').addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPalette(); }
    });

    overlay.addEventListener('click', e => { if (e.target === overlay) closePalette(); });

    input.addEventListener('input', () => renderResults(filterCommands(input.value)));

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); updateSelection(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); updateSelection(-1); }
      else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        runCommand(filtered[selectedIndex]);
      }
      else if (e.key === 'Escape') closePalette();
    });

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.contains('is-open') ? closePalette() : openPalette();
      }
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePalette();
    });
  }

  /* ── Notification panel ── */
  function initNotifications() {
    const btn = document.getElementById('notifications-btn');
    if (!btn || btn.dataset.enhanced) return;
    btn.dataset.enhanced = '1';

    const wrap = document.createElement('div');
    wrap.className = 'header-btn-wrap';
    btn.parentNode.insertBefore(wrap, btn);
    wrap.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = 'notif-panel';
    panel.innerHTML = `
      <div class="notif-panel-header">
        <h3>Notifications</h3>
        <span id="mark-all-read">Mark all read</span>
      </div>
      <div class="notif-panel-list">
        ${NOTIFICATIONS.map(n => `
          <div class="notif-item${n.unread ? ' unread' : ''}">
            <div class="notif-icon ${n.type}">${n.icon}</div>
            <div class="notif-content">
              <div class="notif-title">${n.title}</div>
              <div class="notif-desc">${n.desc}</div>
              <div class="notif-time">${n.time}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    wrap.appendChild(panel);

    btn.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('is-open');
      document.querySelector('.user-menu')?.classList.remove('is-open');
    });

    document.getElementById('mark-all-read').addEventListener('click', () => {
      panel.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
      const dot = btn.querySelector('.notif-dot');
      if (dot) dot.style.display = 'none';
      window.showToast && window.showToast('All notifications marked as read', 'success');
    });

    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) panel.classList.remove('is-open');
    });
  }

  /* ── User profile dropdown ── */
  function initUserMenu() {
    const avatar = document.getElementById('user-avatar-btn');
    if (!avatar || avatar.dataset.enhanced) return;
    avatar.dataset.enhanced = '1';

    const wrap = document.createElement('div');
    wrap.className = 'header-avatar-wrap';
    avatar.parentNode.insertBefore(wrap, avatar);
    wrap.appendChild(avatar);

    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.innerHTML = `
      <div class="user-menu-header">
        <div class="user-menu-avatar">EE</div>
        <div>
          <div class="user-menu-name">EE Admin</div>
          <div class="user-menu-email">admin@ee.com</div>
        </div>
      </div>
      <div class="user-menu-divider"></div>
      <a href="${P}pages/api-credentials.html" class="user-menu-item">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
        API Credentials
      </a>
      <button type="button" class="user-menu-item" id="user-menu-settings">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        Settings
      </button>
      <div class="user-menu-divider"></div>
      <button type="button" class="user-menu-item user-menu-item-danger" id="user-menu-signout">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign out
      </button>
    `;
    wrap.appendChild(menu);

    avatar.addEventListener('click', e => {
      e.stopPropagation();
      menu.classList.toggle('is-open');
      document.querySelector('.notif-panel')?.classList.remove('is-open');
    });

    document.getElementById('user-menu-settings').addEventListener('click', () => {
      menu.classList.remove('is-open');
      openSettingsModal && openSettingsModal();
    });

    document.getElementById('user-menu-signout').addEventListener('click', () => {
      menu.classList.remove('is-open');
      window.showToast && window.showToast('Signed out (demo)', 'info');
    });

    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) menu.classList.remove('is-open');
    });
  }

  /* ── Settings modal ── */
  function initSettingsModal() {
    if (document.getElementById('settings-modal')) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'settings-modal';
    overlay.innerHTML = `
      <div class="modal settings-modal" role="dialog" aria-modal="true" aria-label="Settings">
        <div class="modal-header">
          <h2>Settings</h2>
          <button type="button" class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="settings-group">
            <h3>Notifications</h3>
            <label class="settings-row">
              <span>Email alerts for new messages</span>
              <input type="checkbox" id="setting-email-alerts" class="settings-toggle"/>
            </label>
            <label class="settings-row">
              <span>Sound alerts</span>
              <input type="checkbox" id="setting-sound-alerts" class="settings-toggle"/>
            </label>
          </div>
          <div class="settings-group">
            <h3>Appearance</h3>
            <label class="settings-row">
              <span>Compact sidebar</span>
              <input type="checkbox" id="setting-compact-sidebar" class="settings-toggle"/>
            </label>
          </div>
          <div class="settings-group">
            <h3>Account</h3>
            <div class="settings-field">
              <label for="setting-timezone">Timezone</label>
              <select id="setting-timezone" class="form-select">
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New York</option>
                <option value="Europe/London">Europe/London</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-secondary" id="settings-cancel">Cancel</button>
          <button type="button" class="btn-primary" id="settings-save">Save Changes</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    function loadForm() {
      const s = getSettings();
      document.getElementById('setting-email-alerts').checked = s.emailAlerts;
      document.getElementById('setting-sound-alerts').checked = s.soundAlerts;
      document.getElementById('setting-compact-sidebar').checked = s.compactSidebar;
      if (s.timezone) document.getElementById('setting-timezone').value = s.timezone;
    }

    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    openSettingsModal = function () {
      loadForm();
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    overlay.querySelector('.modal-close').addEventListener('click', close);
    document.getElementById('settings-cancel').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    document.getElementById('settings-save').addEventListener('click', () => {
      saveSettings({
        emailAlerts: document.getElementById('setting-email-alerts').checked,
        soundAlerts: document.getElementById('setting-sound-alerts').checked,
        compactSidebar: document.getElementById('setting-compact-sidebar').checked,
        timezone: document.getElementById('setting-timezone').value,
      });
      const layout = document.querySelector('.app-layout');
      if (layout) {
        layout.classList.toggle('sidebar-collapsed', document.getElementById('setting-compact-sidebar').checked);
        localStorage.setItem('sidebar-collapsed', document.getElementById('setting-compact-sidebar').checked);
      }
      close();
      window.showToast && window.showToast('Settings saved', 'success');
    });

    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => openSettingsModal());
    }

    const saved = getSettings();
    if (saved.compactSidebar) {
      document.querySelector('.app-layout')?.classList.add('sidebar-collapsed');
    }
  }

  /* ── Table & list search filters ── */
  function initSearchFilters() {
    document.querySelectorAll('[data-filter-target]').forEach(input => {
      const selector = input.getAttribute('data-filter-target');
      const targets = document.querySelectorAll(selector);
      if (!targets.length) return;

      input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        let visible = 0;
        targets.forEach(el => {
          const text = el.textContent.toLowerCase();
          const show = !q || text.includes(q);
          el.style.display = show ? '' : 'none';
          if (show) visible++;
        });

        const card = input.closest('.card');
        let empty = card?.querySelector('.filter-empty-state');
        if (visible === 0 && q) {
          if (!empty && card) {
            empty = document.createElement('div');
            empty.className = 'empty-state filter-empty-state';
            empty.innerHTML = '<div class="empty-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div><h3>No results</h3><p>Try a different search term</p>';
            const list = targets[0]?.parentElement;
            if (list) list.after(empty);
          }
        } else if (empty) {
          empty.remove();
        }
      });
    });

    document.querySelectorAll('.search-bar input:not([data-filter-target])').forEach(input => {
      const card = input.closest('.card');
      const table = card?.querySelector('.table-wrap tbody');
      if (!table) return;

      input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        let visible = 0;
        table.querySelectorAll('tr').forEach(row => {
          const show = !q || row.textContent.toLowerCase().includes(q);
          row.style.display = show ? '' : 'none';
          if (show) visible++;
        });

        let empty = card.querySelector('.filter-empty-state');
        if (visible === 0 && q) {
          if (!empty) {
            empty = document.createElement('div');
            empty.className = 'empty-state filter-empty-state';
            empty.innerHTML = '<div class="empty-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div><h3>No results</h3><p>Try a different search term</p>';
            card.querySelector('.table-wrap')?.after(empty);
          }
        } else if (empty) {
          empty.remove();
        }
      });
    });

    document.querySelectorAll('.form-select').forEach(select => {
      const card = select.closest('.card');
      const table = card?.querySelector('.table-wrap tbody');
      if (!table || !select.options.length) return;
      const labels = Array.from(select.options).map(o => o.textContent.trim().toLowerCase());

      select.addEventListener('change', () => {
        const val = select.value.trim().toLowerCase();
        const optText = select.options[select.selectedIndex]?.textContent.trim().toLowerCase() || '';
        if (optText.includes('all') || val === 'all status' || val === '') {
          table.querySelectorAll('tr').forEach(row => { row.style.display = ''; });
          return;
        }
        table.querySelectorAll('tr').forEach(row => {
          const status = row.querySelector('.status');
          const show = status && status.textContent.trim().toLowerCase() === optText;
          row.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ── Sidebar tooltips when collapsed ── */
  function initSidebarTooltips() {
    const layout = document.querySelector('.app-layout');
    const tooltip = document.createElement('div');
    tooltip.className = 'nav-tooltip';
    document.body.appendChild(tooltip);

    document.querySelectorAll('.nav-item').forEach(item => {
      const label = item.querySelector('.nav-label');
      if (!label) return;

      item.addEventListener('mouseenter', () => {
        if (!layout.classList.contains('sidebar-collapsed')) return;
        const rect = item.getBoundingClientRect();
        tooltip.textContent = label.textContent;
        tooltip.style.top = (rect.top + rect.height / 2 - 14) + 'px';
        tooltip.classList.add('is-visible');
      });

      item.addEventListener('mouseleave', () => {
        tooltip.classList.remove('is-visible');
      });
    });
  }

  /* ── Bootstrap (after sidebar renders) ── */
  function init() {
    initHeaderButtons();
    initPageProgress();
    initDashboardSkeleton();
    initCommandPalette();
    initSettingsModal();
    initNotifications();
    initUserMenu();
    initSearchFilters();
    initSidebarTooltips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 80));
  } else {
    setTimeout(init, 80);
  }
})();
