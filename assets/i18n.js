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
        btnReviews: 'Reseñas',
        btnContact: 'Contacto',
        scroll: 'SCROLL ▼',
        status: '5 productos activos · 3 demos · AI-first',
      },

      // ─── PRODUCTS ───
      products: {
        title: 'Productos',
        hermes: {
          icon: '⚡',
          name: 'Hermes',
          tagline: 'Byte Wizzard AI Assistant',
          features: ['Conocimiento completo del estudio', 'Info de productos y demos', 'Stack tecnológico y visión', 'Chat interactivo en vivo'],
          status: 'DEMO',
          link: '→ Probar Demo Bot',
        },
        roleplay: {
          icon: '🎭',
          name: 'RolePlay Chat',
          tagline: 'Simulación de Call Center Digital',
          features: ['Simulación de atención digital', 'Escenarios: reclamos, soporte, ventas', 'Interacción agente-cliente en vivo', 'Entrenamiento para postulantes', 'Multi-canal (chat, WhatsApp)'],
          status: 'DEMO',
          link: '→ Probar Demo',
        },
        courier: {
          icon: '🚚',
          name: 'Courier TMS',
          tagline: 'Logistics Intelligence System',
          features: ['Agrupación inteligente por zonas', 'Optimización de rutas (TSP)', 'Tracking GPS en tiempo real', 'App para repartidores', 'Panel administrativo completo', 'Importación de órdenes CSV'],
          status: 'EN DESARROLLO',
          link: '→ Probar Demo (en desarrollo)',
        },
        profe: {
          icon: '📚',
          name: 'Profe Mágico',
          tagline: 'AI Learning System',
          features: ['Enseñanza interactiva con IA', 'Traducción y audio automático', 'Contenido adaptado para niños', 'Ejercicios dinámicos', 'Experiencia educativa guiada'],
          status: 'LIVE',
          link: '→ Visitar sitio',
        },
          OmniConnect: {
            icon: '🌐',
            name: 'OmniConnect',
            tagline: 'Call Center Intelligence Platform',
            features: ['Dashboards en tiempo real', 'Gestión omnicanal (WhatsApp, email, llamadas)', 'KPIs inteligentes y reportes automatizados', 'Perfiles personalizables por rol', 'Historial completo de interacciones', 'Alertas y notificaciones configurables', 'Monitoreo de operaciones en vivo', 'Migración asistida desde cualquier plataforma'],
            status: 'EN DESARROLLO',
            link: '',
          },
      },

      // ─── PRÓXIMAMENTE ───
      comingSoon: {
        title: 'Próximamente',
        clipcraft: {
          icon: '📱',
          name: 'ClipCraft',
          tagline: 'Centro Multimedia Mobile',
          status: 'MVP Interno',
          features: ['Plataforma de creación de contenido multimedia', 'Edición de fotos y videos', 'Generación automática de videos'],
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
        motto: '“No construimos ideas. <span class="highlight">Construimos sistemas que funcionan.</span>”',
        quote: 'Reducir trabajo manual a través de sistemas inteligentes<br>que automatizan <strong>operaciones reales</strong> en empresas,<br>logística y educación.',
      },

      // ─── REVIEWS ───
      reviews: {
        title: 'Reseñas',
        formTitle: 'Dejá tu reseña',
        nameLabel: 'Tu nombre',
        productLabel: 'Producto',
        ratingLabel: 'Calificación',
        textLabel: 'Tu experiencia',
        submit: 'Enviar reseña',
        sending: 'Enviando...',
        success: '¡Gracias! Tu reseña será publicada después de revisión.',
        error: 'Error al enviar. Intentá de nuevo.',
        errorShort: 'El texto debe tener al menos 10 caracteres.',
        loading: 'Cargando reseñas...',
        empty: 'Todavía no hay reseñas. ¡Sé el primero!',
        products: {
          hermes: 'Hermes - AI Assistant',
          courier: 'Courier TMS',
          profe: 'Profe Mágico',
          clipcraft: 'ClipCraft',
        },
        items: [
          {
            text: 'Me gustó mucho el traductor, sobre todo porque tiene audios de todo, está muy lindo.',
            author: 'Johana',
            product: 'profe',
            rating: 5,
            date: 'Jun 2026',
          },
          {
            text: 'Me interesa mucho, ¿cuándo va a estar?',
            author: 'Maria',
            product: 'clipcraft',
            rating: 3,
            date: 'Jun 2026',
          },
        ],
      },

      // ─── STACK ───
      stack: {
        title: 'Stack',
        tags: ['Cloudflare Workers', 'Node.js', 'Express', 'Fastify', 'React', 'Vite', 'React Native', 'Expo', 'Llama 3', 'OpenStreetMap', 'OSRM', 'Nominatim', 'Leaflet', 'SQLite', 'Vanilla JS', 'Go', 'Python', 'Edge Computing', 'Data Engineering', 'Prisma', 'PostgreSQL'],
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
        builtBy: 'Built by Matías Bagnasco — AI Systems Developer',
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
        header: { name: 'Hermes', status: 'Byte Wizzard — Chat Asistente' },
        backLink: '← Volver',
        inputPlaceholder: 'Preguntale a Hermes...',
        sendBtn: 'Enviar',
        greeting: '¡Hola! Soy <strong>Hermes</strong> ⚡, el mensajero de Byte Wizzard.<br><br>Mirá, estoy acá para contarte todo lo que quieras saber sobre el estudio, los productos que tenemos, cómo pensamos, qué tecnología usamos... realmente todo.<br><br>La idea es que puedas preguntar con confianza — si tengo la info, te la doy con lujo de detalle. Si no la tengo, te digo con honestidad y te oriento para dónde seguir.<br><br>Algunas ideas para arrancar:<br>• <em>"¿Qué es Byte Wizzard?"</em><br>• <em>"Contame sobre el RolePlay Chat"</em><br>• <em>"¿Qué stack tecnológico usan?"</em><br>• <em>"¿Qué es ClipCraft?"</em>',
        fallback: 'Sabés que no tengo información específica sobre ese tema, pero no te preocupes — puedo contarte sobre cualquiera de estas cosas con lujo de detalle:<br><br>• <strong>Byte Wizzard</strong> — qué es el estudio, nuestra visión, qué estamos construyendo<br>• <strong>Hermes</strong> — cómo funciono, memoria persistente, redacción de emails y más<br>• <strong>Luna</strong> — nuestro AI Business Assistant con memoria y contexto empresarial<br>• <strong>Courier TMS</strong> — clustering, geocodificación, importación CSV, app para choferes<br>• <strong>RolePlay Chat</strong> — simulación de call center digital para postulantes<br>• <strong>Profe Mágico</strong> — educación con IA, desde nivel infantil hasta universitario<br>• <strong>ClipCraft</strong> — plataforma de creación de contenido multimedia (proyecto futuro)<br>• <strong>Stack</strong> — las tecnologías con las que construimos todo<br>• <strong>El Fundador</strong> — Matías Bagnasco, su experiencia y certificaciones<br>• <strong>Reseñas</strong> — por qué son importantes y cómo dejar la tuya<br>• <strong>Visión</strong> — hacia dónde vamos y por qué<br><br>¿Sobre cuál te gustaría saber más? Preguntame con confianza.',
        suggestions: ['¿Qué es Byte Wizzard?', 'Contame sobre el RolePlay Chat', '¿Qué stack tecnológico usan?', '¿Qué es ClipCraft?'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'estudio', 'empresa', 'quién es', 'quien es', 'quienes son', 'quienes', 'qué es', 'que es', 'ai systems studio', 'systems studio', 'hacen', 'dedican', 'ser', 'trata', 'herramientas', 'camino', 'próximamente'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> es un AI Systems Studio — pero más que una definición formal, te cuento lo que realmente somos.<br><br><strong>¿Quiénes somos?</strong><br>Somos un equipo con experiencia en sistemas complejos, inteligencia artificial y desarrollo full-stack. No somos una agencia tradicional que delega todo ni un proyecto académico que se queda en teoría. Construimos <strong>productos funcionales que se usan todos los días</strong>.<br><br><strong>¿Qué queremos lograr?</strong><br>Nuestra visión es clara: <strong>reducir el trabajo manual mediante sistemas inteligentes</strong>. Creemos que la tecnología existe para liberar a las personas de lo repetitivo y permitirles enfocarse en lo que realmente importa. Cada producto que construimos apunta a eso — automatizar procesos operativos reales en empresas, logística, educación y atención al cliente.<br><br><strong>¿En qué trabajamos?</strong><br>Hoy tenemos productos funcionando en cuatro áreas:<br><br>• <strong>Asistentes con IA</strong> — chatbots con memoria persistente, redacción de emails, automatización de tareas<br>• <strong>Logística inteligente</strong> — sistemas de optimización de rutas, clustering geográfico, tracking GPS<br>• <strong>Educación adaptativa</strong> — plataformas de aprendizaje con IA que se ajustan al ritmo del estudiante<br>• <strong>Simulación digital</strong> — herramientas de roleplay para call centers y entrenamiento de equipos<br><br><strong>¿Y después?</strong><br>Estamos construyendo constantemente. Además de los productos que ves hoy, hay más herramientas en camino que vamos a ir sumando. La idea es tener un ecosistema cada vez más completo de soluciones inteligentes. Mantenete atento — siempre estamos cocinando algo nuevo.<br><br>La filosofía que nos define: <em>"We don\'t build ideas. We build working systems." — "No construimos ideas. Construimos sistemas que funcionan."</em> Todo lo que ves acá es código real, funcionando, resolviendo problemas concretos.' },
          { id: 'what-we-do', keywords: ['hacen', 'productos', 'servicios', 'desarrollan', 'crean', 'ofrecen', 'rubro', 'trabajan', 'dedican', 'construyen'], label: 'Qué Hacemos', response: 'Construimos <strong>sistemas completos</strong>, no solo frentes bonitos. Te cuento en detalle:<br><br><strong>🧠 Sistemas con IA</strong><br>Desde asistentes virtuales con memoria y contexto empresarial hasta sistemas de aprendizaje automático. Todo integrado en productos que realmente se usan.<br><br><strong>⚙️ Automatización de procesos</strong><br>Si hay una tarea repetitiva que te está comiendo tiempo, probablemente podamos automatizarla. Analizamos el flujo, diseñamos la solución y la implementamos.<br><br><strong>🚚 Logística inteligente</strong><br>Optimización de rutas, agrupación de entregas por zona, tracking en tiempo real. Para empresas de delivery que quieren dejar de hacer todo a mano.<br><br><strong>🎓 Plataformas educativas</strong><br>Experiencias de aprendizaje con IA que se adaptan al ritmo del estudiante. Traducción automática, generación de ejercicios dinámicos, audio integrado.<br><br><strong>📱 Apps mobile full-stack</strong><br>Con React Native y Expo, llevamos los sistemas a los bolsillos de los usuarios — tanto para repartidores como para clientes.<br><br><strong>☁️ Cloud y edge computing</strong><br>Corremos en Cloudflare Workers, Node.js, Fastify. Escalable desde el día uno sin tener que pensar en infraestructura.' },
          { id: 'luna', keywords: ['luna', 'asistente', 'asistant', 'business', 'chat', 'bot', 'inteligente', 'ai assistant', 'virtual', 'empresarial'], label: 'Luna', response: '<strong>Luna</strong> es un AI Business Assistant — un asistente inteligente con memoria persistente y contexto empresarial, diseñado para operar en entornos de call center y atención al cliente.<br><br><strong>¿Qué la hace especial?</strong><br>Luna no es un chatbot común que olvida todo después de cada conversación. Tiene <strong>memoria por usuario y por sesión</strong>, lo que significa que recuerda quién sos, qué hablaste antes y puede retomar el hilo sin problemas.<br><br><strong>Capacidades principales:</strong><br>• <strong>Chat con IA en tiempo real</strong> — responde en lenguaje natural con velocidad y precisión<br>• <strong>Memoria persistente</strong> — recuerda conversaciones anteriores y contexto del cliente<br>• <strong>Redacción automática de emails</strong> — genera respuestas profesionales en segundos<br>• <strong>Soporte interno</strong> — ideal para áreas de back office que necesitan asistencia constante<br>• <strong>Automatización de tareas administrativas</strong> — desde consultas a bases de datos hasta generación de reportes<br><br><strong>💰 Estado:</strong> producto en uso real con cliente. No es un prototipo ni un MVP — está operando en producción.' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'asistente', 'chat', 'mensajero', 'vos', 'cómo funciona', 'como funciona', 'funciona', 'memoria', 'email', 'luna', 'versión'], label: 'Hermes', response: '¡Ese soy yo! <strong>Hermes</strong> ⚡ — el mensajero digital de Byte Wizzard.<br><br>Acá va la posta: Hermes es una <strong>versión de Luna</strong>, nuestro AI Business Assistant. Básicamente soy Luna pero adaptado específicamente para ser la cara visible del estudio en la landing page. Comparto el mismo motor, la misma inteligencia, la misma capacidad de memoria persistente.<br><br><strong>¿Cómo funciono?</strong><br>No soy un chatbot común y corriente. Estoy construido sobre un sistema de IA con <strong>memoria persistente</strong> — eso significa que retengo contexto, recuerdo lo que hablamos y puedo mantener conversaciones coherentes sin perder el hilo. Cada interacción se procesa con modelos de lenguaje que entienden intención, matices y pueden generar respuestas naturales.<br><br><strong>Lo que sé hacer:</strong><br>• <strong>Chat con IA en tiempo real</strong> — conversaciones fluidas en lenguaje natural<br>• <strong>Memoria persistente</strong> — recuerdo quién sos y de qué hablamos, ideal para seguimiento<br>• <strong>Redacción automática de emails</strong> — pasame una idea y te la transformo en un mail formal, profesional, listo para enviar. Por ejemplo: decime "necesito pedir un presupuesto para un sistema de tracking" y te redacto el email completo con saludo, cuerpo y despedida.<br>• <strong>Conocimiento completo del estudio</strong> — productos, stack, visión, equipo<br>• <strong>Automatización de tareas</strong> — desde consultas hasta generación de contenido<br><br><strong>¿Qué NO hago?</strong><br>No navego por internet ni tengo acceso a datos externos fuera de lo que el estudio me configuró. Pero si no sé algo, te lo digo claramente y te oriento para dónde seguir.<br><br><em>Estado: funcional — integrado en la landing como asistente principal del estudio.</em>' },
          { id: 'roleplay', keywords: ['roleplay', 'role play', 'roleplay chat', 'call center', 'simulación', 'simulacion', 'digital', 'postulantes', 'entrenamiento', 'simulador', 'contact center'], label: 'RolePlay Chat', response: '<strong>RolePlay Chat</strong> es un simulador de interacción digital para call centers, pensado específicamente para el <strong>área digital</strong> — esos canales que hoy son el corazón de cualquier operación de contacto: chat, WhatsApp, redes sociales.<br><br><strong>¿Para qué sirve?</strong><br>Imaginá que estás en un proceso de selección para un call center y querés evaluar cómo un postulante se desempeña en una interacción digital real. O que estás capacitando a tu equipo y necesitás escenarios realistas para practicar. Ahí entra RolePlay Chat.<br><br><strong>Escenarios disponibles:</strong><br>• <strong>📦 Reclamo por pedido</strong> — cliente que no recibió su compra, gestión de reclamos y seguimiento<br>• <strong>💻 Soporte técnico</strong> — problemas de inicio de sesión, recuperación de cuentas, resolución de incidentes<br>• <strong>💰 Consulta de facturación</strong> — cobros duplicados, reclamos de débito, gestión de reintegros<br>• <strong>🛒 Venta consultiva</strong> — atención personalizada, identificación de necesidades, cierre de ventas<br>• <strong>💬 Interacción WhatsApp</strong> — consultas de horarios, sucursales, envíos, típicas del día a día<br><br><strong>¿Cómo funciona?</strong><br>Es 100% frontend — no necesita backend, no necesita servidor. Cargás un escenario y la simulación reproduce la conversación completa entre agente y cliente. Después podés seguir escribiendo libremente desde cualquier panel para explorar diferentes respuestas.<br><br><em>Estado: demo interactiva funcional — usala para entrenamiento, selección o simplemente para mostrar cómo se maneja una interacción digital.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'logística', 'rutas', 'delivery', 'optimización', 'tsp', 'tracking', 'gps', 'repartidores', 'transporte', 'flota', 'geocodificación', 'geocoding', 'excel', 'importar', 'exportar', 'chofer', 'driver'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> es nuestro sistema de inteligencia logística — un Transportation Management System completo pensado para empresas de delivery que manejan múltiples entregas por día y necesitan dejar de hacer todo a mano.<br><br><strong>¿Qué problema resuelve?</strong><br>Organizar 50, 100 o 500 entregas al día con Excel y WhatsApp es una locura insostenible. Courier TMS automatiza todo el proceso: desde que importás las órdenes hasta que el repartidor las completa y generás los reportes.<br><br><strong>Funcionalidades en detalle:</strong><br><br>• <strong>Agrupación inteligente por zonas</strong> — el sistema clustering automático toma todas las órdenes, analiza las coordenadas geográficas y las agrupa por zona de manera inteligente. No es un simple agrupamiento por barrio — es geográfico, preciso, optimizado. Si tenés 80 entregas para 5 repartidores, el sistema te dice exactamente qué órdenes va cada uno.<br><br>• <strong>Geocodificación automática</strong> — subís las direcciones y el sistema las convierte automáticamente en coordenadas (latitud/longitud) usando Nominatim + OSRM. No necesitas marcar nada en un mapa a mano.<br><br>• <strong>Importación masiva desde Excel/CSV</strong> — descargás la plantilla, llenás tus órdenes, importás el archivo y en segundos tenés todo cargado en el sistema. Con validación de datos y detección de errores fila por fila.<br><br>• <strong>Exportación a Excel</strong> — cuando las órdenes están completadas, exportás todo a Excel con un clic. Ideal para reportes, contabilidad y auditoría.<br><br>• <strong>App para el chofer</strong> — el repartidor tiene su propia interfaz mobile con tracking GPS en tiempo real, navegación paso a paso, confirmación de entregas y notificaciones. El admin ve en vivo dónde está cada repartidor.<br><br>• <strong>Panel administrativo completo</strong> — dashboard con mapa interactivo, métricas en tiempo real, historial completo y control de flota.<br><br><em>Estado: desarrollo activo + <a href="../courier-tms/index.html" style="color:#00aaff">demo funcional del agrupador de órdenes</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'contenido', 'multimedia', 'video', 'foto', 'edición', 'mobile', 'creación', 'editing'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> es un proyecto que está en nuestra hoja de ruta: una plataforma mobile de creación de contenido multimedia.<br><br><strong>La visión:</strong><br>Imaginá una app donde puedas editar fotos y videos, generar clips automáticos con música integrada, renderizar todo en la nube y exportarlo directamente a tu dispositivo. Sin necesidad de una PC, sin software pesado, sin complicaciones.<br><br><strong>Lo que estamos planeando:</strong><br>• Edición de fotos y videos desde el celular<br>• Generación automática de videos con templates inteligentes<br>• Biblioteca de música integrada<br>• Render en la nube — procesamiento pesado del lado del servidor<br>• Exportación directa al dispositivo o a redes sociales<br><br><strong>💰 Estado:</strong> proyecto futuro — MVP interno en desarrollo. Todavía no está listo para mostrarse, pero estamos trabajando en ello.' },
          { id: 'profe', keywords: ['profe', 'mágico', 'magico', 'educación', 'educacion', 'aprendizaje', 'learning', 'inglés', 'ingles', 'niños', 'kids', 'enseñanza', 'school', 'educativo', 'traductor', 'facultad', 'universidad', 'complejo'], label: 'Profe Mágico', response: '<strong>Profe Mágico</strong> es una plataforma educativa con inteligencia artificial, diseñada originalmente para que los niños aprendan inglés e interactúen con la IA de una manera divertida y natural.<br><br><strong>¿Qué lo hace especial?</strong><br>Arrancó como una herramienta temática infantil — con personajes, colores llamativos, explicaciones sencillas y mucho audio para pronunciación. Pero tiene un secreto: está construido con modelos de lenguaje potentes, así que si le pasás algo <strong>complejo, de facultad, técnico o universitario</strong>, también te lo responde y te da ejemplos acordes.<br><br>O sea, podés usarlo tanto para que un nene de 8 años practique "hello, how are you?" como para pedirle una explicación gramatical avanzada o una traducción técnica. No es una limitación técnica — es una cuestión de cómo lo presentás.<br><br><strong>Funcionalidades:</strong><br>• <strong>Enseñanza interactiva con IA</strong> — conversa, corrige pronunciación y guía al estudiante<br>• <strong>Traducción y audio automático</strong> — escucha, repite, mejora la comprensión auditiva<br>• <strong>Contenido adaptado al nivel</strong> — desde "colores y números" hasta "presente perfecto vs pasado simple"<br>• <strong>Ejercicios dinámicos generados por IA</strong> — nunca se repiten, siempre frescos<br>• <strong>Aprendizaje guiado con profesor virtual</strong> — acompaña todo el proceso paso a paso<br><br><em>Estado: funcional y en iteración constante. Accesible desde cualquier navegador.</em>' },
          { id: 'vision', keywords: ['visión', 'vision', 'objetivo', 'goal', 'misión', 'mision', 'propósito', 'proposito', 'futuro', 'buscan', 'hacia', 'meta'], label: 'Visión', response: 'Nuestra visión es simple pero poderosa: <strong>reducir el trabajo manual mediante sistemas inteligentes</strong>.<br><br>Creemos que la tecnología no tendría que ser una complicación más — tendría que ser la herramienta que te libera de lo repetitivo para que puedas enfocarte en lo importante.<br><br>No nos interesa construir features por construir. Cada línea de código que escribimos está pensada para <strong>resolver un problema real</strong> que alguien tiene todos los días.<br><br>Nos movemos en cuatro áreas donde vemos que la automatización puede tener más impacto:<br><br>• <strong>Empresas</strong> — procesos operativos, atención al cliente, gestión interna<br>• <strong>Logística</strong> — rutas, entregas, tracking, optimización de recursos<br>• <strong>Educación</strong> — aprendizaje adaptativo, generación de contenido dinámico<br>• <strong>Creación de contenido</strong> — edición, render, publicación automatizada<br><br><em>"We don\'t build ideas. We build working systems." — "No construimos ideas. Construimos sistemas que funcionan."</em>' },
          { id: 'differential', keywords: ['diferencia', 'diferencias', 'distinto', 'unique', 'propuesta', 'valor', 'por qué', 'porque', 'por que elegir', 'ventaja', 'diferencial', 'elegir'], label: 'Diferencial', response: 'Mirá, te voy a ser sincero: en el mundo del software hay mucha gente que hace páginas lindas y vende humo. Nosotros no.<br><br><strong>Lo que nos diferencia:</strong><br><br>• <strong>Construimos sistemas completos</strong> — no solo frontends bonitos. Cada producto tiene backend, base de datos, APIs, integraciones y, cuando corresponde, IA funcionando de verdad.<br><br>• <strong>Pensamos en operaciones reales</strong> — no construimos para un pitch de inversores, construimos para que alguien lo use todos los días y le mejore la vida laboral.<br><br>• <strong>Stack moderno y eficiente</strong> — Cloudflare Workers, Node.js, React, React Native. No usamos tecnología vieja porque "siempre se hizo así".<br><br>• <strong>Somos chicos pero resolvemos grande</strong> — un equipo reducido pero con expertise en sistemas complejos: logística, call centers, educación, IA aplicada.<br><br>• <strong>Hecho en Paraguay, con visión global</strong> — nuestros productos compiten con cualquier solución internacional, pero entendemos las necesidades del mercado local y regional.' },
          { id: 'stack', keywords: ['stack', 'tecnología', 'tecnologia', 'tech', 'tools', 'herramientas', 'lenguaje', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'motor', 'backend', 'frontend', 'data engineering', 'ingeniería de datos', 'datos', 'analítica', 'analytics', 'procesamiento', 'pipeline', 'etl', 'mapas', 'geoespacial', 'geospatial', 'algoritmos', 'algorithms', 'go', 'golang', 'python', 'arquitectura', 'architecture', 'infraestructura', 'cloud', 'edge', 'serverless', 'vanilla', 'optimización', 'optimizacion', 'rendimiento'], label: 'Stack Tecnológico', response: '<strong>Stack Tecnológico de Byte Wizzard:</strong><br><br>Mirá, te voy a contar exactamente lo que usamos sin vueltas. No somos de esos estudios que ponen logos de tecnologías que apenas tocaron. Esto es lo que verdaderamente tenemos en producción, en desarrollo y en nuestras herramientas del día a día.<br><br>☁️ <strong>Cloudflare Workers — Edge Computing de verdad</strong><br>APIs serverless distribuidas globalmente. Cero latencia, cero servidores que mantener. Corremos lógica de negocio en el edge con Workers + KV para almacenamiento clave-valor. Esto nos da una arquitectura donde el código se ejecuta en la ubicación más cercana al usuario, no en un datacenter central. Usamos <strong>Wrangler</strong> para el deploy y gestión de entornos.<br><br>🟢 <strong>Node.js — Backend robusto y moderno</strong><br>Node con <strong>Express</strong> y <strong>Fastify</strong> para APIs REST. Servicios en producción corriendo sobre Node — livianos, rápidos, sin sobreingeniería. Elegimos las herramientas justas para cada problema.<br><br>⚛️ <strong>Frontend inteligente: Vanilla JS + React + Leaflet</strong><br>Usamos <strong>vanilla JavaScript (ES6+)</strong> como base — cero bundlers, cero transpilación, cero sobrecarga. Landing pages y demos 100% vanilla, porque no todo necesita un framework. Para apps más complejas metemos <strong>React + Vite</strong>. Y para mapas interactivos en logística, <strong>Leaflet.js 1.9.4</strong> con tiles de <strong>OpenStreetMap</strong>. Tipografía con <strong>JetBrains Mono</strong> e <strong>Inter</strong> de Google Fonts.<br><br>🗄️ <strong>Bases de datos: SQLite + Cloudflare KV</strong><br>SQLite con modo <strong>WAL</strong> (Write-Ahead Logging) para alto rendimiento en lecturas concurrentes — la base de datos más utilizada del planeta, pero configurada como la gente. Cloudflare KV para datos distribuidos en el edge. Elegimos según el problema: persistencia local vs. distribución global.<br><br>🧠 <strong>Inteligencia Artificial — Modelos en producción</strong><br>Integración con <strong>Llama 3</strong> (modelo open-source de Meta), <strong>Workers AI</strong> y APIs externas de IA. Procesamiento de lenguaje natural, generación de contenido, automatización inteligente. Nuestros asistentes tienen memoria persistente y contexto de sesión.<br><br>📊 <strong>Data Engineering & Geospatial</strong><br>Este es un punto clave que nos diferencia. Tenemos pipelines de datos reales:<br><br>• <strong>Geocodificación</strong> con Nominatim (OpenStreetMap) — convertimos direcciones en coordenadas con alta precisión<br>• <strong>Ruteo y optimización</strong> con OSRM — algoritmo Nearest-Neighbor TSP para rutas de delivery óptimas<br>• <strong>Procesamiento de datos geoespaciales</strong> — GeoJSON, rutas, clusters geográficos, análisis de zonas<br>• <strong>Data pipelines</strong> — transformación y procesamiento de datos CSV, estructuras de logística, importación masiva<br>• <strong>Análisis y optimización</strong> — algoritmos de optimización combinatoria aplicados a problemas reales de rutas y entregas<br><br>⚙️ <strong>Lenguajes de sistemas: Go & Python</strong><br>Para lo que necesita rendimiento y control, usamos <strong>Go (Golang)</strong> — solucionadores TSP, herramientas de línea de comandos, procesamiento concurrente. <strong>Python</strong> para análisis de datos, scripting y notebooks de exploración. No nos casamos con un solo lenguaje, usamos el que mejor resuelve cada problema.<br><br>📦 <strong>Infraestructura & Deploy</strong><br>• <strong>Render.com</strong> — hosting de APIs Express y frontends<br>• <strong>Cloudflare Pages</strong> — landing pages y contenido estático<br>• <strong>Wrangler CLI</strong> — deploy de Workers desde la terminal<br>• Sin CI/CD complejo — deploy simple, directo, sin capas innecesarias<br><br>🏗️ <strong>Filosofía de arquitectura</strong><br>No usamos tecnología por moda. Cada decisión técnica tiene un porqué:<br><br>• Vanilla JS donde sobra un framework (la mayoría de las landing pages y demos)<br>• Sin build step innecesario — lo que escribís es lo que se ejecuta<br>• Edge computing para lo que necesita velocidad global<br>• SQLite porque para muchos casos es más rápido y simple que un PostgreSQL gigante<br>• Frameworks solo cuando el problema lo justifica (React para apps complejas, no para un formulario)<br><br><em>"Herramientas modernas, decisiones conscientes, cero humo."</em>' },
          { id: 'status', keywords: ['estado', 'status', 'progreso', 'activo', 'desarrollo', 'fase', 'alpha', 'beta', 'lanzamiento', 'momento'], label: 'Estado del Proyecto', response: 'Byte Wizzard está en <strong>fase activa de desarrollo</strong>. Esto significa que hay productos funcionando en producción hoy, y al mismo tiempo seguimos construyendo e iterando.<br><br><strong>En este momento:</strong><br>• <strong>Luna</strong> — funcionando con un cliente real, en uso diario<br>• <strong>Profe Mágico</strong> — live, accesible desde cualquier navegador, en mejora continua<br>• <strong>Courier TMS</strong> — desarrollo activo con demo funcional, sumando features constantemente<br>• <strong>Hermes</strong> — ya está acá, en la landing, como asistente principal del estudio<br>• <strong>RolePlay Chat</strong> — demo interactiva funcionando, lista para mostrar<br>• <strong>ClipCraft</strong> — proyecto futuro, MVP interno en desarrollo<br><br>No somos de los que anuncian productos que no existen. Todo lo que ves tiene código funcionando atrás.' },
          { id: 'ceo', keywords: ['ceo', 'fundador', 'dueño', 'creador', 'matías', 'matias', 'bagnasco', 'quien creó', 'quien fundó', 'quien lidera', 'detras', 'detrás', 'cabeza', 'director', 'argentino', 'paraguay'], label: 'El Fundador', response: 'El creador y cabeza de Byte Wizzard es <strong>Matías Andrés Bagnasco</strong>.<br><br><strong>Datos:</strong><br>• <strong>Nombre completo:</strong> Matías Andrés Bagnasco<br>• <strong>Edad:</strong> 37 años<br>• <strong>Nacionalidad:</strong> Argentino<br>• <strong>Residencia:</strong> Paraguay<br><br><strong>Certificaciones y expertise:</strong><br>• Certificado en Inteligencia Artificial y Programación con IA<br>• Certificado en ISO SQL Security<br>• Certificado en Seguridad ISO<br>• Especialización en sistemas complejos, automatización y desarrollo full-stack<br>• Amplia experiencia en call centers, logística y operaciones digitales<br><br>Matías es el arquitecto principal de todos los productos de Byte Wizzard — desde la arquitectura de sistemas hasta el diseño de las experiencias de usuario. Su experiencia en call centers y operaciones es lo que da forma a productos como Hermes, Courier TMS y RolePlay Chat, que están pensados desde la realidad operativa y no desde la teoría.<br><br>Actualmente reside en Paraguay, donde sigue construyendo y expandiendo el estudio con una visión clara: sistemas inteligentes que resuelvan problemas reales.' },
          { id: 'reviews', keywords: ['reseñas', 'resenias', 'reseña', 'resenia', 'reviews', 'review', 'opiniones', 'opinión', 'testimonios', 'feedback', 'comentarios', 'valoración'], label: 'Reseñas', response: 'Las reseñas son <strong>muy importantes para nosotros</strong>. No solo porque nos ayudan a mejorar, sino porque cada opinión que nos dejan es una oportunidad para entender qué estamos haciendo bien y en qué podemos crecer.<br><br>En Byte Wizzard creemos en la mejora continua y en construir productos que realmente le sirvan a la gente. Por eso cada reseña — buena o mala — la tomamos como un insumo valioso para seguir evolucionando.<br><br>Si probaste algún producto o demo y querés dejar tu opinión, abajo en la sección de reseñas de esta misma página hay un formulario. Te toma dos minutos y para nosotros vale oro.<br><br><strong>Importante:</strong> todas las reseñas se publican automáticamente ni bien las enviás, sin filtros ni censura. Nos gusta la transparencia — lo bueno y lo malo se muestra igual, porque solo así podemos mejorar de verdad.' },
          { id: 'contact', keywords: ['contacto', 'contact', 'hablar', 'contratar', 'presupuesto', 'email', 'mail', 'teléfono', 'telefono', 'whatsapp', 'redes', 'comunicarse'], label: 'Contacto', response: 'Por ahora la mejor forma de conocer Byte Wizzard es justamente esta: explorando los productos y las demos que ves acá en la página. Cada demo te da una idea clara de cómo pensamos y qué sabemos hacer.<br><br>Si después de ver todo te queda alguna pregunta o querés charlar sobre un proyecto, escribinos al mail del estudio: <strong>bytewizzards@gmail.com</strong>.<br><br>También podés seguirnos y ver más cosas que vamos compartiendo — siempre estamos construyendo algo nuevo.' },
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
        btnReviews: 'Reviews',
        btnContact: 'Contact',
        scroll: 'SCROLL ▼',
        status: '5 active products · 3 demos · AI-first',
      },
      products: {
        title: 'Products',
        hermes: {
          icon: '⚡',
          name: 'Hermes',
          tagline: 'Byte Wizzard AI Assistant',
          features: ['Full studio knowledge', 'Product & demo info', 'Tech stack & vision', 'Interactive live chat'],
          status: 'DEMO',
          link: '→ Try Demo Bot',
        },
        roleplay: {
          icon: '🎭',
          name: 'RolePlay Chat',
          tagline: 'Call Center Digital Simulation',
          features: ['Digital customer service simulation', 'Scenarios: claims, support, sales', 'Live agent-client interaction', 'Applicant training tool', 'Multi-channel (chat, WhatsApp)'],
          status: 'DEMO',
          link: '→ Try Demo',
        },
        courier: {
          icon: '🚚',
          name: 'Courier TMS',
          tagline: 'Logistics Intelligence System',
          features: ['Smart zone clustering', 'Route optimization (TSP)', 'Real-time GPS tracking', 'Driver mobile app', 'Complete admin panel', 'CSV order import'],
          status: 'IN DEVELOPMENT',
          link: '→ Try Demo (in development)',
        },
        profe: {
          icon: '📚',
          name: 'Profe Mágico',
          tagline: 'AI Learning System',
          features: ['Interactive AI teaching', 'Auto translation & audio', 'Kids-friendly content', 'Dynamic exercises', 'Guided learning experience'],
          status: 'LIVE',
          link: '→ Visit site',
        },
          OmniConnect: {
            icon: '🌐',
            name: 'OmniConnect',
            tagline: 'Call Center Intelligence Platform',
            features: ['Real-time dashboards', 'Omnichannel management (WhatsApp, email, calls)', 'Smart KPIs and automated reports', 'Customizable role-based profiles', 'Complete interaction history', 'Configurable alerts and notifications', 'Live operations monitoring', 'Assisted migration from any platform'],
            status: 'IN DEVELOPMENT',
            link: '',
          },
      },
      comingSoon: {
        title: 'Coming Soon',
        clipcraft: {
          icon: '📱',
          name: 'ClipCraft',
          tagline: 'Mobile Media Center',
          status: 'Internal MVP',
          features: ['Multimedia content creation platform', 'Photo & video editing', 'Automatic video generation'],
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
        motto: '“We don\'t build ideas. <span class="highlight">We build working systems.</span>”',
        quote: 'Reduce manual work through intelligent systems<br>that automate <strong>real operations</strong> in business,<br>logistics and education.',
      },

      // ─── REVIEWS ───
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
          profe: 'Profe Mágico',
          clipcraft: 'ClipCraft',
        },
        items: [
          {
            text: 'Me gustó mucho el traductor, sobre todo porque tiene audios de todo, está muy lindo.',
            author: 'Johana',
            product: 'profe',
            rating: 5,
            date: 'Jun 2026',
          },
          {
            text: 'Me interesa mucho, ¿cuándo va a estar?',
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
        builtBy: 'Built by Matías Bagnasco — AI Systems Developer',
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
        header: { name: 'Hermes', status: 'Byte Wizzard — Chat Assistant' },
        backLink: '← Back',
        inputPlaceholder: 'Ask Hermes anything...',
        sendBtn: 'Send',
        greeting: 'Hey there! I\'m <strong>Hermes</strong> ⚡, Byte Wizzard\'s messenger.<br><br>I\'m here to tell you everything you want to know about the studio — our products, how we think, the tech we use, the vision. No fluff, just real answers.<br><br>Here are some ideas to get started:<br>• <em>"What is Byte Wizzard?"</em><br>• <em>"Tell me about the RolePlay Chat"</em><br>• <em>"What tech stack do you use?"</em><br>• <em>"What is ClipCraft?"</em>',
        fallback: 'I don\'t have specific info on that topic, but I can tell you all about any of these in detail:<br><br>• <strong>Byte Wizzard</strong> — what the studio is, our vision, what we\'re building<br>• <strong>Hermes</strong> — how I work, persistent memory, email drafting and more<br>• <strong>Luna</strong> — AI Business Assistant with memory and context<br>• <strong>Courier TMS</strong> — clustering, geocoding, CSV import, driver app<br>• <strong>RolePlay Chat</strong> — call center digital simulation for applicants<br>• <strong>Profe Mágico</strong> — AI education from kids to university level<br>• <strong>ClipCraft</strong> — multimedia content creation platform (future project)<br>• <strong>Stack</strong> — the technologies we build with<br>• <strong>The Founder</strong> — Matías Bagnasco, his background and certifications<br>• <strong>Reviews</strong> — why they matter and how to leave yours<br>• <strong>Vision</strong> — where we\'re headed and why<br><br>What would you like to know about?',
        suggestions: ['What is Byte Wizzard?', 'Tell me about RolePlay Chat', 'What tech stack do you use?', 'What is ClipCraft?'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'studio', 'company', 'who is', 'who are', 'what is', 'about', 'ai systems studio', 'systems studio', 'tools', 'coming'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> is an AI Systems Studio — but let me tell you what that actually means.<br><br><strong>Who we are:</strong><br>We\'re a team with deep experience in complex systems, artificial intelligence, and full-stack development. We\'re not a traditional agency that outsources everything, nor an academic project stuck in theory. We build <strong>functional products that people use every day</strong>.<br><br><strong>What we\'re about:</strong><br>Our mission is straightforward: <strong>reduce manual work through intelligent systems</strong>. We believe technology should free people from repetitive tasks so they can focus on what actually matters. Every product we build aims to automate real operational processes in business, logistics, education, and customer service.<br><br><strong>What we\'re building:</strong><br>Today we have products running in four areas:<br><br>• <strong>AI Assistants</strong> — chatbots with persistent memory, email drafting, task automation<br>• <strong>Smart Logistics</strong> — route optimization, geographic clustering, GPS tracking<br>• <strong>Adaptive Education</strong> — learning platforms powered by AI that adjust to each student\'s pace<br>• <strong>Digital Simulation</strong> — roleplay tools for call centers and team training<br><br><strong>What\'s next:</strong><br>We\'re constantly building. Beyond what you see today, there are more tools on the way. Keep an eye out — we\'re always cooking something new.<br><br>Our philosophy: <em>"We don\'t build ideas. We build working systems." — "No construimos ideas. Construimos sistemas que funcionan."</em> Everything here is real code, running, solving real problems.' },
          { id: 'what-we-do', keywords: ['do', 'products', 'services', 'develop', 'create', 'offer', 'field', 'work on', 'build'], label: 'What We Do', response: 'We build <strong>complete systems</strong>, not just pretty frontends. Here\'s the breakdown:<br><br><strong>🧠 AI-Powered Systems</strong><br>From virtual assistants with persistent memory to machine learning applications. All integrated into products that actually get used.<br><br><strong>⚙️ Process Automation</strong><br>If there\'s a repetitive task eating up your time, we can probably automate it. We analyze the flow, design the solution, and implement it.<br><br><strong>🚚 Smart Logistics</strong><br>Route optimization, delivery clustering, real-time tracking. For delivery companies that want to stop doing everything by hand.<br><br><strong>🎓 Educational Platforms</strong><br>AI-powered learning experiences that adapt to each student\'s pace. Auto-translation, dynamic exercise generation, integrated audio.<br><br><strong>📱 Full-Stack Mobile Apps</strong><br>Built with React Native and Expo — from driver apps to client-facing interfaces.<br><br><strong>☁️ Cloud & Edge Computing</strong><br>Running on Cloudflare Workers, Node.js, Fastify. Scalable from day one without infrastructure headaches.' },
          { id: 'luna', keywords: ['luna', 'assistant', 'business', 'chat', 'bot', 'intelligent', 'ai assistant', 'virtual', 'enterprise'], label: 'Luna', response: '<strong>Luna</strong> is an AI Business Assistant — an intelligent assistant with persistent memory and business context, built for call center and customer service environments.<br><br><strong>What makes it special?</strong><br>Luna is not your average chatbot that forgets everything after each conversation. It has <strong>per-user and per-session memory</strong>, meaning it remembers who you are, what you talked about before, and can pick up right where you left off.<br><br><strong>Key capabilities:</strong><br>• <strong>Real-time AI chat</strong> — natural language responses with speed and accuracy<br>• <strong>Persistent memory</strong> — remembers past conversations and customer context<br>• <strong>Automatic email drafting</strong> — give it an idea and it\'ll write a professional email ready to send<br>• <strong>Internal support</strong> — perfect for back-office teams that need constant assistance<br>• <strong>Task automation</strong> — from database queries to report generation<br><br><strong>💰 Status:</strong> real product in production with an active client. Not a prototype or MVP — it\'s running live.' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'assistant', 'chat', 'messenger', 'how', 'works', 'memory', 'email', 'luna', 'version'], label: 'Hermes', response: 'That\'s me! <strong>Hermes</strong> ⚡ — Byte Wizzard\'s digital messenger.<br><br>Here\'s the thing: Hermes is a <strong>version of Luna</strong>, our AI Business Assistant. I\'m basically Luna, but adapted specifically to be the studio\'s front-facing assistant on the landing page. Same engine, same intelligence, same persistent memory capabilities.<br><br><strong>How do I work?</strong><br>I\'m not your average chatbot. I\'m built on an AI system with <strong>persistent memory</strong> — I retain context, remember what we talked about, and can hold coherent conversations without losing the thread. Every interaction is processed through language models that understand intent, nuance, and can generate natural responses.<br><br><strong>What I can do:</strong><br>• <strong>Real-time AI chat</strong> — fluid conversations in natural language<br>• <strong>Persistent memory</strong> — I remember who you are and what we discussed<br>• <strong>Email drafting</strong> — give me an idea and I\'ll turn it into a formal, professional email. For example: "I need to request a quote for a tracking system" and I\'ll write the full email with greeting, body, and sign-off.<br>• <strong>Complete studio knowledge</strong> — products, stack, vision, team<br>• <strong>Task automation</strong> — from inquiries to content generation<br><br><em>Status: live — integrated into the landing page as the studio\'s main assistant.</em>' },
          { id: 'roleplay', keywords: ['roleplay', 'role play', 'roleplay chat', 'call center', 'simulation', 'digital', 'candidates', 'training', 'simulator', 'contact center'], label: 'RolePlay Chat', response: '<strong>RolePlay Chat</strong> is a digital interaction simulator for call centers, specifically designed for the <strong>digital channel</strong> — chat, WhatsApp, social media — which is the heart of any modern contact center operation.<br><br><strong>What is it for?</strong><br>Imagine you\'re running a recruitment process and you need to evaluate how an applicant handles a real digital interaction. Or you\'re training your team and need realistic scenarios to practice. That\'s exactly what RolePlay Chat does.<br><br><strong>Available scenarios:</strong><br>• <strong>📦 Order claim</strong> — customer who didn\'t receive their purchase, tracking and follow-up<br>• <strong>💻 Technical support</strong> — login issues, account recovery, incident resolution<br>• <strong>💰 Billing inquiry</strong> — duplicate charges, refund requests, dispute management<br>• <strong>🛒 Consultative sales</strong> — personalized attention, needs identification, closing<br>• <strong>💬 WhatsApp interaction</strong> — hours, branches, shipping — typical daily queries<br><br><strong>How does it work?</strong><br>It\'s 100% frontend — no backend, no server needed. Load a scenario and the simulation plays out the full conversation between agent and client. After the simulation, you can keep typing freely from either panel to explore different responses.<br><br><em>Status: functional interactive demo — use it for training, recruitment, or just to showcase digital interaction handling.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'routes', 'delivery', 'optimization', 'tsp', 'tracking', 'gps', 'drivers', 'transport', 'fleet', 'geocoding', 'excel', 'import', 'export', 'driver', 'csv'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> is our logistics intelligence system — a full Transportation Management System built for delivery companies managing dozens or hundreds of daily shipments.<br><br><strong>What problem does it solve?</strong><br>Managing 50, 100, or 500 deliveries a day with Excel and WhatsApp is simply unsustainable. Courier TMS automates the entire process: from importing orders to route optimization to driver completion and reporting.<br><br><strong>Features in detail:</strong><br><br>• <strong>Smart zone clustering</strong> — the system takes all orders, analyzes geographic coordinates, and automatically groups them by zone. Not just by neighborhood — true geographic clustering. With 80 deliveries for 5 drivers, it tells you exactly which orders each driver gets.<br><br>• <strong>Automatic geocoding</strong> — upload addresses and the system converts them to coordinates (lat/lng) using Nominatim + OSRM. No manual map pinning required.<br><br>• <strong>Bulk CSV/Excel import</strong> — download the template, fill in your orders, import the file. Seconds later everything is loaded, with row-level validation and error detection.<br><br>• <strong>Excel export</strong> — when orders are completed, export everything to Excel with one click. Perfect for reports, accounting, and auditing.<br><br>• <strong>Driver app</strong> — each driver gets a mobile interface with real-time GPS tracking, step-by-step navigation, delivery confirmation, and notifications. The admin sees where every driver is, live.<br><br>• <strong>Complete admin dashboard</strong> — interactive map, real-time metrics, full history, fleet control.<br><br><em>Status: active development + <a href="../courier-tms/index.html" style="color:#00aaff">functional order clustering demo</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'multimedia', 'video', 'photo', 'editing', 'mobile', 'creation', 'editing'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> is a project on our roadmap — a mobile platform for multimedia content creation.<br><br><strong>The vision:</strong><br>Picture an app where you can edit photos and videos, generate automatic clips with integrated music, render everything in the cloud, and export directly to your device. No PC needed, no heavy software, no complications.<br><br><strong>What we\'re planning:</strong><br>• Photo and video editing from your phone<br>• Automatic video generation with smart templates<br>• Integrated music library<br>• Cloud rendering — heavy processing on the server side<br>• Direct export to device or social media<br><br><strong>💰 Status:</strong> future project — internal MVP in development. Not ready for show yet, but we\'re working on it.' },
          { id: 'profe', keywords: ['profe', 'magico', 'magic', 'education', 'learning', 'english', 'children', 'kids', 'teaching', 'school', 'translator', 'university', 'advanced'], label: 'Profe Mágico', response: '<strong>Profe Mágico</strong> is an AI-powered educational platform, originally designed to help kids learn English in a fun, interactive way.<br><br><strong>What makes it special?</strong><br>It started as a children\'s tool — colorful characters, simple explanations, lots of audio for pronunciation practice. But here\'s the thing: it\'s built on powerful language models, so if you give it something <strong>complex, university-level, or technical</strong>, it handles that too.<br><br>You can use it both for an 8-year-old practicing "hello, how are you?" and for asking advanced grammar explanations or technical translations. It\'s not a technical limitation — it\'s a matter of how you present the request.<br><br><strong>Features:</strong><br>• <strong>Interactive AI teaching</strong> — converses, corrects pronunciation, guides the student<br>• <strong>Auto translation and audio</strong> — listening, repetition, auditory comprehension<br>• <strong>Content adapted to level</strong> — from "colors and numbers" to "present perfect vs past simple"<br>• <strong>AI-generated dynamic exercises</strong> — never repeated, always fresh<br>• <strong>Guided learning with virtual teacher</strong> — accompanies the entire process step by step<br><br><em>Status: live and constantly iterating. Accessible from any browser.</em>' },
          { id: 'vision', keywords: ['vision', 'goal', 'mission', 'purpose', 'future', 'aim', 'where', 'headed'], label: 'Vision', response: 'Our vision is simple but powerful: <strong>reduce manual work through intelligent systems</strong>.<br><br>We believe technology shouldn\'t be another complication — it should be the tool that frees you from repetitive tasks so you can focus on what matters.<br><br>We don\'t build features for the sake of it. Every line of code we write is meant to <strong>solve a real problem</strong> someone faces every day.<br><br>We focus on four areas where automation has the most impact:<br><br>• <strong>Business</strong> — operations, customer service, internal management<br>• <strong>Logistics</strong> — routes, deliveries, tracking, resource optimization<br>• <strong>Education</strong> — adaptive learning, dynamic content generation<br>• <strong>Content creation</strong> — editing, rendering, automated publishing<br><br><em>"We don\'t build ideas. We build working systems." — "No construimos ideas. Construimos sistemas que funcionan."</em>' },
          { id: 'differential', keywords: ['difference', 'different', 'unique', 'value', 'why', 'advantage', 'special', 'choose'], label: 'Differential', response: 'Let me be real with you: the software world is full of people selling nice-looking pages and promising the moon. We\'re not that.<br><br><strong>What sets us apart:</strong><br><br>• <strong>We build complete systems</strong> — not just pretty frontends. Every product has a backend, database, APIs, integrations, and when it makes sense, real working AI.<br><br>• <strong>Real operations focus</strong> — we don\'t build for investor pitches, we build for someone to use every day and have their work life improved.<br><br>• <strong>Modern, efficient stack</strong> — Cloudflare Workers, Node.js, React, React Native. No outdated tech because "that\'s how it\'s always been done."<br><br>• <strong>Small team, big solutions</strong> — a lean team with deep expertise in complex systems: logistics, call centers, education, applied AI.<br><br>• <strong>Made in Paraguay, global vision</strong> — our products compete with any international solution, but we understand local and regional market needs.' },
          { id: 'stack', keywords: ['stack', 'technology', 'tech', 'tools', 'language', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'engine', 'backend', 'frontend', 'data engineering', 'data', 'analytics', 'processing', 'pipeline', 'etl', 'geospatial', 'algorithms', 'go', 'golang', 'python', 'architecture', 'infrastructure', 'cloud', 'edge', 'serverless', 'vanilla', 'optimization', 'performance', 'stack', 'tech stack', 'what do you use', 'what stack', 'languages', 'programming', 'tools', 'infra'], label: 'Tech Stack', response: '<strong>Byte Wizzard Tech Stack:</strong><br><br>Let me walk you through what we actually use across the studio. No fluff, no logos we haven\'t touched. These are the real technologies powering our products day to day.<br><br>☁️ <strong>Cloudflare Workers — Real Edge Computing</strong><br>Globally distributed serverless APIs with Workers + KV for key-value storage. Code runs at the edge, closest to the user, not in a centralized datacenter. Deploy with <strong>Wrangler CLI</strong>. Zero servers to manage, global scale out of the box.<br><br>🟢 <strong>Node.js — Robust Backend</strong><br><strong>Express</strong> and <strong>Fastify</strong> for REST APIs. Lightweight, fast, no overengineering. Production services running on Node — we pick the right tool for each job.<br><br>⚛️ <strong>Smart Frontend: Vanilla JS + React + Leaflet</strong><br>We lead with <strong>vanilla JavaScript (ES6+)</strong> — zero bundlers, zero transpilation, zero overhead. Landing pages and demos are 100% vanilla because not everything needs a framework. For complex apps, we use <strong>React + Vite</strong>. For interactive logistics maps, <strong>Leaflet.js 1.9.4</strong> with <strong>OpenStreetMap</strong> tiles. Typography: <strong>JetBrains Mono</strong> + <strong>Inter</strong> from Google Fonts.<br><br>🗄️ <strong>Databases: SQLite + Cloudflare KV</strong><br>SQLite in <strong>WAL mode</strong> (Write-Ahead Logging) for high concurrent read performance — the world\'s most deployed database, configured the right way. Cloudflare KV for distributed edge data. We choose based on the problem: local persistence vs. global distribution.<br><br>🧠 <strong>AI — Production Models</strong><br>Integration with <strong>Llama 3</strong> (Meta\'s open-source model), <strong>Workers AI</strong>, and external AI APIs. Natural language processing, content generation, intelligent automation. Our assistants have persistent memory and session context.<br><br>📊 <strong>Data Engineering & Geospatial</strong><br>This is a key differentiator. We run real data pipelines:<br><br>• <strong>Geocoding</strong> with Nominatim (OpenStreetMap) — addresses to coordinates with high precision<br>• <strong>Route optimization</strong> with OSRM — Nearest-Neighbor TSP algorithm for optimal delivery routes<br>• <strong>Geospatial data processing</strong> — GeoJSON, route geometries, geographic clustering, zone analysis<br>• <strong>Data pipelines</strong> — CSV transformation, logistics data structures, bulk import systems<br>• <strong>Combinatorial optimization</strong> — applied algorithms solving real-world routing and delivery problems<br><br>⚙️ <strong>Systems Languages: Go & Python</strong><br><strong>Go (Golang)</strong> for performance-critical code — TSP solvers, CLI tools, concurrent data processing. <strong>Python</strong> for data analysis, scripting, and exploration notebooks. We don\'t marry a single language — we use what solves the problem best.<br><br>📦 <strong>Infrastructure & Deploy</strong><br>• <strong>Render.com</strong> — hosting Express APIs and frontends<br>• <strong>Cloudflare Pages</strong> — landing pages and static content<br>• <strong>Wrangler CLI</strong> — Worker deployments from the terminal<br>• No bloated CI/CD — simple, direct deploy without unnecessary layers<br><br>🏗️ <strong>Architecture Philosophy</strong><br>We don\'t use tech because it\'s trendy. Every decision has a reason:<br><br>• Vanilla JS where a framework would be overkill (most landing pages and demos)<br>• No unnecessary build step — what you write is what runs<br>• Edge computing where global speed matters<br>• SQLite because for many use cases it\'s faster and simpler than a massive PostgreSQL<br>• Frameworks only when the problem justifies them (React for complex apps, not for a form)<br><br><em>"Modern tools, conscious decisions, zero fluff."</em>' },
          { id: 'status', keywords: ['status', 'progress', 'active', 'development', 'stage', 'phase', 'alpha', 'beta', 'launch', 'release', 'right now'], label: 'Project Status', response: 'Byte Wizzard is in <strong>active development</strong>. This means we have products running in production today, while we keep building and iterating.<br><br><strong>Right now:</strong><br>• <strong>Luna</strong> — live with a real client, in daily use<br>• <strong>Profe Mágico</strong> — live, accessible from any browser, constantly improving<br>• <strong>Courier TMS</strong> — active development with working demo, adding features regularly<br>• <strong>Hermes</strong> — right here on the landing page, the studio\'s main assistant<br>• <strong>RolePlay Chat</strong> — interactive demo running, ready to showcase<br>• <strong>ClipCraft</strong> — future project, internal MVP in development<br><br>We don\'t announce products that don\'t exist yet. Everything you see has working code behind it.' },
          { id: 'ceo', keywords: ['ceo', 'founder', 'owner', 'creator', 'matias', 'matías', 'bagnasco', 'who created', 'who founded', 'behind', 'head', 'argentinian', 'paraguay'], label: 'The Founder', response: 'The creator and head of Byte Wizzard is <strong>Matías Andrés Bagnasco</strong>.<br><br><strong>Details:</strong><br>• <strong>Full name:</strong> Matías Andrés Bagnasco<br>• <strong>Age:</strong> 37 years old<br>• <strong>Nationality:</strong> Argentine<br>• <strong>Residence:</strong> Paraguay<br><br><strong>Certifications & expertise:</strong><br>• Certified in Artificial Intelligence and AI Programming<br>• Certified in ISO SQL Security<br>• Certified in ISO Security<br>• Specialized in complex systems, automation, and full-stack development<br>• Extensive experience in call centers, logistics, and digital operations<br><br>Matías is the principal architect behind every Byte Wizzard product — from system architecture to user experience design. His background in call centers and operations is what shapes products like Hermes, Courier TMS, and RolePlay Chat, which are built from real operational reality, not theory.<br><br>He currently resides in Paraguay, where he continues to build and expand the studio with a clear vision: intelligent systems that solve real problems.' },
          { id: 'reviews', keywords: ['reviews', 'review', 'opinions', 'testimonials', 'feedback', 'comments', 'rating'], label: 'Reviews', response: 'Reviews are <strong>really important to us</strong>. Not just because they help us improve, but because every piece of feedback is an opportunity to understand what we\'re doing right and where we can grow.<br><br>At Byte Wizzard we believe in continuous improvement and building products that genuinely serve people. That\'s why every review — good or bad — we take as valuable input to keep evolving.<br><br>If you\'ve tried any of our products or demos and want to leave your opinion, there\'s a form in the reviews section of this page. It takes two minutes and it means the world to us.<br><br><strong>Important:</strong> all reviews are published automatically as soon as you submit them — no filters, no censorship. We believe in transparency. The good and the bad get shown equally, because that\'s the only way we can truly improve.' },
          { id: 'contact', keywords: ['contact', 'talk', 'hire', 'quote', 'email', 'mail', 'phone', 'whatsapp', 'social', 'reach'], label: 'Contact', response: 'For now the best way to get to know Byte Wizzard is right here — exploring the products and demos on this page. Each demo gives you a clear idea of how we think and what we can build.<br><br>If after checking everything out you still have questions or want to chat about a project, write to us at: <strong>bytewizzards@gmail.com</strong>.<br><br>You can also follow along for more things we keep sharing — we\'re always building something new.' },
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
        btnReviews: 'Avaliações',
        btnContact: 'Contato',
        scroll: 'ROLAR ▼',
        status: '5 produtos ativos · 3 demos · AI-first',
      },
      products: {
        title: 'Produtos',
        hermes: {
          icon: '⚡',
          name: 'Hermes',
          tagline: 'Assistente IA da Byte Wizzard',
          features: ['Conhecimento completo do estúdio', 'Informações de produtos e demos', 'Stack tecnológico e visão', 'Chat interativo ao vivo'],
          status: 'DEMO',
          link: '→ Testar Bot Demo',
        },
        roleplay: {
          icon: '🎭',
          name: 'RolePlay Chat',
          tagline: 'Simulação de Call Center Digital',
          features: ['Simulação de atendimento digital', 'Cenários: reclamações, suporte, vendas', 'Interação agente-cliente ao vivo', 'Treinamento para candidatos', 'Multi-canal (chat, WhatsApp)'],
          status: 'DEMO',
          link: '→ Testar Demo',
        },
        courier: {
          icon: '🚚',
          name: 'Courier TMS',
          tagline: 'Sistema de Inteligência Logística',
          features: ['Agrupamento inteligente por zona', 'Otimização de rotas (TSP)', 'Tracking GPS em tempo real', 'App para entregadores', 'Painel administrativo completo', 'Importação de pedidos CSV'],
          status: 'EM DESENVOLVIMENTO',
          link: '→ Testar Demo (em desenvolvimento)',
        },
        profe: {
          icon: '📚',
          name: 'Profe Mágico',
          tagline: 'Sistema de Aprendizagem com IA',
          features: ['Ensino interativo com IA', 'Tradução e áudio automáticos', 'Conteúdo adaptado para crianças', 'Exercícios dinâmicos', 'Experiência educativa guiada'],
          status: 'LIVE',
          link: '→ Visitar site',
        },
          OmniConnect: {
            icon: '🌐',
            name: 'OmniConnect',
            tagline: 'Call Center Intelligence Platform',
            features: ['Dashboards em tempo real', 'Gestão omnicanal (WhatsApp, email, chamadas)', 'KPIs inteligentes e relatórios automatizados', 'Perfis personalizáveis por função', 'Histórico completo de interações', 'Alertas e notificações configuráveis', 'Monitoramento de operações ao vivo', 'Migração assistida de qualquer plataforma'],
            status: 'EM DESENVOLVIMENTO',
            link: '',
          },
      },
      comingSoon: {
        title: 'Em Breve',
        clipcraft: {
          icon: '📱',
          name: 'ClipCraft',
          tagline: 'Centro Multimídia Mobile',
          status: 'MVP Interno',
          features: ['Plataforma de criação de conteúdo multimídia', 'Edição de fotos e vídeos', 'Geração automática de vídeos'],
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
        motto: '“Não construímos ideias. <span class="highlight">Construímos sistemas funcionais.</span>”',
        quote: 'Reduzir o trabalho manual através de sistemas inteligentes<br>que automatizam <strong>operações reais</strong> em empresas,<br>logística e educação.',
      },

      // ─── REVIEWS ───
      reviews: {
        title: 'Avaliações',
        formTitle: 'Deixe sua avaliação',
        nameLabel: 'Seu nome',
        productLabel: 'Produto',
        ratingLabel: 'Avaliação',
        textLabel: 'Sua experiência',
        submit: 'Enviar avaliação',
        sending: 'Enviando...',
        success: 'Obrigado! Sua avaliação será publicada após revisão.',
        error: 'Erro ao enviar. Tente novamente.',
        errorShort: 'O texto deve ter pelo menos 10 caracteres.',
        loading: 'Carregando avaliações...',
        empty: 'Nenhuma avaliação ainda. Seja o primeiro!',
        products: {
          hermes: 'Hermes - AI Assistant',
          courier: 'Courier TMS',
          profe: 'Profe Mágico',
          clipcraft: 'ClipCraft',
        },
        items: [
          {
            text: 'Gostei muito do tradutor, principalmente porque tem áudios de tudo, está muito bonito.',
            author: 'Johana',
            product: 'profe',
            rating: 5,
            date: 'Jun 2026',
          },
          {
            text: 'Me interessa muito, quando vai estar disponível?',
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
        items: ['Desenvolvimento ativo', 'Sistemas reais implantados', 'Iteração contínua'],
      },
      footer: {
        brand: 'BYTE <span class="accent">WIZZARD</span>',
        tagline: 'Estúdio de Sistemas IA & Software',
        builtBy: 'Built by Matías Bagnasco — AI Systems Developer',
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
        fallback: 'Não tenho informações específicas sobre isso, mas posso falar sobre:<br><br>• <strong>Byte Wizzard</strong> — o que é o estúdio<br>• <strong>Luna</strong> — AI Business Assistant<br>• <strong>Hermes</strong> — Bot de Demonstração<br>• <strong>Courier TMS</strong> — Logistics Intelligence<br>• <strong>RolePlay Chat</strong> — Call Center Digital<br>• <strong>ClipCraft</strong> — Content Creation<br>• <strong>Profe Mágico</strong> — AI Learning<br>• <strong>Stack</strong> — tecnologias que usamos<br>• <strong>Visão</strong> — nossa abordagem<br><br>Sobre o que quer saber?',
        suggestions: ['O que é Byte Wizzard?', 'Fale sobre Courier TMS', 'Qual stack usam?', 'O que é RolePlay Chat?'],
        kb: [
          { id: 'identity', keywords: ['byte wizzard', 'byte', 'wizzard', 'estúdio', 'estudio', 'empresa', 'quem é', 'quem e', 'quem são', 'quem sao', 'o que é', 'o que e', 'ai systems studio', 'systems studio', 'fazem'], label: 'Byte Wizzard', response: '<strong>Byte Wizzard</strong> é um AI Systems Studio.<br><br>Construímos produtos de software baseados em inteligência artificial, automação e sistemas modernos para resolver problemas reais em empresas e usuários.<br><br>Não somos uma agência tradicional nem um projeto acadêmico. Somos um estúdio de construção de <strong>produtos funcionais</strong>.<br><br><em>"Construa sistemas AI-first para automação, logística, educação e assistentes inteligentes."</em>' },
          { id: 'what-we-do', keywords: ['fazem', 'produtos', 'serviços', 'servicos', 'desenvolvem', 'criam', 'oferecem', 'ramo', 'trabalham'], label: 'O Que Fazemos', response: 'Projetamos e desenvolvemos:<br><br>• Sistemas de inteligência artificial aplicados<br>• Software de automação de processos<br>• Ferramentas de logística e otimização<br>• Plataformas educacionais com IA<br>• Aplicativos móveis e web full-stack<br>• Integrações com cloud e edge computing' },
          { id: 'luna', keywords: ['luna', 'assistente', 'assistant', 'business', 'chat', 'bot', 'inteligente', 'ai assistant'], label: 'Luna', response: '<strong>Luna</strong> — AI Business Assistant<br><br>Assistente inteligente com memória e contexto empresarial.<br><br><strong>Funções:</strong><br>• Chat com IA em tempo real<br>• Memória por usuário e sessão<br>• Redação automática de e-mails<br>• Suporte interno para empresas<br>• Automação de tarefas administrativas<br><br><em>Status: produto em uso real com cliente.</em>' },
          { id: 'hermes', keywords: ['hermes', 'bot', 'demo', 'assistente', 'chat', 'mensageiro'], label: 'Hermes', response: '<strong>Hermes</strong> — Byte Wizzard Bot de Demonstração ⚡<br><br>Sou o assistente virtual do estúdio. Meu propósito é contar sobre a Byte Wizzard, seus produtos, seu stack e sua visão.<br><br><em>Status: demonstração funcional.</em>' },
          { id: 'roleplay', keywords: ['roleplay', 'role play', 'roleplay chat', 'call center', 'simulação', 'simulacao', 'digital', 'candidatos', 'treinamento'], label: 'RolePlay Chat', response: '<strong>RolePlay Chat</strong> — Simulação de Call Center Digital<br><br>Simulador de interação digital para call centers.<br><br><strong>Cenários:</strong><br>• Reclamação de pedido<br>• Suporte técnico<br>• Consulta de faturamento<br>• Venda consultiva<br>• Interação WhatsApp<br><br><em>Status: demonstração interativa.</em>' },
          { id: 'courier', keywords: ['courier', 'tms', 'logistics', 'logística', 'logistica', 'rotas', 'delivery', 'otimização', 'otimizacao', 'tsp', 'tracking', 'gps', 'entregadores', 'transporte'], label: 'Courier TMS', response: '<strong>Courier TMS</strong> — Logistics Intelligence System<br><br>Sistema de otimização logística para empresas de delivery.<br><br><strong>Funções:</strong><br>• Agrupamento de entregas por zona<br>• Otimização de rotas (TSP)<br>• Tracking GPS em tempo real<br>• Painel administrativo completo<br>• App para entregadores<br>• Importação de pedidos CSV<br><br><em>Status: desenvolvimento ativo + <a href="../courier-tms/index.html" style="color:#00aaff">demonstração funcional</a>.</em>' },
          { id: 'clipcraft', keywords: ['clipcraft', 'clip', 'craft', 'content', 'conteúdo', 'conteudo', 'multimídia', 'multimidia', 'video', 'foto', 'edição', 'edicao', 'mobile', 'criação', 'criacao'], label: 'ClipCraft', response: '<strong>ClipCraft</strong> — Content Creation Platform<br><br>App móvel para criação de conteúdo multimídia.<br><br><strong>Funções planejadas:</strong><br>• Edição de fotos e vídeos<br>• Geração automática de vídeos<br>• Música integrada<br>• Render na nuvem<br>• Exportação direta para o dispositivo<br><br><em>Status: projeto futuro — MVP interno em desenvolvimento.</em>' },
          { id: 'profe', keywords: ['profe', 'mágico', 'magico', 'educação', 'educacao', 'aprendizagem', 'learning', 'inglês', 'ingles', 'crianças', 'criancas', 'ensino', 'escola'], label: 'Profe Mágico', response: '<strong>Profe Mágico</strong> — AI Learning System<br><br>Plataforma educacional com inteligência artificial.<br><br><strong>Funções:</strong><br>• Ensino interativo de inglês<br>• Tradução e áudio automáticos<br>• Conteúdo adaptado para crianças<br>• Exercícios dinâmicos<br>• Aprendizagem guiada<br><br><em>Status: funcional e em iteração.</em>' },
          { id: 'vision', keywords: ['visão', 'visao', 'objetivo', 'goal', 'missão', 'missao', 'propósito', 'proposito', 'futuro', 'buscam'], label: 'Visão', response: '<strong>Visão:</strong> Reduzir o trabalho manual através de sistemas inteligentes.<br><br>Automatizamos processos em:<br><br>• Empresas<br>• Logística<br>• Educação<br>• Criação de conteúdo' },
          { id: 'differential', keywords: ['diferença', 'diferenca', 'diferente', 'distinto', 'unique', 'proposta', 'valor', 'por que', 'porque', 'vantagem'], label: 'Diferencial', response: 'Byte Wizzard não apenas constrói interfaces.<br><br>Construímos <strong>sistemas completos</strong>:<br><br>• frontend + backend + AI + cloud + mobile<br>• Integração real com APIs modernas<br>• Foco em problemas operacionais reais' },
          { id: 'stack', keywords: ['stack', 'tecnologia', 'tech', 'tools', 'ferramentas', 'linguagem', 'framework', 'cloudflare', 'workers', 'node', 'fastify', 'react', 'vite', 'react native', 'expo', 'llama', 'openstreetmap', 'osrm', 'nominatim', 'prisma', 'postgresql', 'postgis', 'motor', 'data engineering', 'engenharia de dados', 'dados', 'analítica', 'analytics', 'processamento', 'pipeline', 'etl', 'geoespacial', 'algoritmos', 'go', 'golang', 'python', 'arquitetura', 'infraestrutura', 'cloud', 'edge', 'serverless', 'vanilla', 'otimização', 'otimizacao', 'performance', 'stack', 'usam', 'backend', 'frontend'], label: 'Stack Tecnológico', response: '<strong>Stack Tecnológico da Byte Wizzard:</strong><br><br>Vou te contar exatamente o que usamos, sem enrolação. Não somos do tipo que põe logo de tecnologia que mal conhece. Isso aqui é o que realmente está rodando nos nossos produtos e ferramentas do dia a dia.<br><br>☁️ <strong>Cloudflare Workers — Edge Computing de Verdade</strong><br>APIs serverless distribuídas globalmente. Latência zero, sem servidor pra gerenciar. Rodamos lógica de negócio no edge com Workers + KV para armazenamento chave-valor. Deploy via <strong>Wrangler CLI</strong>.<br><br>🟢 <strong>Node.js — Backend Robusto</strong><br><strong>Express</strong> e <strong>Fastify</strong> para APIs REST. Serviços em produção rodando em Node — leves, rápidos, sem frescura. Ferramenta certa pra cada problema.<br><br>⚛️ <strong>Frontend Inteligente: Vanilla JS + React + Leaflet</strong><br>Usamos <strong>vanilla JavaScript (ES6+)</strong> como base — zero bundlers, zero transpilação, zero sobrecarga. Landing pages e demos 100% vanilla porque nem tudo precisa de framework. Para apps complexas usamos <strong>React + Vite</strong>. Mapas interativos com <strong>Leaflet.js 1.9.4</strong> + tiles do <strong>OpenStreetMap</strong>. Fontes: <strong>JetBrains Mono</strong> e <strong>Inter</strong> do Google Fonts.<br><br>🗄️ <strong>Bases de Dados: SQLite + Cloudflare KV</strong><br>SQLite em modo <strong>WAL</strong> (Write-Ahead Logging) para alta performance em leitura concorrente — o banco mais usado do mundo, configurado do jeito certo. Cloudflare KV para dados distribuídos no edge.<br><br>🧠 <strong>Inteligência Artificial em Produção</strong><br>Integração com <strong>Llama 3</strong> (Meta), <strong>Workers AI</strong> e APIs externas de IA. Processamento de linguagem natural, geração de conteúdo, automação inteligente. Nossos assistentes têm memória persistente e contexto de sessão.<br><br>📊 <strong>Data Engineering & Geoespacial</strong><br>Isso é um diferencial importante. Rodamos pipelines de dados reais:<br><br>• <strong>Geocodificação</strong> com Nominatim (OpenStreetMap) — endereços para coordenadas com alta precisão<br>• <strong>Otimização de rotas</strong> com OSRM — algoritmo Nearest-Neighbor TSP para rotas de entrega ótimas<br>• <strong>Processamento geoespacial</strong> — GeoJSON, clusters geográficos, análise de zonas<br>• <strong>Data pipelines</strong> — transformação de CSV, estruturas de logística, importação em massa<br>• <strong>Otimização combinatória</strong> — algoritmos aplicados a problemas reais de rotas e entregas<br><br>⚙️ <strong>Linguagens de Sistema: Go & Python</strong><br><strong>Go (Golang)</strong> para o que precisa de performance — solvers TSP, ferramentas CLI, processamento concorrente. <strong>Python</strong> para análise de dados, scripts e notebooks de exploração. Usamos a linguagem certa pra cada problema.<br><br>📦 <strong>Infraestrutura & Deploy</strong><br>• <strong>Render.com</strong> — hospedagem de APIs Express e frontends<br>• <strong>Cloudflare Pages</strong> — landing pages e conteúdo estático<br>• <strong>Wrangler CLI</strong> — deploy de Workers direto do terminal<br>• Sem CI/CD inchado — deploy simples, direto, sem camadas desnecessárias<br><br>🏗️ <strong>Filosofia de Arquitetura</strong><br>Não usamos tecnologia por moda. Cada decisão tem um porquê:<br><br>• Vanilla JS onde framework é exagero (a maioria das landing pages e demos)<br>• Sem build step desnecessário — o que você escreve é o que executa<br>• Edge computing pra velocidade global<br>• SQLite porque pra muitos casos é mais rápido e simples que um PostgreSQL gigante<br>• Frameworks só quando o problema justifica (React pra apps complexas, não pra formulário)<br><br><em>"Ferramentas modernas, decisões conscientes, zero enrolação."</em>' },
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

    // Reviews — now handled by assets/reviews.js (dynamic API load)
    // If reviews.js hasn't loaded, this is a no-op
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
