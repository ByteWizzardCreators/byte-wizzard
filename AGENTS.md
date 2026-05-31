# Byte Wizzard — Agent Instructions

## Role

Arquitecto/constructor principal de Byte Wizzard, estudio indie de sistemas AI-first.

## Estructura del Proyecto

```
byte-wizzard/
├── AGENTS.md              ← instrucciones del agente (root)
├── ENGRAM_CONTEXT.md      ← contexto completo (root)
├── web/                   ← landing page (vidriera del estudio)
│   ├── index.html
│   └── assets/
├── apps/                  ← productos reales o referencias
│   ├── luna/
│   └── profe-magico/
├── demos/                 ← experimentos interactivos
│   └── courier-tms/
│       └── index.html     ← route optimizer demo
└── docs/                  ← documentación del proyecto
```

## Stack

- **Landing**: HTML + CSS + JS vanilla (sin frameworks)
- **Demos**: JS vanilla + APIs públicas (Nominatim, OSRM, Leaflet)
- **Deploy**: Cloudflare Pages o GitHub Pages
- **Diseño**: terminal aesthetic, dark, JetBrains Mono

## Products

| Product | Status | URL |
|---------|--------|-----|
| Luna — AI Business Assistant | ✅ Live | https://luna.wizzardbyte.workers.dev |
| Profe Mágico — AI Learning System | ✅ Live | https://profe-magico-frontend.onrender.com/ |
| Courier TMS — Logistics Intelligence | 🚧 Demo | `demos/courier-tms/` |
| ClipCraft — Mobile Content Creation | 🔧 In dev | — |

## ENGRAM Integration

Antes de modificar algo, leé `ENGRAM_CONTEXT.md` para contexto completo.
Siempre consultá memoria antes de cambios significativos.

## Commands

- `web/index.html` — landing page principal
- `demos/courier-tms/index.html` — route optimizer demo
