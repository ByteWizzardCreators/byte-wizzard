/**
 * Byte Wizzard — i18n System
 * ES (default), EN, PT
 *
 * Usage:
 *   <span data-i18n="hero.title">BYTE WIZZARD</span>
 *   <img data-i18n-alt="products.hermes.icon">
 *
 * Language switcher:
 *   <button onclick="setLang('en')">EN</button>
 */

const I18N = (() => {
  const STORAGE_KEY = 'bw-lang';

  const TRANSLATIONS = {
    es: {
      // ─── NAV ───
      nav: { products: 'Productos', what: 'Qué Hacemos', vision: 'Visión', stack: 'Stack', status: 'Estado', contact: 'Contacto' },

      // ─── HERO ───
      hero: {
        label: './byte-wizzard --whoami',
        title: 'BYTE<br><span class="accent">WIZZARD</span>',
        subtitle: 'AI-first systems for automation, logistics,<br>education and intelligent assistants.',
        btnProducts: 'Ver Productos →',
        btnContact: 'Contacto',
        scroll: 'SCROLL ▼',
      },

      // ─── PRODUCTS ───
      products: {
        title: 'Productos',
        hermes: {
          icon: '⚡',
          name: 'Hermes',
          tagline: 'Byte Wizzard AI Assistant',
          features: ['Conocimiento completo del estudio', 'Info de productos y demos', 'Stack tecnológico y visión', 'Chat interactivo en vivo'],
          link: '→ Probar Demo Bot',
        },
        courier: {
          icon: '🚚',
          name: 'Courier TMS',
          tagline: 'Logistics Intelligence System',
          features: ['Agrupación inteligente por zonas', 'Optimización de rutas (TSP)', 'Tracking GPS en tiempo real', 'App para repartidores', 'Panel administrativo completo', 'Importación de órdenes CSV'],
          link: '→ Probar Demo',
        },
        clipcraft: {
          icon: '📱',
          name: 'ClipCraft',
          tagline: 'Mobile Content Creation Platform',
          features: ['Edición de fotos y videos', 'Generación automática de videos', 'Música integrada', 'Render en la nube', 'Exportación directa al dispositivo'],
          link: '→ En desarrollo',
        },
        profe: {
          icon: '📚',
          name: 'Profe Mágico',
          tagline: 'AI Learning System',
          features: ['Enseñanza interactiva con IA', 'Traducción y audio automático', 'Contenido adaptado para niños', 'Ejercicios dinámicos', 'Experiencia educativa guiada'],
          link: '→ Probar Demo',
        },
      },

      // ─── WHAT WE DO ───
      wwd: {
        title: 'Qué Hacemos',
        items: [
          { emoji: '🧠', label: 'AI Systems', desc: 'Intelligent automation for real processes' },
          { emoji: '⚙️', label: 'Automation', desc: 'Reduce manual work through smart flows' },
          { emoji: '🚛', label: 'Logistics', desc: 'Route optimization & live tracking' },
          { emoji: '🎓', label: 'Education', desc: 'AI-powered learning experiences' },
          { emoji: '📱', label: 'Mobile', desc: 'React Native & Expo apps' },
          { emoji: '☁️', label: 'Cloud', desc: 'Cloudflare Workers & edge computing' },
        ],
      },

      // ─── VISION ───
      vision: {
        title: 'Visión',
        quote: 'Reducir trabajo manual a través de sistemas inteligentes<br>que automatizan <strong>operaciones reales</strong> en empresas,<br>logística y educación.',
      },

      // ─── QUOTE ───
      quote: '“We don\'t build ideas. <span class="highlight">We build working systems.</span>”',

      // ─── STACK ───
      stack: {
        title: 'Stack',
        tags: ['Cloudflare Workers', 'Node.js', 'Fastify', 'Express', 'React', 'Vite', 'React Native', 'Expo', 'Llama 3', 'OpenStreetMap', 'OSRM', 'Nominatim', 'Prisma', 'PostgreSQL', 'PostGIS'],
      },

      // ─── STATUS ───
      status: {
        title: 'Estado',
        items: ['Desarrollo activo', 'Sistemas desplegados reales', 'Iteración continua'],
      },

      // ─── FOOTER ───
      footer: {
        brand: 'BYTE <span class="accent">WIZZARD</span>',
        tagline: 'AI & Software Systems Studio',
        copyright: '© 2026 Byte Wizzard — Productos reales. Sistemas reales.',
      },
    },

    // ═══════════════════════════════════════════════════
    // ENGLISH
    // ═══════════════════════════════════════════════════
    en: {
      nav: { products: 'Products', what: 'What We Do', vision: 'Vision', stack: 'Stack', status: 'Status', contact: 'Contact' },
      hero: {
        label: './byte-wizzard --whoami',
        title: 'BYTE<br><span class="accent">WIZZARD</span>',
        subtitle: 'AI-first systems for automation, logistics,<br>education and intelligent assistants.',
        btnProducts: 'View Products →',
        btnContact: 'Contact',
        scroll: 'SCROLL ▼',
      },
      products: {
        title: 'Products',
        hermes: {
          icon: '⚡',
          name: 'Hermes',
          tagline: 'Byte Wizzard AI Assistant',
          features: ['Full studio knowledge', 'Product & demo info', 'Tech stack & vision', 'Interactive live chat'],
          link: '→ Try Demo Bot',
        },
        courier: {
          icon: '🚚',
          name: 'Courier TMS',
          tagline: 'Logistics Intelligence System',
          features: ['Smart zone clustering', 'Route optimization (TSP)', 'Real-time GPS tracking', 'Driver mobile app', 'Complete admin panel', 'CSV order import'],
          link: '→ Try Demo',
        },
        clipcraft: {
          icon: '📱',
          name: 'ClipCraft',
          tagline: 'Mobile Content Creation Platform',
          features: ['Photo & video editing', 'Auto video generation', 'Integrated music library', 'Cloud rendering', 'Direct device export'],
          link: '→ In development',
        },
        profe: {
          icon: '📚',
          name: 'Profe Mágico',
          tagline: 'AI Learning System',
          features: ['Interactive AI teaching', 'Auto translation & audio', 'Kids-friendly content', 'Dynamic exercises', 'Guided learning experience'],
          link: '→ Try Demo',
        },
      },
      wwd: {
        title: 'What We Do',
        items: [
          { emoji: '🧠', label: 'AI Systems', desc: 'Intelligent automation for real processes' },
          { emoji: '⚙️', label: 'Automation', desc: 'Reduce manual work through smart flows' },
          { emoji: '🚛', label: 'Logistics', desc: 'Route optimization & live tracking' },
          { emoji: '🎓', label: 'Education', desc: 'AI-powered learning experiences' },
          { emoji: '📱', label: 'Mobile', desc: 'React Native & Expo apps' },
          { emoji: '☁️', label: 'Cloud', desc: 'Cloudflare Workers & edge computing' },
        ],
      },
      vision: {
        title: 'Vision',
        quote: 'Reduce manual work through intelligent systems<br>that automate <strong>real operations</strong> in business,<br>logistics and education.',
      },
      quote: '“We don\'t build ideas. <span class="highlight">We build working systems.</span>”',
      stack: {
        title: 'Stack',
        tags: ['Cloudflare Workers', 'Node.js', 'Fastify', 'Express', 'React', 'Vite', 'React Native', 'Expo', 'Llama 3', 'OpenStreetMap', 'OSRM', 'Nominatim', 'Prisma', 'PostgreSQL', 'PostGIS'],
      },
      status: {
        title: 'Status',
        items: ['Active development', 'Real deployed systems', 'Continuous iteration'],
      },
      footer: {
        brand: 'BYTE <span class="accent">WIZZARD</span>',
        tagline: 'AI & Software Systems Studio',
        copyright: '© 2026 Byte Wizzard — Real products. Real systems.',
      },
    },

    // ═══════════════════════════════════════════════════
    // PORTUGUÊS
    // ═══════════════════════════════════════════════════
    pt: {
      nav: { products: 'Produtos', what: 'O Que Fazemos', vision: 'Visão', stack: 'Stack', status: 'Status', contact: 'Contato' },
      hero: {
        label: './byte-wizzard --whoami',
        title: 'BYTE<br><span class="accent">WIZZARD</span>',
        subtitle: 'Sistemas AI-first para automação, logística,<br>educação e assistentes inteligentes.',
        btnProducts: 'Ver Produtos →',
        btnContact: 'Contato',
        scroll: 'ROLAR ▼',
      },
      products: {
        title: 'Produtos',
        hermes: {
          icon: '⚡',
          name: 'Hermes',
          tagline: 'Assistente IA da Byte Wizzard',
          features: ['Conhecimento completo do estúdio', 'Informações de produtos e demos', 'Stack tecnológico e visão', 'Chat interativo ao vivo'],
          link: '→ Testar Bot Demo',
        },
        courier: {
          icon: '🚚',
          name: 'Courier TMS',
          tagline: 'Sistema de Inteligência Logística',
          features: ['Agrupamento inteligente por zona', 'Otimização de rotas (TSP)', 'Tracking GPS em tempo real', 'App para entregadores', 'Painel administrativo completo', 'Importação de pedidos CSV'],
          link: '→ Testar Demo',
        },
        clipcraft: {
          icon: '📱',
          name: 'ClipCraft',
          tagline: 'Plataforma de Criação de Conteúdo',
          features: ['Edição de fotos e vídeos', 'Geração automática de vídeos', 'Música integrada', 'Render na nuvem', 'Exportação direta para o dispositivo'],
          link: '→ Em desenvolvimento',
        },
        profe: {
          icon: '📚',
          name: 'Profe Mágico',
          tagline: 'Sistema de Aprendizagem com IA',
          features: ['Ensino interativo com IA', 'Tradução e áudio automáticos', 'Conteúdo adaptado para crianças', 'Exercícios dinâmicos', 'Experiência educativa guiada'],
          link: '→ Testar Demo',
        },
      },
      wwd: {
        title: 'O Que Fazemos',
        items: [
          { emoji: '🧠', label: 'AI Systems', desc: 'Intelligent automation for real processes' },
          { emoji: '⚙️', label: 'Automation', desc: 'Reduce manual work through smart flows' },
          { emoji: '🚛', label: 'Logistics', desc: 'Route optimization & live tracking' },
          { emoji: '🎓', label: 'Education', desc: 'AI-powered learning experiences' },
          { emoji: '📱', label: 'Mobile', desc: 'React Native & Expo apps' },
          { emoji: '☁️', label: 'Cloud', desc: 'Cloudflare Workers & edge computing' },
        ],
      },
      vision: {
        title: 'Visão',
        quote: 'Reduzir o trabalho manual através de sistemas inteligentes<br>que automatizam <strong>operações reais</strong> em empresas,<br>logística e educação.',
      },
      quote: '“Não construímos ideias. <span class="highlight">Construímos sistemas funcionais.</span>”',
      stack: {
        title: 'Stack',
        tags: ['Cloudflare Workers', 'Node.js', 'Fastify', 'Express', 'React', 'Vite', 'React Native', 'Expo', 'Llama 3', 'OpenStreetMap', 'OSRM', 'Nominatim', 'Prisma', 'PostgreSQL', 'PostGIS'],
      },
      status: {
        title: 'Status',
        items: ['Desenvolvimento ativo', 'Sistemas reais implantados', 'Iteração contínua'],
      },
      footer: {
        brand: 'BYTE <span class="accent">WIZZARD</span>',
        tagline: 'Estúdio de Sistemas IA & Software',
        copyright: '© 2026 Byte Wizzard — Produtos reais. Sistemas reais.',
      },
    },
  };

  // ─── Detect language ───
  function detect() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch {}
    const browser = (navigator.language || '').slice(0, 2);
    if (TRANSLATIONS[browser]) return browser;
    return 'es';
  }

  // ─── Set language ───
  function setLang(code) {
    if (!TRANSLATIONS[code]) return;
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
    apply(code);
    document.documentElement.lang = code;
    // Update switcher UI
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === code);
    });
  }

  // ─── Apply translations ───
  function apply(code) {
    const t = TRANSLATIONS[code];
    if (!t) return;
    window.__lang = code;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = key.split('.').reduce((o, k) => o?.[k], t);
      if (val !== undefined) {
        if (el.tagName === 'IMG' && el.dataset.i18nAlt !== undefined) {
          el.alt = val;
        } else {
          el.innerHTML = val;
        }
      }
    });

    // Product features
    document.querySelectorAll('[data-i18n-features]').forEach(el => {
      const key = el.dataset.i18nFeatures;
      const features = key.split('.').reduce((o, k) => o?.[k], t);
      if (features) {
        el.innerHTML = features.map(f => `<li>${f}</li>`).join('');
      }
    });

    // WWD items
    document.querySelectorAll('[data-i18n-wwd]').forEach(el => {
      const items = t.wwd?.items;
      if (items) {
        el.innerHTML = items.map(item => `
          <div class="wwd-item">
            <div class="emoji">${item.emoji}</div>
            <strong>${item.label}</strong>
            ${item.desc}
          </div>
        `).join('');
      }
    });

    // Status items
    document.querySelectorAll('[data-i18n-status]').forEach(el => {
      const items = t.status?.items;
      if (items) {
        el.innerHTML = items.map(item => `
          <div class="status-dot">
            <span class="dot"></span>
            ${item}
          </div>
        `).join('');
      }
    });

    // Stack tags
    document.querySelectorAll('[data-i18n-stack]').forEach(el => {
      const tags = t.stack?.tags;
      if (tags) {
        el.innerHTML = tags.map(tag => `<span class="stack-tag">${tag}</span>`).join('');
      }
    });
  }

  // ─── Init ───
  const currentLang = detect();
  document.addEventListener('DOMContentLoaded', () => setLang(currentLang));

  return {
    TRANSLATIONS,
    detect,
    setLang,
    currentLang,
  };
})();
