# Byte Wizzard â€” ENGRAM Context

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
- **Tone**: TÃ©cnico, directo, con personalidad. Terminal aesthetic. Voseo rioplatense en ES.

## Products

| Product | Description | Status | URL |
|---------|-------------|--------|-----|
| Luna | AI Business Assistant â€” memoria persistente, chat, emails, soporte | âœ… Live | https://luna.wizzardbyte.workers.dev |
| Hermes | Byte Wizzard AI Assistant â€” demo bot del estudio | âœ… Demo | `demos/hermes/` |
| Profe MÃ¡gico | AI Learning System â€” inglÃ©s con IA para niÃ±os | âœ… Live | https://profe-magico-frontend.onrender.com/ |
| Courier TMS | Logistics Intelligence System â€” rutas, GPS, clustering | ðŸš§ Demo | `demos/courier-tms/` |
| OmniConnect | Call Center Intelligence Platform â€” 19 KPIs, 3 perfiles, tiempo real | âœ… Working System | `demos/OmniConnect/` |
| ClipCraft | Mobile Content Creation â€” ediciÃ³n, render cloud | ðŸ”§ In dev | â€” |

## Project Structure

```
byte-wizzard/
â”œâ”€â”€ AGENTS.md                  â† instrucciones del agente (root)
â”œâ”€â”€ ENGRAM_CONTEXT.md          â† este archivo (root)
â”œâ”€â”€ index.html                 â† landing page PRINCIPAL
â”œâ”€â”€ web/index.html             â† landing page alternativa (vidriera)
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ i18n.js                â† traducciones EN/ES/PT + KB stack entries
â”‚   â”œâ”€â”€ reviews.js             â† cliente de reviews API
â”‚   â”œâ”€â”€ anti-devtools.js       â† protecciÃ³n anti-DevTools (7 capas)
â”‚   â”œâ”€â”€ styles.css             â† estilos globales
â”‚   â””â”€â”€ terminal*.js           â† terminal animada
â”œâ”€â”€ server/                    â† Express API (Render)
â”‚   â”œâ”€â”€ index.js               â† reviews API (SQLite WAL, rate limiting)
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ data/reviews.db        â† SQLite DB
â”œâ”€â”€ apps/                      â† productos reales
â”‚   â”œâ”€â”€ reviews/               â† Cloudflare Worker (Reviews API alternativo)
â”‚   â”‚   â”œâ”€â”€ src/index.js       â† worker con sliding window rate limiter
â”‚   â”‚   â””â”€â”€ wrangler.toml
â”‚   â”œâ”€â”€ luna/README.md
â”‚   â””â”€â”€ profe-magico/README.md
â”œâ”€â”€ demos/                     â† experimentos interactivos
â”‚   â”œâ”€â”€ hermes/index.html      â† demo Hermes bot
â”‚   â”œâ”€â”€ courier-tms/index.html â† route optimizer demo
â”‚   â””â”€â”€ roleplay-chat/         â† roleplay chat demo
â””â”€â”€ docs/
```

## Architecture

```
Frontend (index.html)
    â†“
REVIEWS_API = 'https://reviews-afib.onrender.com'
    â†“
Express Server (Render.com)  â†â”€â”€â”€ primario activo
  â”œâ”€â”€ SQLite WAL (reviews.db)
  â”œâ”€â”€ express-rate-limit (global 30/min, POST 3/min, admin 20/min)
  â”œâ”€â”€ RateLimit-* + Retry-After headers
  â””â”€â”€ CORS restringido a bytewizzardcreators.github.io + byte-wizzard.xyz

Cloudflare Worker (apps/reviews/)  â†â”€â”€â”€ secundario (no activo hoy)
  â”œâ”€â”€ Cloudflare KV (reviews)
  â”œâ”€â”€ Sliding window rate limiter (POST 3/min, GET 60/min)
  â”œâ”€â”€ X-RateLimit-* + Retry-After headers
  â””â”€â”€ Admin endpoints con token
```

## Security Layers (activas)

1. **Rate limiting** â€” express-rate-limit + Cloudflare sliding window KV
2. **Anti-DevTools** â€” script de 7 capas en todas las pÃ¡ginas
3. **CORS** â€” origenes restringidos
4. **Admin-Token** â€” endpoints de moderaciÃ³n protegidos
5. **Input validation** â€” tamaÃ±o, formato, producto vÃ¡lido
6. **Payload limit** â€” 10kb en Express

## KB Stack â€” Hermes

Stack real (sin logos inventados):
- **Edge**: Cloudflare Workers (Luna, reviews API)
- **Frontend**: Vanilla JS + React + Leaflet (segÃºn el proyecto, cero framework pedorro)
- **Storage**: SQLite WAL (server) + Cloudflare KV (edge)
- **Data**: Data engineering, geospatial pipelines, transformaciÃ³n serverless
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
- **SeparaciÃ³n clara**: `web/` para landing, `demos/` para experimentos, `apps/` para productos reales.
- **AGENTS.md en root**: OpenCode lo busca automÃ¡ticamente en la raÃ­z del proyecto.
- **Demos usan APIs pÃºblicas**: Nominatim (geocoding) + OSRM (routing) â€” gratis, sin API key.
- **Terminal aesthetic**: Coherente con el brand.
- **Mobile first**: Responsive grid, cards se apilan en mobile.
- **Anti-DevTools antes que ofuscaciÃ³n**: Preferimos rate limiting + detecciÃ³n a ofuscar cÃ³digo.
- **express-rate-limit > Map manual**: ProducciÃ³n-ready, headers estÃ¡ndar, Retry-After.
- **KB stack con detalle real aprobado**: "dejalos asÃ­ no mÃ¡s" â€” transparencia es el diferenciador.
- **API Gateway rechazado**: Over-engineering para 6 endpoints. Seguridad actual es suficiente.
- **CEO entry**: Hermes (no Luna) â€” Luna no estÃ¡ en la landing page.

## Related Projects

- `luna` â€” Cloudflare Worker, KV, Workers AI (Llama 3) â€” `C:\Proyectos\luna`
- `courier-tms` â€” Planning inicial â€” `C:\Proyectos\courier-tms`
- `clipcraft` â€” Backend render en Render.com
- `profe-magico` â€” Frontend live en Render
- `engram-main` â€” Central runtime, knowledge base, error registry
- `reviews` â€” Cloudflare Worker (apps/reviews/) â€” alternativa serverless al Express API

## ðŸŒ APIs PÃºblicas

Referencia completa: [`knowledge/apis/public-apis.md`](../engram-main/knowledge/apis/public-apis.md)

**Quick Reference** (mÃ¡s usadas en demos):
- Nominatim â€” geocoding gratuito (sin API key)
- OSRM â€” routing y optimizaciÃ³n de rutas
- Leaflet + OpenStreetMap â€” mapas interactivos
- REST Countries â€” datos de paÃ­ses
- ExchangeRate-API â€” divisas
- Weather (Open-Meteo, OpenWeatherMap)
- Ipify, ipapi â€” geolocalizaciÃ³n por IP
