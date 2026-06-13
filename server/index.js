/**
 * Byte Wizzard — Reviews API Server
 *
 * Endpoints:
 *   GET  /api/reviews              → approved reviews (public)
 *   POST /api/reviews              → submit new review (public, rate-limited)
 *   GET  /api/admin/reviews         → all reviews (requires Admin-Token header)
 *   PATCH /api/admin/reviews/:id    → approve/reject (Admin-Token)
 *   DELETE /api/admin/reviews/:id   → delete review (Admin-Token)
 *
 * Env vars:
 *   PORT          — server port (default: 3001)
 *   ADMIN_TOKEN   — secret token for admin endpoints
 *   CORS_ORIGIN   — allowed origin (default: https://bytewizzardcreators.github.io)
 *   DATABASE_PATH — path to SQLite file (default: ./data/reviews.db)
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'dev-token-change-me';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://bytewizzardcreators.github.io';
const DB_DIR = path.resolve(__dirname, process.env.DATABASE_PATH ? path.dirname(process.env.DATABASE_PATH) : './data');
const DB_PATH = process.env.DATABASE_PATH || path.join(DB_DIR, 'reviews.db');

// ─── Ensure data directory exists ───
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// ─── SQLite setup ───
const Database = require('better-sqlite3');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    product TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    approved INTEGER NOT NULL DEFAULT 0,
    ip TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// ─── Seed DB with default reviews if empty ───
// Render.com free tier has ephemeral filesystem — every deploy wipes the DB.
// This ensures reviews always show even after a fresh deploy.
const rowCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get().count;
if (rowCount === 0) {
  const seed = db.transaction(() => {
    db.prepare(`
      INSERT INTO reviews (text, author, product, rating, approved, ip)
      VALUES (?, ?, ?, ?, 1, 'seed')
    `).run(
      'Me gustó mucho el traductor, sobre todo porque tiene audios de todo, está muy lindo.',
      'Johana', 'profe', 5
    );
    db.prepare(`
      INSERT INTO reviews (text, author, product, rating, approved, ip)
      VALUES (?, ?, ?, ?, 1, 'seed')
    `).run(
      'Me interesa mucho, ¿cuándo va a estar?',
      'Maria', 'clipcraft', 3
    );
  });
  seed();
  console.log('🌱 Seeded DB with default reviews');
}

// ─── Rate limiters ───
// Global limiter: 30 req/min per IP — protects all endpoints from hammering
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute
  max: 30,                    // 30 requests per minute
  standardHeaders: true,      // Return RateLimit-* headers
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Esperá un minuto antes de intentar de nuevo.' },
  keyGenerator: (req) => req.ip || req.connection?.remoteAddress || 'unknown',
  validate: { xForwardedForHeader: false },
});

// Strict POST limiter: 3 submissions/min per IP — prevents review spam
const reviewPostLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Esperá un minuto antes de enviar otra reseña.' },
  keyGenerator: (req) => req.ip || req.connection?.remoteAddress || 'unknown',
});

// Admin limiter: 20 req/min — admin endpoints are internal, no need for strict limit
const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes administrativas.' },
  keyGenerator: (req) => req.ip || req.connection?.remoteAddress || 'unknown',
});

// ─── Express app ───
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: CORS_ORIGIN, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] }));

// Apply global limiter to all /api/* routes
app.use('/api', globalLimiter);

// ─── GET /api/reviews — approved only ───
app.get('/api/reviews', (req, res) => {
  const rows = db.prepare(
    'SELECT id, text, author, product, rating, created_at FROM reviews WHERE approved = 1 ORDER BY created_at DESC'
  ).all();
  res.json({ reviews: rows });
});

// ─── POST /api/reviews — submit new review (rate-limited) ───
app.post('/api/reviews', reviewPostLimiter, (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const { text, author, product, rating } = req.body;

  // Validate
  if (!text || typeof text !== 'string' || text.trim().length < 10) {
    return res.status(400).json({ error: 'El texto debe tener al menos 10 caracteres.' });
  }
  if (!author || typeof author !== 'string' || author.trim().length < 2) {
    return res.status(400).json({ error: 'El nombre debe tener al menos 2 caracteres.' });
  }
  const validProducts = ['hermes', 'courier', 'profe', 'clipcraft'];
  if (!validProducts.includes(product)) {
    return res.status(400).json({ error: `Producto inválido. Debe ser uno de: ${validProducts.join(', ')}` });
  }
  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: 'La calificación debe ser un número entero entre 1 y 5.' });
  }

  const stmt = db.prepare(
    'INSERT INTO reviews (text, author, product, rating, approved, ip) VALUES (?, ?, ?, ?, 1, ?)'
  );
  const result = stmt.run(text.trim(), author.trim(), product, ratingNum, ip);

  res.status(201).json({ success: true, id: result.lastInsertRowid });
});

// ─── Admin middleware ───
function requireAdmin(req, res, next) {
  const token = req.headers['admin-token'];
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'No autorizado.' });
  }
  next();
}

// ─── Admin routes (rate-limited) ───
app.get('/api/admin/reviews', adminLimiter, requireAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all();
  res.json({ reviews: rows });
});

app.patch('/api/admin/reviews/:id', adminLimiter, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { approved } = req.body;

  if (approved === undefined || typeof approved !== 'boolean') {
    return res.status(400).json({ error: 'approved debe ser true o false.' });
  }

  const stmt = db.prepare('UPDATE reviews SET approved = ? WHERE id = ?');
  const result = stmt.run(approved ? 1 : 0, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Reseña no encontrada.' });
  }

  res.json({ success: true });
});

app.delete('/api/admin/reviews/:id', adminLimiter, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);

  const stmt = db.prepare('DELETE FROM reviews WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Reseña no encontrada.' });
  }

  res.json({ success: true });
});

// ─── Health check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', reviews: db.prepare('SELECT COUNT(*) as count FROM reviews').get().count });
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`Reviews API running on port ${PORT}`);
  console.log(`CORS origin: ${CORS_ORIGIN}`);
  console.log(`Database: ${DB_PATH}`);
});
