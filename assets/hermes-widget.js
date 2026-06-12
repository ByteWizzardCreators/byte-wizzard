/**
 * Hermes — Byte Wizzard Chat Widget
 * Floating chat assistant for the landing page.
 * Auto-initializes when DOM is ready.
 * Depends on I18N (loaded first).
 */
(function() {
  'use strict';

  // ─── Inject CSS ───
  const CSS = `
    /* Floating button */
    #hw-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00d488, #00aaff);
      border: none;
      cursor: pointer;
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 4px 20px rgba(0,212,136,0.3);
      transition: all 0.3s ease;
      animation: hw-appear 0.5s ease 1s both;
    }
    #hw-button:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(0,212,136,0.45);
    }
    #hw-button.hw-open {
      transform: scale(0.9);
      opacity: 0;
      pointer-events: none;
    }
    #hw-button .hw-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      background: #ff4444;
      border-radius: 50%;
      border: 2px solid #0a0a0f;
      animation: hw-pulse 2s ease-in-out infinite;
    }
    @keyframes hw-appear {
      from { opacity: 0; transform: scale(0); }
      to { opacity: 1; transform: scale(1); }
    }

    /* Chat panel */
    #hw-panel {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 380px;
      height: 560px;
      max-height: calc(100vh - 120px);
      max-width: calc(100vw - 48px);
      background: #0d0d14;
      border: 1px solid #1a1a2e;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      z-index: 9999;
      box-shadow: 0 8px 48px rgba(0,0,0,0.5);
      transform-origin: bottom right;
      animation: hw-slideUp 0.3s ease;
      overflow: hidden;
    }
    #hw-panel.hw-hidden {
      display: none;
    }
    @keyframes hw-slideUp {
      from { opacity: 0; transform: scale(0.8) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    /* Panel header */
    .hw-header {
      padding: 14px 16px;
      border-bottom: 1px solid #1a1a2e;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      background: #0d0d14;
    }
    .hw-header .hw-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00d488, #00aaff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }
    .hw-header .hw-info { flex: 1; min-width: 0; }
    .hw-header .hw-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      color: #e0e0e0;
    }
    .hw-header .hw-status {
      font-size: 11px;
      color: #00d488;
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: 'JetBrains Mono', monospace;
    }
    .hw-header .hw-status::before {
      content: '';
      width: 5px;
      height: 5px;
      background: #00d488;
      border-radius: 50%;
      animation: hw-pulse 2s ease-in-out infinite;
    }
    @keyframes hw-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    .hw-header .hw-close {
      background: transparent;
      border: none;
      color: #555;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
      transition: color 0.2s;
    }
    .hw-header .hw-close:hover { color: #e0e0e0; }

    /* Messages */
    .hw-messages {
      flex: 1;
      overflow-y: auto;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .hw-messages::-webkit-scrollbar { width: 3px; }
    .hw-messages::-webkit-scrollbar-track { background: transparent; }
    .hw-messages::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 2px; }

    .hw-msg {
      max-width: 88%;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13px;
      line-height: 1.55;
      animation: hw-fadeIn 0.3s ease;
    }
    @keyframes hw-fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hw-msg.hw-bot {
      align-self: flex-start;
      background: #13131e;
      border: 1px solid #1a1a2e;
      color: #ccc;
      border-bottom-left-radius: 3px;
    }
    .hw-msg.hw-bot .hw-label {
      font-size: 9px;
      color: #00d488;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
      font-family: 'JetBrains Mono', monospace;
    }
    .hw-msg.hw-bot strong { color: #00d488; }
    .hw-msg.hw-bot em { color: #888; font-style: normal; }
    .hw-msg.hw-user {
      align-self: flex-end;
      background: #00d488;
      color: #0a0a0f;
      font-weight: 500;
      border-bottom-right-radius: 3px;
    }
    .hw-msg.hw-typing {
      align-self: flex-start;
      background: transparent;
      border: none;
      display: flex;
      gap: 3px;
      padding: 10px 14px;
    }
    .hw-msg.hw-typing span {
      width: 5px;
      height: 5px;
      background: #555;
      border-radius: 50%;
      animation: hw-typing 1.4s ease-in-out infinite;
    }
    .hw-msg.hw-typing span:nth-child(2) { animation-delay: 0.2s; }
    .hw-msg.hw-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes hw-typing {
      0%, 60%, 100% { opacity: 0.2; transform: translateY(0); }
      30% { opacity: 1; transform: translateY(-4px); }
    }

    /* Suggestions */
    .hw-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding: 0 16px 8px;
      flex-shrink: 0;
    }
    .hw-suggestions button {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      padding: 5px 10px;
      background: #13131e;
      border: 1px solid #1a1a2e;
      border-radius: 14px;
      color: #777;
      cursor: pointer;
      transition: all 0.2s;
    }
    .hw-suggestions button:hover {
      border-color: #00d488;
      color: #00d488;
      background: #0d0d14;
    }

    /* Input */
    .hw-input-area {
      display: flex;
      gap: 6px;
      padding: 10px 16px 14px;
      border-top: 1px solid #1a1a2e;
      flex-shrink: 0;
      background: #0d0d14;
    }
    .hw-input-area input {
      flex: 1;
      padding: 8px 12px;
      border: 1.5px solid #1a1a2e;
      border-radius: 18px;
      font-size: 13px;
      outline: none;
      background: #0a0a0f;
      color: #e0e0e0;
      font-family: 'Inter', sans-serif;
      transition: border-color 0.2s;
    }
    .hw-input-area input:focus { border-color: #00d488; }
    .hw-input-area input::placeholder { color: #444; }
    .hw-input-area button {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: none;
      background: #00d488;
      color: #0a0a0f;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .hw-input-area button:hover { background: #00e899; }
    .hw-input-area button:disabled { background: #1a1a2e; color: #444; cursor: not-allowed; }

    /* Expand link */
    .hw-footer {
      text-align: center;
      padding: 6px 0 10px;
      flex-shrink: 0;
    }
    .hw-footer a {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: #444;
      text-decoration: none;
      transition: color 0.2s;
    }
    .hw-footer a:hover { color: #00d488; }

    @media (max-width: 480px) {
      #hw-panel {
        bottom: 0;
        right: 0;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        border: none;
      }
      #hw-button {
        bottom: 16px;
        right: 16px;
        width: 48px;
        height: 48px;
        font-size: 20px;
      }
    }
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // ─── HTML Structure ───
  const button = document.createElement('button');
  button.id = 'hw-button';
  button.innerHTML = '⚡<span class="hw-badge"></span>';
  button.setAttribute('aria-label', 'Abrir chat Hermes');
  document.body.appendChild(button);

  const panel = document.createElement('div');
  panel.id = 'hw-panel';
  panel.className = 'hw-hidden';
  panel.innerHTML = `
    <div class="hw-header">
      <div class="hw-avatar">⚡</div>
      <div class="hw-info">
        <div class="hw-name">Hermes</div>
        <div class="hw-status">Byte Wizzard — Demo Bot</div>
      </div>
      <button class="hw-close" id="hw-close" aria-label="Cerrar chat">✕</button>
    </div>
    <div class="hw-messages" id="hw-messages"></div>
    <div class="hw-suggestions" id="hw-suggestions"></div>
    <div class="hw-input-area">
      <input type="text" id="hw-input" placeholder="Preguntale a Hermes..." autocomplete="off">
      <button id="hw-send">➤</button>
    </div>
    <div class="hw-footer">
      <a href="demos/hermes/index.html" target="_blank">Abrir en pantalla completa →</a>
    </div>
  `;
  document.body.appendChild(panel);

  // ─── DOM refs ───
  const messagesEl = document.getElementById('hw-messages');
  const inputEl = document.getElementById('hw-input');
  const sendBtn = document.getElementById('hw-send');
  const suggestionsEl = document.getElementById('hw-suggestions');
  const closeBtn = document.getElementById('hw-close');

  // ─── State ───
  let isOpen = false;
  let isProcessing = false;
  let hasInteracted = false;
  let KB = [];
  let GREETING = '';
  let FALLBACK = '';

  // ─── i18n helper ───
  function __(key) {
    const lang = window.__lang || 'es';
    return key.split('.').reduce((o, k) => o?.[k], I18N.getLocale(lang));
  }

  // ─── Build KB from i18n ───
  function buildKB(langCode) {
    const locale = I18N.getLocale(langCode);
    const demo = locale.hermesDemo;
    if (!demo || !demo.kb) return [];
    return demo.kb.map(entry => ({
      ...entry,
      response: () => entry.response,
    }));
  }

  function rebuildLanguageState(langCode) {
    KB = buildKB(langCode);
    GREETING = localeStr(langCode, 'hermesDemo.greeting') || '¡Hola! Soy Hermes ⚡';
    FALLBACK = localeStr(langCode, 'hermesDemo.fallback') || 'Preguntame sobre Byte Wizzard...';
  }

  function localeStr(langCode, key) {
    return key.split('.').reduce((o, k) => o?.[k], I18N.getLocale(langCode));
  }

  // ─── Chat logic ───
  function findMatch(query) {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(t => t.length > 2);
    let best = null;
    let bestScore = 0;
    for (const entry of KB) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (q.includes(kw)) score += kw.length * 3;
        for (const token of tokens) {
          if (kw.includes(token) || token.includes(kw)) score += token.length;
        }
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    return bestScore > 5 ? best : null;
  }

  function renderResponse(text) {
    text = text.replace(/`([^`]+)`/g, '<code style="color:#00d488;background:#0a0a0f;padding:1px 5px;border-radius:3px;font-size:0.75rem">$1</code>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `hw-msg hw-${type}`;
    if (type === 'bot') {
      div.innerHTML = `<div class="hw-label">hermes</div><div>${text}</div>`;
    } else {
      div.textContent = text;
    }
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'hw-msg hw-typing';
    div.id = 'hw-typing-indicator';
    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      div.appendChild(span);
    }
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('hw-typing-indicator');
    if (el) el.remove();
  }

  function getSuggestions() {
    const lang = window.__lang || 'es';
    const suggestions = localeStr(lang, 'hermesDemo.suggestions');
    return Array.isArray(suggestions) ? suggestions : ['What is Byte Wizzard?', 'Products'];
  }

  function showSuggestions() {
    suggestionsEl.innerHTML = '';
    getSuggestions().forEach(text => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.addEventListener('click', () => {
        inputEl.value = text;
        handleSend();
      });
      suggestionsEl.appendChild(btn);
    });
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text || isProcessing) return;
    inputEl.value = '';
    isProcessing = true;
    sendBtn.disabled = true;
    suggestionsEl.innerHTML = '';
    addMessage(text, 'user');
    showTyping();
    setTimeout(() => {
      hideTyping();
      const q = text.toLowerCase();
      if (q.includes('hola') || q.includes('buenas') || q.includes('hello') || q.includes('hi') || q.includes('olá') || q.includes('ola')) {
        addMessage(GREETING, 'bot');
      } else {
        const match = findMatch(text);
        addMessage(match ? renderResponse(match.response()) : renderResponse(FALLBACK), 'bot');
      }
      showSuggestions();
      isProcessing = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }, 600 + Math.random() * 400);
  }

  function initChat() {
    const lang = window.__lang || 'es';
    rebuildLanguageState(lang);
    messagesEl.innerHTML = '';
    suggestionsEl.innerHTML = '';
    addMessage(GREETING, 'bot');
    showSuggestions();
    inputEl.placeholder = localeStr(lang, 'hermesDemo.inputPlaceholder') || 'Preguntale a Hermes...';
    sendBtn.textContent = localeStr(lang, 'hermesDemo.sendBtn') || '➤';
    inputEl.focus();
  }

  // ─── Events ───
  button.addEventListener('click', () => {
    isOpen = true;
    button.classList.add('hw-open');
    panel.classList.remove('hw-hidden');
    if (!hasInteracted) {
      hasInteracted = true;
      // Remove badge
      const badge = button.querySelector('.hw-badge');
      if (badge) badge.remove();
    }
    initChat();
  });

  function closeWidget() {
    isOpen = false;
    button.classList.remove('hw-open');
    panel.classList.add('hw-hidden');
    inputEl.blur();
  }

  closeBtn.addEventListener('click', closeWidget);

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // ─── Language change support ───
  I18N.onLangChange((lang) => {
    if (isOpen) {
      // Re-translate header
      const statusEl = panel.querySelector('.hw-status');
      if (statusEl) statusEl.textContent = localeStr(lang, 'hermesDemo.header.status') || 'Byte Wizzard — Demo Bot';
      initChat();
    }
  });

  // ─── Close on Escape ───
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeWidget();
  });

  console.log('⚡ Hermes Widget loaded');
})();
