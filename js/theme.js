/**
 * theme.js — dark/light theme toggle with localStorage persistence.
 * The initial theme is already applied by a small inline script in <head>
 * (before first paint) to avoid a flash of the wrong theme. This file only
 * wires up the toggle button and keeps it in sync afterwards.
 */
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateToggleState(theme) {
    var isLight = theme === 'light';
    toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }

  updateToggleState(currentTheme());

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch (e) {
      /* localStorage unavailable (e.g. private browsing) — theme just won't persist */
    }
    updateToggleState(next);
  });
})();
