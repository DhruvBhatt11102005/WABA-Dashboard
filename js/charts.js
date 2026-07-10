/* ─── Charts & Dashboard JS ────────────────────────────── */
(function () {
  'use strict';

  const COLORS = {
    green:  '#10B981',
    purple: '#7C3AED',
    amber:  '#F59E0B',
    blue:   '#3B82F6',
    teal:   '#14B8A6',
    muted:  'rgba(15, 23, 42, 0.08)',
    gridLine: 'rgba(15, 23, 42, 0.05)',
  };

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /* ── Default Chart.js global config ── */
  function applyGlobalDefaults() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    Chart.defaults.plugins.tooltip.borderColor = 'rgba(15, 23, 42, 0.08)';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.titleColor = '#0f172a';
    Chart.defaults.plugins.tooltip.bodyColor = '#475569';
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
  }

  /* ── Analytics line chart (Dashboard) ── */
  function initAnalyticsChart() {
    const ctx = document.getElementById('analytics-chart');
    if (!ctx || typeof Chart === 'undefined') return;

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Nov'];
    const sentData     = [12, 45, 28, 60, 35, 80, 55];
    const delivData    = [10, 40, 25, 55, 30, 72, 50];
    const readData     = [8,  30, 20, 48, 22, 60, 42];

    function makeGradient(ctx, color) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, hexToRgba(color, 0.25));
      gradient.addColorStop(1, hexToRgba(color, 0));
      return gradient;
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Sent',
            data: sentData,
            borderColor: '#2563EB',
            backgroundColor: makeGradient(ctx.getContext('2d'), '#2563EB'),
            borderWidth: 2.5,
            tension: 0.45,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#2563EB',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
          },
          {
            label: 'Delivered',
            data: delivData,
            borderColor: '#10B981',
            backgroundColor: makeGradient(ctx.getContext('2d'), '#10B981'),
            borderWidth: 2.5,
            tension: 0.45,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
          },
          {
            label: 'Read',
            data: readData,
            borderColor: '#F59E0B',
            backgroundColor: makeGradient(ctx.getContext('2d'), '#F59E0B'),
            borderWidth: 2.5,
            tension: 0.45,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#F59E0B',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: {
            grid: { color: COLORS.gridLine, drawBorder: false },
            ticks: { color: '#94a3b8' },
          },
          y: {
            grid: { color: COLORS.gridLine, drawBorder: false },
            ticks: { color: '#8892b0', maxTicksLimit: 5 },
            min: 0,
          },
        },
        plugins: {
          legend: { display: true, position: 'top', labels: { color: '#64748b', boxWidth: 8, usePointStyle: true } },
        },
        animation: { duration: 1400, easing: 'easeOutQuart', delay: (ctx) => ctx.dataIndex * 80 },
      },
    });

    return chart;
  }

  /* ── Message Reports donut chart ── */
  window.initDonutChart = function (canvasId, data, colors, labels) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;

    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: true, position: 'bottom', labels: { color: '#64748b', padding: 12, usePointStyle: true } },
        },
        animation: { duration: 900, easing: 'easeOutQuart' },
      },
    });
  };

  /* ── Bar chart for reports ── */
  window.initBarChart = function (canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;

    return new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: COLORS.gridLine, drawBorder: false },
            ticks: { color: '#94a3b8' },
          },
          y: {
            grid: { color: COLORS.gridLine, drawBorder: false },
            ticks: { color: '#8892b0', maxTicksLimit: 5 },
            min: 0,
          },
        },
        plugins: {
          legend: { display: true, position: 'top', labels: { color: '#64748b', boxWidth: 8, usePointStyle: true } },
        },
        animation: { duration: 1000, easing: 'easeOutQuart' },
      },
    });
  };

  /* ── Init on DOM ready ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    applyGlobalDefaults();
    initAnalyticsChart();
  }

  /* ── COLORS export ── */
  window.CHART_COLORS = COLORS;

})();
