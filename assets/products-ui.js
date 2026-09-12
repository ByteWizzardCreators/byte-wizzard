/**
 * Byte Wizzard — Products UI Renderer (shared: landing + PDP)
 *
 * Renders the landing product grid, the per-product PDP sections, the
 * hero.status counts and the per-language SEO from the single declarative
 * registry `window.PRODUCTS` (assets/products.js), localized via
 * `window.I18N` (assets/i18n.js).
 *
 * Lifecycle:
 *   - Registers an I18N.onLangChange(code) listener — the initial render is
 *     free (i18n.js fires its init on DOMContentLoaded) and every language
 *     switch re-renders. Render is idempotent.
 *   - If this script is loaded AFTER the i18n init already fired (late or
 *     dynamic load), renders once with the detected locale.
 *
 * Context detection:
 *   - `#products-grid` present  → landing: cards + counts.
 *   - `body[data-product]` present → PDP: hero, sections, SEO.
 *   - Neither → no-op (demo pages, other contexts).
 *
 * Vanilla ES5+. No imports. No build. No dependencies.
 */

'use strict';

(function () {
  var CONTACT_EMAIL = 'bytewizzards@gmail.com';

  // ─── Dependency guards ────────────────────────────────────────────

  function registry() {
    return window.PRODUCTS || null;
  }

  function i18n() {
    return window.I18N || null;
  }

  // ─── Tiny DOM helpers (textContent only — defensive, no HTML injection) ──

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function setText(id, text) {
    var node = document.getElementById(id);
    if (node && text !== undefined && text !== null) node.textContent = text;
  }

  // Safe chrome-key lookup: returns `fallback` when the key chain is missing.
  function key(t, path, fallback) {
    var value = path.split('.').reduce(function (o, k) {
      return o ? o[k] : undefined;
    }, t);
    return value === undefined ? fallback : value;
  }

  // Hide a section (title + content) or fall back to the container itself.
  function hideSection(container, inlineFallback) {
    var section = container && container.closest ? container.closest('.pdp-section') : null;
    (section || inlineFallback || container).style.display = 'none';
  }

  function showSection(container) {
    if (!container) return;
    var section = container.closest ? container.closest('.pdp-section') : null;
    (section || container).style.display = '';
  }

  // ─── Landing: product cards ───────────────────────────────────────

  /**
   * Renders one card per PRODUCTS entry into #products-grid.
   * Returns true when the landing grid exists, false otherwise (PDP context).
   */
  function renderCards(lang, t) {
    var grid = document.getElementById('products-grid');
    if (!grid) return false;

    grid.innerHTML = '';
    registry().forEach(function (product) {
      var c = product.content[lang] || product.content.es;

      // article.product-card — status as class + --accent inline gradient
      // (styles.css: "Accent top border — set per card via --accent").
      var card = el('article', 'product-card ' + product.status);
      card.dataset.productId = product.id;
      card.style.setProperty('--accent', product.accent);

      // Visual header — big icon over the accent gradient
      var visual = el('div', 'card-visual');
      visual.appendChild(el('span', 'product-icon', product.icon));

      // Card body
      var body = el('div', 'card-body');
      body.appendChild(el('span', 'product-status ' + product.status, c.statusLabel));
      body.appendChild(el('h3', 'product-name', c.name));
      body.appendChild(el('p', 'product-tagline', c.tagline));

      var features = el('ul', 'product-features');
      (c.features || []).forEach(function (f) {
        features.appendChild(el('li', null, f));
      });
      body.appendChild(features);

      // CTA → PDP (design system: .card-link, card itself is not wrapped)
      var link = el('a', 'card-link', key(t, 'cardCta.pdp', ''));
      link.href = 'products/' + product.id + '.html';
      body.appendChild(link);

      card.appendChild(visual);
      card.appendChild(body);
      grid.appendChild(card);
    });
    return true;
  }

  // ─── Landing: hero.status counts (computed from registry, not hardcoded) ──

  function renderCounts() {
    var productsEl = document.querySelector('[data-products-count]');
    var demosEl = document.querySelector('[data-demos-count]');
    if (productsEl) productsEl.textContent = String(registry().length);
    if (demosEl) {
      demosEl.textContent = String(
        registry().filter(function (p) { return p.demoUrl; }).length
      );
    }
  }

  // ─── PDP: hero + sections + actions + SEO ─────────────────────────

  /**
   * Renders the PDP for body[data-product].
   * Returns true on a PDP context (found or not), false otherwise (landing).
   */
  function renderPdp(lang, t) {
    var id = document.body.dataset.product;
    if (!id) return false;

    var product = registry().filter(function (p) { return p.id === id; })[0];

    if (!product) {
      // Unknown product id — show chrome-level "not available" message.
      setText('pdp-name', key(t, 'pdp.notAvailable', 'No disponible'));
      setText('pdp-tagline', '');
      setText('pdp-icon', '');
      setText('pdp-description', '');
      var badge = document.getElementById('pdp-badge');
      if (badge) badge.textContent = '';
      var actions = document.getElementById('pdp-actions');
      if (actions) actions.innerHTML = '';
      hideSection(document.getElementById('pdp-specs'));
      hideSection(document.getElementById('pdp-usecases'));
      // Static per-stub SEO stays as-is for unknown ids.
      return true;
    }

    var c = product.content[lang] || product.content.es;

    // Hero accent — --accent drives the mesh orb + accent-colored chrome
    var hero = document.querySelector('.pdp-hero');
    if (hero) hero.style.setProperty('--accent', product.accent);

    setText('pdp-icon', product.icon);
    setText('pdp-name', c.name);
    setText('pdp-tagline', c.tagline);
    setText('pdp-description', c.description);

    // Badge — replace the stub classes to keep them in sync per render
    var pdpBadge = document.getElementById('pdp-badge');
    if (pdpBadge) {
      pdpBadge.className = 'pdp-badge pdp-badge--' + product.status;
      pdpBadge.textContent = c.statusLabel;
    }

    // Specs — ficha técnica table; hide the section when empty
    var specsBody = document.getElementById('pdp-specs-body');
    var specsTable = document.getElementById('pdp-specs');
    var specs = c.specs || [];
    if (specsBody && specsTable) {
      specsBody.innerHTML = '';
      if (specs.length) {
        specs.forEach(function (spec) {
          var tr = document.createElement('tr');
          tr.appendChild(el('td', 'spec-label', spec.label));
          tr.appendChild(el('td', null, spec.value));
          specsBody.appendChild(tr);
        });
        showSection(specsTable);
      } else {
        hideSection(specsTable, specsTable);
      }
    }

    // Use cases — hide the section when empty
    var useCases = document.getElementById('pdp-usecases');
    var cases = c.useCases || [];
    if (useCases) {
      useCases.innerHTML = '';
      if (cases.length) {
        cases.forEach(function (useCase) {
          useCases.appendChild(el('li', null, useCase));
        });
        showSection(useCases);
      } else {
        hideSection(useCases, useCases);
      }
    }

    renderActions(product, t);

    // SEO — document.title + meta description per language
    if (c.seo) {
      document.title = c.seo.title;
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = c.seo.description;
    }
    return true;
  }

  // ─── PDP: CTA buttons from available URLs ─────────────────────────

  function renderActions(product, t) {
    var actions = document.getElementById('pdp-actions');
    if (!actions) return;
    actions.innerHTML = '';

    var buttons = [];
    if (product.liveUrl) {
      buttons.push({ cls: 'btn btn-primary', href: product.liveUrl, label: key(t, 'cardCta.live', 'Visitar sitio') });
    }
    if (product.demoUrl) {
      buttons.push({ cls: 'btn btn-outline', href: product.demoUrl, label: key(t, 'cardCta.demo', 'Probar demo') });
    }
    if (!buttons.length) {
      // No live/demo URL → contact CTA
      buttons.push({ cls: 'btn btn-outline', href: 'mailto:' + CONTACT_EMAIL, label: key(t, 'cardCta.contact', 'Contactar') });
    }

    buttons.forEach(function (button) {
      var a = el('a', button.cls, button.label);
      a.href = button.href;
      if (button.href.indexOf('mailto:') !== 0) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      actions.appendChild(a);
    });
  }

  // ─── Public render (both contexts, one lifecycle) ─────────────────

  /**
   * Renders whatever this document hosts (landing grid/counts, PDP, or
   * nothing). Called by I18N.onLangChange(code) and by the init fallback.
   */
  function render(code) {
    var products = registry();
    if (!products) return;
    var lang = code || 'es';
    var t = i18n() ? i18n().getLocale(lang) : null;

    var isLanding = renderCards(lang, t);
    if (isLanding) renderCounts();
    renderPdp(lang, t || {});
  }

  // ─── Init ─────────────────────────────────────────────────────────

  /**
   * Single lifecycle: listen on I18N.onLangChange (i18n.js fires its init
   * with the detected locale on DOMContentLoaded) and only render now if the
   * i18n init already happened (this script loaded late / dynamically).
   */
  function init() {
    if (!registry()) {
      if (window.console) console.warn('[products-ui] window.PRODUCTS not found — skipping render.');
      return;
    }
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    if (i18n() && typeof i18n().onLangChange === 'function') {
      i18n().onLangChange(render);
      if (document.readyState !== 'loading') {
        // i18n init already fired before this script — render with the
        // detected locale (idempotent; no double paint in the normal path).
        render(i18n().detect());
      }
    } else {
      if (window.console) console.warn('[products-ui] window.I18N not found — rendering with default locale (es).');
      render('es');
    }
  }

  // ─── Public API ───────────────────────────────────────────────────

  window.ProductsUI = {
    init: init,
    render: render,
    renderCards: renderCards,
    renderPdp: renderPdp,
    renderCounts: renderCounts,
  };

  // Script sits at the end of <body> — DOM is ready; init handles the rest.
  init();
})();