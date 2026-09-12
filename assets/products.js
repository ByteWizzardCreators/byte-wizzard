/**
 * Byte Wizzard — Product Registry
 *
 * Single declarative source of product content for the landing page and the
 * Product Detail Pages (PDPs). Localized ES (default) / EN / PT with equal
 * language sets per product.
 *
 * Shape:
 *   {
 *     id: 'slug',                    // used in href products/{id}.html
 *     icon: 'emoji',
 *     accent: 'gradient css',        // card visual header + accent border
 *     status: 'demo' | 'dev' | 'live' | 'mvp',
 *     demoUrl: 'relative path' | null,
 *     liveUrl: 'https://...' | null,
 *     content: {
 *       es: { name, tagline, statusLabel, features[], description, specs[], useCases[], seo{} },
 *       en: { ... },
 *       pt: { ... }
 *     }
 *   }
 *
 * Load order: an independent script — no dependencies on I18N or the DOM.
 */

const PRODUCTS = [
  // ────────────────────────────────────────────────────────────────
  // Hermes — Byte Wizzard AI Assistant
  // ────────────────────────────────────────────────────────────────
  {
    id: 'hermes',
    icon: '⚡',
    accent: 'linear-gradient(135deg, #00d488, #00aaff)',
    status: 'demo',
    demoUrl: 'demos/hermes/index.html',
    liveUrl: null,
    content: {
      es: {
        name: 'Hermes',
        tagline: 'Byte Wizzard AI Assistant',
        statusLabel: 'DEMO',
        features: [
          'Conocimiento completo del estudio',
          'Info de productos y demos',
          'Stack tecnológico y visión',
          'Chat interactivo en vivo',
        ],
        description: 'Hermes es el asistente de IA de Byte Wizzard: un bot conversacional con conocimiento completo del estudio, memoria persistente y capacidad de redacción automática de emails. Es la cara visible del estudio en la landing y la puerta de entrada a todos los productos y demos del ecosistema.',
        specs: [
          { label: 'Plataforma', value: 'Web — widget en landing + demo standalone' },
          { label: 'Stack', value: 'JavaScript vanilla + modelos de lenguaje con IA' },
          { label: 'Motor', value: 'Basado en Luna (AI Business Assistant)' },
          { label: 'Capacidades', value: 'Chat en vivo, memoria persistente, redacción de emails' },
          { label: 'Estado', value: 'Demo funcional en la landing' },
          { label: 'Idiomas', value: 'Español, English, Português' },
        ],
        useCases: [
          'Responder en vivo las preguntas de los visitantes sobre el estudio, los productos y el stack',
          'Redactar emails profesionales a partir de una idea en segundos',
          'Mostrar las capacidades de IA de Byte Wizzard directamente en la landing',
        ],
        seo: {
          title: 'Hermes — Byte Wizzard',
          description: 'Hermes, el asistente de IA de Byte Wizzard: chat en vivo con conocimiento del estudio, memoria persistente y redacción automática de emails.',
        },
      },
      en: {
        name: 'Hermes',
        tagline: 'Byte Wizzard AI Assistant',
        statusLabel: 'DEMO',
        features: [
          'Full studio knowledge',
          'Product & demo info',
          'Tech stack & vision',
          'Interactive live chat',
        ],
        description: 'Hermes is Byte Wizzard\'s AI assistant: a conversational bot with complete studio knowledge, persistent memory and automatic email drafting. It is the studio\'s front-facing assistant on the landing page and the gateway to every product and demo in the ecosystem.',
        specs: [
          { label: 'Platform', value: 'Web — landing widget + standalone demo' },
          { label: 'Stack', value: 'Vanilla JavaScript + AI language models' },
          { label: 'Engine', value: 'Based on Luna (AI Business Assistant)' },
          { label: 'Capabilities', value: 'Live chat, persistent memory, email drafting' },
          { label: 'Status', value: 'Working demo on the landing page' },
          { label: 'Languages', value: 'English, Español, Português' },
        ],
        useCases: [
          'Answer visitor questions in real time about the studio, the products and the stack',
          'Draft professional emails from a rough idea in seconds',
          'Showcase Byte Wizzard\'s AI capabilities right on the landing page',
        ],
        seo: {
          title: 'Hermes — Byte Wizzard',
          description: 'Hermes, Byte Wizzard\'s AI assistant: live chat with full studio knowledge, persistent memory and automatic email drafting.',
        },
      },
      pt: {
        name: 'Hermes',
        tagline: 'Assistente IA da Byte Wizzard',
        statusLabel: 'DEMO',
        features: [
          'Conhecimento completo do estúdio',
          'Informações de produtos e demos',
          'Stack tecnológico e visão',
          'Chat interativo ao vivo',
        ],
        description: 'O Hermes é o assistente de IA da Byte Wizzard: um bot conversacional com conhecimento completo do estúdio, memória persistente e capacidade de redação automática de e-mails. É a cara visível do estúdio na landing e a porta de entrada para todos os produtos e demos do ecossistema.',
        specs: [
          { label: 'Plataforma', value: 'Web — widget na landing + demo standalone' },
          { label: 'Stack', value: 'JavaScript vanilla + modelos de linguagem com IA' },
          { label: 'Motor', value: 'Baseado no Luna (AI Business Assistant)' },
          { label: 'Capacidades', value: 'Chat ao vivo, memória persistente, redação de e-mails' },
          { label: 'Estado', value: 'Demo funcional na landing' },
          { label: 'Idiomas', value: 'Português, Español, English' },
        ],
        useCases: [
          'Responder ao vivo as perguntas dos visitantes sobre o estúdio, os produtos e o stack',
          'Redigir e-mails profissionais a partir de uma ideia em segundos',
          'Mostrar as capacidades de IA da Byte Wizzard direto na landing',
        ],
        seo: {
          title: 'Hermes — Byte Wizzard',
          description: 'Hermes, o assistente de IA da Byte Wizzard: chat ao vivo com conhecimento do estúdio, memória persistente e redação automática de e-mails.',
        },
      },
    },
  },

  // ────────────────────────────────────────────────────────────────
  // RolePlay Chat — Digital Call Center Simulation
  // ────────────────────────────────────────────────────────────────
  {
    id: 'roleplay-chat',
    icon: '🎭',
    accent: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    status: 'demo',
    demoUrl: 'demos/roleplay-chat/index.html',
    liveUrl: null,
    content: {
      es: {
        name: 'RolePlay Chat',
        tagline: 'Simulación de Call Center Digital',
        statusLabel: 'DEMO',
        features: [
          'Simulación de atención digital',
          'Escenarios: reclamos, soporte, ventas',
          'Interacción agente-cliente en vivo',
          'Entrenamiento para postulantes',
          'Multi-canal (chat, WhatsApp)',
        ],
        description: 'RolePlay Chat es un simulador de interacción digital para call centers. Reproduce conversaciones realistas entre agente y cliente en escenarios de reclamos, soporte técnico, facturación, ventas y WhatsApp, y permite seguir escribiendo libremente para explorar respuestas. Es 100% frontend: no necesita backend ni servidor.',
        specs: [
          { label: 'Plataforma', value: 'Web — 100% frontend, sin backend' },
          { label: 'Canal', value: 'Chat, WhatsApp y canales digitales' },
          { label: 'Escenarios', value: 'Reclamos, soporte técnico, facturación, ventas, WhatsApp' },
          { label: 'Uso', value: 'Entrenamiento y selección de postulantes' },
          { label: 'Estado', value: 'Demo interactiva funcional' },
          { label: 'Idiomas', value: 'Español, English, Português' },
        ],
        useCases: [
          'Evaluar postulantes en procesos de selección de call centers digitales',
          'Capacitar equipos de atención con escenarios realistas y práctica libre',
          'Demostrar la gestión de interacciones omnicanal en entornos de contacto',
        ],
        seo: {
          title: 'RolePlay Chat — Byte Wizzard',
          description: 'Simulador de call center digital para entrenamiento y selección de postulantes: escenarios de reclamos, soporte, ventas y WhatsApp.',
        },
      },
      en: {
        name: 'RolePlay Chat',
        tagline: 'Call Center Digital Simulation',
        statusLabel: 'DEMO',
        features: [
          'Digital customer service simulation',
          'Scenarios: claims, support, sales',
          'Live agent-client interaction',
          'Applicant training tool',
          'Multi-channel (chat, WhatsApp)',
        ],
        description: 'RolePlay Chat is a digital interaction simulator for call centers. It plays realistic agent-client conversations across claims, technical support, billing, sales and WhatsApp scenarios, and lets you keep typing freely to explore different responses. It is 100% frontend — no backend or server required.',
        specs: [
          { label: 'Platform', value: 'Web — 100% frontend, no backend' },
          { label: 'Channel', value: 'Chat, WhatsApp and digital channels' },
          { label: 'Scenarios', value: 'Claims, technical support, billing, sales, WhatsApp' },
          { label: 'Use', value: 'Applicant training and recruitment' },
          { label: 'Status', value: 'Working interactive demo' },
          { label: 'Languages', value: 'English, Español, Português' },
        ],
        useCases: [
          'Assess applicants in digital call center recruitment processes',
          'Train service teams with realistic scenarios and free practice',
          'Showcase omnichannel interaction handling in contact environments',
        ],
        seo: {
          title: 'RolePlay Chat — Byte Wizzard',
          description: 'Digital call center simulator for training and applicant assessment: claims, support, sales and WhatsApp scenarios.',
        },
      },
      pt: {
        name: 'RolePlay Chat',
        tagline: 'Simulação de Call Center Digital',
        statusLabel: 'DEMO',
        features: [
          'Simulação de atendimento digital',
          'Cenários: reclamações, suporte, vendas',
          'Interação agente-cliente ao vivo',
          'Treinamento para candidatos',
          'Multi-canal (chat, WhatsApp)',
        ],
        description: 'O RolePlay Chat é um simulador de interação digital para call centers. Reproduz conversas realistas entre agente e cliente em cenários de reclamações, suporte técnico, faturamento, vendas e WhatsApp, e permite continuar escrevendo livremente para explorar respostas. É 100% frontend: não precisa de backend nem servidor.',
        specs: [
          { label: 'Plataforma', value: 'Web — 100% frontend, sem backend' },
          { label: 'Canal', value: 'Chat, WhatsApp e canais digitais' },
          { label: 'Cenários', value: 'Reclamações, suporte técnico, faturamento, vendas, WhatsApp' },
          { label: 'Uso', value: 'Treinamento e seleção de candidatos' },
          { label: 'Estado', value: 'Demo interativa funcional' },
          { label: 'Idiomas', value: 'Português, Español, English' },
        ],
        useCases: [
          'Avaliar candidatos em processos de seleção de call centers digitais',
          'Capacitar equipes de atendimento com cenários realistas e prática livre',
          'Demonstrar a gestão de interações omnicanal em ambientes de contato',
        ],
        seo: {
          title: 'RolePlay Chat — Byte Wizzard',
          description: 'Simulador de call center digital para treinamento e seleção de candidatos: cenários de reclamações, suporte, vendas e WhatsApp.',
        },
      },
    },
  },

  // ────────────────────────────────────────────────────────────────
  // Courier TMS — Logistics Intelligence System
  // ────────────────────────────────────────────────────────────────
  {
    id: 'courier-tms',
    icon: '🚚',
    accent: 'linear-gradient(135deg, #ff6b35, #ffb347)',
    status: 'dev',
    demoUrl: 'demos/courier-tms/index.html',
    liveUrl: null,
    content: {
      es: {
        name: 'Courier TMS',
        tagline: 'Logistics Intelligence System',
        statusLabel: 'EN DESARROLLO',
        features: [
          'Agrupación inteligente por zonas',
          'Optimización de rutas (TSP)',
          'Tracking GPS en tiempo real',
          'App para repartidores',
          'Panel administrativo completo',
          'Importación de órdenes CSV',
        ],
        description: 'Courier TMS es el sistema de inteligencia logística de Byte Wizzard para empresas de delivery. Agrupa las órdenes por zona, optimiza rutas con algoritmos TSP y geocodifica direcciones automáticamente. Incluye tracking GPS en tiempo real, una app para repartidores y un panel administrativo completo con importación de órdenes desde CSV.',
        specs: [
          { label: 'Geocodificación', value: 'Nominatim (OpenStreetMap)' },
          { label: 'Routing y mapas', value: 'OSRM + Leaflet' },
          { label: 'Optimización', value: 'Nearest-Neighbor TSP' },
          { label: 'Datos', value: 'Importación / exportación CSV y Excel' },
          { label: 'Componentes', value: 'App repartidor + panel admin + tracking GPS' },
          { label: 'Estado', value: 'En desarrollo con demo funcional' },
        ],
        useCases: [
          'Planificar decenas de entregas diarias agrupando órdenes por zona y repartidor',
          'Reducir tiempos y distancias con optimización automática de rutas',
          'Seguir la flota en vivo desde el panel y coordinar con la app del repartidor',
        ],
        seo: {
          title: 'Courier TMS — Byte Wizzard',
          description: 'Sistema de inteligencia logística: optimización de rutas, agrupación por zonas y tracking GPS en tiempo real para empresas de delivery.',
        },
      },
      en: {
        name: 'Courier TMS',
        tagline: 'Logistics Intelligence System',
        statusLabel: 'IN DEVELOPMENT',
        features: [
          'Smart zone clustering',
          'Route optimization (TSP)',
          'Real-time GPS tracking',
          'Driver mobile app',
          'Complete admin panel',
          'CSV order import',
        ],
        description: 'Courier TMS is Byte Wizzard\'s logistics intelligence system for delivery companies. It clusters orders by zone, optimizes routes with TSP algorithms and geocodes addresses automatically. It includes real-time GPS tracking, a driver mobile app and a complete admin panel with CSV order import.',
        specs: [
          { label: 'Geocoding', value: 'Nominatim (OpenStreetMap)' },
          { label: 'Routing & maps', value: 'OSRM + Leaflet' },
          { label: 'Optimization', value: 'Nearest-Neighbor TSP' },
          { label: 'Data', value: 'CSV / Excel import & export' },
          { label: 'Components', value: 'Driver app + admin panel + GPS tracking' },
          { label: 'Status', value: 'In development with working demo' },
        ],
        useCases: [
          'Plan dozens of daily deliveries by clustering orders by zone and driver',
          'Cut route time and distance with automatic route optimization',
          'Track the fleet live from the panel and coordinate through the driver app',
        ],
        seo: {
          title: 'Courier TMS — Byte Wizzard',
          description: 'Logistics intelligence system: route optimization, zone clustering and real-time GPS tracking for delivery companies.',
        },
      },
      pt: {
        name: 'Courier TMS',
        tagline: 'Sistema de Inteligência Logística',
        statusLabel: 'EM DESENVOLVIMENTO',
        features: [
          'Agrupamento inteligente por zona',
          'Otimização de rotas (TSP)',
          'Tracking GPS em tempo real',
          'App para entregadores',
          'Painel administrativo completo',
          'Importação de pedidos CSV',
        ],
        description: 'O Courier TMS é o sistema de inteligência logística da Byte Wizzard para empresas de delivery. Agrupa os pedidos por zona, otimiza rotas com algoritmos TSP e geocodifica endereços automaticamente. Inclui tracking GPS em tempo real, app para entregadores e um painel administrativo completo com importação de pedidos via CSV.',
        specs: [
          { label: 'Geocodificação', value: 'Nominatim (OpenStreetMap)' },
          { label: 'Routing e mapas', value: 'OSRM + Leaflet' },
          { label: 'Otimização', value: 'Nearest-Neighbor TSP' },
          { label: 'Dados', value: 'Importação / exportação CSV e Excel' },
          { label: 'Componentes', value: 'App entregador + painel admin + tracking GPS' },
          { label: 'Estado', value: 'Em desenvolvimento com demo funcional' },
        ],
        useCases: [
          'Planejar dezenas de entregas diárias agrupando pedidos por zona e entregador',
          'Reduzir tempos e distâncias com otimização automática de rotas',
          'Acompanhar a frota ao vivo pelo painel e coordenar pelo app do entregador',
        ],
        seo: {
          title: 'Courier TMS — Byte Wizzard',
          description: 'Sistema de inteligência logística: otimização de rotas, agrupamento por zonas e tracking GPS em tempo real para empresas de delivery.',
        },
      },
    },
  },

  // ────────────────────────────────────────────────────────────────
  // Profe Mágico — AI Learning System
  // ────────────────────────────────────────────────────────────────
  {
    id: 'profe-magico',
    icon: '📚',
    accent: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    status: 'live',
    demoUrl: null,
    liveUrl: 'https://profe-magico-frontend.onrender.com/',
    content: {
      es: {
        name: 'Profe Mágico',
        tagline: 'AI Learning System',
        statusLabel: 'LIVE',
        features: [
          'Enseñanza interactiva con IA',
          'Traducción y audio automático',
          'Contenido adaptado para niños',
          'Ejercicios dinámicos',
          'Experiencia educativa guiada',
        ],
        description: 'Profe Mágico es una plataforma educativa con inteligencia artificial para aprender de forma natural. Enseña de manera interactiva, traduce con audio automático y adapta el contenido desde nivel infantil hasta universitario. Está en producción y se accede desde cualquier navegador.',
        specs: [
          { label: 'Plataforma', value: 'Web — live en producción' },
          { label: 'Stack', value: 'Frontend + modelos de lenguaje con IA' },
          { label: 'Niveles', value: 'Infantil a universitario' },
          { label: 'Funciones', value: 'Traducción, audio automático, ejercicios dinámicos' },
          { label: 'Deploy', value: 'Render (profe-magico-frontend.onrender.com)' },
          { label: 'Estado', value: 'Live — iteración continua' },
        ],
        useCases: [
          'Que los niños practiquen inglés con una experiencia guiada, amigable y con audio',
          'Traducir contenido y escuchar la pronunciación correcta automáticamente',
          'Resolver dudas gramaticales avanzadas con explicaciones generadas por IA',
        ],
        seo: {
          title: 'Profe Mágico — Byte Wizzard',
          description: 'Plataforma educativa con IA para aprender inglés de forma interactiva, con traducción, audio automático y contenido adaptado a cada nivel.',
        },
      },
      en: {
        name: 'Profe Mágico',
        tagline: 'AI Learning System',
        statusLabel: 'LIVE',
        features: [
          'Interactive AI teaching',
          'Auto translation & audio',
          'Kids-friendly content',
          'Dynamic exercises',
          'Guided learning experience',
        ],
        description: 'Profe Mágico is an AI-powered educational platform designed for natural learning. It teaches interactively, translates with automatic audio and adapts content from kids\' level all the way to university. It runs in production and is accessible from any browser.',
        specs: [
          { label: 'Platform', value: 'Web — live in production' },
          { label: 'Stack', value: 'Frontend + AI language models' },
          { label: 'Levels', value: 'Kids to university' },
          { label: 'Features', value: 'Translation, auto audio, dynamic exercises' },
          { label: 'Deploy', value: 'Render (profe-magico-frontend.onrender.com)' },
          { label: 'Status', value: 'Live — continuously iterating' },
        ],
        useCases: [
          'Let kids practice English through a guided, friendly experience with audio',
          'Translate content and hear the correct pronunciation automatically',
          'Resolve advanced grammar questions with AI-generated explanations',
        ],
        seo: {
          title: 'Profe Mágico — Byte Wizzard',
          description: 'AI-powered learning platform to learn English interactively, with translation, automatic audio and level-adapted content.',
        },
      },
      pt: {
        name: 'Profe Mágico',
        tagline: 'Sistema de Aprendizagem com IA',
        statusLabel: 'LIVE',
        features: [
          'Ensino interativo com IA',
          'Tradução e áudio automáticos',
          'Conteúdo adaptado para crianças',
          'Exercícios dinâmicos',
          'Experiência educativa guiada',
        ],
        description: 'O Profe Mágico é uma plataforma educacional com inteligência artificial para aprender de forma natural. Ensina de maneira interativa, traduz com áudio automático e adapta o conteúdo do nível infantil ao universitário. Está em produção e pode ser acessado de qualquer navegador.',
        specs: [
          { label: 'Plataforma', value: 'Web — live em produção' },
          { label: 'Stack', value: 'Frontend + modelos de linguagem com IA' },
          { label: 'Níveis', value: 'Infantil a universitário' },
          { label: 'Funções', value: 'Tradução, áudio automático, exercícios dinâmicos' },
          { label: 'Deploy', value: 'Render (profe-magico-frontend.onrender.com)' },
          { label: 'Estado', value: 'Live — iteração contínua' },
        ],
        useCases: [
          'Crianças praticarem inglês com uma experiência guiada, amigável e com áudio',
          'Traduzir conteúdo e ouvir a pronúncia correta automaticamente',
          'Tirar dúvidas gramaticais avançadas com explicações geradas por IA',
        ],
        seo: {
          title: 'Profe Mágico — Byte Wizzard',
          description: 'Plataforma educacional com IA para aprender inglês de forma interativa, com tradução, áudio automático e conteúdo adaptado a cada nível.',
        },
      },
    },
  },

  // ────────────────────────────────────────────────────────────────
  // OmniConnect — Call Center Intelligence Platform
  // ────────────────────────────────────────────────────────────────
  {
    id: 'omniconnect',
    icon: '🌐',
    accent: 'linear-gradient(135deg, #a855f7, #ec4899)',
    status: 'dev',
    demoUrl: 'demos/omniconnect/index.html',
    liveUrl: null,
    content: {
      es: {
        name: 'OmniConnect',
        tagline: 'Call Center Intelligence Platform',
        statusLabel: 'EN DESARROLLO',
        features: [
          'Dashboards en tiempo real',
          'Gestión omnicanal (WhatsApp, email, llamadas)',
          'KPIs inteligentes y reportes automatizados',
          'Perfiles personalizables por rol',
          'Historial completo de interacciones',
          'Alertas y notificaciones configurables',
          'Monitoreo de operaciones en vivo',
          'Migración asistida desde cualquier plataforma',
        ],
        description: 'OmniConnect es la plataforma de inteligencia para call centers de Byte Wizzard: reúne todo el contacto digital en una sola vista con dashboards en tiempo real, 19 KPIs y reportes automatizados. Gestiona WhatsApp, email y llamadas de forma omnicanal, con perfiles por rol, historial completo de interacciones y alertas configurables.',
        specs: [
          { label: 'KPIs', value: '19 métricas en tiempo real' },
          { label: 'Canales', value: 'WhatsApp, email, llamadas' },
          { label: 'Perfiles', value: '3 roles personalizables (agente, supervisor, admin)' },
          { label: 'Reportes', value: 'Automatizados con dashboards en vivo' },
          { label: 'Extra', value: 'Alertas configurables y migración asistida' },
          { label: 'Estado', value: 'Sistema en desarrollo con demo funcional' },
        ],
        useCases: [
          'Monitorear operaciones de contacto en vivo con dashboards y alertas configurables',
          'Gestionar WhatsApp, email y llamadas desde una única plataforma omnicanal',
          'Migrar operaciones existentes con asistencia desde cualquier plataforma',
        ],
        seo: {
          title: 'OmniConnect — Byte Wizzard',
          description: 'Plataforma de inteligencia para call centers: dashboards en tiempo real, 19 KPIs y gestión omnicanal de WhatsApp, email y llamadas.',
        },
      },
      en: {
        name: 'OmniConnect',
        tagline: 'Call Center Intelligence Platform',
        statusLabel: 'IN DEVELOPMENT',
        features: [
          'Real-time dashboards',
          'Omnichannel management (WhatsApp, email, calls)',
          'Smart KPIs and automated reports',
          'Customizable role-based profiles',
          'Complete interaction history',
          'Configurable alerts and notifications',
          'Live operations monitoring',
          'Assisted migration from any platform',
        ],
        description: 'OmniConnect is Byte Wizzard\'s call center intelligence platform: it brings all digital contact into a single view with real-time dashboards, 19 KPIs and automated reports. It manages WhatsApp, email and calls across every channel, with role-based profiles, complete interaction history and configurable alerts.',
        specs: [
          { label: 'KPIs', value: '19 real-time metrics' },
          { label: 'Channels', value: 'WhatsApp, email, calls' },
          { label: 'Profiles', value: '3 customizable roles (agent, supervisor, admin)' },
          { label: 'Reports', value: 'Automated with live dashboards' },
          { label: 'Extras', value: 'Configurable alerts and assisted migration' },
          { label: 'Status', value: 'Working system with functional demo' },
        ],
        useCases: [
          'Monitor contact operations live with dashboards and configurable alerts',
          'Manage WhatsApp, email and calls from a single omnichannel platform',
          'Migrate existing operations with assistance from any platform',
        ],
        seo: {
          title: 'OmniConnect — Byte Wizzard',
          description: 'Call center intelligence platform: real-time dashboards, 19 KPIs and omnichannel management for WhatsApp, email and calls.',
        },
      },
      pt: {
        name: 'OmniConnect',
        tagline: 'Call Center Intelligence Platform',
        statusLabel: 'EM DESENVOLVIMENTO',
        features: [
          'Dashboards em tempo real',
          'Gestão omnicanal (WhatsApp, email, chamadas)',
          'KPIs inteligentes e relatórios automatizados',
          'Perfis personalizáveis por função',
          'Histórico completo de interações',
          'Alertas e notificações configuráveis',
          'Monitoramento de operações ao vivo',
          'Migração assistida de qualquer plataforma',
        ],
        description: 'O OmniConnect é a plataforma de inteligência para call centers da Byte Wizzard: reúne todo o contato digital em uma única visão com dashboards em tempo real, 19 KPIs e relatórios automatizados. Gerencia WhatsApp, email e chamadas de forma omnicanal, com perfis por função, histórico completo de interações e alertas configuráveis.',
        specs: [
          { label: 'KPIs', value: '19 métricas em tempo real' },
          { label: 'Canais', value: 'WhatsApp, email, chamadas' },
          { label: 'Perfis', value: '3 funções personalizáveis (agente, supervisor, admin)' },
          { label: 'Relatórios', value: 'Automatizados com dashboards ao vivo' },
          { label: 'Extras', value: 'Alertas configuráveis e migração assistida' },
          { label: 'Estado', value: 'Sistema em desenvolvimento com demo funcional' },
        ],
        useCases: [
          'Monitorar operações de contato ao vivo com dashboards e alertas configuráveis',
          'Gerenciar WhatsApp, email e chamadas em uma única plataforma omnicanal',
          'Migrar operações existentes com assistência de qualquer plataforma',
        ],
        seo: {
          title: 'OmniConnect — Byte Wizzard',
          description: 'Plataforma de inteligência para call centers: dashboards em tempo real, 19 KPIs e gestão omnicanal de WhatsApp, email e chamadas.',
        },
      },
    },
  },
];

window.PRODUCTS = PRODUCTS;