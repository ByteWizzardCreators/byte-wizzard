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

// ─── Rate limiter (in-memory) ───
const rateLimitMap = new Map();
const RATE_WINDOW = 60_000; // 1 minute
const RATE_MAX = 3;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || (now - entry.windowStart) > RATE_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count++;
  return true;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if ((now - entry.windowStart) > RATE_WINDOW * 2) rateLimitMap.delete(ip);
  }
}, 300_000);

// ─── Express app ───
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: CORS_ORIGIN, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] }));

// ─── GET /api/reviews — approved only ───
app.get('/api/reviews', (req, res) => {
  const rows = db.prepare(
    'SELECT id, text, author, product, rating, created_at FROM reviews WHERE approved = 1 ORDER BY created_at DESC'
  ).all();
  res.json({ reviews: rows });
});

// ─── POST /api/reviews — submit new review ───
app.post('/api/reviews', (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';

  // Rate limit
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Esperá un minuto antes de enviar otra reseña.' });
  }

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
    'INSERT INTO reviews (text, author, product, rating, ip) VALUES (?, ?, ?, ?, ?)'
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

// ─── Admin routes ───
app.get('/api/admin/reviews', requireAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all();
  res.json({ reviews: rows });
});

app.patch('/api/admin/reviews/:id', requireAdmin, (req, res) => {
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

app.delete('/api/admin/reviews/:id', requireAdmin, (req, res) => {
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
