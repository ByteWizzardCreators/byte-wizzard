# Byte Wizzard — ENGRAM Context

> Proyecto: `byte-wizzard`
> Tipo: Landing page + demos (indie studio)
> Stack: HTML + CSS + JS vanilla
> Deploy: Cloudflare Pages o GitHub Pages
> Repo: No inicializado aún

---

## Brand

- **Name**: Byte Wizzard (con doble Z, estilo fantasy/mago)
- **Tagline**: AI-first systems for automation, logistics, education and intelligent assistants.
- **Motto**: "We don't build ideas. We build working systems."
- **Tone**: Técnico, directo, con personalidad. Terminal aesthetic.

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
├── AGENTS.md              ← instrucciones del agente (root)
├── ENGRAM_CONTEXT.md      ← este archivo (root)
├── web/                   ← landing page (vidriera)
│   ├── index.html         ← página principal del estudio
│   └── assets/            ← imágenes, icons (futuro)
├── apps/                  ← productos reales (referencias)
│   ├── luna/
│   │   └── README.md      ← link a live + stack
│   └── profe-magico/
│       └── README.md      ← link a live + stack
├── demos/                 ← experimentos interactivos
│   └── courier-tms/
│       └── index.html     ← route optimizer demo
└── docs/                  ← documentación del proyecto
```

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

## Related Projects

- `luna` — Cloudflare Worker, KV, Workers AI (Llama 3) — `C:\Proyectos\luna`
- `courier-tms` — Planning inicial — `C:\Proyectos\courier-tms`
- `clipcraft` — Backend render en Render.com
- `profe-magico` — Frontend live en Render
- `engram-main` — Central runtime, knowledge base, error registry

## 🌐 APIs Públicas

Referencia completa: [`knowledge/apis/public-apis.md`](../engram-main/knowledge/apis/public-apis.md)

Esa referencia apunta a [github.com/public-apis/public-apis](https://github.com/public-apis/public-apis) — 1400+ APIs free.
No están descargadas localmente. Se consultan live cuando se necesitan.

**Quick Reference** (más usadas en demos):
- Nominatim — geocoding gratuito (sin API key)
- OSRM — routing y optimización de rutas
- Leaflet + OpenStreetMap — mapas interactivos
- REST Countries — datos de países
- ExchangeRate-API — divisas
- Weather (Open-Meteo, OpenWeatherMap)
- Ipify, ipapi — geolocalización por IP

> Cualquier consulta tipo _"buscame una API de [categoría]"_ se responde consultando el repo público en vivo.
