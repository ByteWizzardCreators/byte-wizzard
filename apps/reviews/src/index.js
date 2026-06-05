/**
 * Reviews Worker — Byte Wizzard Landing Page
 *
 * Endpoints:
 *   GET  /api/reviews              → approved reviews (public)
 *   POST /api/reviews              → submit new review (public, rate-limited per IP)
 *   GET  /api/admin/reviews         → all reviews (requires Admin-Token header)
 *   PATCH /api/admin/reviews/:id    → approve/reject (Admin-Token)
 *   DELETE /api/admin/reviews/:id   → delete review (Admin-Token)
 *
 * KV structure:
 *   Key: "reviews" — JSON array of all review objects
 *
 * Review object:
 *   { id, text, author, product, rating, approved, createdAt, ip }
 */

const VALID_PRODUCTS = ['hermes', 'courier', 'profe', 'clipcraft'];
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_REQUESTS = 3; // max 3 submissions per IP per minute
const KV_KEY = 'reviews';

// ─── CORS headers ───
function corsHeaders(origin, env) {
  const allowedOrigins = (env?.ALLOWED_ORIGINS || '').split(',').map(s => s.trim());
  const corsOrigin = allowedOrigins.includes(origin) ? origin : (allowedOrigins[0] || '*');
  return {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Admin-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
  };
}

function json(body, status = 200, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin, env),
  });
}

function error(msg, status = 400, origin, env) {
  return json({ error: msg }, status, origin, env);
}

// ─── Validate review body ───
function validateReview(body) {
  if (!body.text || typeof body.text !== 'string' || body.text.trim().length < 10) {
    return 'El texto debe tener al menos 10 caracteres.';
  }
  if (!body.author || typeof body.author !== 'string' || body.author.trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres.';
  }
  if (!VALID_PRODUCTS.includes(body.product)) {
    return `Producto inválido. Debe ser uno de: ${VALID_PRODUCTS.join(', ')}`;
  }
  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return 'La calificación debe ser un número entero entre 1 y 5.';
  }
  return null;
}

// ─── Rate limiter (per IP) ───
async function checkRateLimit(request, kv) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const windowKey = `ratelimit:${ip}:${Math.floor(Date.now() / RATE_LIMIT_WINDOW)}`;
  const count = await kv.get(windowKey, 'text');
  const current = count ? parseInt(count, 10) : 0;

  if (current >= MAX_REQUESTS) {
    return false;
  }

  // Increment and set TTL
  await kv.put(windowKey, String(current + 1), {
    expirationTtl: Math.ceil(RATE_LIMIT_WINDOW / 1000),
  });

  return true;
}

// ─── Get all reviews from KV ───
async function getAllReviews(kv) {
  const raw = await kv.get(KV_KEY, 'text');
  return raw ? JSON.parse(raw) : [];
}

// ─── Save all reviews to KV ───
async function saveAllReviews(kv, reviews) {
  await kv.put(KV_KEY, JSON.stringify(reviews));
}

// ─── Router ───
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const method = request.method;
    const path = url.pathname;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    const kv = env.REVIEWS_KV;
    const adminToken = env.ADMIN_TOKEN;

    // ─── GET /api/reviews — approved reviews ───
    if (method === 'GET' && path === '/api/reviews') {
      const reviews = await getAllReviews(kv);
      const approved = reviews
        .filter(r => r.approved)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return json({ reviews: approved }, 200, origin, env);
    }

    // ─── POST /api/reviews — submit new review ───
    if (method === 'POST' && path === '/api/reviews') {
      // Rate limit
      const allowed = await checkRateLimit(request, kv);
      if (!allowed) {
        return error('Demasiadas solicitudes. Esperá un minuto antes de enviar otra reseña.', 429, origin, env);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return error('JSON inválido.', 400, origin, env);
      }

      const validationError = validateReview(body);
      if (validationError) {
        return error(validationError, 400, origin, env);
      }

      const reviews = await getAllReviews(kv);
      const maxId = reviews.reduce((max, r) => Math.max(max, r.id), 0);

      const newReview = {
        id: maxId + 1,
        text: body.text.trim(),
        author: body.author.trim(),
        product: body.product,
        rating: Number(body.rating),
        approved: false,
        createdAt: new Date().toISOString(),
        ip: request.headers.get('CF-Connecting-IP') || 'unknown',
      };

      reviews.push(newReview);
      await saveAllReviews(kv, reviews);

      return json({ success: true, id: newReview.id }, 201, origin, env);
    }

    // ─── Admin endpoints (require Admin-Token header) ───
    const token = request.headers.get('Admin-Token');
    if (!token || token !== adminToken) {
      return error('No autorizado.', 401, origin, env);
    }

    // ─── GET /api/admin/reviews — all reviews ───
    if (method === 'GET' && path === '/api/admin/reviews') {
      const reviews = await getAllReviews(kv);
      // Sort newest first
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return json({ reviews }, 200, origin, env);
    }

    // ─── PATCH /api/admin/reviews/:id — approve/reject ───
    const patchMatch = path.match(/^\/api\/admin\/reviews\/(\d+)$/);
    if (method === 'PATCH' && patchMatch) {
      const id = parseInt(patchMatch[1], 10);
      let body;
      try {
        body = await request.json();
      } catch {
        return error('JSON inválido.', 400, origin, env);
      }

      if (body.approved !== undefined && typeof body.approved !== 'boolean') {
        return error('approved debe ser true o false.', 400, origin, env);
      }

      const reviews = await getAllReviews(kv);
      const idx = reviews.findIndex(r => r.id === id);
      if (idx === -1) {
        return error('Reseña no encontrada.', 404, origin, env);
      }

      if (body.approved !== undefined) {
        reviews[idx].approved = body.approved;
      }
      await saveAllReviews(kv, reviews);

      return json({ success: true, review: reviews[idx] }, 200, origin, env);
    }

    // ─── DELETE /api/admin/reviews/:id — delete review ───
    const deleteMatch = path.match(/^\/api\/admin\/reviews\/(\d+)$/);
    if (method === 'DELETE' && deleteMatch) {
      const id = parseInt(deleteMatch[1], 10);

      const reviews = await getAllReviews(kv);
      const idx = reviews.findIndex(r => r.id === id);
      if (idx === -1) {
        return error('Reseña no encontrada.', 404, origin, env);
      }

      reviews.splice(idx, 1);
      await saveAllReviews(kv, reviews);

      return json({ success: true }, 200, origin, env);
    }

    // ─── 404 ───
    return error('Endpoint no encontrado.', 404, origin, env);
  },
};
