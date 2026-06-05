/**
 * Reviews — Live loading from Cloudflare Worker + submit form
 * Depends on I18N (loaded first)
 */

const REVIEWS = (() => {
  // ─── Config ───
  // Set window.REVIEWS_API in the HTML before loading this script, e.g.:
  //   <script>window.REVIEWS_API = 'https://reviews.yourdomain.workers.dev'</script>
  const API_BASE = window.REVIEWS_API || 'http://localhost:8787';
  const STORAGE_KEY = 'bw-reviews-cache';

  // ─── Get current language's reviews translations ───
  function t(key) {
    const lang = window.__lang || 'es';
    const reviews = I18N.TRANSLATIONS[lang]?.reviews;
    return key.split('.').reduce((o, k) => o?.[k], reviews) || key;
  }

  // ─── Stars helper ───
  function stars(n) {
    return '●'.repeat(n) + '○'.repeat(5 - n);
  }

  // ─── Product display name ───
  function productName(product) {
    const lang = window.__lang || 'es';
    return I18N.TRANSLATIONS[lang]?.reviews?.products?.[product] || product;
  }

  // ─── Format date ───
  function formatDate(iso) {
    try {
      const d = new Date(iso);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return iso?.slice(0, 7) || '';
    }
  }

  // ─── Render reviews from API data ───
  function renderReviews(reviews) {
    const grid = document.querySelector('.reviews-grid');
    if (!grid) return;

    if (!reviews || reviews.length === 0) {
      grid.innerHTML = `<p class="reviews-empty">${t('empty')}</p>`;
      return;
    }

    grid.innerHTML = reviews.map(item => {
      const badgeClass = `badge-${item.product}`;
      return `
        <article class="review-card">
          <p class="review-text">"${item.text}"</p>
          <div class="review-footer">
            <span class="review-author">— ${item.author}</span>
            <div class="review-meta">
              <span class="review-product ${badgeClass}">${productName(item.product)}</span>
              <span class="review-stars">${stars(item.rating)}</span>
              <span class="review-date">${formatDate(item.createdAt)}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ─── Load reviews from Worker ───
  async function loadReviews() {
    const grid = document.querySelector('.reviews-grid');
    if (!grid) return;

    // Show loading
    const lang = window.__lang || 'es';
    const loadingText = I18N.TRANSLATIONS[lang]?.reviews?.loading || 'Loading reviews...';
    grid.innerHTML = `<p class="reviews-loading">${loadingText}</p>`;

    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        headers: { 'Accept': 'application/json' },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      renderReviews(data.reviews);

      // Cache in session storage
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.reviews));
      } catch {}

    } catch (err) {
      console.warn('Reviews API unavailable, trying cache:', err);

      // Try session cache first
      try {
        const cached = sessionStorage.getItem(STORAGE_KEY);
        if (cached) {
          renderReviews(JSON.parse(cached));
          return;
        }
      } catch {}

      // Fallback to static i18n items
      const lang = window.__lang || 'es';
      const staticItems = I18N.TRANSLATIONS[lang]?.reviews?.items;
      if (staticItems && staticItems.length > 0) {
        renderReviews(staticItems.map(item => ({
          ...item,
          createdAt: item.date || '2026',
        })));
        return;
      }

      // Last resort: empty state
      const emptyText = I18N.TRANSLATIONS[lang]?.reviews?.empty || 'No reviews yet.';
      grid.innerHTML = `<p class="reviews-empty">${emptyText}</p>`;
    }
  }

  // ─── Setup review form ───
  function setupForm() {
    const form = document.getElementById('review-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-submit');
      const statusEl = form.querySelector('.review-form-status');
      const originalText = submitBtn.textContent;

      // Gather data
      const text = document.getElementById('review-text').value.trim();
      const author = document.getElementById('review-author').value.trim();
      const product = document.getElementById('review-product').value;
      const rating = parseInt(document.getElementById('review-rating').value, 10);

      // Validate
      if (text.length < 10) {
        statusEl.textContent = t('errorShort');
        statusEl.className = 'review-form-status error';
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = t('sending');
      statusEl.className = 'review-form-status';
      statusEl.textContent = '';

      try {
        const res = await fetch(`${API_BASE}/api/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, author, product, rating }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        // Success
        statusEl.textContent = t('success');
        statusEl.className = 'review-form-status success';
        form.reset();

        // Reload reviews after a short delay
        setTimeout(loadReviews, 2000);

      } catch (err) {
        statusEl.textContent = err.message || t('error');
        statusEl.className = 'review-form-status error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // ─── Refresh reviews on language change ───
  function onLangChange() {
    // Re-render reviews with new language product names
    // But we don't want to re-fetch, so re-render from cache
    loadReviews();
    // Also update form labels if visible
    const form = document.getElementById('review-form');
    if (form) {
      const lang = window.__lang || 'es';
      const reviews = I18N.TRANSLATIONS[lang]?.reviews;
      if (reviews) {
        form.querySelector('[data-i18n-form="title"]').textContent = reviews.formTitle;
        form.querySelector('[data-i18n-form="nameLabel"]').textContent = reviews.nameLabel;
        form.querySelector('[data-i18n-form="productLabel"]').textContent = reviews.productLabel;
        form.querySelector('[data-i18n-form="ratingLabel"]').textContent = reviews.ratingLabel;
        form.querySelector('[data-i18n-form="textLabel"]').textContent = reviews.textLabel;
        form.querySelector('.btn-submit').textContent = reviews.submit;

        // Update product options
        const select = document.getElementById('review-product');
        if (select && reviews.products) {
          Array.from(select.options).forEach(opt => {
            const prod = opt.value;
            if (prod && reviews.products[prod]) {
              opt.textContent = reviews.products[prod];
            }
          });
        }
      }
    }
  }

  // ─── Init ───
  function init() {
    loadReviews();
    setupForm();
    I18N.onLangChange(onLangChange);
    // Also re-load on language change from the switcher
  }

  // Wait for DOM + I18N
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { loadReviews, renderReviews };
})();
