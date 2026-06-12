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
const KV_KEY = 'reviews';

// ─── Rate limiting ───
const POST_WINDOW_MS = 60_000;    // 1 minute
const POST_MAX = 3;                // max 3 POST submissions per IP
const GET_WINDOW_MS = 60_000;      // 1 minute
const GET_MAX = 60;                // max 60 GET requests per IP (reviews load on scroll)

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

// ─── Rate limiter (sliding window, per IP) ───
// Uses 10-second buckets for granular sliding window.
// Returns { allowed, retryAfter, limit, remaining }
async function checkRateLimit(request, kv, method) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const isPost = method === 'POST';
  const windowMs = isPost ? POST_WINDOW_MS : GET_WINDOW_MS;
  const maxReqs = isPost ? POST_MAX : GET_MAX;

  // Sliding window: check last N seconds using 10-second buckets
  const now = Date.now();
  const bucketSize = 10_000; // 10 second buckets
  const bucketsInWindow = Math.ceil(windowMs / bucketSize);
  const prefix = `rl:${ip}:`;

  // Get current bucket keys
  const bucketKeys = [];
  for (let i = 0; i < bucketsInWindow; i++) {
    const bucketTime = Math.floor((now - i * bucketSize) / bucketSize) * bucketSize;
    bucketKeys.push(`${prefix}${bucketTime}`);
  }

  // Fetch all bucket counts in parallel
  const entries = await Promise.all(
    bucketKeys.map(k => kv.get(k, 'text').then(v => parseInt(v, 10) || 0))
  );

  const totalInWindow = entries.reduce((sum, c) => sum + c, 0);
  const oldestBucket = bucketKeys[bucketKeys.length - 1];

  if (totalInWindow >= maxReqs) {
    // Calculate when the oldest bucket expires
    const oldestTime = parseInt(oldestBucket.split(':').pop(), 10);
    const retryAfter = Math.ceil((oldestTime + bucketSize - now) / 1000);
    return { allowed: false, retryAfter: Math.max(1, retryAfter), limit: maxReqs, remaining: 0 };
  }

  // Increment current bucket
  const currentBucketKey = `${prefix}${Math.floor(now / bucketSize) * bucketSize}`;
  const currentCount = await kv.get(currentBucketKey, 'text').then(v => parseInt(v, 10) || 0);
  await kv.put(currentBucketKey, String(currentCount + 1), {
    expirationTtl: Math.ceil(windowMs / 1000) + 10, // TTL = window + 10s buffer
  });

  return { allowed: true, retryAfter: 0, limit: maxReqs, remaining: maxReqs - totalInWindow - 1 };
}

// ─── Add rate limit headers to response ───
function withRateHeaders(response, rl) {
  const headers = new Headers(response.headers);
  headers.set('X-RateLimit-Limit', String(rl.limit));
  headers.set('X-RateLimit-Remaining', String(Math.max(0, rl.remaining)));
  if (rl.retryAfter > 0) {
    headers.set('Retry-After', String(rl.retryAfter));
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
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

    // ─── GET /api/reviews — approved reviews (rate-limited) ───
    if (method === 'GET' && path === '/api/reviews') {
      const rl = await checkRateLimit(request, kv, 'GET');
      if (!rl.allowed) {
        const resp = error(
          `Demasiadas solicitudes. Esperá ${rl.retryAfter} segundos.`,
          429, origin, env
        );
        return withRateHeaders(resp, rl);
      }

      const reviews = await getAllReviews(kv);
      const approved = reviews
        .filter(r => r.approved)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const resp = json({ reviews: approved }, 200, origin, env);
      return withRateHeaders(resp, rl);
    }

    // ─── POST /api/reviews — submit new review (rate-limited) ───
    if (method === 'POST' && path === '/api/reviews') {
      const rl = await checkRateLimit(request, kv, 'POST');
      if (!rl.allowed) {
        const resp = error(
          `Demasiadas solicitudes. Esperá ${rl.retryAfter} segundos antes de enviar otra reseña.`,
          429, origin, env
        );
        return withRateHeaders(resp, rl);
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
        approved: true,
        createdAt: new Date().toISOString(),
        ip: request.headers.get('CF-Connecting-IP') || 'unknown',
      };

      reviews.push(newReview);
      await saveAllReviews(kv, reviews);

      const createdResp = json({ success: true, id: newReview.id }, 201, origin, env);
      return withRateHeaders(createdResp, rl);
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
