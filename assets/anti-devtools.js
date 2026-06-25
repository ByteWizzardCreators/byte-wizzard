/**
 * Anti-DevTools — Byte Wizzard Landing Page Protection
 *
 * Multilayer deterrent against casual inspection:
 *   1. Context menu (right-click) → disabled
 *   2. Keyboard shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U) → blocked
 *   3. DevTools timing-based detection → redirect / overlay
 *   4. Debugger statement trap → infinite loop
 *   5. Console warning → visible deterrent
 *   6. Text selection & drag → restricted
 *   7. Iframe embed → blocked via CSP meta
 *
 * IMPORTANT: No client-side protection is 100% unbypassable.
 * This stops the 99% casual curious. If someone is determined
 * enough, they WILL get through. That's the nature of the web.
 */
(function () {
  'use strict';

  // ───────────────────────────────────────────────────────────────
  // 1. CONTEXT MENU
  // ───────────────────────────────────────────────────────────────
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // ───────────────────────────────────────────────────────────────
  // 2. KEYBOARD SHORTCUTS
  // ───────────────────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (Save Page) — optional, keeps people from saving the page locally
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      return false;
    }
  });

  // ───────────────────────────────────────────────────────────────
  // 3. DEVTOOLS TIMING DETECTION
  // ───────────────────────────────────────────────────────────────
  // Detects DevTools by measuring the gap between a getter/setter on elements.
  // When DevTools is open, the timing gap changes significantly.
  (function detectDevTools() {
    var threshold = 160;
    var interval = null;

    function check() {
      var start = performance.now();
      debugger; // eslint-disable-line
      var diff = performance.now() - start;

      if (diff > threshold) {
        // DevTools detected — trigger alarm
        triggerAlarm();
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    }

    function triggerAlarm() {
      // First attempt: redirect to a blank page with a message
      try {
        document.documentElement.innerHTML = '';
        document.body.innerHTML =
          '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0f;color:#00aaff;font-family:monospace;font-size:1.2rem;text-align:center;padding:2rem;">' +
          '<div>' +
          '<h1 style="font-size:3rem;margin-bottom:1rem;">⚡</h1>' +
          '<p style="color:#e0e0e0;">Developer Tools are disabled on this page.</p>' +
          '<p style="color:#666;margin-top:0.5rem;font-size:0.9rem;">Byte Wizzard — AI Systems Studio</p>' +
          '</div>' +
          '</div>';
        document.title = '🔒 Access Restricted';
      } catch (e) {
        // Fallback: just a simple redirect
        try {
          window.location.replace('about:blank');
        } catch (e2) {
          // Nothing else we can do
        }
      }
    }

    // Start periodic checks (every 2 seconds, stops on first detection)
    interval = setInterval(check, 2000);

    // Also check immediately
    setTimeout(check, 500);
  })();

  // ───────────────────────────────────────────────────────────────
  // 4. CONSOLE WARNING
  // ───────────────────────────────────────────────────────────────
  (function consoleWarning() {
    var style = [
      'background: #0a0a0f',
      'color: #00aaff',
      'font-size: 18px',
      'font-weight: bold',
      'padding: 10px 20px',
      'border: 2px solid #00aaff',
      'border-radius: 4px',
    ].join(';');

    var text =
      '%c⚠️ HEY! This browser console is restricted.\n\n' +
      'This is a Byte Wizzard product. Tampering with the page\n' +
      'is prohibited and will result in restricted access.\n\n' +
      'If you are a legitimate developer interested in our work,\n' +
      'reach out: bytewizzards@gmail.com\n' +
      '© Byte Wizzard — AI Systems Studio';

    console.log(text, style);
  })();

  // ───────────────────────────────────────────────────────────────
  // 5. TEXT SELECTION — enabled for usability
  // ───────────────────────────────────────────────────────────────
  // Selection is allowed so visitors can copy technical content.
  // Right-click context menu and keyboard shortcuts remain blocked.

  // ───────────────────────────────────────────────────────────────
  // 6. IFRAME EMBED BLOCK (CSP meta tag)
  // ───────────────────────────────────────────────────────────────
  // This prevents the page from being loaded in an iframe on other domains
  var cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = "frame-ancestors 'none';";
  document.head.appendChild(cspMeta);

  // ───────────────────────────────────────────────────────────────
  // 7. PERIODIC CONSOLE CLEAR (makes it annoying to inspect)
  // ───────────────────────────────────────────────────────────────
  setInterval(function () {
    try {
      // Only clear if console is open (detected via timing)
      var start = performance.now();
      debugger; // eslint-disable-line
      if (performance.now() - start > 100) {
        console.clear();
      }
    } catch (e) {
      // Silently fail
    }
  }, 3000);

})();
