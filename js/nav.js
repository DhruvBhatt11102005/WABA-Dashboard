/* ─── Shared Sidebar Renderer ── */
/* Inject sidebar HTML and wire up shared nav */
(function () {
  const PAGES_PREFIX = window.PAGES_PREFIX || '';

  const sidebarHTML = `
  <button class="sidebar-toggle" id="sidebar-toggle" title="Toggle sidebar">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  </button>

  <div class="sidebar-logo">
    <div class="logo-icon">💬</div>
    <div class="logo-text">
      <h2>WABA Panel</h2>
      <span>Seawind Solution</span>
    </div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-section">
      <div class="nav-section-label">Main</div>
      <a class="nav-item" data-page="index.html" href="${PAGES_PREFIX}index.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </span>
        <span class="nav-label">Dashboard</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-label">Devices</div>
      <a class="nav-item" data-page="my-devices.html" href="${PAGES_PREFIX}pages/my-devices.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="nav-label">My Devices</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-label">Templates</div>
      <a class="nav-item" data-page="my-templates.html" href="${PAGES_PREFIX}pages/my-templates.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
        </span>
        <span class="nav-label">My Templates</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-label">Messaging</div>
      <a class="nav-item" data-page="send-message.html" href="${PAGES_PREFIX}pages/send-message.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </span>
        <span class="nav-label">Send Message</span>
      </a>
      <a class="nav-item" data-page="live-chat.html" href="${PAGES_PREFIX}pages/live-chat.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        </span>
        <span class="nav-label">Live Chat</span>
        <span class="nav-badge">3</span>
      </a>
      <a class="nav-item" data-page="campaigns.html" href="${PAGES_PREFIX}pages/campaigns.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </span>
        <span class="nav-label">Campaigns</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-label">Automation</div>
      <a class="nav-item" data-page="auto-reply.html" href="${PAGES_PREFIX}pages/auto-reply.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6l4 2"/>
          </svg>
        </span>
        <span class="nav-label">Auto Reply</span>
      </a>
      <a class="nav-item" data-page="drip-campaigns.html" href="${PAGES_PREFIX}pages/drip-campaigns.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
          </svg>
        </span>
        <span class="nav-label">Drip Campaigns</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-label">Reports</div>
      <a class="nav-item" data-page="message-reports.html" href="${PAGES_PREFIX}pages/message-reports.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </span>
        <span class="nav-label">Message Reports</span>
      </a>
      <a class="nav-item" data-page="message-response.html" href="${PAGES_PREFIX}pages/message-response.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
        </span>
        <span class="nav-label">Message Response</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-label">Settings</div>
      <a class="nav-item" data-page="api-credentials.html" href="${PAGES_PREFIX}pages/api-credentials.html">
        <span class="nav-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
          </svg>
        </span>
        <span class="nav-label">API Credentials</span>
      </a>
    </div>
  </nav>

  <div class="sidebar-footer">
    <div class="sidebar-user">
      <div class="user-avatar">EE</div>
      <div class="user-info">
        <div class="user-name">EE Admin</div>
        <div class="user-role">Administrator</div>
      </div>
    </div>
  </div>
  `;

  function renderSidebar() {
    const el = document.getElementById('sidebar');
    if (el) el.innerHTML = sidebarHTML;

    // Wire active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      if (item.getAttribute('data-page') === currentPage) {
        item.classList.add('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSidebar);
  } else {
    renderSidebar();
  }
})();
