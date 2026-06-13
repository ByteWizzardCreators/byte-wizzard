# Byte Wizzard — ENGRAM Context

> Proyecto: `byte-wizzard`
> Tipo: Landing page + demos (indie studio)
> Stack: HTML + CSS + JS vanilla
> Deploy: Cloudflare Pages (byte-wizzard.xyz) + GitHub Pages (fallback)
> Repo: https://github.com/ByteWizzardCreators/byte-wizzard

---

## Brand

- **Name**: Byte Wizzard (con doble Z, estilo fantasy/mago)
- **Tagline**: AI-first systems for automation, logistics, education and intelligent assistants.
- **Motto**: "We don't build ideas. We build working systems." / "No construimos ideas. Construimos sistemas que funcionan."
- **Tone**: Técnico, directo, con personalidad. Terminal aesthetic. Voseo rioplatense en ES.

## Products

| Product | Description | Status | URL |
|---------|-------------|--------|-----|
| Luna | AI Business Assistant — memoria persistente, chat, emails, soporte | ✅ Live | https://luna.wizzardbyte.workers.dev |
| Hermes | Byte Wizzard AI Assistant — demo bot del estudio | ✅ Demo | `demos/hermes/` |
| Profe Mágico | AI Learning System — inglés con IA para niños | ✅ Live | https://profe-magico-frontend.onrender.com/ |
| Courier TMS | Logistics Intelligence System — rutas, GPS, clustering | 🚧 Demo | `demos/courier-tms/` |
| ClipCraft | Mobile Content Creation — edición, render cloud | 🔧 In dev | — |

## Project Structure

```
byte-wizzard/
├── AGENTS.md                  ← instrucciones del agente (root)
├── ENGRAM_CONTEXT.md          ← este archivo (root)
├── index.html                 ← landing page PRINCIPAL
├── web/index.html             ← landing page alternativa (vidriera)
├── assets/
│   ├── i18n.js                ← traducciones EN/ES/PT + KB stack entries
│   ├── reviews.js             ← cliente de reviews API
│   ├── anti-devtools.js       ← protección anti-DevTools (7 capas)
│   ├── styles.css             ← estilos globales
│   └── terminal*.js           ← terminal animada
├── server/                    ← Express API (Render)
│   ├── index.js               ← reviews API (SQLite WAL, rate limiting)
│   ├── package.json
│   └── data/reviews.db        ← SQLite DB
├── apps/                      ← productos reales
│   ├── reviews/               ← Cloudflare Worker (Reviews API alternativo)
│   │   ├── src/index.js       ← worker con sliding window rate limiter
│   │   └── wrangler.toml
│   ├── luna/README.md
│   └── profe-magico/README.md
├── demos/                     ← experimentos interactivos
│   ├── hermes/index.html      ← demo Hermes bot
│   ├── courier-tms/index.html ← route optimizer demo
│   └── roleplay-chat/         ← roleplay chat demo
└── docs/
```

## Architecture

```
Frontend (index.html)
    ↓
REVIEWS_API = 'https://reviews-afib.onrender.com'
    ↓
Express Server (Render.com)  ←─── primario activo
  ├── SQLite WAL (reviews.db)
  ├── express-rate-limit (global 30/min, POST 3/min, admin 20/min)
  ├── RateLimit-* + Retry-After headers
  └── CORS restringido a bytewizzardcreators.github.io + byte-wizzard.xyz

Cloudflare Worker (apps/reviews/)  ←─── secundario (no activo hoy)
  ├── Cloudflare KV (reviews)
  ├── Sliding window rate limiter (POST 3/min, GET 60/min)
  ├── X-RateLimit-* + Retry-After headers
  └── Admin endpoints con token
```

## Security Layers (activas)

1. **Rate limiting** — express-rate-limit + Cloudflare sliding window KV
2. **Anti-DevTools** — script de 7 capas en todas las páginas
3. **CORS** — origenes restringidos
4. **Admin-Token** — endpoints de moderación protegidos
5. **Input validation** — tamaño, formato, producto válido
6. **Payload limit** — 10kb en Express

## KB Stack — Hermes

Stack real (sin logos inventados):
- **Edge**: Cloudflare Workers (Luna, reviews API)
- **Frontend**: Vanilla JS + React + Leaflet (según el proyecto, cero framework pedorro)
- **Storage**: SQLite WAL (server) + Cloudflare KV (edge)
- **Data**: Data engineering, geospatial pipelines, transformación serverless
- **Systems**: Go (Logistics Intelligence, routing, clustering), Python (data processing, ML inference)
- **Philosophy**: "Herramientas modernas, decisiones conscientes, cero humo."
- **Certifications**: ISO SQL Security + ISO Security (son dos certificaciones separadas)

## Design System

- **Fonts**: JetBrains Mono (headings/mono), Inter (body)
- **Colors**: `#0a0a0f` bg, `#00d488` green accent, `#1a1a2e` borders
- **Aesthetic**: dark terminal + subtle gradients on cards
- **Cards**: 4 products with colored top borders (green, orange, purple, blue)

## Key Decisions

- **Zero framework**: Vanilla HTML/CSS/JS. No React, no build step.
- **Separación clara**: `web/` para landing, `demos/` para experimentos, `apps/` para productos reales.
- **AGENTS.md en root**: OpenCode lo busca automáticamente en la raíz del proyecto.
- **Demos usan APIs públicas**: Nominatim (geocoding) + OSRM (routing) — gratis, sin API key.
- **Terminal aesthetic**: Coherente con el brand.
- **Mobile first**: Responsive grid, cards se apilan en mobile.
- **Anti-DevTools antes que ofuscación**: Preferimos rate limiting + detección a ofuscar código.
- **express-rate-limit > Map manual**: Producción-ready, headers estándar, Retry-After.
- **KB stack con detalle real aprobado**: "dejalos así no más" — transparencia es el diferenciador.
- **API Gateway rechazado**: Over-engineering para 6 endpoints. Seguridad actual es suficiente.
- **CEO entry**: Hermes (no Luna) — Luna no está en la landing page.

## Related Projects

- `luna` — Cloudflare Worker, KV, Workers AI (Llama 3) — `C:\Proyectos\luna`
- `courier-tms` — Planning inicial — `C:\Proyectos\courier-tms`
- `clipcraft` — Backend render en Render.com
- `profe-magico` — Frontend live en Render
- `engram-main` — Central runtime, knowledge base, error registry
- `reviews` — Cloudflare Worker (apps/reviews/) — alternativa serverless al Express API

## 🌐 APIs Públicas

Referencia completa: [`knowledge/apis/public-apis.md`](../engram-main/knowledge/apis/public-apis.md)

**Quick Reference** (más usadas en demos):
- Nominatim — geocoding gratuito (sin API key)
- OSRM — routing y optimización de rutas
- Leaflet + OpenStreetMap — mapas interactivos
- REST Countries — datos de países
- ExchangeRate-API — divisas
- Weather (Open-Meteo, OpenWeatherMap)
- Ipify, ipapi — geolocalización por IP
