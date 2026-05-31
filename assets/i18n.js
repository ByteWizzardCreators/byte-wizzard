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
  const listeners = [];

  function getLocale(lang) { return TRANSLATIONS[lang] || TRANSLATIONS.es; }

  const TRANSLATIONS = {
    es: {
      // ─── NAV ───
      nav: { products: 'Productos', what: 'Qué Hacemos', vision: 'Visión', stack: 'Stack', status: 'Estado', contact: 'Contacto' },

      // ─── HERO ───
      hero: {
        label: './byte-wizzard --whoami',
        title: 'BYTE<br><span class="accent">WIZZARD</span>',
        subtitle: 'Sistemas AI-first para automatización, logística,<br>educación y asistentes inteligentes.',
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
          link: '→ Probar Demo (en desarrollo)',
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
          link: '→ Visitar sitio',
        },
      },

      // ─── WHAT WE DO ───
      wwd: {
        title: 'Qué Hacemos',
        items: [
          { emoji: '🧠', label: 'Sistemas de IA', desc: 'Automatización inteligente para procesos reales' },
          { emoji: '⚙️', label: 'Automatización', desc: 'Reducí el trabajo manual con flujos inteligentes' },
          { emoji: '🚛', label: 'Logística', desc: 'Optimización de rutas y seguimiento en vivo' },
          { emoji: '🎓', label: 'Educación', desc: 'Experiencias de aprendizaje potenciadas por IA' },
          { emoji: '📱', label: 'Mobile', desc: 'Apps con React Native y Expo' },
          { emoji: '☁️', label: 'Cloud', desc: 'Cloudflare Workers y edge computing' },
        ],
      },

      // ─── VISION ───
      vision: {
        title: 'Visión',
        quote: 'Reducir trabajo manual a través de sistemas inteligentes<br>que automatizan <strong>operaciones reales</strong> en empresas,<br>logística y educación.',
      },

      // ─── QUOTE ───
      quote: '“No construimos ideas. <span class="highlight">Construimos sistemas que funcionan.</span>”',

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
        tagline: 'Estudio de Sistemas IA & Software',
        copyright: '© 2026 Byte Wizzard — Productos reales. Sistemas reales.',
      },

      // ─── COURIER DEMO ───
      courierDemo: {
        header: { title: '🚚 Courier TMS', subtitle: 'Route Optimizer Demo — ingresá direcciones o subí un CSV, y mirá cómo se optimiza la ruta automáticamente.' },
        back: '← Volver a Byte Wizzard',
        step1: 'Ingresá direcciones o <strong>subí un CSV</strong>',
        step2: 'Geocodificamos + optimizamos la ruta (TSP)',
        step3: 'Visualizala en el mapa con el orden óptimo',
        tabs: ['Ingresar direcciones', 'Subir CSV', 'Ruta optimizada 🗺️'],
        inputTitle: '📦 Delivery Addresses',
        inputBadge: 'manual or CSV',
        csvLabel: '<strong>Upload CSV</strong> Drop a file or click to browse',
        origin: 'Origen',
        stop: 'Parada',
        addStop: '+ Agregar Parada',
        optimize: '🗺️ Optimizar Ruta',
        clear: '✕ Limpiar',
        selectFile: 'Seleccionar archivo CSV',
        orDrag: 'o arrastrá y soltá acá',
        csvHint: 'Columnas: origen, destino, cliente, teléfono, peso, prioridad',
        loadSample: '🔄 Cargar ejemplo',
        totalDistance: 'Distancia total',
        estimatedTime: 'Tiempo estimado',
        stops: 'Paradas',
        noStops: 'Agregá al menos 2 direcciones para optimizar.',
        geocoding: 'Geocodificando direcciones...',
        optimizing: 'Optimizando ruta...',
        from: 'Desde',
        to: 'Hasta',
        km: 'km',
        min: 'min',
        optimalRoute: '🗺️ Mapa de Ruta',
        distance: 'Distancia',
        mapPlaceholder: 'Ingresá direcciones y hacé clic en "Optimizar Ruta"',
        mapHint: 'La ruta optimizada aparecerá en el mapa con paradas numeradas',
        optimizedOrder: 'ORDEN OPTIMIZADO',
        showStops: '📋 Mostrar lista de paradas',
        hideStops: '📋 Ocultar lista de paradas',
        workingBtn: '⏳ Trabajando...',
        csvParseError: 'Formato CSV inválido. Columnas requeridas: origen, destino',
        csvEmptyError: '⚠️ El CSV está vacío o no se pudo parsear',
        csvNoAddrError: '⚠️ No se encontraron columnas de dirección. Asegurate que el CSV tenga: address, street, city',
        csvLoaded: '✅ Cargadas <span class="stat">{n}</span> direcciones del CSV.',
        geoProgress: '📍 Geocodificando {i}/{n}: {addr}...',
        geoFailed: '⚠️ No se pudieron geocodificar suficientes direcciones. Probá agregar "CABA" o una ubicación más específica.',
        computingRoute: '🧠 Calculando ruta óptima con Nearest-Neighbor TSP ({n} paradas)...',
        fetchingRoute: '📍 Ruta calculada. Obteniendo geometría de la ruta desde OSRM...',
        noRoute: '⚠️ No se pudo obtener la ruta de manejo. Mostrando orden optimizado sin mapa.',
        error: '❌ Error: {msg}',
        routeOptimized: '✅ Ruta <strong>optimizada</strong> (Nearest-Neighbor TSP) — cada parada es la no visitada más cercana',
        distanceLabel: 'Distancia total (km)',
        timeLabel: 'Tiempo estimado (min)',
        stopsLabel: 'Paradas',
      },

      // ─── HERMES DEMO ───
      hermesDemo: {
        header: { name: 'Hermes', status: 'Byte Wizzard — Demo Bot' },
        backLink: '← Volver',
        inputPlaceholder: 'Preguntá sobre Byte Wizzard...',
        sendBtn: 'Enviar',
        greeting: '¡Hola! Soy <strong>Hermes</strong>, el mensajero de Byte Wizzard. ⚡<br><br>Preguntame lo que quieras sobre el estudio, nuestros productos, el stack tecnológico o la visión.<br><br>Por ejemplo:<br>• <em>"¿Qué es Byte Wizzard?"</em><br>• <em>"Contame sobre Courier TMS"</em><br>• <em>"¿Qué stack usan?"</em>',
        fallback: 'No tengo información específica sobre eso, pero puedo contarte sobre:<br><br>• <strong>Byte Wizzard</strong> — qué es el estudio<br>• <strong>Luna</strong> — AI Business Assistant<br>• <strong>Hermes</strong> — Demo Bot del estudio<br>• <strong>Courier TMS</strong> — Logistics Intelligence<br>• <strong>ClipCraft</strong> — Content Creation<br>• <strong>Profe Mágico</strong> — AI Learning<br>• <strong>Stack</strong> — tecnologías que usamos<br>• <strong>Visión</strong> — nuestro enfoque<br><br>¿Sobre qué querés saber?',
        suggestions: ['¿Qué es Byte Wizzard?', 'Contame sobre Courier TMS', '¿Qué stack usan?', 'Productos'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'estudio', 'empresa', 'quién es', 'quien es', 'quienes son', 'quienes', 'qué es', 'que es', 'ai systems studio', 'systems studio', 'hacen', 'dedican'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> es un AI Systems Studio.<br><br>Construimos productos de software basados en inteligencia artificial, automatización y sistemas modernos para resolver problemas reales en empresas y usuarios.<br><br>No somos una agencia tradicional ni un proyecto académico. Somos un estudio de construcción de <strong>productos funcionales</strong>.<br><br><em>"Construí sistemas AI-first para automatización, logística, educación y asistentes inteligentes."</em>' },
          { id: 'what-we-do', keywords: ['hacen', 'productos', 'servicios', 'desarrollan', 'crean', 'ofrecen', 'rubro', 'trabajan'], label: 'What We Do', response: 'Diseñamos y desarrollamos:<br><br>• Sistemas de inteligencia artificial aplicados<br>• Software de automatización de procesos<br>• Herramientas de logística y optimización<br>• Plataformas educativas con IA<br>• Aplicaciones móviles y web full-stack<br>• Integraciones con cloud y edge computing' },
          { id: 'luna', keywords: ['luna', 'asistente', 'asistant', 'business', 'chat', 'bot', 'inteligente', 'ai assistant', 'virtual'], label: 'Luna', response: '<strong>Luna</strong> — AI Business Assistant<br><br>Asistente inteligente con memoria y contexto empresarial.<br><br><strong>Funciones:</strong><br>• Chat con IA en tiempo real<br>• Memoria por usuario y sesión<br>• Redacción automática de emails<br>• Soporte interno para empresas<br>• Automatización de tareas administrativas<br><br><em>Estado: producto en uso real con cliente.</em>' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'asistente', 'chat', 'mensajero'], label: 'Hermes', response: '<strong>Hermes</strong> — Byte Wizzard Demo Bot ⚡<br><br>Soy el asistente virtual del estudio. Mi propósito es contarte sobre Byte Wizzard, sus productos, su stack y su visión.<br><br><em>Estado: demo funcional.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'logística', 'rutas', 'delivery', 'optimización', 'tsp', 'tracking', 'gps', 'repartidores', 'transporte'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> — Logistics Intelligence System<br><br>Sistema de optimización logística para empresas de delivery.<br><br><strong>Funciones:</strong><br>• Agrupación de entregas por zona<br>• Optimización de rutas (TSP)<br>• Tracking GPS en tiempo real<br>• Panel administrativo completo<br>• App para repartidores<br>• Importación de órdenes CSV<br><br><em>Estado: desarrollo activo + <a href="../courier-tms/index.html" style="color:#00aaff">demo funcional</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'contenido', 'multimedia', 'video', 'foto', 'edición', 'mobile', 'creación'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> — Content Creation Platform<br><br>App móvil para creación de contenido multimedia.<br><br><strong>Funciones:</strong><br>• Edición de fotos y videos<br>• Generación automática de videos<br>• Música integrada<br>• Render en la nube<br>• Exportación directa al dispositivo<br><br><em>Estado: MVP funcional.</em>' },
          { id: 'profe', keywords: ['profe', 'mágico', 'magico', 'educación', 'educacion', 'aprendizaje', 'learning', 'inglés', 'ingles', 'niños', 'kids', 'enseñanza', 'school'], label: 'Profe Mágico', response: '<strong>Profe Mágico</strong> — AI Learning System<br><br>Plataforma educativa con inteligencia artificial.<br><br><strong>Funciones:</strong><br>• Enseñanza interactiva de inglés<br>• Traducción y audio automático<br>• Contenido adaptado para niños<br>• Ejercicios dinámicos<br>• Aprendizaje guiado<br><br><em>Estado: funcional y en iteración.</em>' },
          { id: 'vision', keywords: ['visión', 'vision', 'objetivo', 'goal', 'misión', 'mision', 'propósito', 'proposito', 'futuro', 'buscan'], label: 'Visión', response: '<strong>Visión:</strong> Reducir el trabajo manual mediante sistemas inteligentes.<br><br>Automatizamos procesos en:<br><br>• Empresas<br>• Logística<br>• Educación<br>• Creación de contenido' },
          { id: 'differential', keywords: ['diferencia', 'diferencias', 'distinto', 'unique', 'propuesta', 'valor', 'por qué', 'porque', 'por que elegir', 'ventaja'], label: 'Diferencial', response: 'Byte Wizzard no solo construye interfaces.<br><br>Construimos <strong>sistemas completos</strong>:<br><br>• frontend + backend + AI + cloud + mobile<br>• Integración real con APIs modernas<br>• Enfoque en problemas operativos reales' },
          { id: 'stack', keywords: ['stack', 'tecnología', 'tecnologia', 'tech', 'tools', 'herramientas', 'lenguaje', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'motor'], label: 'Stack Tecnológico', response: '<strong>Stack Tecnológico:</strong><br><br>☁️ Cloudflare Workers / Edge Computing<br>🟢 Node.js / Fastify / Express<br>⚛️ React / Vite / Vanilla JS<br>📱 React Native / Expo<br>🧠 AI Models (Llama 3 + APIs externas)<br>🗺️ OpenStreetMap / OSRM / Nominatim<br>🗄️ PostgreSQL / Prisma' },
          { id: 'status', keywords: ['estado', 'status', 'progreso', 'activo', 'desarrollo', 'fase', 'alpha', 'beta', 'lanzamiento'], label: 'Estado del Proyecto', response: 'Byte Wizzard está en <strong>fase activa de desarrollo</strong>.<br><br>• Productos reales funcionando<br>• MVPs desplegados<br>• Iteración constante<br>• Enfoque AI-first' },
          { id: 'contact', keywords: ['contacto', 'contact', 'hablar', 'contratar', 'presupuesto', 'email', 'mail', 'teléfono', 'telefono', 'whatsapp', 'redes'], label: 'Contacto', response: 'Por ahora la mejor forma de conocernos es explorando nuestros <a href="../../index.html#products" style="color:#00aaff">productos</a> y demos.<br><br>Si querés contactarnos, escribinos a través de los canales del estudio.' },
        ],
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
          link: '→ Try Demo (in development)',
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
          link: '→ Visit site',
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

      // ─── COURIER DEMO ───
      courierDemo: {
        header: { title: '🚚 Courier TMS', subtitle: 'Route Optimizer Demo — enter addresses or upload a CSV, and watch the route optimize automatically.' },
        back: '← Back to Byte Wizzard',
        step1: 'Enter addresses or <strong>upload a CSV</strong>',
        step2: 'Geocode + optimize route (TSP)',
        step3: 'View it on the map with optimal order',
        tabs: ['Enter addresses', 'Upload CSV', 'Optimized route 🗺️'],
        inputTitle: '📦 Delivery Addresses',
        inputBadge: 'manual or CSV',
        csvLabel: '<strong>Upload CSV</strong> Drop a file or click to browse',
        origin: 'Origin',
        stop: 'Stop',
        addStop: '+ Add Stop',
        optimize: '🗺️ Optimize Route',
        clear: '✕ Clear',
        selectFile: 'Select CSV file',
        orDrag: 'or drag and drop here',
        csvHint: 'Columns: origin, destination, client, phone, weight, priority',
        loadSample: '🔄 Load example',
        totalDistance: 'Total distance',
        estimatedTime: 'Estimated time',
        stops: 'Stops',
        noStops: 'Add at least 2 addresses to optimize.',
        geocoding: 'Geocoding addresses...',
        optimizing: 'Optimizing route...',
        from: 'From',
        to: 'To',
        km: 'km',
        min: 'min',
        optimalRoute: '🗺️ Route Map',
        distance: 'Distance',
        mapPlaceholder: 'Enter addresses and click "Optimize Route"',
        mapHint: 'The optimized route will appear on the map with numbered stops',
        optimizedOrder: 'OPTIMIZED ORDER',
        showStops: '📋 Show stop list',
        hideStops: '📋 Hide stop list',
        workingBtn: '⏳ Working...',
        csvParseError: 'Invalid CSV format. Required columns: origin, destination',
        csvEmptyError: '⚠️ CSV is empty or could not be parsed',
        csvNoAddrError: '⚠️ Could not find address columns. Make sure your CSV has: address, street, city',
        csvLoaded: '✅ Loaded <span class="stat">{n}</span> addresses from CSV.',
        geoProgress: '📍 Geocoding {i}/{n}: {addr}...',
        geoFailed: '⚠️ Could not geocode enough addresses. Try adding "CABA" or a more specific location.',
        computingRoute: '🧠 Computing optimal route with Nearest-Neighbor TSP ({n} stops)...',
        fetchingRoute: '📍 Route computed. Fetching driving geometry from OSRM...',
        noRoute: '⚠️ Could not get driving route. Showing optimized order without map.',
        error: '❌ Error: {msg}',
        routeOptimized: '✅ Route <strong>optimized</strong> (Nearest-Neighbor TSP) — each stop is the closest unvisited',
        distanceLabel: 'Total Distance (km)',
        timeLabel: 'Est. Time (min)',
        stopsLabel: 'Stops',
      },

      // ─── HERMES DEMO ───
      hermesDemo: {
        header: { name: 'Hermes', status: 'Byte Wizzard — Demo Bot' },
        backLink: '← Back',
        inputPlaceholder: 'Ask about Byte Wizzard...',
        sendBtn: 'Send',
        greeting: 'Hi! I\'m <strong>Hermes</strong>, the Byte Wizzard messenger. ⚡<br><br>Ask me anything about the studio, our products, the tech stack, or our vision.<br><br>For example:<br>• <em>"What is Byte Wizzard?"</em><br>• <em>"Tell me about Courier TMS"</em><br>• <em>"What stack do you use?"</em>',
        fallback: 'I don\'t have specific info about that, but I can tell you about:<br><br>• <strong>Byte Wizzard</strong> — what the studio is<br>• <strong>Luna</strong> — AI Business Assistant<br>• <strong>Hermes</strong> — Studio Demo Bot<br>• <strong>Courier TMS</strong> — Logistics Intelligence<br>• <strong>ClipCraft</strong> — Content Creation<br>• <strong>Profe Mágico</strong> — AI Learning<br>• <strong>Stack</strong> — our technology stack<br>• <strong>Vision</strong> — our approach<br><br>What would you like to know?',
        suggestions: ['What is Byte Wizzard?', 'Tell me about Courier TMS', 'What stack do you use?', 'Products'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'studio', 'company', 'who is', 'who are', 'what is', 'about', 'ai systems studio', 'systems studio'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> is an AI Systems Studio.<br><br>We build AI-powered software products, automation, and modern systems to solve real problems for businesses and users.<br><br>We are not a traditional agency or an academic project. We are a <strong>functional product</strong> building studio.<br><br><em>"Build AI-first systems for automation, logistics, education and intelligent assistants."</em>' },
          { id: 'what-we-do', keywords: ['do', 'products', 'services', 'develop', 'create', 'offer', 'field', 'work on'], label: 'What We Do', response: 'We design and develop:<br><br>• Applied artificial intelligence systems<br>• Process automation software<br>• Logistics and optimization tools<br>• AI-powered educational platforms<br>• Full-stack mobile and web apps<br>• Cloud and edge computing integrations' },
          { id: 'luna', keywords: ['luna', 'assistant', 'business', 'chat', 'bot', 'intelligent', 'ai assistant', 'virtual'], label: 'Luna', response: '<strong>Luna</strong> — AI Business Assistant<br><br>Intelligent assistant with business memory and context.<br><br><strong>Features:</strong><br>• Real-time AI chat<br>• Per-user and per-session memory<br>• Automatic email drafting<br>• Internal business support<br>• Administrative task automation<br><br><em>Status: real product in use with a client.</em>' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'assistant', 'chat', 'messenger'], label: 'Hermes', response: '<strong>Hermes</strong> — Byte Wizzard Demo Bot ⚡<br><br>I\'m the studio\'s virtual assistant. My purpose is to tell you about Byte Wizzard, its products, its stack, and its vision.<br><br><em>Status: functional demo.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'routes', 'delivery', 'optimization', 'tsp', 'tracking', 'gps', 'drivers', 'transport'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> — Logistics Intelligence System<br><br>Logistics optimization system for delivery companies.<br><br><strong>Features:</strong><br>• Delivery clustering by zone<br>• Route optimization (TSP)<br>• Real-time GPS tracking<br>• Complete admin panel<br>• Driver mobile app<br>• CSV order import<br><br><em>Status: active development + <a href="../courier-tms/index.html" style="color:#00aaff">functional demo</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'multimedia', 'video', 'photo', 'editing', 'mobile', 'creation'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> — Content Creation Platform<br><br>Mobile app for multimedia content creation.<br><br><strong>Features:</strong><br>• Photo and video editing<br>• Automatic video generation<br>• Integrated music library<br>• Cloud rendering<br>• Direct device export<br><br><em>Status: functional MVP.</em>' },
          { id: 'profe', keywords: ['profe', 'magico', 'magic', 'education', 'learning', 'english', 'children', 'kids', 'teaching', 'school'], label: 'Profe Mágico', response: '<strong>Profe Mágico</strong> — AI Learning System<br><br>Educational platform powered by artificial intelligence.<br><br><strong>Features:</strong><br>• Interactive English teaching<br>• Automatic translation and audio<br>• Kids-friendly content<br>• Dynamic exercises<br>• Guided learning<br><br><em>Status: functional and iterating.</em>' },
          { id: 'vision', keywords: ['vision', 'goal', 'mission', 'purpose', 'future', 'aim'], label: 'Vision', response: '<strong>Vision:</strong> Reduce manual work through intelligent systems.<br><br>We automate processes in:<br><br>• Business<br>• Logistics<br>• Education<br>• Content creation' },
          { id: 'differential', keywords: ['difference', 'different', 'unique', 'value', 'why', 'advantage', 'special'], label: 'Differential', response: 'Byte Wizzard doesn\'t just build interfaces.<br><br>We build <strong>complete systems</strong>:<br><br>• frontend + backend + AI + cloud + mobile<br>• Real integration with modern APIs<br>• Focus on real operational problems' },
          { id: 'stack', keywords: ['stack', 'technology', 'tech', 'tools', 'language', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'engine'], label: 'Tech Stack', response: '<strong>Tech Stack:</strong><br><br>☁️ Cloudflare Workers / Edge Computing<br>🟢 Node.js / Fastify / Express<br>⚛️ React / Vite / Vanilla JS<br>📱 React Native / Expo<br>🧠 AI Models (Llama 3 + external APIs)<br>🗺️ OpenStreetMap / OSRM / Nominatim<br>🗄️ PostgreSQL / Prisma' },
          { id: 'status', keywords: ['status', 'progress', 'active', 'development', 'stage', 'phase', 'alpha', 'beta', 'launch', 'release'], label: 'Project Status', response: 'Byte Wizzard is in <strong>active development phase</strong>.<br><br>• Real products running<br>• Deployed MVPs<br>• Constant iteration<br>• AI-first focus' },
          { id: 'contact', keywords: ['contact', 'talk', 'hire', 'quote', 'email', 'mail', 'phone', 'whatsapp', 'social', 'reach'], label: 'Contact', response: 'For now the best way to get to know us is by exploring our <a href="../../index.html#products" style="color:#00aaff">products</a> and demos.<br><br>If you want to reach out, write to us through the studio channels.' },
        ],
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
          link: '→ Testar Demo (em desenvolvimento)',
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
          link: '→ Visitar site',
        },
      },
      wwd: {
        title: 'O Que Fazemos',
        items: [
          { emoji: '🧠', label: 'Sistemas de IA', desc: 'Automação inteligente para processos reais' },
          { emoji: '⚙️', label: 'Automação', desc: 'Reduza o trabalho manual com fluxos inteligentes' },
          { emoji: '🚛', label: 'Logística', desc: 'Otimização de rotas e rastreamento ao vivo' },
          { emoji: '🎓', label: 'Educação', desc: 'Experiências de aprendizado com IA' },
          { emoji: '📱', label: 'Mobile', desc: 'Apps com React Native e Expo' },
          { emoji: '☁️', label: 'Cloud', desc: 'Cloudflare Workers e edge computing' },
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

      // ─── COURIER DEMO ───
      courierDemo: {
        header: { title: '🚚 Courier TMS', subtitle: 'Route Optimizer Demo — insira endereços ou carregue um CSV, e veja a rota ser otimizada automaticamente.' },
        back: '← Voltar para Byte Wizzard',
        step1: 'Insira endereços ou <strong>carregue um CSV</strong>',
        step2: 'Geocodificamos + otimizamos a rota (TSP)',
        step3: 'Visualize no mapa com a ordem ótima',
        tabs: ['Inserir endereços', 'Carregar CSV', 'Rota otimizada 🗺️'],
        inputTitle: '📦 Endereços de Entrega',
        inputBadge: 'manual ou CSV',
        csvLabel: '<strong>Upload CSV</strong> Arraste um arquivo ou clique para procurar',
        origin: 'Origem',
        stop: 'Parada',
        addStop: '+ Adicionar Parada',
        optimize: '🗺️ Otimizar Rota',
        clear: '✕ Limpar',
        selectFile: 'Selecionar arquivo CSV',
        orDrag: 'ou arraste e solte aqui',
        csvHint: 'Colunas: origem, destino, cliente, telefone, peso, prioridade',
        loadSample: '🔄 Carregar exemplo',
        totalDistance: 'Distância total',
        estimatedTime: 'Tempo estimado',
        stops: 'Paradas',
        noStops: 'Adicione pelo menos 2 endereços para otimizar.',
        geocoding: 'Geocodificando endereços...',
        optimizing: 'Otimizando rota...',
        from: 'De',
        to: 'Para',
        km: 'km',
        min: 'min',
        optimalRoute: '🗺️ Mapa da Rota',
        distance: 'Distância',
        mapPlaceholder: 'Insira endereços e clique em "Otimizar Rota"',
        mapHint: 'A rota otimizada aparecerá no mapa com paradas numeradas',
        optimizedOrder: 'ORDEM OTIMIZADA',
        showStops: '📋 Mostrar lista de paradas',
        hideStops: '📋 Ocultar lista de paradas',
        workingBtn: '⏳ Trabalhando...',
        csvParseError: 'Formato CSV inválido. Colunas obrigatórias: origem, destino',
        csvEmptyError: '⚠️ CSV está vazio ou não pôde ser parseado',
        csvNoAddrError: '⚠️ Não foram encontradas colunas de endereço. Certifique-se de que o CSV tenha: address, street, city',
        csvLoaded: '✅ Carregadas <span class="stat">{n}</span> endereços do CSV.',
        geoProgress: '📍 Geocodificando {i}/{n}: {addr}...',
        geoFailed: '⚠️ Não foi possível geocodificar endereços suficientes. Tente adicionar "CABA" ou uma localização mais específica.',
        computingRoute: '🧠 Calculando rota ótima com Nearest-Neighbor TSP ({n} paradas)...',
        fetchingRoute: '📍 Rota calculada. Obtendo geometria da rota do OSRM...',
        noRoute: '⚠️ Não foi possível obter a rota de direção. Mostrando ordem otimizada sem mapa.',
        error: '❌ Erro: {msg}',
        routeOptimized: '✅ Rota <strong>otimizada</strong> (Nearest-Neighbor TSP) — cada parada é a não visitada mais próxima',
        distanceLabel: 'Distância total (km)',
        timeLabel: 'Tempo estimado (min)',
        stopsLabel: 'Paradas',
      },

      // ─── HERMES DEMO ───
      hermesDemo: {
        header: { name: 'Hermes', status: 'Byte Wizzard — Bot de Demonstração' },
        backLink: '← Voltar',
        inputPlaceholder: 'Pergunte sobre a Byte Wizzard...',
        sendBtn: 'Enviar',
        greeting: 'Olá! Sou o <strong>Hermes</strong>, o mensageiro da Byte Wizzard. ⚡<br><br>Pergunte-me o que quiser sobre o estúdio, nossos produtos, o stack tecnológico ou a visão.<br><br>Por exemplo:<br>• <em>"O que é Byte Wizzard?"</em><br>• <em>"Fale sobre Courier TMS"</em><br>• <em>"Qual stack vocês usam?"</em>',
        fallback: 'Não tenho informações específicas sobre isso, mas posso falar sobre:<br><br>• <strong>Byte Wizzard</strong> — o que é o estúdio<br>• <strong>Luna</strong> — AI Business Assistant<br>• <strong>Hermes</strong> — Bot de Demonstração<br>• <strong>Courier TMS</strong> — Logistics Intelligence<br>• <strong>ClipCraft</strong> — Content Creation<br>• <strong>Profe Mágico</strong> — AI Learning<br>• <strong>Stack</strong> — tecnologias que usamos<br>• <strong>Visão</strong> — nossa abordagem<br><br>Sobre o que quer saber?',
        suggestions: ['O que é Byte Wizzard?', 'Fale sobre Courier TMS', 'Qual stack usam?', 'Produtos'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'estúdio', 'estudio', 'empresa', 'quem é', 'quem e', 'quem são', 'quem sao', 'o que é', 'o que e', 'ai systems studio', 'systems studio', 'fazem'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> é um AI Systems Studio.<br><br>Construímos produtos de software baseados em inteligência artificial, automação e sistemas modernos para resolver problemas reais em empresas e usuários.<br><br>Não somos uma agência tradicional nem um projeto acadêmico. Somos um estúdio de construção de <strong>produtos funcionais</strong>.<br><br><em>"Construa sistemas AI-first para automação, logística, educação e assistentes inteligentes."</em>' },
          { id: 'what-we-do', keywords: ['fazem', 'produtos', 'serviços', 'servicos', 'desenvolvem', 'criam', 'oferecem', 'ramo', 'trabalham'], label: 'O Que Fazemos', response: 'Projetamos e desenvolvemos:<br><br>• Sistemas de inteligência artificial aplicados<br>• Software de automação de processos<br>• Ferramentas de logística e otimização<br>• Plataformas educacionais com IA<br>• Aplicativos móveis e web full-stack<br>• Integrações com cloud e edge computing' },
          { id: 'luna', keywords: ['luna', 'assistente', 'assistant', 'business', 'chat', 'bot', 'inteligente', 'ai assistant'], label: 'Luna', response: '<strong>Luna</strong> — AI Business Assistant<br><br>Assistente inteligente com memória e contexto empresarial.<br><br><strong>Funções:</strong><br>• Chat com IA em tempo real<br>• Memória por usuário e sessão<br>• Redação automática de e-mails<br>• Suporte interno para empresas<br>• Automação de tarefas administrativas<br><br><em>Status: produto em uso real com cliente.</em>' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'assistente', 'chat', 'mensageiro'], label: 'Hermes', response: '<strong>Hermes</strong> — Byte Wizzard Bot de Demonstração ⚡<br><br>Sou o assistente virtual do estúdio. Meu propósito é contar sobre a Byte Wizzard, seus produtos, seu stack e sua visão.<br><br><em>Status: demonstração funcional.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'logística', 'logistica', 'rotas', 'delivery', 'otimização', 'otimizacao', 'tsp', 'tracking', 'gps', 'entregadores', 'transporte'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> — Logistics Intelligence System<br><br>Sistema de otimização logística para empresas de delivery.<br><br><strong>Funções:</strong><br>• Agrupamento de entregas por zona<br>• Otimização de rotas (TSP)<br>• Tracking GPS em tempo real<br>• Painel administrativo completo<br>• App para entregadores<br>• Importação de pedidos CSV<br><br><em>Status: desenvolvimento ativo + <a href="../courier-tms/index.html" style="color:#00aaff">demonstração funcional</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'conteúdo', 'conteudo', 'multimídia', 'multimidia', 'video', 'foto', 'edição', 'edicao', 'mobile', 'criação', 'criacao'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> — Content Creation Platform<br><br>App móvel para criação de conteúdo multimídia.<br><br><strong>Funções:</strong><br>• Edição de fotos e vídeos<br>• Geração automática de vídeos<br>• Música integrada<br>• Render na nuvem<br>• Exportação direta para o dispositivo<br><br><em>Status: MVP funcional.</em>' },
          { id: 'profe', keywords: ['profe', 'mágico', 'magico', 'educação', 'educacao', 'aprendizagem', 'learning', 'inglês', 'ingles', 'crianças', 'criancas', 'ensino', 'escola'], label: 'Profe Mágico', response: '<strong>Profe Mágico</strong> — AI Learning System<br><br>Plataforma educacional com inteligência artificial.<br><br><strong>Funções:</strong><br>• Ensino interativo de inglês<br>• Tradução e áudio automáticos<br>• Conteúdo adaptado para crianças<br>• Exercícios dinâmicos<br>• Aprendizagem guiada<br><br><em>Status: funcional e em iteração.</em>' },
          { id: 'vision', keywords: ['visão', 'visao', 'objetivo', 'goal', 'missão', 'missao', 'propósito', 'proposito', 'futuro', 'buscam'], label: 'Visão', response: '<strong>Visão:</strong> Reduzir o trabalho manual através de sistemas inteligentes.<br><br>Automatizamos processos em:<br><br>• Empresas<br>• Logística<br>• Educação<br>• Criação de conteúdo' },
          { id: 'differential', keywords: ['diferença', 'diferenca', 'diferente', 'distinto', 'unique', 'proposta', 'valor', 'por que', 'porque', 'vantagem'], label: 'Diferencial', response: 'Byte Wizzard não apenas constrói interfaces.<br><br>Construímos <strong>sistemas completos</strong>:<br><br>• frontend + backend + AI + cloud + mobile<br>• Integração real com APIs modernas<br>• Foco em problemas operacionais reais' },
          { id: 'stack', keywords: ['stack', 'tecnologia', 'tech', 'tools', 'ferramentas', 'linguagem', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'motor'], label: 'Stack Tecnológico', response: '<strong>Stack Tecnológico:</strong><br><br>☁️ Cloudflare Workers / Edge Computing<br>🟢 Node.js / Fastify / Express<br>⚛️ React / Vite / Vanilla JS<br>📱 React Native / Expo<br>🧠 AI Models (Llama 3 + APIs externas)<br>🗺️ OpenStreetMap / OSRM / Nominatim<br>🗄️ PostgreSQL / Prisma' },
          { id: 'status', keywords: ['estado', 'status', 'progresso', 'ativo', 'desenvolvimento', 'fase', 'alpha', 'beta', 'lançamento', 'lancamento'], label: 'Status do Projeto', response: 'Byte Wizzard está em <strong>fase ativa de desenvolvimento</strong>.<br><br>• Produtos reais funcionando<br>• MVPs implantados<br>• Iteração constante<br>• Foco AI-first' },
          { id: 'contact', keywords: ['contato', 'contact', 'falar', 'contratar', 'orçamento', 'orcamento', 'email', 'mail', 'telefone', 'whatsapp', 'redes'], label: 'Contato', response: 'Por enquanto a melhor forma de nos conhecer é explorando nossos <a href="../../index.html#products" style="color:#00aaff">produtos</a> e demonstrações.<br><br>Se quiser entrar em contato, escreva através dos canais do estúdio.' },
        ],
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
    // Notify listeners
    listeners.forEach(fn => { try { fn(code); } catch(e) { console.warn('i18n listener error:', e); } });
  }

  // ─── Subscribe to language changes ───
  function onLangChange(fn) { listeners.push(fn); }

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
    getLocale,
    onLangChange,
    currentLang,
  };
})();
