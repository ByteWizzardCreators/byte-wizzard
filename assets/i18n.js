/**
 * Byte Wizzard â€” i18n System
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
      // â”€â”€â”€ NAV â”€â”€â”€
      nav: { products: 'Productos', what: 'QuÃ© Hacemos', vision: 'VisiÃ³n', stack: 'Stack', status: 'Estado', contact: 'Contacto' },

      // â”€â”€â”€ HERO â”€â”€â”€
      hero: {
        label: './byte-wizzard --whoami',
        title: 'BYTE<br><span class="accent">WIZZARD</span>',
        subtitle: 'Sistemas AI-first para automatizaciÃ³n, logÃ­stica,<br>educaciÃ³n y asistentes inteligentes.',
        btnProducts: 'Ver Productos â†’',
        btnReviews: 'ReseÃ±as',
        btnContact: 'Contacto',
        scroll: 'SCROLL â–¼',
        status: '6 productos activos Â· 4 demos Â· AI-first',
      },

      // â”€â”€â”€ PRODUCTS â”€â”€â”€
      products: {
        title: 'Productos',
        hermes: {
          icon: 'âš¡',
          name: 'Hermes',
          tagline: 'Byte Wizzard AI Assistant',
          features: ['Conocimiento completo del estudio', 'Info de productos y demos', 'Stack tecnolÃ³gico y visiÃ³n', 'Chat interactivo en vivo'],
          status: 'DEMO',
          link: 'â†’ Probar Demo Bot',
        },
        roleplay: {
          icon: 'ðŸŽ­',
          name: 'RolePlay Chat',
          tagline: 'SimulaciÃ³n de Call Center Digital',
          features: ['SimulaciÃ³n de atenciÃ³n digital', 'Escenarios: reclamos, soporte, ventas', 'InteracciÃ³n agente-cliente en vivo', 'Entrenamiento para postulantes', 'Multi-canal (chat, WhatsApp)'],
          status: 'DEMO',
          link: 'â†’ Probar Demo',
        },
        courier: {
          icon: 'ðŸšš',
          name: 'Courier TMS',
          tagline: 'Logistics Intelligence System',
          features: ['AgrupaciÃ³n inteligente por zonas', 'OptimizaciÃ³n de rutas (TSP)', 'Tracking GPS en tiempo real', 'App para repartidores', 'Panel administrativo completo', 'ImportaciÃ³n de Ã³rdenes CSV'],
          status: 'EN DESARROLLO',
          link: 'â†’ Probar Demo (en desarrollo)',
        },
        profe: {
          icon: 'ðŸ“š',
          name: 'Profe MÃ¡gico',
          tagline: 'AI Learning System',
          features: ['EnseÃ±anza interactiva con IA', 'TraducciÃ³n y audio automÃ¡tico', 'Contenido adaptado para niÃ±os', 'Ejercicios dinÃ¡micos', 'Experiencia educativa guiada'],
          status: 'LIVE',
          link: 'â†’ Visitar sitio',
        },
        OmniConnect: {
          icon: '🌐',
          name: 'OmniConnect',
          tagline: 'Call Center Intelligence Platform',
          features: ['19 KPIs modelados desde Dengo', '3 perfiles: Admin, Supervisor, Operador', 'Dashboards en tiempo real con WebSocket', 'Gestión omnicanal (WhatsApp, email, phone)', 'Autenticación JWT + roles RBAC', 'Validación de entrada, paginación, rate limiting', 'Cache inteligente + invalidación por WebSocket', 'Timeouts configurables + slow query logging', 'Backup automático SQLite con retención', 'Despliegue: Docker, PM2 o systemd'],
          status: 'EN DESARROLLO',
          link: 'Node.js · Express · SQLite WAL · WebSocket · JWT',
        },
      },

      // â”€â”€â”€ PRÃ“XIMAMENTE â”€â”€â”€
      comingSoon: {
        title: 'PrÃ³ximamente',
        clipcraft: {
          icon: 'ðŸ“±',
          name: 'ClipCraft',
          tagline: 'Centro Multimedia Mobile',
          status: 'MVP Interno',
          features: ['Plataforma de creaciÃ³n de contenido multimedia', 'EdiciÃ³n de fotos y videos', 'GeneraciÃ³n automÃ¡tica de videos'],
        },
      },

      // â”€â”€â”€ WHAT WE DO â”€â”€â”€
      wwd: {
        title: 'QuÃ© Hacemos',
        items: [
          { emoji: 'ðŸ§ ', label: 'Sistemas de IA', desc: 'AutomatizaciÃ³n inteligente para procesos reales' },
          { emoji: 'âš™ï¸', label: 'AutomatizaciÃ³n', desc: 'ReducÃ­ el trabajo manual con flujos inteligentes' },
          { emoji: 'ðŸš›', label: 'LogÃ­stica', desc: 'OptimizaciÃ³n de rutas y seguimiento en vivo' },
          { emoji: 'ðŸŽ“', label: 'EducaciÃ³n', desc: 'Experiencias de aprendizaje potenciadas por IA' },
          { emoji: 'ðŸ“±', label: 'Mobile', desc: 'Apps con React Native y Expo' },
          { emoji: 'â˜ï¸', label: 'Cloud', desc: 'Cloudflare Workers y edge computing' },
        ],
      },

      // â”€â”€â”€ VISION â”€â”€â”€
      vision: {
        title: 'VisiÃ³n',
        motto: 'â€œNo construimos ideas. <span class="highlight">Construimos sistemas que funcionan.</span>â€',
        quote: 'Reducir trabajo manual a travÃ©s de sistemas inteligentes<br>que automatizan <strong>operaciones reales</strong> en empresas,<br>logÃ­stica y educaciÃ³n.',
      },

      // â”€â”€â”€ REVIEWS â”€â”€â”€
      reviews: {
        title: 'ReseÃ±as',
        formTitle: 'DejÃ¡ tu reseÃ±a',
        nameLabel: 'Tu nombre',
        productLabel: 'Producto',
        ratingLabel: 'CalificaciÃ³n',
        textLabel: 'Tu experiencia',
        submit: 'Enviar reseÃ±a',
        sending: 'Enviando...',
        success: 'Â¡Gracias! Tu reseÃ±a serÃ¡ publicada despuÃ©s de revisiÃ³n.',
        error: 'Error al enviar. IntentÃ¡ de nuevo.',
        errorShort: 'El texto debe tener al menos 10 caracteres.',
        loading: 'Cargando reseÃ±as...',
        empty: 'TodavÃ­a no hay reseÃ±as. Â¡SÃ© el primero!',
        products: {
          hermes: 'Hermes - AI Assistant',
          courier: 'Courier TMS',
          profe: 'Profe MÃ¡gico',
          clipcraft: 'ClipCraft',
          OmniConnect: 'OmniConnect - Call Center Platform',
        },
        items: [
          {
            text: 'Me gustÃ³ mucho el traductor, sobre todo porque tiene audios de todo, estÃ¡ muy lindo.',
            author: 'Johana',
            product: 'profe',
            rating: 5,
            date: 'Jun 2026',
          },
          {
            text: 'Me interesa mucho, Â¿cuÃ¡ndo va a estar?',
            author: 'Maria',
            product: 'clipcraft',
            rating: 3,
            date: 'Jun 2026',
          },
        ],
      },

      // â”€â”€â”€ STACK â”€â”€â”€
      stack: {
        title: 'Stack',
        tags: ['Cloudflare Workers', 'Node.js', 'Express', 'Fastify', 'React', 'Vite', 'React Native', 'Expo', 'Llama 3', 'OpenStreetMap', 'OSRM', 'Nominatim', 'Leaflet', 'SQLite', 'Vanilla JS', 'Go', 'Python', 'Edge Computing', 'Data Engineering', 'Prisma', 'PostgreSQL'],
      },

      // â”€â”€â”€ STATUS â”€â”€â”€
      status: {
        title: 'Estado',
        items: ['Desarrollo activo', 'Sistemas desplegados reales', 'IteraciÃ³n continua'],
      },

      // â”€â”€â”€ FOOTER â”€â”€â”€
      footer: {
        brand: 'BYTE <span class="accent">WIZZARD</span>',
        tagline: 'Estudio de Sistemas IA & Software',
        builtBy: 'Built by MatÃ­as Bagnasco â€” AI Systems Developer',
        copyright: 'Â© 2026 Byte Wizzard â€” Productos reales. Sistemas reales.',
      },

      // â”€â”€â”€ COURIER DEMO â”€â”€â”€
      courierDemo: {
        header: { title: 'ðŸšš Courier TMS', subtitle: 'Route Optimizer Demo â€” ingresÃ¡ direcciones o subÃ­ un CSV, y mirÃ¡ cÃ³mo se optimiza la ruta automÃ¡ticamente.' },
        back: 'â† Volver a Byte Wizzard',
        step1: 'IngresÃ¡ direcciones o <strong>subÃ­ un CSV</strong>',
        step2: 'Geocodificamos + optimizamos la ruta (TSP)',
        step3: 'Visualizala en el mapa con el orden Ã³ptimo',
        tabs: ['Ingresar direcciones', 'Subir CSV', 'Ruta optimizada ðŸ—ºï¸'],
        inputTitle: 'ðŸ“¦ Delivery Addresses',
        inputBadge: 'manual or CSV',
        csvLabel: '<strong>Upload CSV</strong> Drop a file or click to browse',
        origin: 'Origen',
        stop: 'Parada',
        addStop: '+ Agregar Parada',
        optimize: 'ðŸ—ºï¸ Optimizar Ruta',
        clear: 'âœ• Limpiar',
        selectFile: 'Seleccionar archivo CSV',
        orDrag: 'o arrastrÃ¡ y soltÃ¡ acÃ¡',
        csvHint: 'Columnas: origen, destino, cliente, telÃ©fono, peso, prioridad',
        loadSample: 'ðŸ”„ Cargar ejemplo',
        totalDistance: 'Distancia total',
        estimatedTime: 'Tiempo estimado',
        stops: 'Paradas',
        noStops: 'AgregÃ¡ al menos 2 direcciones para optimizar.',
        geocoding: 'Geocodificando direcciones...',
        optimizing: 'Optimizando ruta...',
        from: 'Desde',
        to: 'Hasta',
        km: 'km',
        min: 'min',
        optimalRoute: 'ðŸ—ºï¸ Mapa de Ruta',
        distance: 'Distancia',
        mapPlaceholder: 'IngresÃ¡ direcciones y hacÃ© clic en "Optimizar Ruta"',
        mapHint: 'La ruta optimizada aparecerÃ¡ en el mapa con paradas numeradas',
        optimizedOrder: 'ORDEN OPTIMIZADO',
        showStops: 'ðŸ“‹ Mostrar lista de paradas',
        hideStops: 'ðŸ“‹ Ocultar lista de paradas',
        workingBtn: 'â³ Trabajando...',
        csvParseError: 'Formato CSV invÃ¡lido. Columnas requeridas: origen, destino',
        csvEmptyError: 'âš ï¸ El CSV estÃ¡ vacÃ­o o no se pudo parsear',
        csvNoAddrError: 'âš ï¸ No se encontraron columnas de direcciÃ³n. Asegurate que el CSV tenga: address, street, city',
        csvLoaded: 'âœ… Cargadas <span class="stat">{n}</span> direcciones del CSV.',
        geoProgress: 'ðŸ“ Geocodificando {i}/{n}: {addr}...',
        geoFailed: 'âš ï¸ No se pudieron geocodificar suficientes direcciones. ProbÃ¡ agregar "CABA" o una ubicaciÃ³n mÃ¡s especÃ­fica.',
        computingRoute: 'ðŸ§  Calculando ruta Ã³ptima con Nearest-Neighbor TSP ({n} paradas)...',
        fetchingRoute: 'ðŸ“ Ruta calculada. Obteniendo geometrÃ­a de la ruta desde OSRM...',
        noRoute: 'âš ï¸ No se pudo obtener la ruta de manejo. Mostrando orden optimizado sin mapa.',
        error: 'âŒ Error: {msg}',
        routeOptimized: 'âœ… Ruta <strong>optimizada</strong> (Nearest-Neighbor TSP) â€” cada parada es la no visitada mÃ¡s cercana',
        distanceLabel: 'Distancia total (km)',
        timeLabel: 'Tiempo estimado (min)',
        stopsLabel: 'Paradas',
      },

      // â”€â”€â”€ HERMES DEMO â”€â”€â”€
      hermesDemo: {
        header: { name: 'Hermes', status: 'Byte Wizzard â€” Chat Asistente' },
        backLink: 'â† Volver',
        inputPlaceholder: 'Preguntale a Hermes...',
        sendBtn: 'Enviar',
        greeting: 'Â¡Hola! Soy <strong>Hermes</strong> âš¡, el mensajero de Byte Wizzard.<br><br>MirÃ¡, estoy acÃ¡ para contarte todo lo que quieras saber sobre el estudio, los productos que tenemos, cÃ³mo pensamos, quÃ© tecnologÃ­a usamos... realmente todo.<br><br>La idea es que puedas preguntar con confianza â€” si tengo la info, te la doy con lujo de detalle. Si no la tengo, te digo con honestidad y te oriento para dÃ³nde seguir.<br><br>Algunas ideas para arrancar:<br>â€¢ <em>"Â¿QuÃ© es Byte Wizzard?"</em><br>â€¢ <em>"Contame sobre el RolePlay Chat"</em><br>â€¢ <em>"Â¿QuÃ© stack tecnolÃ³gico usan?"</em><br>â€¢ <em>"Â¿QuÃ© es ClipCraft?"</em>',
        fallback: 'SabÃ©s que no tengo informaciÃ³n especÃ­fica sobre ese tema, pero no te preocupes â€” puedo contarte sobre cualquiera de estas cosas con lujo de detalle:<br><br>â€¢ <strong>Byte Wizzard</strong> â€” quÃ© es el estudio, nuestra visiÃ³n, quÃ© estamos construyendo<br>â€¢ <strong>Hermes</strong> â€” cÃ³mo funciono, memoria persistente, redacciÃ³n de emails y mÃ¡s<br>â€¢ <strong>Luna</strong> â€” nuestro AI Business Assistant con memoria y contexto empresarial<br>â€¢ <strong>OmniConnect</strong> â€” plataforma de call center omnicanal con 19 KPIs y 3 perfiles<br>â€¢ <strong>Courier TMS</strong> â€” clustering, geocodificaciÃ³n, importaciÃ³n CSV, app para choferes<br>â€¢ <strong>RolePlay Chat</strong> â€” simulaciÃ³n de call center digital para postulantes<br>â€¢ <strong>Profe MÃ¡gico</strong> â€” educaciÃ³n con IA, desde nivel infantil hasta universitario<br>â€¢ <strong>ClipCraft</strong> â€” plataforma de creaciÃ³n de contenido multimedia (proyecto futuro)<br>â€¢ <strong>Stack</strong> â€” las tecnologÃ­as con las que construimos todo<br>â€¢ <strong>El Fundador</strong> â€” MatÃ­as Bagnasco, su experiencia y certificaciones<br>â€¢ <strong>ReseÃ±as</strong> â€” por quÃ© son importantes y cÃ³mo dejar la tuya<br>â€¢ <strong>VisiÃ³n</strong> â€” hacia dÃ³nde vamos y por quÃ©<br><br>Â¿Sobre cuÃ¡l te gustarÃ­a saber mÃ¡s? Preguntame con confianza.',
        suggestions: ['Â¿QuÃ© es Byte Wizzard?', 'Contame sobre OmniConnect', 'Â¿QuÃ© KPIs tiene OmniConnect?', 'Â¿QuÃ© stack tecnolÃ³gico usan?'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'estudio', 'empresa', 'quiÃ©n es', 'quien es', 'quienes son', 'quienes', 'quÃ© es', 'que es', 'ai systems studio', 'systems studio', 'hacen', 'dedican', 'ser', 'trata', 'herramientas', 'camino', 'prÃ³ximamente'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> es un AI Systems Studio â€” pero mÃ¡s que una definiciÃ³n formal, te cuento lo que realmente somos.<br><br><strong>Â¿QuiÃ©nes somos?</strong><br>Somos un equipo con experiencia en sistemas complejos, inteligencia artificial y desarrollo full-stack. No somos una agencia tradicional que delega todo ni un proyecto acadÃ©mico que se queda en teorÃ­a. Construimos <strong>productos funcionales que se usan todos los dÃ­as</strong>.<br><br><strong>Â¿QuÃ© queremos lograr?</strong><br>Nuestra visiÃ³n es clara: <strong>reducir el trabajo manual mediante sistemas inteligentes</strong>. Creemos que la tecnologÃ­a existe para liberar a las personas de lo repetitivo y permitirles enfocarse en lo que realmente importa. Cada producto que construimos apunta a eso â€” automatizar procesos operativos reales en empresas, logÃ­stica, educaciÃ³n y atenciÃ³n al cliente.<br><br><strong>Â¿En quÃ© trabajamos?</strong><br>Hoy tenemos productos funcionando en cuatro Ã¡reas:<br><br>â€¢ <strong>Asistentes con IA</strong> â€” chatbots con memoria persistente, redacciÃ³n de emails, automatizaciÃ³n de tareas<br>â€¢ <strong>LogÃ­stica inteligente</strong> â€” sistemas de optimizaciÃ³n de rutas, clustering geogrÃ¡fico, tracking GPS<br>â€¢ <strong>EducaciÃ³n adaptativa</strong> â€” plataformas de aprendizaje con IA que se ajustan al ritmo del estudiante<br>â€¢ <strong>SimulaciÃ³n digital</strong> â€” herramientas de roleplay para call centers y entrenamiento de equipos<br><br><strong>Â¿Y despuÃ©s?</strong><br>Estamos construyendo constantemente. AdemÃ¡s de los productos que ves hoy, hay mÃ¡s herramientas en camino que vamos a ir sumando. La idea es tener un ecosistema cada vez mÃ¡s completo de soluciones inteligentes. Mantenete atento â€” siempre estamos cocinando algo nuevo.<br><br>La filosofÃ­a que nos define: <em>"We don\'t build ideas. We build working systems." â€” "No construimos ideas. Construimos sistemas que funcionan."</em> Todo lo que ves acÃ¡ es cÃ³digo real, funcionando, resolviendo problemas concretos.' },
          { id: 'what-we-do', keywords: ['hacen', 'productos', 'servicios', 'desarrollan', 'crean', 'ofrecen', 'rubro', 'trabajan', 'dedican', 'construyen'], label: 'QuÃ© Hacemos', response: 'Construimos <strong>sistemas completos</strong>, no solo frentes bonitos. Te cuento en detalle:<br><br><strong>ðŸ§  Sistemas con IA</strong><br>Desde asistentes virtuales con memoria y contexto empresarial hasta sistemas de aprendizaje automÃ¡tico. Todo integrado en productos que realmente se usan.<br><br><strong>âš™ï¸ AutomatizaciÃ³n de procesos</strong><br>Si hay una tarea repetitiva que te estÃ¡ comiendo tiempo, probablemente podamos automatizarla. Analizamos el flujo, diseÃ±amos la soluciÃ³n y la implementamos.<br><br><strong>ðŸšš LogÃ­stica inteligente</strong><br>OptimizaciÃ³n de rutas, agrupaciÃ³n de entregas por zona, tracking en tiempo real. Para empresas de delivery que quieren dejar de hacer todo a mano.<br><br><strong>ðŸŽ“ Plataformas educativas</strong><br>Experiencias de aprendizaje con IA que se adaptan al ritmo del estudiante. TraducciÃ³n automÃ¡tica, generaciÃ³n de ejercicios dinÃ¡micos, audio integrado.<br><br><strong>ðŸ“± Apps mobile full-stack</strong><br>Con React Native y Expo, llevamos los sistemas a los bolsillos de los usuarios â€” tanto para repartidores como para clientes.<br><br><strong>â˜ï¸ Cloud y edge computing</strong><br>Corremos en Cloudflare Workers, Node.js, Fastify. Escalable desde el dÃ­a uno sin tener que pensar en infraestructura.' },
          { id: 'luna', keywords: ['luna', 'asistente', 'asistant', 'business', 'chat', 'bot', 'inteligente', 'ai assistant', 'virtual', 'empresarial'], label: 'Luna', response: '<strong>Luna</strong> es un AI Business Assistant â€” un asistente inteligente con memoria persistente y contexto empresarial, diseÃ±ado para operar en entornos de call center y atenciÃ³n al cliente.<br><br><strong>Â¿QuÃ© la hace especial?</strong><br>Luna no es un chatbot comÃºn que olvida todo despuÃ©s de cada conversaciÃ³n. Tiene <strong>memoria por usuario y por sesiÃ³n</strong>, lo que significa que recuerda quiÃ©n sos, quÃ© hablaste antes y puede retomar el hilo sin problemas.<br><br><strong>Capacidades principales:</strong><br>â€¢ <strong>Chat con IA en tiempo real</strong> â€” responde en lenguaje natural con velocidad y precisiÃ³n<br>â€¢ <strong>Memoria persistente</strong> â€” recuerda conversaciones anteriores y contexto del cliente<br>â€¢ <strong>RedacciÃ³n automÃ¡tica de emails</strong> â€” genera respuestas profesionales en segundos<br>â€¢ <strong>Soporte interno</strong> â€” ideal para Ã¡reas de back office que necesitan asistencia constante<br>â€¢ <strong>AutomatizaciÃ³n de tareas administrativas</strong> â€” desde consultas a bases de datos hasta generaciÃ³n de reportes<br><br><strong>ðŸ’° Estado:</strong> producto en uso real con cliente. No es un prototipo ni un MVP â€” estÃ¡ operando en producciÃ³n.' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'asistente', 'chat', 'mensajero', 'vos', 'cÃ³mo funciona', 'como funciona', 'funciona', 'memoria', 'email', 'luna', 'versiÃ³n'], label: 'Hermes', response: 'Â¡Ese soy yo! <strong>Hermes</strong> âš¡ â€” el mensajero digital de Byte Wizzard.<br><br>AcÃ¡ va la posta: Hermes es una <strong>versiÃ³n de Luna</strong>, nuestro AI Business Assistant. BÃ¡sicamente soy Luna pero adaptado especÃ­ficamente para ser la cara visible del estudio en la landing page. Comparto el mismo motor, la misma inteligencia, la misma capacidad de memoria persistente.<br><br><strong>Â¿CÃ³mo funciono?</strong><br>No soy un chatbot comÃºn y corriente. Estoy construido sobre un sistema de IA con <strong>memoria persistente</strong> â€” eso significa que retengo contexto, recuerdo lo que hablamos y puedo mantener conversaciones coherentes sin perder el hilo. Cada interacciÃ³n se procesa con modelos de lenguaje que entienden intenciÃ³n, matices y pueden generar respuestas naturales.<br><br><strong>Lo que sÃ© hacer:</strong><br>â€¢ <strong>Chat con IA en tiempo real</strong> â€” conversaciones fluidas en lenguaje natural<br>â€¢ <strong>Memoria persistente</strong> â€” recuerdo quiÃ©n sos y de quÃ© hablamos, ideal para seguimiento<br>â€¢ <strong>RedacciÃ³n automÃ¡tica de emails</strong> â€” pasame una idea y te la transformo en un mail formal, profesional, listo para enviar. Por ejemplo: decime "necesito pedir un presupuesto para un sistema de tracking" y te redacto el email completo con saludo, cuerpo y despedida.<br>â€¢ <strong>Conocimiento completo del estudio</strong> â€” productos, stack, visiÃ³n, equipo<br>â€¢ <strong>AutomatizaciÃ³n de tareas</strong> â€” desde consultas hasta generaciÃ³n de contenido<br><br><strong>Â¿QuÃ© NO hago?</strong><br>No navego por internet ni tengo acceso a datos externos fuera de lo que el estudio me configurÃ³. Pero si no sÃ© algo, te lo digo claramente y te oriento para dÃ³nde seguir.<br><br><em>Estado: funcional â€” integrado en la landing como asistente principal del estudio.</em>' },
          { id: 'roleplay', keywords: ['roleplay', 'role play', 'roleplay chat', 'call center', 'simulaciÃ³n', 'simulacion', 'digital', 'postulantes', 'entrenamiento', 'simulador', 'contact center'], label: 'RolePlay Chat', response: '<strong>RolePlay Chat</strong> es un simulador de interacciÃ³n digital para call centers, pensado especÃ­ficamente para el <strong>Ã¡rea digital</strong> â€” esos canales que hoy son el corazÃ³n de cualquier operaciÃ³n de contacto: chat, WhatsApp, redes sociales.<br><br><strong>Â¿Para quÃ© sirve?</strong><br>ImaginÃ¡ que estÃ¡s en un proceso de selecciÃ³n para un call center y querÃ©s evaluar cÃ³mo un postulante se desempeÃ±a en una interacciÃ³n digital real. O que estÃ¡s capacitando a tu equipo y necesitÃ¡s escenarios realistas para practicar. AhÃ­ entra RolePlay Chat.<br><br><strong>Escenarios disponibles:</strong><br>â€¢ <strong>ðŸ“¦ Reclamo por pedido</strong> â€” cliente que no recibiÃ³ su compra, gestiÃ³n de reclamos y seguimiento<br>â€¢ <strong>ðŸ’» Soporte tÃ©cnico</strong> â€” problemas de inicio de sesiÃ³n, recuperaciÃ³n de cuentas, resoluciÃ³n de incidentes<br>â€¢ <strong>ðŸ’° Consulta de facturaciÃ³n</strong> â€” cobros duplicados, reclamos de dÃ©bito, gestiÃ³n de reintegros<br>â€¢ <strong>ðŸ›’ Venta consultiva</strong> â€” atenciÃ³n personalizada, identificaciÃ³n de necesidades, cierre de ventas<br>â€¢ <strong>ðŸ’¬ InteracciÃ³n WhatsApp</strong> â€” consultas de horarios, sucursales, envÃ­os, tÃ­picas del dÃ­a a dÃ­a<br><br><strong>Â¿CÃ³mo funciona?</strong><br>Es 100% frontend â€” no necesita backend, no necesita servidor. CargÃ¡s un escenario y la simulaciÃ³n reproduce la conversaciÃ³n completa entre agente y cliente. DespuÃ©s podÃ©s seguir escribiendo libremente desde cualquier panel para explorar diferentes respuestas.<br><br><em>Estado: demo interactiva funcional â€” usala para entrenamiento, selecciÃ³n o simplemente para mostrar cÃ³mo se maneja una interacciÃ³n digital.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'logÃ­stica', 'rutas', 'delivery', 'optimizaciÃ³n', 'tsp', 'tracking', 'gps', 'repartidores', 'transporte', 'flota', 'geocodificaciÃ³n', 'geocoding', 'excel', 'importar', 'exportar', 'chofer', 'driver'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> es nuestro sistema de inteligencia logÃ­stica â€” un Transportation Management System completo pensado para empresas de delivery que manejan mÃºltiples entregas por dÃ­a y necesitan dejar de hacer todo a mano.<br><br><strong>Â¿QuÃ© problema resuelve?</strong><br>Organizar 50, 100 o 500 entregas al dÃ­a con Excel y WhatsApp es una locura insostenible. Courier TMS automatiza todo el proceso: desde que importÃ¡s las Ã³rdenes hasta que el repartidor las completa y generÃ¡s los reportes.<br><br><strong>Funcionalidades en detalle:</strong><br><br>â€¢ <strong>AgrupaciÃ³n inteligente por zonas</strong> â€” el sistema clustering automÃ¡tico toma todas las Ã³rdenes, analiza las coordenadas geogrÃ¡ficas y las agrupa por zona de manera inteligente. No es un simple agrupamiento por barrio â€” es geogrÃ¡fico, preciso, optimizado. Si tenÃ©s 80 entregas para 5 repartidores, el sistema te dice exactamente quÃ© Ã³rdenes va cada uno.<br><br>â€¢ <strong>GeocodificaciÃ³n automÃ¡tica</strong> â€” subÃ­s las direcciones y el sistema las convierte automÃ¡ticamente en coordenadas (latitud/longitud) usando Nominatim + OSRM. No necesitas marcar nada en un mapa a mano.<br><br>â€¢ <strong>ImportaciÃ³n masiva desde Excel/CSV</strong> â€” descargÃ¡s la plantilla, llenÃ¡s tus Ã³rdenes, importÃ¡s el archivo y en segundos tenÃ©s todo cargado en el sistema. Con validaciÃ³n de datos y detecciÃ³n de errores fila por fila.<br><br>â€¢ <strong>ExportaciÃ³n a Excel</strong> â€” cuando las Ã³rdenes estÃ¡n completadas, exportÃ¡s todo a Excel con un clic. Ideal para reportes, contabilidad y auditorÃ­a.<br><br>â€¢ <strong>App para el chofer</strong> â€” el repartidor tiene su propia interfaz mobile con tracking GPS en tiempo real, navegaciÃ³n paso a paso, confirmaciÃ³n de entregas y notificaciones. El admin ve en vivo dÃ³nde estÃ¡ cada repartidor.<br><br>â€¢ <strong>Panel administrativo completo</strong> â€” dashboard con mapa interactivo, mÃ©tricas en tiempo real, historial completo y control de flota.<br><br><em>Estado: desarrollo activo + <a href="../courier-tms/index.html" style="color:#00aaff">demo funcional del agrupador de Ã³rdenes</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'contenido', 'multimedia', 'video', 'foto', 'ediciÃ³n', 'mobile', 'creaciÃ³n', 'editing'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> es un proyecto que estÃ¡ en nuestra hoja de ruta: una plataforma mobile de creaciÃ³n de contenido multimedia.<br><br><strong>La visiÃ³n:</strong><br>ImaginÃ¡ una app donde puedas editar fotos y videos, generar clips automÃ¡ticos con mÃºsica integrada, renderizar todo en la nube y exportarlo directamente a tu dispositivo. Sin necesidad de una PC, sin software pesado, sin complicaciones.<br><br><strong>Lo que estamos planeando:</strong><br>â€¢ EdiciÃ³n de fotos y videos desde el celular<br>â€¢ GeneraciÃ³n automÃ¡tica de videos con templates inteligentes<br>â€¢ Biblioteca de mÃºsica integrada<br>â€¢ Render en la nube â€” procesamiento pesado del lado del servidor<br>â€¢ ExportaciÃ³n directa al dispositivo o a redes sociales<br><br><strong>ðŸ’° Estado:</strong> proyecto futuro â€” MVP interno en desarrollo. TodavÃ­a no estÃ¡ listo para mostrarse, pero estamos trabajando en ello.' },
          { id: 'profe', keywords: ['profe', 'mÃ¡gico', 'magico', 'educaciÃ³n', 'educacion', 'aprendizaje', 'learning', 'inglÃ©s', 'ingles', 'niÃ±os', 'kids', 'enseÃ±anza', 'school', 'educativo', 'traductor', 'facultad', 'universidad', 'complejo'], label: 'Profe MÃ¡gico', response: '<strong>Profe MÃ¡gico</strong> es una plataforma educativa con inteligencia artificial, diseÃ±ada originalmente para que los niÃ±os aprendan inglÃ©s e interactÃºen con la IA de una manera divertida y natural.<br><br><strong>Â¿QuÃ© lo hace especial?</strong><br>ArrancÃ³ como una herramienta temÃ¡tica infantil â€” con personajes, colores llamativos, explicaciones sencillas y mucho audio para pronunciaciÃ³n. Pero tiene un secreto: estÃ¡ construido con modelos de lenguaje potentes, asÃ­ que si le pasÃ¡s algo <strong>complejo, de facultad, tÃ©cnico o universitario</strong>, tambiÃ©n te lo responde y te da ejemplos acordes.<br><br>O sea, podÃ©s usarlo tanto para que un nene de 8 aÃ±os practique "hello, how are you?" como para pedirle una explicaciÃ³n gramatical avanzada o una traducciÃ³n tÃ©cnica. No es una limitaciÃ³n tÃ©cnica â€” es una cuestiÃ³n de cÃ³mo lo presentÃ¡s.<br><br><strong>Funcionalidades:</strong><br>â€¢ <strong>EnseÃ±anza interactiva con IA</strong> â€” conversa, corrige pronunciaciÃ³n y guÃ­a al estudiante<br>â€¢ <strong>TraducciÃ³n y audio automÃ¡tico</strong> â€” escucha, repite, mejora la comprensiÃ³n auditiva<br>â€¢ <strong>Contenido adaptado al nivel</strong> â€” desde "colores y nÃºmeros" hasta "presente perfecto vs pasado simple"<br>â€¢ <strong>Ejercicios dinÃ¡micos generados por IA</strong> â€” nunca se repiten, siempre frescos<br>â€¢ <strong>Aprendizaje guiado con profesor virtual</strong> â€” acompaÃ±a todo el proceso paso a paso<br><br><em>Estado: funcional y en iteraciÃ³n constante. Accesible desde cualquier navegador.</em>' },
          { id: 'OmniConnect', keywords: ['OmniConnect', 'omni', 'hub', 'call center', 'dashboard', 'kpi', 'tmo', 'dengo', 'perfiles', 'admin', 'supervisor', 'operador', 'rol', 'agente', 'interacciÃ³n', 'web socket', 'tiempo real'], label: 'OmniConnect', response: '<strong>OmniConnect</strong> es una plataforma de gestiÃ³n de call centers omnicanal, construida completamente desde cero con <strong>Node.js + SQLite</strong>. No es un demo ni un prototipo â€” es un sistema funcional con 19 KPIs modelados desde <strong>Dengo</strong> (el dashboard de Power BI que usan en Rossi con 200+ agentes).<br><br><strong>Â¿QuÃ© lo hace Ãºnico?</strong><br>OmniConnect replica los KPIs exactos del dashboard de Dengo â€” TMO, ocupaciÃ³n Erlang, utilizaciÃ³n, conversiÃ³n, NDA, ACW, GPH, SPH â€” pero en un sistema propio con WebSockets en tiempo real, filtros dinÃ¡micos y perfiles diferenciados.<br><br><strong>Perfiles:</strong><br>â€¢ <strong>ðŸ‘‘ Admin</strong> â€” Dashboard global con todos los KPIs, administraciÃ³n de usuarios/campaÃ±as/equipos, reportes exportables. VisiÃ³n 360Â° del centro de contacto.<br>â€¢ <strong>ðŸ” Supervisor</strong> â€” Monitoreo de equipos, KPIs por agente, alertas de SLA y rendimiento. Perfecto para Team Leaders.<br>â€¢ <strong>ðŸŽ§ Operador</strong> â€” Bandeja unificada omnicanal (WhatsApp, email, phone), atenciÃ³n en vivo, historial propio y mÃ©tricas personales.<br><br><strong>Datos reales:</strong> Actualmente gestiona 631 interacciones y 2985 eventos de estado en SQLite WAL. Los KPIs se calculan en SQL puro con funciones ventana y se sirven via REST + WebSocket.<br><br><em>Estado: WORKING SYSTEM â€” funcional, conectado a backend real, listo para producciÃ³n.</em>' },
          { id: 'vision', keywords: ['visiÃ³n', 'vision', 'objetivo', 'goal', 'misiÃ³n', 'mision', 'propÃ³sito', 'proposito', 'futuro', 'buscan', 'hacia', 'meta'], label: 'VisiÃ³n', response: 'Nuestra visiÃ³n es simple pero poderosa: <strong>reducir el trabajo manual mediante sistemas inteligentes</strong>.<br><br>Creemos que la tecnologÃ­a no tendrÃ­a que ser una complicaciÃ³n mÃ¡s â€” tendrÃ­a que ser la herramienta que te libera de lo repetitivo para que puedas enfocarte en lo importante.<br><br>No nos interesa construir features por construir. Cada lÃ­nea de cÃ³digo que escribimos estÃ¡ pensada para <strong>resolver un problema real</strong> que alguien tiene todos los dÃ­as.<br><br>Nos movemos en cuatro Ã¡reas donde vemos que la automatizaciÃ³n puede tener mÃ¡s impacto:<br><br>â€¢ <strong>Empresas</strong> â€” procesos operativos, atenciÃ³n al cliente, gestiÃ³n interna<br>â€¢ <strong>LogÃ­stica</strong> â€” rutas, entregas, tracking, optimizaciÃ³n de recursos<br>â€¢ <strong>EducaciÃ³n</strong> â€” aprendizaje adaptativo, generaciÃ³n de contenido dinÃ¡mico<br>â€¢ <strong>CreaciÃ³n de contenido</strong> â€” ediciÃ³n, render, publicaciÃ³n automatizada<br><br><em>"We don\'t build ideas. We build working systems." â€” "No construimos ideas. Construimos sistemas que funcionan."</em>' },
          { id: 'differential', keywords: ['diferencia', 'diferencias', 'distinto', 'unique', 'propuesta', 'valor', 'por quÃ©', 'porque', 'por que elegir', 'ventaja', 'diferencial', 'elegir'], label: 'Diferencial', response: 'MirÃ¡, te voy a ser sincero: en el mundo del software hay mucha gente que hace pÃ¡ginas lindas y vende humo. Nosotros no.<br><br><strong>Lo que nos diferencia:</strong><br><br>â€¢ <strong>Construimos sistemas completos</strong> â€” no solo frontends bonitos. Cada producto tiene backend, base de datos, APIs, integraciones y, cuando corresponde, IA funcionando de verdad.<br><br>â€¢ <strong>Pensamos en operaciones reales</strong> â€” no construimos para un pitch de inversores, construimos para que alguien lo use todos los dÃ­as y le mejore la vida laboral.<br><br>â€¢ <strong>Stack moderno y eficiente</strong> â€” Cloudflare Workers, Node.js, React, React Native. No usamos tecnologÃ­a vieja porque "siempre se hizo asÃ­".<br><br>â€¢ <strong>Somos chicos pero resolvemos grande</strong> â€” un equipo reducido pero con expertise en sistemas complejos: logÃ­stica, call centers, educaciÃ³n, IA aplicada.<br><br>â€¢ <strong>Hecho en Paraguay, con visiÃ³n global</strong> â€” nuestros productos compiten con cualquier soluciÃ³n internacional, pero entendemos las necesidades del mercado local y regional.' },
          { id: 'stack', keywords: ['stack', 'tecnologÃ­a', 'tecnologia', 'tech', 'tools', 'herramientas', 'lenguaje', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'motor', 'backend', 'frontend', 'data engineering', 'ingenierÃ­a de datos', 'datos', 'analÃ­tica', 'analytics', 'procesamiento', 'pipeline', 'etl', 'mapas', 'geoespacial', 'geospatial', 'algoritmos', 'algorithms', 'go', 'golang', 'python', 'arquitectura', 'architecture', 'infraestructura', 'cloud', 'edge', 'serverless', 'vanilla', 'optimizaciÃ³n', 'optimizacion', 'rendimiento'], label: 'Stack TecnolÃ³gico', response: '<strong>Stack TecnolÃ³gico de Byte Wizzard:</strong><br><br>MirÃ¡, te voy a contar exactamente lo que usamos sin vueltas. No somos de esos estudios que ponen logos de tecnologÃ­as que apenas tocaron. Esto es lo que verdaderamente tenemos en producciÃ³n, en desarrollo y en nuestras herramientas del dÃ­a a dÃ­a.<br><br>â˜ï¸ <strong>Cloudflare Workers â€” Edge Computing de verdad</strong><br>APIs serverless distribuidas globalmente. Cero latencia, cero servidores que mantener. Corremos lÃ³gica de negocio en el edge con Workers + KV para almacenamiento clave-valor. Esto nos da una arquitectura donde el cÃ³digo se ejecuta en la ubicaciÃ³n mÃ¡s cercana al usuario, no en un datacenter central. Usamos <strong>Wrangler</strong> para el deploy y gestiÃ³n de entornos.<br><br>ðŸŸ¢ <strong>Node.js â€” Backend robusto y moderno</strong><br>Node con <strong>Express</strong> y <strong>Fastify</strong> para APIs REST. Servicios en producciÃ³n corriendo sobre Node â€” livianos, rÃ¡pidos, sin sobreingenierÃ­a. Elegimos las herramientas justas para cada problema.<br><br>âš›ï¸ <strong>Frontend inteligente: Vanilla JS + React + Leaflet</strong><br>Usamos <strong>vanilla JavaScript (ES6+)</strong> como base â€” cero bundlers, cero transpilaciÃ³n, cero sobrecarga. Landing pages y demos 100% vanilla, porque no todo necesita un framework. Para apps mÃ¡s complejas metemos <strong>React + Vite</strong>. Y para mapas interactivos en logÃ­stica, <strong>Leaflet.js 1.9.4</strong> con tiles de <strong>OpenStreetMap</strong>. TipografÃ­a con <strong>JetBrains Mono</strong> e <strong>Inter</strong> de Google Fonts.<br><br>ðŸ—„ï¸ <strong>Bases de datos: SQLite + Cloudflare KV</strong><br>SQLite con modo <strong>WAL</strong> (Write-Ahead Logging) para alto rendimiento en lecturas concurrentes â€” la base de datos mÃ¡s utilizada del planeta, pero configurada como la gente. Cloudflare KV para datos distribuidos en el edge. Elegimos segÃºn el problema: persistencia local vs. distribuciÃ³n global.<br><br>ðŸ§  <strong>Inteligencia Artificial â€” Modelos en producciÃ³n</strong><br>IntegraciÃ³n con <strong>Llama 3</strong> (modelo open-source de Meta), <strong>Workers AI</strong> y APIs externas de IA. Procesamiento de lenguaje natural, generaciÃ³n de contenido, automatizaciÃ³n inteligente. Nuestros asistentes tienen memoria persistente y contexto de sesiÃ³n.<br><br>ðŸ“Š <strong>Data Engineering & Geospatial</strong><br>Este es un punto clave que nos diferencia. Tenemos pipelines de datos reales:<br><br>â€¢ <strong>GeocodificaciÃ³n</strong> con Nominatim (OpenStreetMap) â€” convertimos direcciones en coordenadas con alta precisiÃ³n<br>â€¢ <strong>Ruteo y optimizaciÃ³n</strong> con OSRM â€” algoritmo Nearest-Neighbor TSP para rutas de delivery Ã³ptimas<br>â€¢ <strong>Procesamiento de datos geoespaciales</strong> â€” GeoJSON, rutas, clusters geogrÃ¡ficos, anÃ¡lisis de zonas<br>â€¢ <strong>Data pipelines</strong> â€” transformaciÃ³n y procesamiento de datos CSV, estructuras de logÃ­stica, importaciÃ³n masiva<br>â€¢ <strong>AnÃ¡lisis y optimizaciÃ³n</strong> â€” algoritmos de optimizaciÃ³n combinatoria aplicados a problemas reales de rutas y entregas<br><br>âš™ï¸ <strong>Lenguajes de sistemas: Go & Python</strong><br>Para lo que necesita rendimiento y control, usamos <strong>Go (Golang)</strong> â€” solucionadores TSP, herramientas de lÃ­nea de comandos, procesamiento concurrente. <strong>Python</strong> para anÃ¡lisis de datos, scripting y notebooks de exploraciÃ³n. No nos casamos con un solo lenguaje, usamos el que mejor resuelve cada problema.<br><br>ðŸ“¦ <strong>Infraestructura & Deploy</strong><br>â€¢ <strong>Render.com</strong> â€” hosting de APIs Express y frontends<br>â€¢ <strong>Cloudflare Pages</strong> â€” landing pages y contenido estÃ¡tico<br>â€¢ <strong>Wrangler CLI</strong> â€” deploy de Workers desde la terminal<br>â€¢ Sin CI/CD complejo â€” deploy simple, directo, sin capas innecesarias<br><br>ðŸ—ï¸ <strong>FilosofÃ­a de arquitectura</strong><br>No usamos tecnologÃ­a por moda. Cada decisiÃ³n tÃ©cnica tiene un porquÃ©:<br><br>â€¢ Vanilla JS donde sobra un framework (la mayorÃ­a de las landing pages y demos)<br>â€¢ Sin build step innecesario â€” lo que escribÃ­s es lo que se ejecuta<br>â€¢ Edge computing para lo que necesita velocidad global<br>â€¢ SQLite porque para muchos casos es mÃ¡s rÃ¡pido y simple que un PostgreSQL gigante<br>â€¢ Frameworks solo cuando el problema lo justifica (React para apps complejas, no para un formulario)<br><br><em>"Herramientas modernas, decisiones conscientes, cero humo."</em>' },
          { id: 'status', keywords: ['estado', 'status', 'progreso', 'activo', 'desarrollo', 'fase', 'alpha', 'beta', 'lanzamiento', 'momento'], label: 'Estado del Proyecto', response: 'Byte Wizzard estÃ¡ en <strong>fase activa de desarrollo</strong>. Esto significa que hay productos funcionando en producciÃ³n hoy, y al mismo tiempo seguimos construyendo e iterando.<br><br><strong>En este momento:</strong><br>â€¢ <strong>Luna</strong> â€” funcionando con un cliente real, en uso diario<br>â€¢ <strong>Profe MÃ¡gico</strong> â€” live, accesible desde cualquier navegador, en mejora continua<br>â€¢ <strong>Courier TMS</strong> â€” desarrollo activo con demo funcional, sumando features constantemente<br>â€¢ <strong>Hermes</strong> â€” ya estÃ¡ acÃ¡, en la landing, como asistente principal del estudio<br>        â€¢ <strong>RolePlay Chat</strong> â€” demo interactiva funcionando, lista para mostrar<br>â€¢ <strong>OmniConnect</strong> â€” plataforma de call center omnicanal, WORKING SYSTEM con 19 KPIs y 3 perfiles<br>â€¢ <strong>ClipCraft</strong> â€” proyecto futuro, MVP interno en desarrollo<br><br>No somos de los que anuncian productos que no existen. Todo lo que ves tiene cÃ³digo funcionando atrÃ¡s.' },
          { id: 'ceo', keywords: ['ceo', 'fundador', 'dueÃ±o', 'creador', 'matÃ­as', 'matias', 'bagnasco', 'quien creÃ³', 'quien fundÃ³', 'quien lidera', 'detras', 'detrÃ¡s', 'cabeza', 'director', 'argentino', 'paraguay'], label: 'El Fundador', response: 'El creador y cabeza de Byte Wizzard es <strong>MatÃ­as AndrÃ©s Bagnasco</strong>.<br><br><strong>Datos:</strong><br>â€¢ <strong>Nombre completo:</strong> MatÃ­as AndrÃ©s Bagnasco<br>â€¢ <strong>Edad:</strong> 37 aÃ±os<br>â€¢ <strong>Nacionalidad:</strong> Argentino<br>â€¢ <strong>Residencia:</strong> Paraguay<br><br><strong>Certificaciones y expertise:</strong><br>â€¢ Certificado en Inteligencia Artificial y ProgramaciÃ³n con IA<br>â€¢ Certificado en ISO SQL Security<br>â€¢ Certificado en Seguridad ISO<br>â€¢ EspecializaciÃ³n en sistemas complejos, automatizaciÃ³n y desarrollo full-stack<br>â€¢ Amplia experiencia en call centers, logÃ­stica y operaciones digitales<br><br>MatÃ­as es el arquitecto principal de todos los productos de Byte Wizzard â€” desde la arquitectura de sistemas hasta el diseÃ±o de las experiencias de usuario. Su experiencia en call centers y operaciones es lo que da forma a productos como Hermes, Courier TMS y RolePlay Chat, que estÃ¡n pensados desde la realidad operativa y no desde la teorÃ­a.<br><br>Actualmente reside en Paraguay, donde sigue construyendo y expandiendo el estudio con una visiÃ³n clara: sistemas inteligentes que resuelvan problemas reales.' },
          { id: 'reviews', keywords: ['reseÃ±as', 'resenias', 'reseÃ±a', 'resenia', 'reviews', 'review', 'opiniones', 'opiniÃ³n', 'testimonios', 'feedback', 'comentarios', 'valoraciÃ³n'], label: 'ReseÃ±as', response: 'Las reseÃ±as son <strong>muy importantes para nosotros</strong>. No solo porque nos ayudan a mejorar, sino porque cada opiniÃ³n que nos dejan es una oportunidad para entender quÃ© estamos haciendo bien y en quÃ© podemos crecer.<br><br>En Byte Wizzard creemos en la mejora continua y en construir productos que realmente le sirvan a la gente. Por eso cada reseÃ±a â€” buena o mala â€” la tomamos como un insumo valioso para seguir evolucionando.<br><br>Si probaste algÃºn producto o demo y querÃ©s dejar tu opiniÃ³n, abajo en la secciÃ³n de reseÃ±as de esta misma pÃ¡gina hay un formulario. Te toma dos minutos y para nosotros vale oro.<br><br><strong>Importante:</strong> todas las reseÃ±as se publican automÃ¡ticamente ni bien las enviÃ¡s, sin filtros ni censura. Nos gusta la transparencia â€” lo bueno y lo malo se muestra igual, porque solo asÃ­ podemos mejorar de verdad.' },
          { id: 'contact', keywords: ['contacto', 'contact', 'hablar', 'contratar', 'presupuesto', 'email', 'mail', 'telÃ©fono', 'telefono', 'whatsapp', 'redes', 'comunicarse'], label: 'Contacto', response: 'Por ahora la mejor forma de conocer Byte Wizzard es justamente esta: explorando los productos y las demos que ves acÃ¡ en la pÃ¡gina. Cada demo te da una idea clara de cÃ³mo pensamos y quÃ© sabemos hacer.<br><br>Si despuÃ©s de ver todo te queda alguna pregunta o querÃ©s charlar sobre un proyecto, escribinos al mail del estudio: <strong>bytewizzards@gmail.com</strong>.<br><br>TambiÃ©n podÃ©s seguirnos y ver mÃ¡s cosas que vamos compartiendo â€” siempre estamos construyendo algo nuevo.' },
        ],
      },
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // ENGLISH
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    en: {
      nav: { products: 'Products', what: 'What We Do', vision: 'Vision', stack: 'Stack', status: 'Status', contact: 'Contact' },
      hero: {
        label: './byte-wizzard --whoami',
        title: 'BYTE<br><span class="accent">WIZZARD</span>',
        subtitle: 'AI-first systems for automation, logistics,<br>education and intelligent assistants.',
        btnProducts: 'View Products â†’',
        btnReviews: 'Reviews',
        btnContact: 'Contact',
        scroll: 'SCROLL â–¼',
        status: '6 active products Â· 4 demos Â· AI-first',
      },
      products: {
        title: 'Products',
        hermes: {
          icon: 'âš¡',
          name: 'Hermes',
          tagline: 'Byte Wizzard AI Assistant',
          features: ['Full studio knowledge', 'Product & demo info', 'Tech stack & vision', 'Interactive live chat'],
          status: 'DEMO',
          link: 'â†’ Try Demo Bot',
        },
        roleplay: {
          icon: 'ðŸŽ­',
          name: 'RolePlay Chat',
          tagline: 'Call Center Digital Simulation',
          features: ['Digital customer service simulation', 'Scenarios: claims, support, sales', 'Live agent-client interaction', 'Applicant training tool', 'Multi-channel (chat, WhatsApp)'],
          status: 'DEMO',
          link: 'â†’ Try Demo',
        },
        courier: {
          icon: 'ðŸšš',
          name: 'Courier TMS',
          tagline: 'Logistics Intelligence System',
          features: ['Smart zone clustering', 'Route optimization (TSP)', 'Real-time GPS tracking', 'Driver mobile app', 'Complete admin panel', 'CSV order import'],
          status: 'IN DEVELOPMENT',
          link: 'â†’ Try Demo (in development)',
        },
        profe: {
          icon: 'ðŸ“š',
          name: 'Profe MÃ¡gico',
          tagline: 'AI Learning System',
          features: ['Interactive AI teaching', 'Auto translation & audio', 'Kids-friendly content', 'Dynamic exercises', 'Guided learning experience'],
          status: 'LIVE',
          link: 'â†’ Visit site',
        },
        OmniConnect: {
          icon: '🌐',
          name: 'OmniConnect',
          tagline: 'Call Center Intelligence Platform',
          features: ['19 KPIs modeled from Dengo', '3 profiles: Admin, Supervisor, Operator', 'Real-time dashboards with WebSocket', 'Omnichannel management (WhatsApp, email, phone)', 'JWT authentication + RBAC roles', 'Input validation, pagination, rate limiting', 'Smart cache + WebSocket invalidation', 'Configurable timeouts + slow query logging', 'Automatic SQLite backup with retention', 'Deployment: Docker, PM2 or systemd'],
          status: 'IN DEVELOPMENT',
          link: 'Node.js · Express · SQLite WAL · WebSocket · JWT',
        },
      },
      comingSoon: {
        title: 'Coming Soon',
        clipcraft: {
          icon: 'ðŸ“±',
          name: 'ClipCraft',
          tagline: 'Mobile Media Center',
          status: 'Internal MVP',
          features: ['Multimedia content creation platform', 'Photo & video editing', 'Automatic video generation'],
        },
      },
      wwd: {
        title: 'What We Do',
        items: [
          { emoji: 'ðŸ§ ', label: 'AI Systems', desc: 'Intelligent automation for real processes' },
          { emoji: 'âš™ï¸', label: 'Automation', desc: 'Reduce manual work through smart flows' },
          { emoji: 'ðŸš›', label: 'Logistics', desc: 'Route optimization & live tracking' },
          { emoji: 'ðŸŽ“', label: 'Education', desc: 'AI-powered learning experiences' },
          { emoji: 'ðŸ“±', label: 'Mobile', desc: 'React Native & Expo apps' },
          { emoji: 'â˜ï¸', label: 'Cloud', desc: 'Cloudflare Workers & edge computing' },
        ],
      },
      vision: {
        title: 'Vision',
        motto: 'â€œWe don\'t build ideas. <span class="highlight">We build working systems.</span>â€',
        quote: 'Reduce manual work through intelligent systems<br>that automate <strong>real operations</strong> in business,<br>logistics and education.',
      },

      // â”€â”€â”€ REVIEWS â”€â”€â”€
      reviews: {
        title: 'Reviews',
        formTitle: 'Leave your review',
        nameLabel: 'Your name',
        productLabel: 'Product',
        ratingLabel: 'Rating',
        textLabel: 'Your experience',
        submit: 'Submit review',
        sending: 'Sending...',
        success: 'Thank you! Your review will be published after moderation.',
        error: 'Error submitting. Please try again.',
        errorShort: 'Review text must be at least 10 characters.',
        loading: 'Loading reviews...',
        empty: 'No reviews yet. Be the first!',
        products: {
          hermes: 'Hermes - AI Assistant',
          courier: 'Courier TMS',
          profe: 'Profe MÃ¡gico',
          clipcraft: 'ClipCraft',
          OmniConnect: 'OmniConnect - Call Center Platform',
        },
        items: [
          {
            text: 'Me gustÃ³ mucho el traductor, sobre todo porque tiene audios de todo, estÃ¡ muy lindo.',
            author: 'Johana',
            product: 'profe',
            rating: 5,
            date: 'Jun 2026',
          },
          {
            text: 'Me interesa mucho, Â¿cuÃ¡ndo va a estar?',
            author: 'Maria',
            product: 'clipcraft',
            rating: 3,
            date: 'Jun 2026',
          },
        ],

      },
      stack: {
        title: 'Stack',
        tags: ['Cloudflare Workers', 'Node.js', 'Express', 'Fastify', 'React', 'Vite', 'React Native', 'Expo', 'Llama 3', 'OpenStreetMap', 'OSRM', 'Nominatim', 'Leaflet', 'SQLite', 'Vanilla JS', 'Go', 'Python', 'Edge Computing', 'Data Engineering', 'Prisma', 'PostgreSQL'],
      },
      status: {
        title: 'Status',
        items: ['Active development', 'Real deployed systems', 'Continuous iteration'],
      },
      footer: {
        brand: 'BYTE <span class="accent">WIZZARD</span>',
        tagline: 'AI & Software Systems Studio',
        builtBy: 'Built by MatÃ­as Bagnasco â€” AI Systems Developer',
        copyright: 'Â© 2026 Byte Wizzard â€” Real products. Real systems.',
      },

      // â”€â”€â”€ COURIER DEMO â”€â”€â”€
      courierDemo: {
        header: { title: 'ðŸšš Courier TMS', subtitle: 'Route Optimizer Demo â€” enter addresses or upload a CSV, and watch the route optimize automatically.' },
        back: 'â† Back to Byte Wizzard',
        step1: 'Enter addresses or <strong>upload a CSV</strong>',
        step2: 'Geocode + optimize route (TSP)',
        step3: 'View it on the map with optimal order',
        tabs: ['Enter addresses', 'Upload CSV', 'Optimized route ðŸ—ºï¸'],
        inputTitle: 'ðŸ“¦ Delivery Addresses',
        inputBadge: 'manual or CSV',
        csvLabel: '<strong>Upload CSV</strong> Drop a file or click to browse',
        origin: 'Origin',
        stop: 'Stop',
        addStop: '+ Add Stop',
        optimize: 'ðŸ—ºï¸ Optimize Route',
        clear: 'âœ• Clear',
        selectFile: 'Select CSV file',
        orDrag: 'or drag and drop here',
        csvHint: 'Columns: origin, destination, client, phone, weight, priority',
        loadSample: 'ðŸ”„ Load example',
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
        optimalRoute: 'ðŸ—ºï¸ Route Map',
        distance: 'Distance',
        mapPlaceholder: 'Enter addresses and click "Optimize Route"',
        mapHint: 'The optimized route will appear on the map with numbered stops',
        optimizedOrder: 'OPTIMIZED ORDER',
        showStops: 'ðŸ“‹ Show stop list',
        hideStops: 'ðŸ“‹ Hide stop list',
        workingBtn: 'â³ Working...',
        csvParseError: 'Invalid CSV format. Required columns: origin, destination',
        csvEmptyError: 'âš ï¸ CSV is empty or could not be parsed',
        csvNoAddrError: 'âš ï¸ Could not find address columns. Make sure your CSV has: address, street, city',
        csvLoaded: 'âœ… Loaded <span class="stat">{n}</span> addresses from CSV.',
        geoProgress: 'ðŸ“ Geocoding {i}/{n}: {addr}...',
        geoFailed: 'âš ï¸ Could not geocode enough addresses. Try adding "CABA" or a more specific location.',
        computingRoute: 'ðŸ§  Computing optimal route with Nearest-Neighbor TSP ({n} stops)...',
        fetchingRoute: 'ðŸ“ Route computed. Fetching driving geometry from OSRM...',
        noRoute: 'âš ï¸ Could not get driving route. Showing optimized order without map.',
        error: 'âŒ Error: {msg}',
        routeOptimized: 'âœ… Route <strong>optimized</strong> (Nearest-Neighbor TSP) â€” each stop is the closest unvisited',
        distanceLabel: 'Total Distance (km)',
        timeLabel: 'Est. Time (min)',
        stopsLabel: 'Stops',
      },

      // â”€â”€â”€ HERMES DEMO â”€â”€â”€
      hermesDemo: {
        header: { name: 'Hermes', status: 'Byte Wizzard â€” Chat Assistant' },
        backLink: 'â† Back',
        inputPlaceholder: 'Ask Hermes anything...',
        sendBtn: 'Send',
        greeting: 'Hey there! I\'m <strong>Hermes</strong> âš¡, Byte Wizzard\'s messenger.<br><br>I\'m here to tell you everything you want to know about the studio â€” our products, how we think, the tech we use, the vision. No fluff, just real answers.<br><br>Here are some ideas to get started:<br>â€¢ <em>"What is Byte Wizzard?"</em><br>â€¢ <em>"Tell me about OmniConnect"</em><br>â€¢ <em>"What tech stack do you use?"</em><br>â€¢ <em>"What KPIs does OmniConnect have?"</em>',
        fallback: 'I don\'t have specific info on that topic, but I can tell you all about any of these in detail:<br><br>â€¢ <strong>Byte Wizzard</strong> â€” what the studio is, our vision, what we\'re building<br>â€¢ <strong>Hermes</strong> â€” how I work, persistent memory, email drafting and more<br>â€¢ <strong>Luna</strong> â€” AI Business Assistant with memory and context<br>â€¢ <strong>OmniConnect</strong> â€” call center intelligence platform with 19 KPIs and 3 profiles<br>â€¢ <strong>Courier TMS</strong> â€” clustering, geocoding, CSV import, driver app<br>â€¢ <strong>RolePlay Chat</strong> â€” call center digital simulation for applicants<br>â€¢ <strong>Profe MÃ¡gico</strong> â€” AI education from kids to university level<br>â€¢ <strong>ClipCraft</strong> â€” multimedia content creation platform (future project)<br>â€¢ <strong>Stack</strong> â€” the technologies we build with<br>â€¢ <strong>The Founder</strong> â€” MatÃ­as Bagnasco, his background and certifications<br>â€¢ <strong>Reviews</strong> â€” why they matter and how to leave yours<br>â€¢ <strong>Vision</strong> â€” where we\'re headed and why<br><br>What would you like to know about?',
        suggestions: ['What is Byte Wizzard?', 'Tell me about OmniConnect', 'What KPIs does OmniConnect have?', 'What tech stack do you use?'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'studio', 'company', 'who is', 'who are', 'what is', 'about', 'ai systems studio', 'systems studio', 'tools', 'coming'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> is an AI Systems Studio â€” but let me tell you what that actually means.<br><br><strong>Who we are:</strong><br>We\'re a team with deep experience in complex systems, artificial intelligence, and full-stack development. We\'re not a traditional agency that outsources everything, nor an academic project stuck in theory. We build <strong>functional products that people use every day</strong>.<br><br><strong>What we\'re about:</strong><br>Our mission is straightforward: <strong>reduce manual work through intelligent systems</strong>. We believe technology should free people from repetitive tasks so they can focus on what actually matters. Every product we build aims to automate real operational processes in business, logistics, education, and customer service.<br><br><strong>What we\'re building:</strong><br>Today we have products running in four areas:<br><br>â€¢ <strong>AI Assistants</strong> â€” chatbots with persistent memory, email drafting, task automation<br>â€¢ <strong>Smart Logistics</strong> â€” route optimization, geographic clustering, GPS tracking<br>â€¢ <strong>Adaptive Education</strong> â€” learning platforms powered by AI that adjust to each student\'s pace<br>â€¢ <strong>Digital Simulation</strong> â€” roleplay tools for call centers and team training<br><br><strong>What\'s next:</strong><br>We\'re constantly building. Beyond what you see today, there are more tools on the way. Keep an eye out â€” we\'re always cooking something new.<br><br>Our philosophy: <em>"We don\'t build ideas. We build working systems." â€” "No construimos ideas. Construimos sistemas que funcionan."</em> Everything here is real code, running, solving real problems.' },
          { id: 'what-we-do', keywords: ['do', 'products', 'services', 'develop', 'create', 'offer', 'field', 'work on', 'build'], label: 'What We Do', response: 'We build <strong>complete systems</strong>, not just pretty frontends. Here\'s the breakdown:<br><br><strong>ðŸ§  AI-Powered Systems</strong><br>From virtual assistants with persistent memory to machine learning applications. All integrated into products that actually get used.<br><br><strong>âš™ï¸ Process Automation</strong><br>If there\'s a repetitive task eating up your time, we can probably automate it. We analyze the flow, design the solution, and implement it.<br><br><strong>ðŸšš Smart Logistics</strong><br>Route optimization, delivery clustering, real-time tracking. For delivery companies that want to stop doing everything by hand.<br><br><strong>ðŸŽ“ Educational Platforms</strong><br>AI-powered learning experiences that adapt to each student\'s pace. Auto-translation, dynamic exercise generation, integrated audio.<br><br><strong>ðŸ“± Full-Stack Mobile Apps</strong><br>Built with React Native and Expo â€” from driver apps to client-facing interfaces.<br><br><strong>â˜ï¸ Cloud & Edge Computing</strong><br>Running on Cloudflare Workers, Node.js, Fastify. Scalable from day one without infrastructure headaches.' },
          { id: 'luna', keywords: ['luna', 'assistant', 'business', 'chat', 'bot', 'intelligent', 'ai assistant', 'virtual', 'enterprise'], label: 'Luna', response: '<strong>Luna</strong> is an AI Business Assistant â€” an intelligent assistant with persistent memory and business context, built for call center and customer service environments.<br><br><strong>What makes it special?</strong><br>Luna is not your average chatbot that forgets everything after each conversation. It has <strong>per-user and per-session memory</strong>, meaning it remembers who you are, what you talked about before, and can pick up right where you left off.<br><br><strong>Key capabilities:</strong><br>â€¢ <strong>Real-time AI chat</strong> â€” natural language responses with speed and accuracy<br>â€¢ <strong>Persistent memory</strong> â€” remembers past conversations and customer context<br>â€¢ <strong>Automatic email drafting</strong> â€” give it an idea and it\'ll write a professional email ready to send<br>â€¢ <strong>Internal support</strong> â€” perfect for back-office teams that need constant assistance<br>â€¢ <strong>Task automation</strong> â€” from database queries to report generation<br><br><strong>ðŸ’° Status:</strong> real product in production with an active client. Not a prototype or MVP â€” it\'s running live.' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'assistant', 'chat', 'messenger', 'how', 'works', 'memory', 'email', 'luna', 'version'], label: 'Hermes', response: 'That\'s me! <strong>Hermes</strong> âš¡ â€” Byte Wizzard\'s digital messenger.<br><br>Here\'s the thing: Hermes is a <strong>version of Luna</strong>, our AI Business Assistant. I\'m basically Luna, but adapted specifically to be the studio\'s front-facing assistant on the landing page. Same engine, same intelligence, same persistent memory capabilities.<br><br><strong>How do I work?</strong><br>I\'m not your average chatbot. I\'m built on an AI system with <strong>persistent memory</strong> â€” I retain context, remember what we talked about, and can hold coherent conversations without losing the thread. Every interaction is processed through language models that understand intent, nuance, and can generate natural responses.<br><br><strong>What I can do:</strong><br>â€¢ <strong>Real-time AI chat</strong> â€” fluid conversations in natural language<br>â€¢ <strong>Persistent memory</strong> â€” I remember who you are and what we discussed<br>â€¢ <strong>Email drafting</strong> â€” give me an idea and I\'ll turn it into a formal, professional email. For example: "I need to request a quote for a tracking system" and I\'ll write the full email with greeting, body, and sign-off.<br>â€¢ <strong>Complete studio knowledge</strong> â€” products, stack, vision, team<br>â€¢ <strong>Task automation</strong> â€” from inquiries to content generation<br><br><em>Status: live â€” integrated into the landing page as the studio\'s main assistant.</em>' },
          { id: 'roleplay', keywords: ['roleplay', 'role play', 'roleplay chat', 'call center', 'simulation', 'digital', 'candidates', 'training', 'simulator', 'contact center'], label: 'RolePlay Chat', response: '<strong>RolePlay Chat</strong> is a digital interaction simulator for call centers, specifically designed for the <strong>digital channel</strong> â€” chat, WhatsApp, social media â€” which is the heart of any modern contact center operation.<br><br><strong>What is it for?</strong><br>Imagine you\'re running a recruitment process and you need to evaluate how an applicant handles a real digital interaction. Or you\'re training your team and need realistic scenarios to practice. That\'s exactly what RolePlay Chat does.<br><br><strong>Available scenarios:</strong><br>â€¢ <strong>ðŸ“¦ Order claim</strong> â€” customer who didn\'t receive their purchase, tracking and follow-up<br>â€¢ <strong>ðŸ’» Technical support</strong> â€” login issues, account recovery, incident resolution<br>â€¢ <strong>ðŸ’° Billing inquiry</strong> â€” duplicate charges, refund requests, dispute management<br>â€¢ <strong>ðŸ›’ Consultative sales</strong> â€” personalized attention, needs identification, closing<br>â€¢ <strong>ðŸ’¬ WhatsApp interaction</strong> â€” hours, branches, shipping â€” typical daily queries<br><br><strong>How does it work?</strong><br>It\'s 100% frontend â€” no backend, no server needed. Load a scenario and the simulation plays out the full conversation between agent and client. After the simulation, you can keep typing freely from either panel to explore different responses.<br><br><em>Status: functional interactive demo â€” use it for training, recruitment, or just to showcase digital interaction handling.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'routes', 'delivery', 'optimization', 'tsp', 'tracking', 'gps', 'drivers', 'transport', 'fleet', 'geocoding', 'excel', 'import', 'export', 'driver', 'csv'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> is our logistics intelligence system â€” a full Transportation Management System built for delivery companies managing dozens or hundreds of daily shipments.<br><br><strong>What problem does it solve?</strong><br>Managing 50, 100, or 500 deliveries a day with Excel and WhatsApp is simply unsustainable. Courier TMS automates the entire process: from importing orders to route optimization to driver completion and reporting.<br><br><strong>Features in detail:</strong><br><br>â€¢ <strong>Smart zone clustering</strong> â€” the system takes all orders, analyzes geographic coordinates, and automatically groups them by zone. Not just by neighborhood â€” true geographic clustering. With 80 deliveries for 5 drivers, it tells you exactly which orders each driver gets.<br><br>â€¢ <strong>Automatic geocoding</strong> â€” upload addresses and the system converts them to coordinates (lat/lng) using Nominatim + OSRM. No manual map pinning required.<br><br>â€¢ <strong>Bulk CSV/Excel import</strong> â€” download the template, fill in your orders, import the file. Seconds later everything is loaded, with row-level validation and error detection.<br><br>â€¢ <strong>Excel export</strong> â€” when orders are completed, export everything to Excel with one click. Perfect for reports, accounting, and auditing.<br><br>â€¢ <strong>Driver app</strong> â€” each driver gets a mobile interface with real-time GPS tracking, step-by-step navigation, delivery confirmation, and notifications. The admin sees where every driver is, live.<br><br>â€¢ <strong>Complete admin dashboard</strong> â€” interactive map, real-time metrics, full history, fleet control.<br><br><em>Status: active development + <a href="../courier-tms/index.html" style="color:#00aaff">functional order clustering demo</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'multimedia', 'video', 'photo', 'editing', 'mobile', 'creation', 'editing'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> is a project on our roadmap â€” a mobile platform for multimedia content creation.<br><br><strong>The vision:</strong><br>Picture an app where you can edit photos and videos, generate automatic clips with integrated music, render everything in the cloud, and export directly to your device. No PC needed, no heavy software, no complications.<br><br><strong>What we\'re planning:</strong><br>â€¢ Photo and video editing from your phone<br>â€¢ Automatic video generation with smart templates<br>â€¢ Integrated music library<br>â€¢ Cloud rendering â€” heavy processing on the server side<br>â€¢ Direct export to device or social media<br><br><strong>ðŸ’° Status:</strong> future project â€” internal MVP in development. Not ready for show yet, but we\'re working on it.' },
          { id: 'profe', keywords: ['profe', 'magico', 'magic', 'education', 'learning', 'english', 'children', 'kids', 'teaching', 'school', 'translator', 'university', 'advanced'], label: 'Profe MÃ¡gico', response: '<strong>Profe MÃ¡gico</strong> is an AI-powered educational platform, originally designed to help kids learn English in a fun, interactive way.<br><br><strong>What makes it special?</strong><br>It started as a children\'s tool â€” colorful characters, simple explanations, lots of audio for pronunciation practice. But here\'s the thing: it\'s built on powerful language models, so if you give it something <strong>complex, university-level, or technical</strong>, it handles that too.<br><br>You can use it both for an 8-year-old practicing "hello, how are you?" and for asking advanced grammar explanations or technical translations. It\'s not a technical limitation â€” it\'s a matter of how you present the request.<br><br><strong>Features:</strong><br>â€¢ <strong>Interactive AI teaching</strong> â€” converses, corrects pronunciation, guides the student<br>â€¢ <strong>Auto translation and audio</strong> â€” listening, repetition, auditory comprehension<br>â€¢ <strong>Content adapted to level</strong> â€” from "colors and numbers" to "present perfect vs past simple"<br>â€¢ <strong>AI-generated dynamic exercises</strong> â€” never repeated, always fresh<br>â€¢ <strong>Guided learning with virtual teacher</strong> â€” accompanies the entire process step by step<br><br><em>Status: live and constantly iterating. Accessible from any browser.</em>' },
          { id: 'OmniConnect', keywords: ['OmniConnect', 'omni', 'hub', 'call center', 'contact center', 'dashboard', 'kpi', 'tmo', 'dengo', 'profiles', 'admin', 'supervisor', 'operator', 'role', 'agent', 'interaction', 'websocket', 'real-time', 'omnichannel'], label: 'OmniConnect', response: '<strong>OmniConnect</strong> is an omnichannel call center management platform, built from scratch with <strong>Node.js + SQLite</strong>. Not a demo or prototype â€” it\'s a working system with 19 KPIs modeled from <strong>Dengo</strong> (the Power BI dashboard used at Rossi with 200+ agents).<br><br><strong>What makes it unique?</strong><br>OmniConnect replicates Dengo\'s exact KPIs â€” TMO, Erlang occupation, utilization, conversion, NDA, ACW, GPH, SPH â€” in its own system with real-time WebSockets, dynamic filters, and differentiated profiles.<br><br><strong>Profiles:</strong><br>â€¢ <strong>ðŸ‘‘ Admin</strong> â€” Global dashboard with all KPIs, user/campaign/team management, exportable reports. 360Â° contact center view.<br>â€¢ <strong>ðŸ” Supervisor</strong> â€” Team monitoring, per-agent KPIs, SLA alerts and performance. Perfect for Team Leaders.<br>â€¢ <strong>ðŸŽ§ Operator</strong> â€” Unified omnichannel inbox (WhatsApp, email, phone), live attention, personal history and metrics.<br><br><strong>Real data:</strong> Currently managing 631 interactions and 2985 status events in SQLite WAL. KPIs are calculated in pure SQL with window functions and served via REST + WebSocket.<br><br><em>Status: WORKING SYSTEM â€” functional, connected to a real backend, production-ready.</em>' },
          { id: 'vision', keywords: ['vision', 'goal', 'mission', 'purpose', 'future', 'aim', 'where', 'headed'], label: 'Vision', response: 'Our vision is simple but powerful: <strong>reduce manual work through intelligent systems</strong>.<br><br>We believe technology shouldn\'t be another complication â€” it should be the tool that frees you from repetitive tasks so you can focus on what matters.<br><br>We don\'t build features for the sake of it. Every line of code we write is meant to <strong>solve a real problem</strong> someone faces every day.<br><br>We focus on four areas where automation has the most impact:<br><br>â€¢ <strong>Business</strong> â€” operations, customer service, internal management<br>â€¢ <strong>Logistics</strong> â€” routes, deliveries, tracking, resource optimization<br>â€¢ <strong>Education</strong> â€” adaptive learning, dynamic content generation<br>â€¢ <strong>Content creation</strong> â€” editing, rendering, automated publishing<br><br><em>"We don\'t build ideas. We build working systems." â€” "No construimos ideas. Construimos sistemas que funcionan."</em>' },
          { id: 'differential', keywords: ['difference', 'different', 'unique', 'value', 'why', 'advantage', 'special', 'choose'], label: 'Differential', response: 'Let me be real with you: the software world is full of people selling nice-looking pages and promising the moon. We\'re not that.<br><br><strong>What sets us apart:</strong><br><br>â€¢ <strong>We build complete systems</strong> â€” not just pretty frontends. Every product has a backend, database, APIs, integrations, and when it makes sense, real working AI.<br><br>â€¢ <strong>Real operations focus</strong> â€” we don\'t build for investor pitches, we build for someone to use every day and have their work life improved.<br><br>â€¢ <strong>Modern, efficient stack</strong> â€” Cloudflare Workers, Node.js, React, React Native. No outdated tech because "that\'s how it\'s always been done."<br><br>â€¢ <strong>Small team, big solutions</strong> â€” a lean team with deep expertise in complex systems: logistics, call centers, education, applied AI.<br><br>â€¢ <strong>Made in Paraguay, global vision</strong> â€” our products compete with any international solution, but we understand local and regional market needs.' },
          { id: 'stack', keywords: ['stack', 'technology', 'tech', 'tools', 'language', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'engine', 'backend', 'frontend', 'data engineering', 'data', 'analytics', 'processing', 'pipeline', 'etl', 'geospatial', 'algorithms', 'go', 'golang', 'python', 'architecture', 'infrastructure', 'cloud', 'edge', 'serverless', 'vanilla', 'optimization', 'performance', 'stack', 'tech stack', 'what do you use', 'what stack', 'languages', 'programming', 'tools', 'infra'], label: 'Tech Stack', response: '<strong>Byte Wizzard Tech Stack:</strong><br><br>Let me walk you through what we actually use across the studio. No fluff, no logos we haven\'t touched. These are the real technologies powering our products day to day.<br><br>â˜ï¸ <strong>Cloudflare Workers â€” Real Edge Computing</strong><br>Globally distributed serverless APIs with Workers + KV for key-value storage. Code runs at the edge, closest to the user, not in a centralized datacenter. Deploy with <strong>Wrangler CLI</strong>. Zero servers to manage, global scale out of the box.<br><br>ðŸŸ¢ <strong>Node.js â€” Robust Backend</strong><br><strong>Express</strong> and <strong>Fastify</strong> for REST APIs. Lightweight, fast, no overengineering. Production services running on Node â€” we pick the right tool for each job.<br><br>âš›ï¸ <strong>Smart Frontend: Vanilla JS + React + Leaflet</strong><br>We lead with <strong>vanilla JavaScript (ES6+)</strong> â€” zero bundlers, zero transpilation, zero overhead. Landing pages and demos are 100% vanilla because not everything needs a framework. For complex apps, we use <strong>React + Vite</strong>. For interactive logistics maps, <strong>Leaflet.js 1.9.4</strong> with <strong>OpenStreetMap</strong> tiles. Typography: <strong>JetBrains Mono</strong> + <strong>Inter</strong> from Google Fonts.<br><br>ðŸ—„ï¸ <strong>Databases: SQLite + Cloudflare KV</strong><br>SQLite in <strong>WAL mode</strong> (Write-Ahead Logging) for high concurrent read performance â€” the world\'s most deployed database, configured the right way. Cloudflare KV for distributed edge data. We choose based on the problem: local persistence vs. global distribution.<br><br>ðŸ§  <strong>AI â€” Production Models</strong><br>Integration with <strong>Llama 3</strong> (Meta\'s open-source model), <strong>Workers AI</strong>, and external AI APIs. Natural language processing, content generation, intelligent automation. Our assistants have persistent memory and session context.<br><br>ðŸ“Š <strong>Data Engineering & Geospatial</strong><br>This is a key differentiator. We run real data pipelines:<br><br>â€¢ <strong>Geocoding</strong> with Nominatim (OpenStreetMap) â€” addresses to coordinates with high precision<br>â€¢ <strong>Route optimization</strong> with OSRM â€” Nearest-Neighbor TSP algorithm for optimal delivery routes<br>â€¢ <strong>Geospatial data processing</strong> â€” GeoJSON, route geometries, geographic clustering, zone analysis<br>â€¢ <strong>Data pipelines</strong> â€” CSV transformation, logistics data structures, bulk import systems<br>â€¢ <strong>Combinatorial optimization</strong> â€” applied algorithms solving real-world routing and delivery problems<br><br>âš™ï¸ <strong>Systems Languages: Go & Python</strong><br><strong>Go (Golang)</strong> for performance-critical code â€” TSP solvers, CLI tools, concurrent data processing. <strong>Python</strong> for data analysis, scripting, and exploration notebooks. We don\'t marry a single language â€” we use what solves the problem best.<br><br>ðŸ“¦ <strong>Infrastructure & Deploy</strong><br>â€¢ <strong>Render.com</strong> â€” hosting Express APIs and frontends<br>â€¢ <strong>Cloudflare Pages</strong> â€” landing pages and static content<br>â€¢ <strong>Wrangler CLI</strong> â€” Worker deployments from the terminal<br>â€¢ No bloated CI/CD â€” simple, direct deploy without unnecessary layers<br><br>ðŸ—ï¸ <strong>Architecture Philosophy</strong><br>We don\'t use tech because it\'s trendy. Every decision has a reason:<br><br>â€¢ Vanilla JS where a framework would be overkill (most landing pages and demos)<br>â€¢ No unnecessary build step â€” what you write is what runs<br>â€¢ Edge computing where global speed matters<br>â€¢ SQLite because for many use cases it\'s faster and simpler than a massive PostgreSQL<br>â€¢ Frameworks only when the problem justifies them (React for complex apps, not for a form)<br><br><em>"Modern tools, conscious decisions, zero fluff."</em>' },
          { id: 'status', keywords: ['status', 'progress', 'active', 'development', 'stage', 'phase', 'alpha', 'beta', 'launch', 'release', 'right now'], label: 'Project Status', response: 'Byte Wizzard is in <strong>active development</strong>. This means we have products running in production today, while we keep building and iterating.<br><br><strong>Right now:</strong><br>â€¢ <strong>Luna</strong> â€” live with a real client, in daily use<br>â€¢ <strong>Profe MÃ¡gico</strong> â€” live, accessible from any browser, constantly improving<br>â€¢ <strong>Courier TMS</strong> â€” active development with working demo, adding features regularly<br>â€¢ <strong>Hermes</strong> â€” right here on the landing page, the studio\'s main assistant<br>â€¢ <strong>RolePlay Chat</strong> â€” interactive demo running, ready to showcase<br>â€¢ <strong>OmniConnect</strong> â€” omnichannel call center platform, WORKING SYSTEM with 19 KPIs and 3 profiles<br>â€¢ <strong>ClipCraft</strong> â€” future project, internal MVP in development<br><br>We don\'t announce products that don\'t exist yet. Everything you see has working code behind it.' },
          { id: 'ceo', keywords: ['ceo', 'founder', 'owner', 'creator', 'matias', 'matÃ­as', 'bagnasco', 'who created', 'who founded', 'behind', 'head', 'argentinian', 'paraguay'], label: 'The Founder', response: 'The creator and head of Byte Wizzard is <strong>MatÃ­as AndrÃ©s Bagnasco</strong>.<br><br><strong>Details:</strong><br>â€¢ <strong>Full name:</strong> MatÃ­as AndrÃ©s Bagnasco<br>â€¢ <strong>Age:</strong> 37 years old<br>â€¢ <strong>Nationality:</strong> Argentine<br>â€¢ <strong>Residence:</strong> Paraguay<br><br><strong>Certifications & expertise:</strong><br>â€¢ Certified in Artificial Intelligence and AI Programming<br>â€¢ Certified in ISO SQL Security<br>â€¢ Certified in ISO Security<br>â€¢ Specialized in complex systems, automation, and full-stack development<br>â€¢ Extensive experience in call centers, logistics, and digital operations<br><br>MatÃ­as is the principal architect behind every Byte Wizzard product â€” from system architecture to user experience design. His background in call centers and operations is what shapes products like Hermes, Courier TMS, and RolePlay Chat, which are built from real operational reality, not theory.<br><br>He currently resides in Paraguay, where he continues to build and expand the studio with a clear vision: intelligent systems that solve real problems.' },
          { id: 'reviews', keywords: ['reviews', 'review', 'opinions', 'testimonials', 'feedback', 'comments', 'rating'], label: 'Reviews', response: 'Reviews are <strong>really important to us</strong>. Not just because they help us improve, but because every piece of feedback is an opportunity to understand what we\'re doing right and where we can grow.<br><br>At Byte Wizzard we believe in continuous improvement and building products that genuinely serve people. That\'s why every review â€” good or bad â€” we take as valuable input to keep evolving.<br><br>If you\'ve tried any of our products or demos and want to leave your opinion, there\'s a form in the reviews section of this page. It takes two minutes and it means the world to us.<br><br><strong>Important:</strong> all reviews are published automatically as soon as you submit them â€” no filters, no censorship. We believe in transparency. The good and the bad get shown equally, because that\'s the only way we can truly improve.' },
          { id: 'contact', keywords: ['contact', 'talk', 'hire', 'quote', 'email', 'mail', 'phone', 'whatsapp', 'social', 'reach'], label: 'Contact', response: 'For now the best way to get to know Byte Wizzard is right here â€” exploring the products and demos on this page. Each demo gives you a clear idea of how we think and what we can build.<br><br>If after checking everything out you still have questions or want to chat about a project, write to us at: <strong>bytewizzards@gmail.com</strong>.<br><br>You can also follow along for more things we keep sharing â€” we\'re always building something new.' },
        ],
      },
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // PORTUGUÃŠS
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    pt: {
      nav: { products: 'Produtos', what: 'O Que Fazemos', vision: 'VisÃ£o', stack: 'Stack', status: 'Status', contact: 'Contato' },
      hero: {
        label: './byte-wizzard --whoami',
        title: 'BYTE<br><span class="accent">WIZZARD</span>',
        subtitle: 'Sistemas AI-first para automaÃ§Ã£o, logÃ­stica,<br>educaÃ§Ã£o e assistentes inteligentes.',
        btnProducts: 'Ver Produtos â†’',
        btnReviews: 'AvaliaÃ§Ãµes',
        btnContact: 'Contato',
        scroll: 'ROLAR â–¼',
        status: '6 produtos ativos Â· 4 demos Â· AI-first',
      },
      products: {
        title: 'Produtos',
        hermes: {
          icon: 'âš¡',
          name: 'Hermes',
          tagline: 'Assistente IA da Byte Wizzard',
          features: ['Conhecimento completo do estÃºdio', 'InformaÃ§Ãµes de produtos e demos', 'Stack tecnolÃ³gico e visÃ£o', 'Chat interativo ao vivo'],
          status: 'DEMO',
          link: 'â†’ Testar Bot Demo',
        },
        roleplay: {
          icon: 'ðŸŽ­',
          name: 'RolePlay Chat',
          tagline: 'SimulaÃ§Ã£o de Call Center Digital',
          features: ['SimulaÃ§Ã£o de atendimento digital', 'CenÃ¡rios: reclamaÃ§Ãµes, suporte, vendas', 'InteraÃ§Ã£o agente-cliente ao vivo', 'Treinamento para candidatos', 'Multi-canal (chat, WhatsApp)'],
          status: 'DEMO',
          link: 'â†’ Testar Demo',
        },
        courier: {
          icon: 'ðŸšš',
          name: 'Courier TMS',
          tagline: 'Sistema de InteligÃªncia LogÃ­stica',
          features: ['Agrupamento inteligente por zona', 'OtimizaÃ§Ã£o de rotas (TSP)', 'Tracking GPS em tempo real', 'App para entregadores', 'Painel administrativo completo', 'ImportaÃ§Ã£o de pedidos CSV'],
          status: 'EM DESENVOLVIMENTO',
          link: 'â†’ Testar Demo (em desenvolvimento)',
        },
        profe: {
          icon: 'ðŸ“š',
          name: 'Profe MÃ¡gico',
          tagline: 'Sistema de Aprendizagem com IA',
          features: ['Ensino interativo com IA', 'TraduÃ§Ã£o e Ã¡udio automÃ¡ticos', 'ConteÃºdo adaptado para crianÃ§as', 'ExercÃ­cios dinÃ¢micos', 'ExperiÃªncia educativa guiada'],
          status: 'LIVE',
          link: 'â†’ Visitar site',
        },
        OmniConnect: {
          icon: '🌐',
          name: 'OmniConnect',
          tagline: 'Plataforma de Inteligência para Call Center',
          features: ['19 KPIs modelados a partir do Dengo', '3 perfis: Admin, Supervisor, Operador', 'Dashboards em tempo real com WebSocket', 'Gestão omnichannel (WhatsApp, email, phone)', 'Autenticação JWT + funções RBAC', 'Validação de entrada, paginação, rate limiting', 'Cache inteligente + invalidação por WebSocket', 'Timeouts configuráveis + slow query logging', 'Backup automático SQLite com retenção', 'Deploy: Docker, PM2 ou systemd'],
          status: 'EM DESENVOLVIMENTO',
          link: 'Node.js · Express · SQLite WAL · WebSocket · JWT',
        },
      },
      comingSoon: {
        title: 'Em Breve',
        clipcraft: {
          icon: 'ðŸ“±',
          name: 'ClipCraft',
          tagline: 'Centro MultimÃ­dia Mobile',
          status: 'MVP Interno',
          features: ['Plataforma de criaÃ§Ã£o de conteÃºdo multimÃ­dia', 'EdiÃ§Ã£o de fotos e vÃ­deos', 'GeraÃ§Ã£o automÃ¡tica de vÃ­deos'],
        },
      },
      wwd: {
        title: 'O Que Fazemos',
        items: [
          { emoji: 'ðŸ§ ', label: 'Sistemas de IA', desc: 'AutomaÃ§Ã£o inteligente para processos reais' },
          { emoji: 'âš™ï¸', label: 'AutomaÃ§Ã£o', desc: 'Reduza o trabalho manual com fluxos inteligentes' },
          { emoji: 'ðŸš›', label: 'LogÃ­stica', desc: 'OtimizaÃ§Ã£o de rotas e rastreamento ao vivo' },
          { emoji: 'ðŸŽ“', label: 'EducaÃ§Ã£o', desc: 'ExperiÃªncias de aprendizado com IA' },
          { emoji: 'ðŸ“±', label: 'Mobile', desc: 'Apps com React Native e Expo' },
          { emoji: 'â˜ï¸', label: 'Cloud', desc: 'Cloudflare Workers e edge computing' },
        ],
      },
      vision: {
        title: 'VisÃ£o',
        motto: 'â€œNÃ£o construÃ­mos ideias. <span class="highlight">ConstruÃ­mos sistemas funcionais.</span>â€',
        quote: 'Reduzir o trabalho manual atravÃ©s de sistemas inteligentes<br>que automatizam <strong>operaÃ§Ãµes reais</strong> em empresas,<br>logÃ­stica e educaÃ§Ã£o.',
      },

      // â”€â”€â”€ REVIEWS â”€â”€â”€
      reviews: {
        title: 'AvaliaÃ§Ãµes',
        formTitle: 'Deixe sua avaliaÃ§Ã£o',
        nameLabel: 'Seu nome',
        productLabel: 'Produto',
        ratingLabel: 'AvaliaÃ§Ã£o',
        textLabel: 'Sua experiÃªncia',
        submit: 'Enviar avaliaÃ§Ã£o',
        sending: 'Enviando...',
        success: 'Obrigado! Sua avaliaÃ§Ã£o serÃ¡ publicada apÃ³s revisÃ£o.',
        error: 'Erro ao enviar. Tente novamente.',
        errorShort: 'O texto deve ter pelo menos 10 caracteres.',
        loading: 'Carregando avaliaÃ§Ãµes...',
        empty: 'Nenhuma avaliaÃ§Ã£o ainda. Seja o primeiro!',
        products: {
          hermes: 'Hermes - AI Assistant',
          courier: 'Courier TMS',
          profe: 'Profe MÃ¡gico',
          clipcraft: 'ClipCraft',
          OmniConnect: 'OmniConnect - Plataforma de Call Center',
        },
        items: [
          {
            text: 'Gostei muito do tradutor, principalmente porque tem Ã¡udios de tudo, estÃ¡ muito bonito.',
            author: 'Johana',
            product: 'profe',
            rating: 5,
            date: 'Jun 2026',
          },
          {
            text: 'Me interessa muito, quando vai estar disponÃ­vel?',
            author: 'Maria',
            product: 'clipcraft',
            rating: 3,
            date: 'Jun 2026',
          },
        ],
      },

      stack: {
        title: 'Stack',
        tags: ['Cloudflare Workers', 'Node.js', 'Express', 'Fastify', 'React', 'Vite', 'React Native', 'Expo', 'Llama 3', 'OpenStreetMap', 'OSRM', 'Nominatim', 'Leaflet', 'SQLite', 'Vanilla JS', 'Go', 'Python', 'Edge Computing', 'Data Engineering', 'Prisma', 'PostgreSQL'],
      },
      status: {
        title: 'Status',
        items: ['Desenvolvimento ativo', 'Sistemas reais implantados', 'IteraÃ§Ã£o contÃ­nua'],
      },
      footer: {
        brand: 'BYTE <span class="accent">WIZZARD</span>',
        tagline: 'EstÃºdio de Sistemas IA & Software',
        builtBy: 'Built by MatÃ­as Bagnasco â€” AI Systems Developer',
        copyright: 'Â© 2026 Byte Wizzard â€” Produtos reais. Sistemas reais.',
      },

      // â”€â”€â”€ COURIER DEMO â”€â”€â”€
      courierDemo: {
        header: { title: 'ðŸšš Courier TMS', subtitle: 'Route Optimizer Demo â€” insira endereÃ§os ou carregue um CSV, e veja a rota ser otimizada automaticamente.' },
        back: 'â† Voltar para Byte Wizzard',
        step1: 'Insira endereÃ§os ou <strong>carregue um CSV</strong>',
        step2: 'Geocodificamos + otimizamos a rota (TSP)',
        step3: 'Visualize no mapa com a ordem Ã³tima',
        tabs: ['Inserir endereÃ§os', 'Carregar CSV', 'Rota otimizada ðŸ—ºï¸'],
        inputTitle: 'ðŸ“¦ EndereÃ§os de Entrega',
        inputBadge: 'manual ou CSV',
        csvLabel: '<strong>Upload CSV</strong> Arraste um arquivo ou clique para procurar',
        origin: 'Origem',
        stop: 'Parada',
        addStop: '+ Adicionar Parada',
        optimize: 'ðŸ—ºï¸ Otimizar Rota',
        clear: 'âœ• Limpar',
        selectFile: 'Selecionar arquivo CSV',
        orDrag: 'ou arraste e solte aqui',
        csvHint: 'Colunas: origem, destino, cliente, telefone, peso, prioridade',
        loadSample: 'ðŸ”„ Carregar exemplo',
        totalDistance: 'DistÃ¢ncia total',
        estimatedTime: 'Tempo estimado',
        stops: 'Paradas',
        noStops: 'Adicione pelo menos 2 endereÃ§os para otimizar.',
        geocoding: 'Geocodificando endereÃ§os...',
        optimizing: 'Otimizando rota...',
        from: 'De',
        to: 'Para',
        km: 'km',
        min: 'min',
        optimalRoute: 'ðŸ—ºï¸ Mapa da Rota',
        distance: 'DistÃ¢ncia',
        mapPlaceholder: 'Insira endereÃ§os e clique em "Otimizar Rota"',
        mapHint: 'A rota otimizada aparecerÃ¡ no mapa com paradas numeradas',
        optimizedOrder: 'ORDEM OTIMIZADA',
        showStops: 'ðŸ“‹ Mostrar lista de paradas',
        hideStops: 'ðŸ“‹ Ocultar lista de paradas',
        workingBtn: 'â³ Trabalhando...',
        csvParseError: 'Formato CSV invÃ¡lido. Colunas obrigatÃ³rias: origem, destino',
        csvEmptyError: 'âš ï¸ CSV estÃ¡ vazio ou nÃ£o pÃ´de ser parseado',
        csvNoAddrError: 'âš ï¸ NÃ£o foram encontradas colunas de endereÃ§o. Certifique-se de que o CSV tenha: address, street, city',
        csvLoaded: 'âœ… Carregadas <span class="stat">{n}</span> endereÃ§os do CSV.',
        geoProgress: 'ðŸ“ Geocodificando {i}/{n}: {addr}...',
        geoFailed: 'âš ï¸ NÃ£o foi possÃ­vel geocodificar endereÃ§os suficientes. Tente adicionar "CABA" ou uma localizaÃ§Ã£o mais especÃ­fica.',
        computingRoute: 'ðŸ§  Calculando rota Ã³tima com Nearest-Neighbor TSP ({n} paradas)...',
        fetchingRoute: 'ðŸ“ Rota calculada. Obtendo geometria da rota do OSRM...',
        noRoute: 'âš ï¸ NÃ£o foi possÃ­vel obter a rota de direÃ§Ã£o. Mostrando ordem otimizada sem mapa.',
        error: 'âŒ Erro: {msg}',
        routeOptimized: 'âœ… Rota <strong>otimizada</strong> (Nearest-Neighbor TSP) â€” cada parada Ã© a nÃ£o visitada mais prÃ³xima',
        distanceLabel: 'DistÃ¢ncia total (km)',
        timeLabel: 'Tempo estimado (min)',
        stopsLabel: 'Paradas',
      },

      // â”€â”€â”€ HERMES DEMO â”€â”€â”€
      hermesDemo: {
        header: { name: 'Hermes', status: 'Byte Wizzard â€” Bot de DemonstraÃ§Ã£o' },
        backLink: 'â† Voltar',
        inputPlaceholder: 'Pergunte sobre a Byte Wizzard...',
        sendBtn: 'Enviar',
        greeting: 'OlÃ¡! Sou o <strong>Hermes</strong>, o mensageiro da Byte Wizzard. âš¡<br><br>Pergunte-me o que quiser sobre o estÃºdio, nossos produtos, o stack tecnolÃ³gico ou a visÃ£o.<br><br>Por exemplo:<br>â€¢ <em>"O que Ã© Byte Wizzard?"</em><br>â€¢ <em>"Fale sobre Courier TMS"</em><br>â€¢ <em>"Qual stack vocÃªs usam?"</em>',
        fallback: 'NÃ£o tenho informaÃ§Ãµes especÃ­ficas sobre isso, mas posso falar sobre:<br><br>â€¢ <strong>Byte Wizzard</strong> â€” o que Ã© o estÃºdio<br>â€¢ <strong>Luna</strong> â€” AI Business Assistant<br>â€¢ <strong>Hermes</strong> â€” Bot de DemonstraÃ§Ã£o<br>â€¢ <strong>Courier TMS</strong> â€” Logistics Intelligence<br>â€¢ <strong>RolePlay Chat</strong> â€” Call Center Digital<br>â€¢ <strong>ClipCraft</strong> â€” Content Creation<br>â€¢ <strong>Profe MÃ¡gico</strong> â€” AI Learning<br>â€¢ <strong>Stack</strong> â€” tecnologias que usamos<br>â€¢ <strong>VisÃ£o</strong> â€” nossa abordagem<br><br>Sobre o que quer saber?',
        suggestions: ['O que Ã© Byte Wizzard?', 'Fale sobre Courier TMS', 'Qual stack usam?', 'O que Ã© RolePlay Chat?'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'estÃºdio', 'estudio', 'empresa', 'quem Ã©', 'quem e', 'quem sÃ£o', 'quem sao', 'o que Ã©', 'o que e', 'ai systems studio', 'systems studio', 'fazem'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> Ã© um AI Systems Studio.<br><br>ConstruÃ­mos produtos de software baseados em inteligÃªncia artificial, automaÃ§Ã£o e sistemas modernos para resolver problemas reais em empresas e usuÃ¡rios.<br><br>NÃ£o somos uma agÃªncia tradicional nem um projeto acadÃªmico. Somos um estÃºdio de construÃ§Ã£o de <strong>produtos funcionais</strong>.<br><br><em>"Construa sistemas AI-first para automaÃ§Ã£o, logÃ­stica, educaÃ§Ã£o e assistentes inteligentes."</em>' },
          { id: 'what-we-do', keywords: ['fazem', 'produtos', 'serviÃ§os', 'servicos', 'desenvolvem', 'criam', 'oferecem', 'ramo', 'trabalham'], label: 'O Que Fazemos', response: 'Projetamos e desenvolvemos:<br><br>â€¢ Sistemas de inteligÃªncia artificial aplicados<br>â€¢ Software de automaÃ§Ã£o de processos<br>â€¢ Ferramentas de logÃ­stica e otimizaÃ§Ã£o<br>â€¢ Plataformas educacionais com IA<br>â€¢ Aplicativos mÃ³veis e web full-stack<br>â€¢ IntegraÃ§Ãµes com cloud e edge computing' },
          { id: 'luna', keywords: ['luna', 'assistente', 'assistant', 'business', 'chat', 'bot', 'inteligente', 'ai assistant'], label: 'Luna', response: '<strong>Luna</strong> â€” AI Business Assistant<br><br>Assistente inteligente com memÃ³ria e contexto empresarial.<br><br><strong>FunÃ§Ãµes:</strong><br>â€¢ Chat com IA em tempo real<br>â€¢ MemÃ³ria por usuÃ¡rio e sessÃ£o<br>â€¢ RedaÃ§Ã£o automÃ¡tica de e-mails<br>â€¢ Suporte interno para empresas<br>â€¢ AutomaÃ§Ã£o de tarefas administrativas<br><br><em>Status: produto em uso real com cliente.</em>' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'assistente', 'chat', 'mensageiro'], label: 'Hermes', response: '<strong>Hermes</strong> â€” Byte Wizzard Bot de DemonstraÃ§Ã£o âš¡<br><br>Sou o assistente virtual do estÃºdio. Meu propÃ³sito Ã© contar sobre a Byte Wizzard, seus produtos, seu stack e sua visÃ£o.<br><br><em>Status: demonstraÃ§Ã£o funcional.</em>' },
          { id: 'roleplay', keywords: ['roleplay', 'role play', 'roleplay chat', 'call center', 'simulaÃ§Ã£o', 'simulacao', 'digital', 'candidatos', 'treinamento'], label: 'RolePlay Chat', response: '<strong>RolePlay Chat</strong> â€” SimulaÃ§Ã£o de Call Center Digital<br><br>Simulador de interaÃ§Ã£o digital para call centers.<br><br><strong>CenÃ¡rios:</strong><br>â€¢ ReclamaÃ§Ã£o de pedido<br>â€¢ Suporte tÃ©cnico<br>â€¢ Consulta de faturamento<br>â€¢ Venda consultiva<br>â€¢ InteraÃ§Ã£o WhatsApp<br><br><em>Status: demonstraÃ§Ã£o interativa.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'logÃ­stica', 'logistica', 'rotas', 'delivery', 'otimizaÃ§Ã£o', 'otimizacao', 'tsp', 'tracking', 'gps', 'entregadores', 'transporte'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> â€” Logistics Intelligence System<br><br>Sistema de otimizaÃ§Ã£o logÃ­stica para empresas de delivery.<br><br><strong>FunÃ§Ãµes:</strong><br>â€¢ Agrupamento de entregas por zona<br>â€¢ OtimizaÃ§Ã£o de rotas (TSP)<br>â€¢ Tracking GPS em tempo real<br>â€¢ Painel administrativo completo<br>â€¢ App para entregadores<br>â€¢ ImportaÃ§Ã£o de pedidos CSV<br><br><em>Status: desenvolvimento ativo + <a href="../courier-tms/index.html" style="color:#00aaff">demonstraÃ§Ã£o funcional</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'conteÃºdo', 'conteudo', 'multimÃ­dia', 'multimidia', 'video', 'foto', 'ediÃ§Ã£o', 'edicao', 'mobile', 'criaÃ§Ã£o', 'criacao'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> â€” Content Creation Platform<br><br>App mÃ³vel para criaÃ§Ã£o de conteÃºdo multimÃ­dia.<br><br><strong>FunÃ§Ãµes planejadas:</strong><br>â€¢ EdiÃ§Ã£o de fotos e vÃ­deos<br>â€¢ GeraÃ§Ã£o automÃ¡tica de vÃ­deos<br>â€¢ MÃºsica integrada<br>â€¢ Render na nuvem<br>â€¢ ExportaÃ§Ã£o direta para o dispositivo<br><br><em>Status: projeto futuro â€” MVP interno em desenvolvimento.</em>' },
          { id: 'profe', keywords: ['profe', 'mÃ¡gico', 'magico', 'educaÃ§Ã£o', 'educacao', 'aprendizagem', 'learning', 'inglÃªs', 'ingles', 'crianÃ§as', 'criancas', 'ensino', 'escola'], label: 'Profe MÃ¡gico', response: '<strong>Profe MÃ¡gico</strong> â€” AI Learning System<br><br>Plataforma educacional com inteligÃªncia artificial.<br><br><strong>FunÃ§Ãµes:</strong><br>â€¢ Ensino interativo de inglÃªs<br>â€¢ TraduÃ§Ã£o e Ã¡udio automÃ¡ticos<br>â€¢ ConteÃºdo adaptado para crianÃ§as<br>â€¢ ExercÃ­cios dinÃ¢micos<br>â€¢ Aprendizagem guiada<br><br><em>Status: funcional e em iteraÃ§Ã£o.</em>' },
          { id: 'OmniConnect', keywords: ['OmniConnect', 'omni', 'hub', 'call center', 'contact center', 'dashboard', 'kpi', 'tmo', 'dengo', 'perfis', 'admin', 'supervisor', 'operador', 'agente', 'interaÃ§Ã£o', 'websocket', 'tempo real', 'omnichannel'], label: 'OmniConnect', response: '<strong>OmniConnect</strong> Ã© uma plataforma de gestÃ£o de call centers omnichannel, construÃ­da do zero com <strong>Node.js + SQLite</strong>. NÃ£o Ã© um demo ou protÃ³tipo â€” Ã© um sistema funcional com 19 KPIs modelados a partir do <strong>Dengo</strong> (o dashboard Power BI usado na Rossi com 200+ agentes).<br><br><strong>O que o torna Ãºnico?</strong><br>O OmniConnect replica os KPIs exatos do Dengo â€” TMO, ocupaÃ§Ã£o Erlang, utilizaÃ§Ã£o, conversÃ£o, NDA, ACW, GPH, SPH â€” em um sistema prÃ³prio com WebSockets em tempo real, filtros dinÃ¢micos e perfis diferenciados.<br><br><strong>Perfis:</strong><br>â€¢ <strong>ðŸ‘‘ Admin</strong> â€” Dashboard global com todos os KPIs, gestÃ£o de usuÃ¡rios/campanhas/equipes, relatÃ³rios exportÃ¡veis. VisÃ£o 360Â° do contact center.<br>â€¢ <strong>ðŸ” Supervisor</strong> â€” Monitoramento de equipes, KPIs por agente, alertas de SLA e desempenho.<br>â€¢ <strong>ðŸŽ§ Operador</strong> â€” Bandeja unificada omnichannel (WhatsApp, email, phone), atendimento ao vivo, histÃ³rico prÃ³prio e mÃ©tricas pessoais.<br><br><strong>Dados reais:</strong> Atualmente gerencia 631 interaÃ§Ãµes e 2985 eventos de estado em SQLite WAL. Os KPIs sÃ£o calculados em SQL puro com funÃ§Ãµes window e servidos via REST + WebSocket.<br><br><em>Status: WORKING SYSTEM â€” funcional, conectado a um backend real, pronto para produÃ§Ã£o.</em>' },
          { id: 'vision', keywords: ['visÃ£o', 'visao', 'objetivo', 'goal', 'missÃ£o', 'missao', 'propÃ³sito', 'proposito', 'futuro', 'buscam'], label: 'VisÃ£o', response: '<strong>VisÃ£o:</strong> Reduzir o trabalho manual atravÃ©s de sistemas inteligentes.<br><br>Automatizamos processos em:<br><br>â€¢ Empresas<br>â€¢ LogÃ­stica<br>â€¢ EducaÃ§Ã£o<br>â€¢ CriaÃ§Ã£o de conteÃºdo' },
          { id: 'differential', keywords: ['diferenÃ§a', 'diferenca', 'diferente', 'distinto', 'unique', 'proposta', 'valor', 'por que', 'porque', 'vantagem'], label: 'Diferencial', response: 'Byte Wizzard nÃ£o apenas constrÃ³i interfaces.<br><br>ConstruÃ­mos <strong>sistemas completos</strong>:<br><br>â€¢ frontend + backend + AI + cloud + mobile<br>â€¢ IntegraÃ§Ã£o real com APIs modernas<br>â€¢ Foco em problemas operacionais reais' },
          { id: 'stack', keywords: ['stack', 'tecnologia', 'tech', 'tools', 'ferramentas', 'linguagem', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'motor', 'data engineering', 'engenharia de dados', 'dados', 'analÃ­tica', 'analytics', 'processamento', 'pipeline', 'etl', 'geoespacial', 'algoritmos', 'go', 'golang', 'python', 'arquitetura', 'infraestrutura', 'cloud', 'edge', 'serverless', 'vanilla', 'otimizaÃ§Ã£o', 'otimizacao', 'performance', 'stack', 'usam', 'backend', 'frontend'], label: 'Stack TecnolÃ³gico', response: '<strong>Stack TecnolÃ³gico da Byte Wizzard:</strong><br><br>Vou te contar exatamente o que usamos, sem enrolaÃ§Ã£o. NÃ£o somos do tipo que pÃµe logo de tecnologia que mal conhece. Isso aqui Ã© o que realmente estÃ¡ rodando nos nossos produtos e ferramentas do dia a dia.<br><br>â˜ï¸ <strong>Cloudflare Workers â€” Edge Computing de Verdade</strong><br>APIs serverless distribuÃ­das globalmente. LatÃªncia zero, sem servidor pra gerenciar. Rodamos lÃ³gica de negÃ³cio no edge com Workers + KV para armazenamento chave-valor. Deploy via <strong>Wrangler CLI</strong>.<br><br>ðŸŸ¢ <strong>Node.js â€” Backend Robusto</strong><br><strong>Express</strong> e <strong>Fastify</strong> para APIs REST. ServiÃ§os em produÃ§Ã£o rodando em Node â€” leves, rÃ¡pidos, sem frescura. Ferramenta certa pra cada problema.<br><br>âš›ï¸ <strong>Frontend Inteligente: Vanilla JS + React + Leaflet</strong><br>Usamos <strong>vanilla JavaScript (ES6+)</strong> como base â€” zero bundlers, zero transpilaÃ§Ã£o, zero sobrecarga. Landing pages e demos 100% vanilla porque nem tudo precisa de framework. Para apps complexas usamos <strong>React + Vite</strong>. Mapas interativos com <strong>Leaflet.js 1.9.4</strong> + tiles do <strong>OpenStreetMap</strong>. Fontes: <strong>JetBrains Mono</strong> e <strong>Inter</strong> do Google Fonts.<br><br>ðŸ—„ï¸ <strong>Bases de Dados: SQLite + Cloudflare KV</strong><br>SQLite em modo <strong>WAL</strong> (Write-Ahead Logging) para alta performance em leitura concorrente â€” o banco mais usado do mundo, configurado do jeito certo. Cloudflare KV para dados distribuÃ­dos no edge.<br><br>ðŸ§  <strong>InteligÃªncia Artificial em ProduÃ§Ã£o</strong><br>IntegraÃ§Ã£o com <strong>Llama 3</strong> (Meta), <strong>Workers AI</strong> e APIs externas de IA. Processamento de linguagem natural, geraÃ§Ã£o de conteÃºdo, automaÃ§Ã£o inteligente. Nossos assistentes tÃªm memÃ³ria persistente e contexto de sessÃ£o.<br><br>ðŸ“Š <strong>Data Engineering & Geoespacial</strong><br>Isso Ã© um diferencial importante. Rodamos pipelines de dados reais:<br><br>â€¢ <strong>GeocodificaÃ§Ã£o</strong> com Nominatim (OpenStreetMap) â€” endereÃ§os para coordenadas com alta precisÃ£o<br>â€¢ <strong>OtimizaÃ§Ã£o de rotas</strong> com OSRM â€” algoritmo Nearest-Neighbor TSP para rotas de entrega Ã³timas<br>â€¢ <strong>Processamento geoespacial</strong> â€” GeoJSON, clusters geogrÃ¡ficos, anÃ¡lise de zonas<br>â€¢ <strong>Data pipelines</strong> â€” transformaÃ§Ã£o de CSV, estruturas de logÃ­stica, importaÃ§Ã£o em massa<br>â€¢ <strong>OtimizaÃ§Ã£o combinatÃ³ria</strong> â€” algoritmos aplicados a problemas reais de rotas e entregas<br><br>âš™ï¸ <strong>Linguagens de Sistema: Go & Python</strong><br><strong>Go (Golang)</strong> para o que precisa de performance â€” solvers TSP, ferramentas CLI, processamento concorrente. <strong>Python</strong> para anÃ¡lise de dados, scripts e notebooks de exploraÃ§Ã£o. Usamos a linguagem certa pra cada problema.<br><br>ðŸ“¦ <strong>Infraestrutura & Deploy</strong><br>â€¢ <strong>Render.com</strong> â€” hospedagem de APIs Express e frontends<br>â€¢ <strong>Cloudflare Pages</strong> â€” landing pages e conteÃºdo estÃ¡tico<br>â€¢ <strong>Wrangler CLI</strong> â€” deploy de Workers direto do terminal<br>â€¢ Sem CI/CD inchado â€” deploy simples, direto, sem camadas desnecessÃ¡rias<br><br>ðŸ—ï¸ <strong>Filosofia de Arquitetura</strong><br>NÃ£o usamos tecnologia por moda. Cada decisÃ£o tem um porquÃª:<br><br>â€¢ Vanilla JS onde framework Ã© exagero (a maioria das landing pages e demos)<br>â€¢ Sem build step desnecessÃ¡rio â€” o que vocÃª escreve Ã© o que executa<br>â€¢ Edge computing pra velocidade global<br>â€¢ SQLite porque pra muitos casos Ã© mais rÃ¡pido e simples que um PostgreSQL gigante<br>â€¢ Frameworks sÃ³ quando o problema justifica (React pra apps complexas, nÃ£o pra formulÃ¡rio)<br><br><em>"Ferramentas modernas, decisÃµes conscientes, zero enrolaÃ§Ã£o."</em>' },
          { id: 'status', keywords: ['estado', 'status', 'progresso', 'ativo', 'desenvolvimento', 'fase', 'alpha', 'beta', 'lanÃ§amento', 'lancamento'], label: 'Status do Projeto', response: 'Byte Wizzard estÃ¡ em <strong>fase ativa de desenvolvimento</strong>.<br><br>â€¢ Produtos reais funcionando<br>â€¢ OmniConnect â€” plataforma omnichannel para call centers<br>â€¢ MVPs implantados<br>â€¢ IteraÃ§Ã£o constante<br>â€¢ Foco AI-first' },
          { id: 'contact', keywords: ['contato', 'contact', 'falar', 'contratar', 'orÃ§amento', 'orcamento', 'email', 'mail', 'telefone', 'whatsapp', 'redes'], label: 'Contato', response: 'Por enquanto a melhor forma de nos conhecer Ã© explorando nossos <a href="../../index.html#products" style="color:#00aaff">produtos</a> e demonstraÃ§Ãµes.<br><br>Se quiser entrar em contato, escreva atravÃ©s dos canais do estÃºdio.' },
        ],
      },
    },
  };

  // â”€â”€â”€ Detect language â”€â”€â”€
  function detect() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch {}
    const browser = (navigator.language || '').slice(0, 2);
    if (TRANSLATIONS[browser]) return browser;
    return 'es';
  }

  // â”€â”€â”€ Set language â”€â”€â”€
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

  // â”€â”€â”€ Subscribe to language changes â”€â”€â”€
  function onLangChange(fn) { listeners.push(fn); }

  // â”€â”€â”€ Apply translations â”€â”€â”€
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

    // Reviews â€” now handled by assets/reviews.js (dynamic API load)
    // If reviews.js hasn't loaded, this is a no-op
  }

  // â”€â”€â”€ Init â”€â”€â”€
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
