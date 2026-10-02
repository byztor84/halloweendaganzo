// app.js - Mapa de Halloween de Daganzo (Arquitectura Modular y Gestión de Datos)

const DAGANZO_COORDS = [40.5447, -3.4575];

// ========================================================
// CATÁLOGO OFICIAL DE 50 ICONOS EXCLUSIVOS DE HALLOWEEN
// Cada icono sólo puede ser elegido por UNA casa a la vez.
// Si se elimina una casa, su icono vuelve a quedar disponible.
// ========================================================
const HALLOWEEN_50_ICONS = [
  { id: 'calabaza', emoji: '🎃', name: 'Calabaza Tallada', category: 'caramelos' },
  { id: 'fantasma', emoji: '👻', name: 'Fantasma Espectral', category: 'terror' },
  { id: 'calavera', emoji: '💀', name: 'Calavera Maldita', category: 'terror' },
  { id: 'esqueleto', emoji: '☠️', name: 'Esqueleto Danzante', category: 'terror' },
  { id: 'caramelo', emoji: '🍬', name: 'Caramelo Embrujado', category: 'caramelos' },
  { id: 'piruleta', emoji: '🍭', name: 'Piruleta Venenosa', category: 'caramelos' },
  { id: 'chocolate', emoji: '🍫', name: 'Choco-Murciélago', category: 'caramelos' },
  { id: 'bruja', emoji: '🧙‍♀️', name: 'Bruja del Aquelarre', category: 'magia' },
  { id: 'mago', emoji: '🧙‍♂️', name: 'Nigromante Oscuro', category: 'magia' },
  { id: 'dracula', emoji: '🧛‍♂️', name: 'Conde Drácula', category: 'terror' },
  { id: 'vampira', emoji: '🧛‍♀️', name: 'Reina Vampira', category: 'terror' },
  { id: 'zombi', emoji: '🧟‍♂️', name: 'Zombi Hambriento', category: 'terror' },
  { id: 'zombi_mujer', emoji: '🧟‍♀️', name: 'Caminante Infectada', category: 'terror' },
  { id: 'murcielago', emoji: '🦇', name: 'Murciélago Vampiro', category: 'terror' },
  { id: 'tarantula', emoji: '🕷️', name: 'Tarántula Gigante', category: 'terror' },
  { id: 'telarana', emoji: '🕸️', name: 'Telaraña Ancestral', category: 'terror' },
  { id: 'lobo', emoji: '🐺', name: 'Hombre Lobo Feroz', category: 'terror' },
  { id: 'gato_negro', emoji: '🐈‍⬛', name: 'Gato de Hechicera', category: 'magia' },
  { id: 'buho', emoji: '🦉', name: 'Búho Centinela', category: 'magia' },
  { id: 'cuervo', emoji: '🦅', name: 'Cuervo del Cementerio', category: 'terror' },
  { id: 'serpiente', emoji: '🐍', name: 'Serpiente Asfixiante', category: 'terror' },
  { id: 'escorpion', emoji: '🦂', name: 'Escorpión Negro', category: 'terror' },
  { id: 'mansion', emoji: '🏚️', name: 'Mansión Encantada', category: 'terror' },
  { id: 'castillo', emoji: '🏰', name: 'Castillo Tenebroso', category: 'magia' },
  { id: 'ataud', emoji: '⚰️', name: 'Ataúd de Roble', category: 'terror' },
  { id: 'lapida', emoji: '🪦', name: 'Lápida Olvidada', category: 'terror' },
  { id: 'urna', emoji: '🏺', name: 'Urna Maldita', category: 'terror' },
  { id: 'vela', emoji: '🕯️', name: 'Vela de Cera Negra', category: 'magia' },
  { id: 'caldero', emoji: '🫕', name: 'Caldero Hirviente', category: 'magia' },
  { id: 'pocion', emoji: '🧪', name: 'Poción Alquímica', category: 'magia' },
  { id: 'bola_cristal', emoji: '🔮', name: 'Bola Adivina', category: 'magia' },
  { id: 'pergamino', emoji: '📜', name: 'Grimorio Oculto', category: 'magia' },
  { id: 'varita', emoji: '🪄', name: 'Varita Hechicera', category: 'magia' },
  { id: 'daga', emoji: '🗡️', name: 'Daga de Sombras', category: 'terror' },
  { id: 'hacha', emoji: '🪓', name: 'Hacha del Verdugo', category: 'terror' },
  { id: 'sierra', emoji: '🪚', name: 'Motosierra Sangrienta', category: 'terror' },
  { id: 'payaso', emoji: '🤡', name: 'Payaso Siniestro', category: 'terror' },
  { id: 'demonio', emoji: '👹', name: 'Demonio Cornudo', category: 'terror' },
  { id: 'diablillo', emoji: '👺', name: 'Duende Maléfico', category: 'terror' },
  { id: 'alien', emoji: '👽', name: 'Invasor del Cosmos', category: 'monstruo' },
  { id: 'monstruo', emoji: '👾', name: 'Monstruo Sombrío', category: 'monstruo' },
  { id: 'ojo', emoji: '👁️', name: 'Ojo Espectral', category: 'terror' },
  { id: 'luna_llena', emoji: '🌕', name: 'Luna Llena Roja', category: 'magia' },
  { id: 'luna_cuerno', emoji: '🌙', name: 'Media Luna Encantada', category: 'magia' },
  { id: 'rayo', emoji: '⚡', name: 'Rayo de Tempestad', category: 'terror' },
  { id: 'seta_venenosa', emoji: '🍄', name: 'Hongo Venenoso', category: 'magia' },
  { id: 'rosa_negra', emoji: '🥀', name: 'Rosa Marchita', category: 'terror' },
  { id: 'espejo', emoji: '🪞', name: 'Espejo Poseído', category: 'magia' },
  { id: 'mascara', emoji: '🎭', name: 'Máscara del Pánico', category: 'terror' },
  { id: 'circo', emoji: '🎪', name: 'Circo de Pesadillas', category: 'terror' }
];

// Galería de fotos e ilustraciones de Halloween para que los vecinos puedan elegir con 1 clic
const PHOTO_PRESETS = [
  "assets/haunted_mansion.jpg",
  "assets/hero_banner.jpg",
  "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1572099606223-6e29045d7de3?auto=format&fit=crop&w=700&q=80"
];

const DEFAULT_HOUSES = [
  {
    id: "casa-1",
    title: "La Mansión del Terror de la Villa",
    street: "Plaza de la Villa, 4",
    coords: [40.5448, -3.4572],
    category: "terror",
    iconId: "mansion",
    icon: "🏚️",
    hours: "19:00 - 23:30",
    hasCandies: true,
    kidsFriendly: false,
    inContest: true,
    votes: 42,
    image: "assets/haunted_mansion.jpg",
    description: "Pasaje interactivo con actores disfrazados, niebla ambiental y esqueletos gigantes."
  },
  {
    id: "casa-2",
    title: "El Castillo Dulce de las Brujas",
    street: "Calle Mayor, 18",
    coords: [40.5435, -3.4565],
    category: "caramelos",
    iconId: "caramelo",
    icon: "🍬",
    hours: "18:00 - 21:30",
    hasCandies: true,
    kidsFriendly: true,
    inContest: true,
    votes: 38,
    image: PHOTO_PRESETS[1],
    description: "Reparto de chuches y golosinas sin gluten para todos los peques de Daganzo."
  },
  {
    id: "casa-3",
    title: "El Refugio de los Vampiros",
    street: "Calle San Vicente, 12",
    coords: [40.5458, -3.4589],
    category: "concurso",
    iconId: "calabaza",
    icon: "🎃",
    hours: "19:30 - 22:30",
    hasCandies: true,
    kidsFriendly: true,
    inContest: true,
    votes: 56,
    image: PHOTO_PRESETS[2],
    description: "Fachada completa esculpida a mano con cementerio temático y photocall para familias."
  },
  {
    id: "casa-4",
    title: "La Cueva de las Calabazas",
    street: "Camino de Fresnedillas, 7",
    coords: [40.5422, -3.4595],
    category: "infantil",
    iconId: "caldero",
    icon: "🫕",
    hours: "18:00 - 21:00",
    hasCandies: true,
    kidsFriendly: true,
    inContest: false,
    votes: 21,
    image: PHOTO_PRESETS[3],
    description: "Especial para los más peques (0 a 8 años). Sin sustos bruscos y con música festiva."
  },
  {
    id: "casa-5",
    title: "El Manicomio Abandonado",
    street: "Calle Real, 25",
    coords: [40.5462, -3.4552],
    category: "terror",
    iconId: "calavera",
    icon: "💀",
    hours: "20:00 - 00:00",
    hasCandies: true,
    kidsFriendly: false,
    inContest: true,
    votes: 49,
    image: PHOTO_PRESETS[4],
    description: "Efectos luminosos, sonidos tenebrosos y animatronics activados por movimiento."
  },
  {
    id: "casa-6",
    title: "La Parada del Truco o Trato",
    street: "Calle Constitución, 9",
    coords: [40.5441, -3.4538],
    category: "caramelos",
    iconId: "piruleta",
    icon: "🍭",
    hours: "18:30 - 22:00",
    hasCandies: true,
    kidsFriendly: true,
    inContest: false,
    votes: 29,
    image: PHOTO_PRESETS[5],
    description: "Ven disfrazado y di la frase mágica para llevarte una bolsa de dulces sorpresa."
  }
];

// ========================================================
// GESTOR DE ALMACENAMIENTO DE DATOS (DATA STORE)
// ========================================================
class HouseStore {
  constructor() {
    this.storageKey = 'daganzo_halloween_houses_v4';
    this.houses = this.load();
    this.syncWithServer();
  }

  load() {
    const raw = localStorage.getItem(this.storageKey);
    let loaded = [];
    if (!raw) {
      this.save(DEFAULT_HOUSES);
      return [...DEFAULT_HOUSES];
    }
    try {
      loaded = JSON.parse(raw);
    } catch (e) {
      console.error("Error al parsear casas:", e);
      return [...DEFAULT_HOUSES];
    }

    // Asegurar status y compatibilidad de iconId con los 50 iconos
    loaded = loaded.map(h => {
      if (!h.status) h.status = 'approved';
      if (!h.iconId) {
        const found = HALLOWEEN_50_ICONS.find(i => i.emoji === h.icon);
        h.iconId = found ? found.id : 'calabaza';
      }
      return h;
    });

    return loaded;
  }

  save(houses) {
    this.houses = houses;
    localStorage.setItem(this.storageKey, JSON.stringify(this.houses));
  }

  async syncWithServer() {
    try {
      const res = await fetch('/api/houses?all=true');
      if (res.ok) {
        const data = await res.json();
        if (data.ok && Array.isArray(data.houses)) {
          this.houses = data.houses;
          this.save(this.houses);
          if (window.app) {
            window.app.refreshMapMarkers();
            window.app.renderSidebarHouses();
            window.app.updateGeneralCounters();
            if (window.app.state.isAdminLoggedIn) {
              window.app.renderAdminView();
            }
          }
          return;
        }
      }
      // Si estamos en GitHub Pages (modo estático), cargar data/houses.json
      const staticRes = await fetch('./data/houses.json');
      if (staticRes.ok) {
        const staticHouses = await staticRes.json();
        if (Array.isArray(staticHouses) && staticHouses.length > 0) {
          this.houses = staticHouses;
          this.save(this.houses);
          if (window.app) {
            window.app.refreshMapMarkers();
            window.app.renderSidebarHouses();
            window.app.updateGeneralCounters();
          }
        }
      }
    } catch (err) {
      try {
        const staticRes = await fetch('./data/houses.json');
        if (staticRes.ok) {
          const staticHouses = await staticRes.json();
          if (Array.isArray(staticHouses) && staticHouses.length > 0) {
            this.houses = staticHouses;
            this.save(this.houses);
            if (window.app) {
              window.app.refreshMapMarkers();
              window.app.renderSidebarHouses();
              window.app.updateGeneralCounters();
            }
          }
        }
      } catch (e2) {}
    }
  }

  // Si publicOnly es true, solo devuelve las casas aprobadas para el mapa
  getAll(publicOnly = true) {
    if (publicOnly) {
      return this.houses.filter(h => h.status === 'approved');
    }
    return this.houses;
  }

  getPending() {
    return this.houses.filter(h => h.status === 'pending');
  }

  getApproved() {
    return this.houses.filter(h => h.status === 'approved');
  }

  getById(id) {
    return this.houses.find(h => h.id === id);
  }

  async add(houseData) {
    const newHouse = {
      id: `casa-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      votes: 0,
      createdAt: new Date().toISOString(),
      status: 'pending', // ¡En revisión por el administrador!
      ...houseData
    };

    this.houses.unshift(newHouse);
    this.save(this.houses);

    try {
      await fetch('/api/houses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHouse)
      });
    } catch (e) {}

    return newHouse;
  }

  async approve(id) {
    const idx = this.houses.findIndex(h => h.id === id);
    if (idx !== -1) {
      this.houses[idx].status = 'approved';
      this.save(this.houses);
      try {
        await fetch('/api/admin/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      } catch (e) {}
      return this.houses[idx];
    }
    return null;
  }

  async reject(id) {
    this.houses = this.houses.filter(h => h.id !== id);
    this.save(this.houses);
    try {
      await fetch('/api/admin/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (e) {}
  }

  async update(id, updatedData) {
    const idx = this.houses.findIndex(h => h.id === id);
    if (idx !== -1) {
      this.houses[idx] = { ...this.houses[idx], ...updatedData };
      this.save(this.houses);
      try {
        await fetch('/api/admin/edit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.houses[idx])
        });
      } catch (e) {}
      return this.houses[idx];
    }
    return null;
  }

  async resetDefaults() {
    this.save([...DEFAULT_HOUSES]);
    try {
      await fetch('/api/admin/reset', { method: 'POST' });
    } catch (e) {}
    return this.houses;
  }
}

// ========================================================
// APLICACIÓN PRINCIPAL
// ========================================================
class HalloweenApp {
  constructor() {
    this.store = new HouseStore();
    this.map = null;
    this.currentTileLayer = null;
    this.currentLabelsLayer = null;
    this.markers = new Map();
    this.selectedHouse = null;
    this.activeFilter = 'all';
    this.userGpsLocation = null;
    this.userGpsMarker = null;

    // Coordenadas seleccionadas al pinchar en el mapa
    this.pickingCoordinatesFor = null;
    this.tempPickerMarker = null;
    this.tempCoords = null;

    // Estado de sesión
    this.currentUser = JSON.parse(localStorage.getItem('daganzo_user') || 'null');
    this.adminTab = 'pending';
    this.state = {
      alias: localStorage.getItem('daganzo_alias') || 'Vecino Valiente',
      visited: JSON.parse(localStorage.getItem('daganzo_visited') || '[]'),
      voted: JSON.parse(localStorage.getItem('daganzo_voted') || '{}'),
      isAdminLoggedIn: sessionStorage.getItem('daganzo_admin_auth') === 'true'
    };

    this.selectedPresetPhoto = PHOTO_PRESETS[0];

    this.init();
  }

  init() {
    this.initMap();
    this.setupUIEvents();
    this.renderPresetPhotosSelectors();
    this.renderSidebarHouses();
    this.updatePassCounters();
    this.updateGeneralCounters();
    this.updateUserSessionUI();
  }

  // ========================================================
  // NAVEGACIÓN ENTRE VISTAS (INICIO / MAPA)
  // ========================================================
  switchView(viewName) {
    const viewHome = document.getElementById('viewHome');
    const viewMap = document.getElementById('viewMap');

    if (viewName === 'map') {
      viewHome.classList.add('view-hidden');
      viewMap.classList.remove('view-hidden');
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 150);
    } else {
      viewMap.classList.add('view-hidden');
      viewHome.classList.remove('view-hidden');
    }
  }

  toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebarPanel');
    if (!sidebar) return;

    if (typeof forceState === 'boolean') {
      sidebar.classList.toggle('collapsed', !forceState);
    } else {
      sidebar.classList.toggle('collapsed');
    }

    setTimeout(() => {
      if (this.map) this.map.invalidateSize();
    }, 310);
  }

  // ========================================================
  // INICIALIZACIÓN DEL MAPA (GOOGLE MAPS CALLEJERO & ALTA RESOLUCIÓN)
  // ========================================================
  initMap() {
    this.map = L.map('map', {
      center: DAGANZO_COORDS,
      zoom: 16,
      minZoom: 13,
      maxZoom: 20,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // Cargar directamente el callejero oficial con todos los nombres de calles visibles
    this.setMapLayer('street');

    // Click en el mapa para posicionar casa
    this.map.on('click', (e) => {
      this.handleMapClick(e.latlng.lat, e.latlng.lng);
    });

    this.refreshMapMarkers();
  }

  setMapLayer(type) {
    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
      this.currentTileLayer = null;
    }
    if (this.currentLabelsLayer) {
      this.map.removeLayer(this.currentLabelsLayer);
      this.currentLabelsLayer = null;
    }

    document.querySelectorAll('.layer-btn, .layer-switch-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.layer === type);
    });

    if (type === 'satellite') {
      // Google Satélite Híbrido limpio: fotos aéreas con todas las calles rotuladas SIN saturar de negocios
      this.currentTileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=y&apistyle=s.t:2%7Cp.v:off&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      }).addTo(this.map);

    } else if (type === 'night') {
      // Modo Noche Spooky: CartoDB Dark Matter con TODOS los nombres de calles y plazas de Daganzo legibles
      this.currentTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }).addTo(this.map);

    } else {
      // Callejero Google Maps LIMPIO (por defecto): todos los nombres de calles de Daganzo SIN negocios comerciales
      this.currentTileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&apistyle=s.t:2%7Cp.v:off&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps'
      }).addTo(this.map);
    }
  }

  // ========================================================
  // MARCADORES EN EL MAPA
  // ========================================================
  refreshMapMarkers() {
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers.clear();

    const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    const houses = this.store.getAll();

    houses.forEach(house => {
      // Filtrar por categoría
      if (this.activeFilter !== 'all' && house.category !== this.activeFilter) return;

      // Filtrar por búsqueda
      if (searchTerm) {
        const matchesTitle = house.title.toLowerCase().includes(searchTerm);
        const matchesStreet = house.street.toLowerCase().includes(searchTerm);
        if (!matchesTitle && !matchesStreet) return;
      }

      const isVisited = this.state.visited.includes(house.id);
      const matched = HALLOWEEN_50_ICONS.find(i => i.id === house.iconId || i.emoji === house.icon);
      const iconEmoji = matched ? matched.emoji : (house.icon || '🎃');

      const pinHtml = `
        <div class="pin-bubble-glow pin-cat-${house.category}">
          <span class="pin-inner-emoji">${iconEmoji}</span>
          ${isVisited ? '<span class="pin-checked-badge">✓</span>' : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'spooky-pin-wrap',
        iconSize: [38, 38],
        iconAnchor: [19, 34]
      });

      const marker = L.marker(house.coords, { icon: customIcon }).addTo(this.map);

      marker.on('click', () => {
        this.openHouseCard(house);
      });

      this.markers.set(house.id, marker);
    });

    this.renderSidebarHouses();
    this.updateGeneralCounters();
  }

  // ========================================================
  // MENÚ LATERAL: LISTA RESUMEN DE CASAS
  // ========================================================
  renderSidebarHouses() {
    const list = document.getElementById('sidebarHousesList');
    if (!list) return;

    const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    const houses = this.store.getAll().filter(h => {
      if (this.activeFilter !== 'all' && h.category !== this.activeFilter) return false;
      if (searchTerm) {
        return h.title.toLowerCase().includes(searchTerm) || h.street.toLowerCase().includes(searchTerm);
      }
      return true;
    });

    if (houses.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 6px;">👻</div>
          <p style="font-size: 0.85rem; color: #fff;">No se encontraron casas</p>
          <p style="font-size: 0.72rem; margin-top: 2px;">Prueba a cambiar el filtro</p>
        </div>
      `;
      return;
    }

    list.innerHTML = houses.map(h => {
      const isVisited = this.state.visited.includes(h.id);
      const matched = HALLOWEEN_50_ICONS.find(i => i.id === h.iconId || i.emoji === h.icon);
      const iconEmoji = matched ? matched.emoji : (h.icon || '🎃');

      return `
        <div class="side-house-card ${this.selectedHouse?.id === h.id ? 'selected' : ''}" onclick="window.app.selectHouseFromSidebar('${h.id}')">
          <img class="side-house-thumb" src="${h.image}" alt="">
          <div class="side-house-info">
            <h4><span>${iconEmoji}</span> ${h.title}</h4>
            <p>📍 ${h.street}</p>
            <div class="side-house-meta">
              <span>🕒 ${h.hours || '19:00 - 22:30'}</span>
              <span style="color: var(--gold);">⭐ ${h.votes}</span>
              ${isVisited ? '<span style="color: var(--emerald);">✓ Visitada</span>' : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  selectHouseFromSidebar(id) {
    const house = this.store.getById(id);
    if (house) {
      this.openHouseCard(house);
      // En pantallas pequeñas, colapsar el menú lateral para ver el mapa
      if (window.innerWidth <= 768) {
        this.toggleSidebar(false);
      }
    }
  }

  openHouseCard(house) {
    this.selectedHouse = house;
    window.spookyAudio?.playStinger('creak');

    this.map.panTo(house.coords, { animate: true, duration: 0.4 });

    const matched = HALLOWEEN_50_ICONS.find(i => i.id === house.iconId || i.emoji === house.icon);
    const iconEmoji = matched ? matched.emoji : (house.icon || '🎃');

    const card = document.getElementById('houseDetailCard');
    document.getElementById('cardImg').src = house.image;
    document.getElementById('cardTitle').innerHTML = `<span style="font-size:1.3rem;">${iconEmoji}</span> ${house.title}`;
    document.getElementById('cardStreet').textContent = `📍 ${house.street}`;
    document.getElementById('cardHours').textContent = `🕒 ${house.hours || '19:00 - 22:30'}`;
    document.getElementById('cardVotes').textContent = `⭐ ${house.votes} votos`;
    document.getElementById('cardDesc').textContent = house.description;

    // Check-in botón (letras blancas nítidas con alto contraste)
    const isVisited = this.state.visited.includes(house.id);
    const checkinBtn = document.getElementById('btnCardCheckin');
    if (isVisited) {
      checkinBtn.innerHTML = '<span>✓ ¡Visitada!</span>';
      checkinBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      checkinBtn.style.color = '#ffffff';
    } else {
      checkinBtn.innerHTML = '<span>🎃 Marcar Visitada</span>';
      checkinBtn.style.background = 'linear-gradient(135deg, #ff5500, #e03100)';
      checkinBtn.style.color = '#ffffff';
    }

    // Votar botón
    const voteBtn = document.getElementById('btnCardVote');
    const hasVoted = this.state.voted[house.id];
    if (hasVoted) {
      voteBtn.innerHTML = '<span>★ Voto emitido</span>';
      voteBtn.style.opacity = '0.6';
    } else {
      voteBtn.innerHTML = '<span>⭐ Votar</span>';
      voteBtn.style.opacity = '1';
    }

    // Botón Ver en el mapa
    const viewOnMapBtn = document.getElementById('btnCardViewOnMap');
    if (viewOnMapBtn) {
      viewOnMapBtn.onclick = (e) => {
        if (e) e.stopPropagation();
        this.highlightHouseOnMap(house.id);
      };
    }

    card.classList.add('open');
    document.getElementById('houseDetailBackdrop')?.classList.add('open');
    this.renderSidebarHouses();
  }

  closeHouseCard() {
    document.getElementById('houseDetailCard')?.classList.remove('open');
    document.getElementById('houseDetailBackdrop')?.classList.remove('open');
    this.selectedHouse = null;
    this.renderSidebarHouses();
  }

  // ========================================================
  // VER CASA EN EL MAPA CON RESALTADO ANIMADO
  // ========================================================
  highlightHouseOnMap(houseId) {
    const id = houseId || this.selectedHouse?.id;
    if (!id) return;
    const house = this.store.getById(id);
    if (!house) return;

    // 1. Asegurar vista de mapa
    this.switchView('map');

    // 2. Cerrar tarjeta de detalle para despejar la vista
    this.closeHouseCard();

    // 3. Colapsar el menú lateral
    this.toggleSidebar(false);

    // 4. Volar al punto en el mapa con zoom de alta resolución
    if (this.map) {
      this.map.flyTo(house.coords, 18, { animate: true, duration: 0.8 });
    }

    // 5. Localizar marcador y aplicar efecto neón que bota y pulsa
    const marker = this.markers.get(house.id);
    if (marker) {
      const el = marker.getElement();
      if (el) {
        document.querySelectorAll('.pin-spotlight-active').forEach(p => p.classList.remove('pin-spotlight-active'));
        el.classList.add('pin-spotlight-active');

        // Abrir popup informativo encima del pin
        const matched = HALLOWEEN_50_ICONS.find(i => i.id === house.iconId || i.emoji === house.icon);
        const iconEmoji = matched ? matched.emoji : (house.icon || '🎃');

        marker.bindPopup(`
          <div style="text-align: center; padding: 6px 4px; font-family: var(--font-body);">
            <div style="font-size: 1.4rem; margin-bottom: 2px;">${iconEmoji}</div>
            <b style="color: #ffaa55; font-size: 0.95rem;">${house.title}</b>
            <p style="font-size: 0.78rem; color: #cbd5e1; margin: 3px 0 0 0;">📍 ${house.street}</p>
          </div>
        `).openPopup();

        setTimeout(() => {
          el.classList.remove('pin-spotlight-active');
        }, 6000);
      }
    }

    this.showToast(`📍 Mostrando "${house.title}" en el mapa`);
  }

  // ========================================================
  // COMPARTIR MAPA (WHATSAPP / NATIVO / PORTAPAPELES UNIVERSAL)
  // ========================================================
  copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) resolve();
        else reject(new Error('execCommand copy no disponible'));
      } catch (err) {
        document.body.removeChild(textArea);
        reject(err);
      }
    });
  }

  shareMap() {
    this.openModal('modalShare');
    this.prepareShareModal();
  }

  prepareShareModal() {
    const url = window.location.href;
    const shareTitle = '🎃 Mapa de Halloween de Daganzo 2026';
    const shareText = `¡Descubre las casas más terroríficas, pasajes del terror y dónde dan caramelos en Daganzo de Arriba!\n${url}`;

    const urlDisplay = document.getElementById('shareUrlDisplay');
    if (urlDisplay) urlDisplay.textContent = url;

    // Configurar enlace de WhatsApp
    const btnWhatsApp = document.getElementById('btnShareWhatsApp');
    if (btnWhatsApp) {
      btnWhatsApp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    }

    // Configurar enlace de Telegram
    const btnTelegram = document.getElementById('btnShareTelegram');
    if (btnTelegram) {
      btnTelegram.href = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareTitle)}`;
    }

    // Botón nativo si está disponible en entorno seguro
    const btnNative = document.getElementById('btnShareNative');
    if (btnNative) {
      if (navigator.share && window.isSecureContext) {
        btnNative.style.display = 'flex';
      } else {
        btnNative.style.display = 'none';
      }
    }
  }

  handleCopyShareUrl() {
    const url = window.location.href;
    this.copyTextToClipboard(url).then(() => {
      this.showToast('¡Enlace copiado al portapapeles! 📋');
      const hint = document.getElementById('shareCopyHint');
      if (hint) {
        hint.textContent = '¡Copiado con éxito! ✔️';
        hint.style.color = '#4ade80';
        setTimeout(() => {
          hint.textContent = 'Toca para copiar al portapapeles';
          hint.style.color = 'var(--text-muted)';
        }, 2500);
      }
    }).catch(() => {
      window.prompt('Copia este enlace para compartir:', url);
    });
  }

  // ========================================================
  // ASISTENTE DE APUNTAR CASAS (WIZARD DE 5 PASOS CON 50 ICONOS)
  // ========================================================

  // Diccionario de calles de Daganzo de Arriba para geolocalización instantánea
  getDaganzoStreetCoords(streetName) {
    if (!streetName) return null;
    const s = streetName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const streetMap = {
      'villa': [40.5448, -3.4572],
      'mayor': [40.5435, -3.4565],
      'san vicente': [40.5458, -3.4589],
      'fresnedillas': [40.5422, -3.4595],
      'real': [40.5462, -3.4552],
      'constitucion': [40.5441, -3.4538],
      'don quijote': [40.5451, -3.4545],
      'valdeamor': [40.5470, -3.4560],
      'lomas': [40.5410, -3.4580],
      'cervantes': [40.5430, -3.4550],
      'orquideas': [40.5440, -3.4590],
      'alcala': [40.5425, -3.4530]
    };

    for (const key in streetMap) {
      if (s.includes(key)) {
        return streetMap[key];
      }
    }
    return null;
  }

  // Obtiene los 50 iconos con su estado (disponible / reservado por otra casa)
  getIconsWithStatus(excludeHouseId = null) {
    const houses = this.store.getAll(false);
    const takenMap = new Map(); // iconId -> house

    houses.forEach(h => {
      if (h.id === excludeHouseId) return;
      // Emparejar por iconId explícito o por coincidencia de emoji
      const match = HALLOWEEN_50_ICONS.find(i => i.id === h.iconId || i.emoji === h.icon);
      if (match) {
        takenMap.set(match.id, h);
      }
    });

    return HALLOWEEN_50_ICONS.map(icon => {
      const isTaken = takenMap.has(icon.id);
      return {
        ...icon,
        isAvailable: !isTaken,
        reservedBy: isTaken ? takenMap.get(icon.id) : null
      };
    });
  }

  getAvailableIcons(excludeHouseId = null) {
    return this.getIconsWithStatus(excludeHouseId).filter(i => i.isAvailable);
  }

  // Inicializa el Asistente Embrujado
  initWizard() {
    this.wizard = {
      step: 1,
      coords: [DAGANZO_COORDS[0], DAGANZO_COORDS[1]],
      street: '',
      name: '',
      iconId: '',
      sustoLevel: 'infantil',
      candies: 'normal',
      effects: [],
      hours: '19:00 - 22:30',
      image: PHOTO_PRESETS[0],
      desc: '',
      iconCategoryFilter: 'all'
    };

    // Preseleccionar el primer icono que esté libre de los 50
    const available = this.getAvailableIcons();
    this.wizard.iconId = available.length > 0 ? available[0].id : HALLOWEEN_50_ICONS[0].id;

    // Reset de campos
    const nameIn = document.getElementById('houseName');
    if (nameIn) nameIn.value = '';
    const streetIn = document.getElementById('houseStreet');
    if (streetIn) streetIn.value = '';
    const hoursIn = document.getElementById('houseHours');
    if (hoursIn) hoursIn.value = '19:00 - 22:30';
    const customImg = document.getElementById('houseCustomImage');
    if (customImg) customImg.value = '';
    const descIn = document.getElementById('houseDesc');
    if (descIn) descIn.value = '';

    const suggBox = document.getElementById('daganzoAddressSuggestions');
    if (suggBox) {
      suggBox.style.display = 'none';
      suggBox.innerHTML = '';
    }

    // Resetear chips interactivos de sustómetro, chuches y efectos
    document.querySelectorAll('.sustometro-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.level === 'infantil');
    });
    document.querySelectorAll('.spooky-checkbox-chip[data-candy]').forEach(c => {
      c.classList.toggle('selected', c.dataset.candy === 'normal');
    });
    document.querySelectorAll('.spooky-checkbox-chip[data-effect]').forEach(c => {
      c.classList.remove('selected');
    });

    this.goToWizardStep(1);
    this.renderWizardIconsGrid(this.wizard.iconCategoryFilter);
    this.updateWizardSelectedIconDisplay();
    this.renderPresetPhotosSelectors();

    setTimeout(() => {
      this.initWizardMiniMap();
    }, 180);
  }

  // Mini mapa interactivo dentro del asistente
  initWizardMiniMap() {
    const container = document.getElementById('wizardMiniMap');
    if (!container) return;

    if (!this.wizardMiniMap) {
      this.wizardMiniMap = L.map('wizardMiniMap', {
        center: this.wizard.coords,
        zoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      // Mapa callejero de Google Maps limpio para que el vecino vea su calle con total claridad
      L.tileLayer('https://{s}.google.com/vt/lyrs=m&apistyle=s.t:2%7Cp.v:off&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20,
        attribution: ''
      }).addTo(this.wizardMiniMap);

      const miniPinIcon = L.divIcon({
        html: `<div class="pin-bubble-glow pin-cat-caramelos" style="width:34px;height:34px;"><span class="pin-inner-emoji" id="miniMapMarkerEmoji">🎃</span></div>`,
        className: 'spooky-pin-wrap',
        iconSize: [34, 34],
        iconAnchor: [17, 30]
      });

      this.wizardMiniMarker = L.marker(this.wizard.coords, {
        icon: miniPinIcon,
        draggable: true
      }).addTo(this.wizardMiniMap);

      this.wizardMiniMarker.on('dragend', (e) => {
        const pos = e.target.getLatLng();
        this.setWizardCoordinates(pos.lat, pos.lng);
      });

      this.wizardMiniMap.on('click', (e) => {
        this.setWizardCoordinates(e.latlng.lat, e.latlng.lng);
      });
    } else {
      this.wizardMiniMarker.setLatLng(this.wizard.coords);
      this.wizardMiniMap.setView(this.wizard.coords, 16);
    }

    setTimeout(() => {
      if (this.wizardMiniMap) this.wizardMiniMap.invalidateSize();
    }, 200);
  }

  setWizardCoordinates(lat, lng, shouldReverseGeocode = true) {
    this.wizard.coords = [lat, lng];
    if (this.wizardMiniMarker) {
      this.wizardMiniMarker.setLatLng([lat, lng]);
    }
    const badge = document.getElementById('wizardLocStatusText');
    if (badge) {
      badge.innerHTML = `📍 Ubicación fijada: <b>${lat.toFixed(4)}, ${lng.toFixed(4)}</b> en Daganzo ✔️`;
    }

    if (shouldReverseGeocode) {
      this.reverseGeocodeCoordinates(lat, lng);
    }
  }

  // Detecta automáticamente la calle y número al pinchar o arrastrar en el mapa
  async reverseGeocodeCoordinates(lat, lng) {
    const spinner = document.getElementById('addressLookupSpinner');
    const streetInput = document.getElementById('houseStreet');
    const badge = document.getElementById('wizardLocStatusText');

    if (spinner) spinner.style.display = 'inline-block';

    try {
      const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&location=${lng},${lat}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data && data.address) {
        let addr = data.address.Address || data.address.ShortLabel || data.address.Match_addr || '';
        // Limpiar para mostrar principalmente la calle y número
        addr = addr.replace(/, Comunidad de Madrid, ESP/i, '').replace(/, ESP/i, '').replace(/, 28814/i, '');
        if (addr && !addr.toLowerCase().includes('daganzo')) {
          addr += ', Daganzo de Arriba';
        }

        if (addr) {
          if (streetInput) {
            streetInput.value = addr;
            this.wizard.street = addr;
          }
          if (badge) {
            badge.innerHTML = `📍 <b>${addr}</b> (Puedes editarla)`;
          }
        }
      }
    } catch (err) {
      console.warn('Error en reverse geocoding:', err);
    } finally {
      if (spinner) spinner.style.display = 'none';
    }
  }

  // Sugerencias automáticas de calles y números de Daganzo de Arriba
  async handleAddressAutocomplete(query) {
    const suggestionsContainer = document.getElementById('daganzoAddressSuggestions');
    const spinner = document.getElementById('addressLookupSpinner');
    if (!suggestionsContainer) return;

    const q = (query || '').trim();
    if (q.length < 2) {
      suggestionsContainer.style.display = 'none';
      suggestionsContainer.innerHTML = '';
      return;
    }

    if (spinner) spinner.style.display = 'inline-block';

    try {
      const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${encodeURIComponent(q)}&location=-3.4575,40.5447&distance=6000&countryCode=ESP&f=json`;
      const res = await fetch(url);
      const data = await res.json();

      let suggestions = [];
      if (data && Array.isArray(data.suggestions)) {
        // Filtrar y priorizar sugerencias de Daganzo de Arriba
        suggestions = data.suggestions.filter(s => {
          const t = s.text.toLowerCase();
          return t.includes('daganzo') || t.includes('28814');
        });

        if (suggestions.length === 0 && data.suggestions.length > 0) {
          suggestions = data.suggestions.slice(0, 4);
        }
      }

      // Si la API remota no devolvió sugerencias, usar índice local de Daganzo
      if (suggestions.length === 0) {
        const localStreets = [
          'Plaza de la Villa',
          'Calle Mayor',
          'Calle San Vicente',
          'Calle Real',
          'Calle Constitución',
          'Camino de Fresnedillas',
          'Calle Don Quijote',
          'Calle Valdeamor',
          'Avenida de las Lomas',
          'Calle Cervantes',
          'Calle Orquídeas',
          'Calle Alcalá',
          'Calle Goya',
          'Calle Velázquez',
          'Calle Ronda del Parque',
          'Paseo de las Lomas',
          'Calle de la Iglesia',
          'Calle Escuelas'
        ];
        const qNorm = q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const matchedLocal = localStreets.filter(st => {
          const stNorm = st.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return stNorm.includes(qNorm);
        });

        const numberMatch = q.match(/\d+/);
        const numSuffix = numberMatch ? ` ${numberMatch[0]}` : '';

        matchedLocal.slice(0, 5).forEach(st => {
          suggestions.push({
            text: `${st}${numSuffix}, Daganzo de Arriba, Madrid`,
            isLocal: true
          });
        });
      }

      if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
      }

      // Renderizar el desplegable de sugerencias
      suggestionsContainer.innerHTML = suggestions.map(s => {
        const cleanText = s.text.replace(/, Comunidad de Madrid, ESP/i, '').replace(/, ESP/i, '').replace(/, 28814/i, '');
        return `
          <div class="suggestion-item" onclick="window.app.selectAddressSuggestion('${cleanText.replace(/'/g, "\\'")}', '${s.magicKey || ''}')">
            <span class="sugg-pin">📍</span>
            <span class="sugg-text">${cleanText}</span>
          </div>
        `;
      }).join('');

      suggestionsContainer.style.display = 'block';

    } catch (e) {
      console.warn('Error en autocompletado:', e);
    } finally {
      if (spinner) spinner.style.display = 'none';
    }
  }

  // Al hacer clic en una sugerencia de dirección
  async selectAddressSuggestion(fullAddress, magicKey = '') {
    const input = document.getElementById('houseStreet');
    const suggestionsContainer = document.getElementById('daganzoAddressSuggestions');
    if (suggestionsContainer) suggestionsContainer.style.display = 'none';

    if (input) {
      input.value = fullAddress;
      this.wizard.street = fullAddress;
    }

    const spinner = document.getElementById('addressLookupSpinner');
    if (spinner) spinner.style.display = 'inline-block';

    try {
      let coords = null;

      if (magicKey) {
        const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?magicKey=${magicKey}&f=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (data?.candidates?.[0]?.location) {
          coords = [data.candidates[0].location.y, data.candidates[0].location.x];
        }
      }

      if (!coords) {
        const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=${encodeURIComponent(fullAddress + ' Daganzo de Arriba')}&f=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (data?.candidates?.[0]?.location) {
          coords = [data.candidates[0].location.y, data.candidates[0].location.x];
        }
      }

      if (!coords) {
        coords = this.getDaganzoStreetCoords(fullAddress) || DAGANZO_COORDS;
      }

      // Posicionar en el mapa sin relanzar el reverse-geocode
      this.setWizardCoordinates(coords[0], coords[1], false);
      if (this.wizardMiniMap) {
        this.wizardMiniMap.setView(coords, 17, { animate: true });
      }

      const badge = document.getElementById('wizardLocStatusText');
      if (badge) {
        badge.innerHTML = `📍 <b>${fullAddress}</b> ✔️`;
      }
      this.showToast('¡Ubicación fijada en Daganzo! 🎯');

    } catch (e) {
      console.warn('Error al geocodificar:', e);
    } finally {
      if (spinner) spinner.style.display = 'none';
    }
  }

  // Cambio y navegación entre pasos del Wizard
  goToWizardStep(stepNum) {
    // Validaciones antes de avanzar
    if (stepNum > this.wizard.step) {
      if (this.wizard.step === 1) {
        const streetVal = document.getElementById('houseStreet')?.value.trim();
        if (!streetVal) {
          this.showToast('Por favor, indica la dirección de tu casa en Daganzo.');
          document.getElementById('houseStreet')?.focus();
          return;
        }
        this.wizard.street = streetVal;
      } else if (this.wizard.step === 2) {
        const nameVal = document.getElementById('houseName')?.value.trim();
        if (!nameVal) {
          this.showToast('Escribe un nombre o temática para tu decoración.');
          document.getElementById('houseName')?.focus();
          return;
        }
        this.wizard.name = nameVal;

        // Comprobar que el icono seleccionado siga disponible
        const status = this.getIconsWithStatus().find(i => i.id === this.wizard.iconId);
        if (!status || !status.isAvailable) {
          this.showToast('Debes elegir un icono de los disponibles (los marcados con 🔒 ya están ocupados).');
          return;
        }
      }
    }

    this.wizard.step = stepNum;

    // Actualizar paneles
    document.querySelectorAll('.wizard-step-panel').forEach((panel, i) => {
      panel.classList.toggle('active', i + 1 === stepNum);
    });

    // Actualizar barra de progreso e indicadores
    const progressBar = document.getElementById('wizardProgressBar');
    if (progressBar) {
      progressBar.style.width = `${(stepNum / 5) * 100}%`;
    }

    document.querySelectorAll('.wizard-step-node').forEach((node) => {
      const nodeStep = parseInt(node.dataset.step);
      node.classList.toggle('active', nodeStep === stepNum);
      node.classList.toggle('completed', nodeStep < stepNum);
    });

    // Botones de navegación
    const prevBtn = document.getElementById('btnWizardPrev');
    const nextBtn = document.getElementById('btnWizardNext');
    const submitBtn = document.getElementById('btnWizardSubmit');

    if (prevBtn) prevBtn.style.visibility = stepNum > 1 ? 'visible' : 'hidden';

    if (stepNum === 5) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'inline-flex';
      this.updateWizardPreview();
    } else {
      if (nextBtn) nextBtn.style.display = 'inline-flex';
      if (submitBtn) submitBtn.style.display = 'none';
    }

    // Efectos por paso
    if (stepNum === 1) {
      setTimeout(() => {
        if (this.wizardMiniMap) this.wizardMiniMap.invalidateSize();
      }, 150);
    } else if (stepNum === 2) {
      this.renderWizardIconsGrid(this.wizard.iconCategoryFilter || 'all');
      this.updateWizardSelectedIconDisplay();
    }
  }

  // Renderiza los 50 iconos de Halloween con bloqueo exclusivo
  renderWizardIconsGrid(catFilter = 'all') {
    const grid = document.getElementById('wizardIconsGrid');
    if (!grid) return;

    this.wizard.iconCategoryFilter = catFilter;
    const iconsWithStatus = this.getIconsWithStatus();
    const availableCount = iconsWithStatus.filter(i => i.isAvailable).length;

    const countBadge = document.getElementById('wizardIconsAvailableCount');
    if (countBadge) {
      countBadge.textContent = `${availableCount} de 50 disponibles`;
    }

    const filtered = iconsWithStatus.filter(i => {
      if (catFilter === 'all') return true;
      return i.category === catFilter;
    });

    grid.innerHTML = filtered.map(icon => {
      const isSelected = this.wizard.iconId === icon.id;
      const isTaken = !icon.isAvailable;
      const takenByTitle = icon.reservedBy ? icon.reservedBy.title : 'otra casa';

      return `
        <div class="icon-pick-card ${isSelected ? 'selected' : ''} ${isTaken ? 'taken' : ''}"
             data-icon-id="${icon.id}"
             title="${isTaken ? `🔒 Reservado por: ${takenByTitle}` : `${icon.name} (Disponible)`}"
             onclick="window.app.selectWizardIcon('${icon.id}')">
          <span class="icon-glyph">${icon.emoji}</span>
          <span class="icon-name">${icon.name}</span>
          ${isTaken ? `<span class="icon-taken-tag" title="Reservado por ${takenByTitle}">🔒</span>` : ''}
        </div>
      `;
    }).join('');
  }

  // Selecciona un icono exclusivo
  selectWizardIcon(iconId) {
    const status = this.getIconsWithStatus().find(i => i.id === iconId);
    if (!status || !status.isAvailable) {
      const takenBy = status?.reservedBy?.title || 'otra casa';
      this.showToast(`🔒 Este icono ya está reservado por "${takenBy}". ¡Elige otro de los disponibles!`);
      return;
    }

    this.wizard.iconId = iconId;
    window.spookyAudio?.playStinger('unlock');
    this.renderWizardIconsGrid(this.wizard.iconCategoryFilter || 'all');
    this.updateWizardSelectedIconDisplay();
  }

  updateWizardSelectedIconDisplay() {
    const icon = HALLOWEEN_50_ICONS.find(i => i.id === this.wizard.iconId) || HALLOWEEN_50_ICONS[0];
    const emojiEl = document.getElementById('wizardSelectedPinEmoji');
    const nameEl = document.getElementById('wizardSelectedIconName');
    const lockEl = document.getElementById('wizardSelectedIconLockStatus');
    const miniMapEmoji = document.getElementById('miniMapMarkerEmoji');

    if (emojiEl) emojiEl.textContent = icon.emoji;
    if (nameEl) nameEl.textContent = icon.name;
    if (lockEl) lockEl.innerHTML = `✓ Icono exclusivo reservado para tu casa`;
    if (miniMapEmoji) miniMapEmoji.textContent = icon.emoji;
  }

  // Vista previa de la tarjeta en Paso 5
  updateWizardPreview() {
    const title = document.getElementById('houseName')?.value.trim() || 'Mi Fachada Encantada';
    const street = document.getElementById('houseStreet')?.value.trim() || 'Daganzo de Arriba';
    const hours = document.getElementById('houseHours')?.value.trim() || '19:00 - 22:30';
    const desc = document.getElementById('houseDesc')?.value.trim() || '¡Decoración vecinal lista para Halloween en Daganzo!';
    const customImg = document.getElementById('houseCustomImage')?.value.trim();
    const imgUrl = customImg || this.wizard.image || PHOTO_PRESETS[0];

    const iconItem = HALLOWEEN_50_ICONS.find(i => i.id === this.wizard.iconId) || HALLOWEEN_50_ICONS[0];

    const sustoLabels = {
      infantil: '👶 Para Peques',
      caramelos: '🎃 Misterio',
      terror: '💀 Pasaje Terror'
    };

    const candyLabels = {
      normal: '🍬 Chuches',
      glutenfree: '🌾 Sin Gluten (Celíacos)',
      chocolates: '🍫 Chocolates',
      none: '🚫 Solo Exhibición'
    };

    const imgEl = document.getElementById('wizardPreviewImg');
    const titleEl = document.getElementById('wizardPreviewTitle');
    const streetEl = document.getElementById('wizardPreviewStreet');
    const hoursEl = document.getElementById('wizardPreviewHours');
    const candiesEl = document.getElementById('wizardPreviewCandies');
    const sustoEl = document.getElementById('wizardPreviewSusto');
    const descEl = document.getElementById('wizardPreviewDesc');
    const pinEmojiEl = document.getElementById('wizardPreviewPinEmoji');

    if (imgEl) imgEl.src = imgUrl;
    if (titleEl) titleEl.textContent = title;
    if (streetEl) streetEl.textContent = `📍 ${street}`;
    if (hoursEl) hoursEl.textContent = `🕒 ${hours}`;
    if (candiesEl) candiesEl.textContent = candyLabels[this.wizard.candies] || '🍬 Reparto Chuches';
    if (sustoEl) sustoEl.textContent = sustoLabels[this.wizard.sustoLevel] || '👶 Para Peques';
    if (descEl) descEl.textContent = desc;
    if (pinEmojiEl) pinEmojiEl.textContent = iconItem.emoji;
  }

  // Registro y publicación instantánea
  async handleUserRegisterHouse() {
    const name = document.getElementById('houseName')?.value.trim() || 'Casa Encantada';
    const street = document.getElementById('houseStreet')?.value.trim() || 'Daganzo de Arriba';
    const hours = document.getElementById('houseHours')?.value.trim() || '19:00 - 22:30';
    const desc = document.getElementById('houseDesc')?.value.trim() || '¡Nueva decoración vecinal en Daganzo!';
    const customImg = document.getElementById('houseCustomImage')?.value.trim();
    const image = customImg || this.wizard.image || PHOTO_PRESETS[0];

    // Doble comprobación: asegurarse de que el icono elegido sigue libre
    const status = this.getIconsWithStatus().find(i => i.id === this.wizard.iconId);
    if (status && !status.isAvailable) {
      this.showToast('¡Ese icono acaba de ser ocupado! Por favor, elige otro icono disponible.');
      this.goToWizardStep(2);
      return;
    }

    const iconItem = HALLOWEEN_50_ICONS.find(i => i.id === this.wizard.iconId) || HALLOWEEN_50_ICONS[0];

    const ownerData = this.currentUser ? {
      name: this.currentUser.name || 'Vecino Registrado',
      phone: this.currentUser.phone || '',
      email: this.currentUser.email || ''
    } : { name: 'Vecino de Daganzo' };

    const newHouse = await this.store.add({
      title: name,
      street: street,
      coords: this.wizard.coords,
      category: this.wizard.sustoLevel || 'caramelos',
      iconId: iconItem.id,
      icon: iconItem.emoji,
      hours: hours,
      hasCandies: this.wizard.candies !== 'none',
      kidsFriendly: this.wizard.sustoLevel === 'infantil',
      inContest: true,
      image: image,
      description: desc,
      candiesType: this.wizard.candies,
      effects: this.wizard.effects,
      status: 'pending',
      owner: ownerData
    });

    this.refreshMapMarkers();
    this.closeModal('modalApunta');
    this.switchView('map');
    window.spookyAudio?.playStinger('unlock');
    this.showToast(`¡Solicitud enviada! Tu casa y tu icono ${iconItem.emoji} han quedado reservados para la aprobación del administrador 🎃`);
    this.resetWizardForm();
  }

  // ========================================================
  // PANEL DE ADMINISTRACIÓN Y MODERACIÓN VECINAL
  // ========================================================
  loginAdmin(pin) {
    if (pin === '1234' || pin === 'daganzo' || pin === 'admin') {
      this.state.isAdminLoggedIn = true;
      sessionStorage.setItem('daganzo_admin_auth', 'true');
      this.showToast('Sesión de administrador iniciada ✔️');
      this.renderAdminView();
    } else {
      this.showToast('PIN incorrecto. Prueba: 1234');
    }
  }

  logoutAdmin() {
    this.state.isAdminLoggedIn = false;
    sessionStorage.removeItem('daganzo_admin_auth');
    this.showToast('Sesión de administración cerrada');
    this.renderAdminView();
  }

  setAdminTab(tabName) {
    this.adminTab = tabName;
    ['adminTabBtnPending', 'adminTabBtnApproved', 'adminTabBtnUsers'].forEach(id => {
      const b = document.getElementById(id);
      if (b) b.classList.remove('active');
    });
    ['adminViewPending', 'adminViewApproved', 'adminViewUsers'].forEach(id => {
      const v = document.getElementById(id);
      if (v) v.style.display = 'none';
    });

    if (tabName === 'pending') {
      document.getElementById('adminTabBtnPending')?.classList.add('active');
      const v = document.getElementById('adminViewPending');
      if (v) v.style.display = 'block';
    } else if (tabName === 'users') {
      document.getElementById('adminTabBtnUsers')?.classList.add('active');
      const v = document.getElementById('adminViewUsers');
      if (v) v.style.display = 'block';
      this.loadAdminUsers();
    } else {
      document.getElementById('adminTabBtnApproved')?.classList.add('active');
      const v = document.getElementById('adminViewApproved');
      if (v) v.style.display = 'block';
    }
  }

  async adminApproveHouse(id) {
    const house = await this.store.approve(id);
    if (house) {
      this.refreshMapMarkers();
      this.renderSidebarHouses();
      this.updateGeneralCounters();
      this.renderAdminView();
      this.showToast(`✔️ ¡"${house.title}" ha sido aprobada y publicada en el mapa!`);
      window.spookyAudio?.playStinger('unlock');
    }
  }

  async adminRejectHouse(id) {
    const house = this.store.getById(id);
    const title = house ? house.title : 'la casa';
    if (confirm(`¿Rechazar y descartar la solicitud de "${title}"? El icono ${house?.icon || '🎃'} volverá a quedar libre.`)) {
      await this.store.reject(id);
      this.refreshMapMarkers();
      this.renderSidebarHouses();
      this.updateGeneralCounters();
      this.renderAdminView();
      this.showToast(`❌ Solicitud descartada.`);
    }
  }

  async loadAdminUsers() {
    const list = document.getElementById('adminUsersList');
    if (!list) return;
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        if (data.ok && Array.isArray(data.users)) {
          const badge = document.getElementById('adminBadgeUsers');
          if (badge) badge.textContent = data.users.length;
          if (data.users.length === 0) {
            list.innerHTML = `<div style="text-align:center; padding:34px; color:var(--text-muted);">No hay vecinos registrados aún en la base de datos</div>`;
            return;
          }
          list.innerHTML = data.users.map(u => {
            const houses = u.houses || [];
            const cleanPhone = (u.phone || '').replace(/\D/g, '');
            const hasPhone = cleanPhone.length >= 9;

            return `
              <div class="admin-user-card" data-user-id="${u.id}">
                <!-- Cabecera del Usuario -->
                <div class="admin-user-header">
                  <div class="admin-user-avatar">👤</div>
                  <div class="admin-user-info">
                    <div class="admin-user-name-row">
                      <h3>${u.name}</h3>
                      <span class="user-badge">${houses.length > 0 ? `🎃 ${houses.length} casa(s)` : 'Sin casa apuntada'}</span>
                    </div>
                    <div class="admin-user-meta">
                      <span>✉️ Email: <b>${u.email}</b></span>
                      <span>📞 Teléfono: <b>${u.phone || 'No indicado'}</b></span>
                      <span>📅 Registrado: ${new Date(u.createdAt || Date.now()).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <div class="admin-user-quick-actions">
                    ${hasPhone ? `
                      <a href="https://wa.me/34${cleanPhone}" target="_blank" class="btn-whatsapp-action" title="Abrir chat de WhatsApp con este vecino">
                        💬 WhatsApp
                      </a>
                    ` : ''}
                    <button class="btn-admin-action btn-admin-reject" title="Eliminar este usuario de la base de datos" onclick="window.app.adminDeleteUser('${u.id}', '${(u.name || '').replace(/'/g, "\\'")}')">
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>

                <!-- Casas Vinculadas al Usuario -->
                <div class="admin-user-houses-box">
                  <div style="font-size: 0.76rem; font-weight: 700; color: #e2e8f0; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <span>🏚️ Casas asociadas a este vecino:</span>
                    <span style="font-size: 0.7rem; color: #a855f7;">${houses.length} registrada(s)</span>
                  </div>

                  ${houses.length === 0 ? `
                    <div class="admin-no-house-hint">
                      ℹ️ Este vecino se ha registrado pero aún no ha inscrito ninguna casa en el mapa.
                    </div>
                  ` : `
                    <div class="admin-user-houses-list">
                      ${houses.map(h => `
                        <div class="admin-linked-house-row">
                          <span class="house-icon">${h.icon || '🎃'}</span>
                          <div class="house-details">
                            <strong class="house-title">${h.title}</strong>
                            <div class="house-address">📍 <b>${h.street}</b> • 🕒 ${h.hours || 'Horario no indicado'}</div>
                            <div class="house-tags">
                              <span class="house-status-badge ${h.status === 'approved' ? 'status-approved' : 'status-pending'}">
                                ${h.status === 'approved' ? '🏚️ Publicada en el mapa' : '⏳ Pendiente de moderación'}
                              </span>
                              <span class="house-cat-tag">Temática: ${h.category}</span>
                            </div>
                          </div>
                          <button class="btn-view-house-link" onclick="window.app.adminFocusHouse('${h.id}')" title="Ver en el mapa">
                            🗺️ Ver en Mapa
                          </button>
                        </div>
                      `).join('')}
                    </div>
                  `}
                </div>
              </div>
            `;
          }).join('');
        }
      }
    } catch (e) {
      list.innerHTML = `<div style="color:var(--text-muted); padding:20px;">No se pudo cargar la lista de vecinos</div>`;
    }
  }

  async adminDeleteUser(userId, userName) {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente al vecino "${userName}" de la base de datos?`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId })
      });
      const data = await res.json();
      if (data.ok) {
        this.showToast(`🗑️ Usuario "${userName}" eliminado correctamente.`);
        if (this.currentUser && (this.currentUser.id === userId || this.currentUser.email === userId)) {
          this.currentUser = null;
          localStorage.removeItem('daganzo_user');
          this.updateUserSessionUI();
        }
        this.loadAdminUsers();
      } else {
        this.showToast(data.error || 'No se pudo eliminar el usuario');
      }
    } catch (e) {
      this.showToast('Error al conectar con el servidor');
    }
  }

  renderAdminView() {
    const loginBox = document.getElementById('adminLoginBox');
    const dashboardBox = document.getElementById('adminDashboardBox');
    const pendingList = document.getElementById('adminPendingList');
    const approvedList = document.getElementById('adminHousesList');

    if (!this.state.isAdminLoggedIn) {
      if (loginBox) loginBox.style.display = 'block';
      if (dashboardBox) dashboardBox.style.display = 'none';
      return;
    }

    if (loginBox) loginBox.style.display = 'none';
    if (dashboardBox) dashboardBox.style.display = 'block';

    const pendingHouses = this.store.getPending();
    const approvedHouses = this.store.getApproved();

    const badgePending = document.getElementById('adminBadgePending');
    if (badgePending) badgePending.textContent = pendingHouses.length;
    const badgeApproved = document.getElementById('adminBadgeApproved');
    if (badgeApproved) badgeApproved.textContent = approvedHouses.length;

    // Render Pending
    if (pendingList) {
      if (pendingHouses.length === 0) {
        pendingList.innerHTML = `
          <div style="text-align: center; padding: 34px 10px; color: var(--text-muted);">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">🎉</div>
            <p style="color: #fff; font-weight: bold; margin-bottom: 4px;">¡No hay solicitudes pendientes!</p>
            <p style="font-size: 0.78rem;">Todas las casas registradas han sido moderadas.</p>
          </div>
        `;
      } else {
        pendingList.innerHTML = pendingHouses.map(h => {
          const matched = HALLOWEEN_50_ICONS.find(i => i.id === h.iconId || i.emoji === h.icon);
          const iconEmoji = matched ? matched.emoji : (h.icon || '🎃');
          const ownerInfo = h.owner ? `${h.owner.name} (${h.owner.phone || h.owner.email})` : 'Vecino no especificado';

          return `
            <div class="admin-house-item admin-pending-card" data-id="${h.id}">
              <div style="font-size: 1.6rem; width: 38px; text-align: center;">${iconEmoji}</div>
              <img class="admin-thumb" src="${h.image}" alt="">
              <div class="admin-info">
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <h4>${h.title}</h4>
                  <span class="admin-neighbor-pill">👤 ${ownerInfo}</span>
                </div>
                <p>📍 ${h.street} • 🕒 ${h.hours || '19:00 - 22:30'}</p>
                <p style="font-size: 0.75rem; color: #a8a29e; margin-top: 3px; font-style: italic;">"${h.description || 'Sin descripción'}"</p>
              </div>
              <div class="admin-btns" style="flex-direction: column; gap: 4px;">
                <button class="btn-admin-approve" onclick="window.app.adminApproveHouse('${h.id}')">
                  <span>✓</span> Aprobar y Publicar
                </button>
                <div style="display: flex; gap: 4px;">
                  <button class="btn-icon-admin" title="Ver en mapa" onclick="window.app.adminFocusHouse('${h.id}')" style="flex: 1;">👁️</button>
                  <button class="btn-icon-admin" title="Editar" onclick="window.app.openEditHouseModal('${h.id}')" style="flex: 1;">✏️</button>
                  <button class="btn-icon-admin btn-icon-delete" title="Rechazar" onclick="window.app.adminRejectHouse('${h.id}')" style="flex: 1;">🗑️</button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Render Approved
    if (approvedList) {
      if (approvedHouses.length === 0) {
        approvedList.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-muted);">No hay casas publicadas</div>`;
      } else {
        approvedList.innerHTML = approvedHouses.map(h => {
          const matched = HALLOWEEN_50_ICONS.find(i => i.id === h.iconId || i.emoji === h.icon);
          const iconEmoji = matched ? matched.emoji : (h.icon || '🎃');

          return `
            <div class="admin-house-item" data-id="${h.id}">
              <div style="font-size: 1.4rem; width: 34px; text-align: center;">${iconEmoji}</div>
              <img class="admin-thumb" src="${h.image}" alt="">
              <div class="admin-info">
                <h4>${h.title}</h4>
                <p>📍 ${h.street} • ⭐ ${h.votes} votos</p>
              </div>
              <div class="admin-btns">
                <button class="btn-icon-admin" title="Ver en mapa" onclick="window.app.adminFocusHouse('${h.id}')">👁️</button>
                <button class="btn-icon-admin" title="Editar datos" onclick="window.app.openEditHouseModal('${h.id}')">✏️</button>
                <button class="btn-icon-admin btn-icon-delete" title="Eliminar casa" onclick="window.app.adminDeleteHouse('${h.id}')">🗑️</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  // ========================================================
  // CONTROL DE ACCESO / AUTENTICACIÓN DE VECINOS
  // ========================================================
  openApuntaOrAuth() {
    if (this.currentUser) {
      this.openModal('modalApunta');
    } else {
      this.openModal('modalUserAuth');
    }
  }

  async handleUserRegisterSubmit(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('regName')?.value.trim();
    const phone = document.getElementById('regPhone')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim().toLowerCase();
    const password = document.getElementById('regPass')?.value.trim();

    if (!name || !phone || !email || !password) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, password })
      });
      const data = await res.json();
      if (!data.ok) {
        this.showToast(data.error || 'Error al registrarse');
        return;
      }

      this.currentUser = data.user;
      localStorage.setItem('daganzo_user', JSON.stringify(this.currentUser));
      this.updateUserSessionUI();
      this.closeModal('modalUserAuth');
      this.openModal('modalApunta');
      this.showToast(`¡Bienvenido/a, ${name}! Ahora apunta los datos de tu casa 🎃`);
    } catch (err) {
      this.currentUser = { name, phone, email };
      localStorage.setItem('daganzo_user', JSON.stringify(this.currentUser));
      this.updateUserSessionUI();
      this.closeModal('modalUserAuth');
      this.openModal('modalApunta');
      this.showToast(`¡Bienvenido/a, ${name}!`);
    }
  }

  async handleUserLoginSubmit(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
    const password = document.getElementById('loginPass')?.value.trim();

    if (!email || !password) {
      this.showToast('Por favor, introduce tu email y contraseña.');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (!data.ok) {
          this.showToast(data.error || 'Credenciales incorrectas');
          return;
        }
        this.currentUser = data.user;
        localStorage.setItem('daganzo_user', JSON.stringify(this.currentUser));
        this.updateUserSessionUI();
        this.closeModal('modalUserAuth');
        this.openModal('modalApunta');
        this.showToast(`¡Hola de nuevo, ${this.currentUser.name}! 🎃`);
        return;
      }
    } catch (err) {
      // Offline / GitHub Pages fallback
    }

    // Modo estático GitHub Pages: recuperar o crear sesión local
    const savedUser = JSON.parse(localStorage.getItem('daganzo_user') || 'null');
    if (savedUser && savedUser.email === email) {
      this.currentUser = savedUser;
    } else {
      this.currentUser = { name: email.split('@')[0], email, phone: '' };
      localStorage.setItem('daganzo_user', JSON.stringify(this.currentUser));
    }
    this.updateUserSessionUI();
    this.closeModal('modalUserAuth');
    this.openModal('modalApunta');
    this.showToast(`¡Hola de nuevo, ${this.currentUser.name}! 🎃`);
  }

  // ========================================================
  // MENÚ FLOTANTE DE OPCIONES DEL MAPA
  // ========================================================
  toggleMapOptions(force) {
    const backdrop = document.getElementById('mapOptionsMenuBackdrop');
    const btn = document.getElementById('btnToggleMapOptions');
    if (!backdrop) return;

    const isOpen = backdrop.classList.contains('open');
    const shouldOpen = force !== undefined ? force : !isOpen;

    backdrop.classList.toggle('open', shouldOpen);
    btn?.classList.toggle('active', shouldOpen);

    if (shouldOpen) {
      this.updateAudioMenuStatus();
    }
  }

  updateAudioMenuStatus() {
    const isPlaying = window.spookyAudio?.isPlaying;
    const badge = document.getElementById('optAudioIcon');
    const desc = document.getElementById('optAudioDesc');
    const status = document.getElementById('optAudioStatus');
    if (badge) badge.textContent = isPlaying ? '🔊' : '🔇';
    if (desc) desc.textContent = isPlaying ? 'Música misteriosa sonando (toca para silenciar)' : 'Música en silencio (toca para activar efectos)';
    if (status) {
      status.textContent = isPlaying ? 'Activado' : 'Silenciado';
      status.style.color = isPlaying ? '#4ade80' : '#94a3b8';
      status.style.borderColor = isPlaying ? 'rgba(74, 222, 128, 0.4)' : 'rgba(255, 255, 255, 0.1)';
    }
  }


  adminFocusHouse(id) {
    const house = this.store.getById(id);
    if (house) {
      this.closeModal('modalAdmin');
      this.switchView('map');
      this.openHouseCard(house);
    }
  }

  openEditHouseModal(id) {
    const house = this.store.getById(id);
    if (!house) return;

    this.editingHouseId = id;
    this.tempCoords = house.coords;
    this.adminSelectedIconId = house.iconId || 'calabaza';

    const f = document.getElementById('formEditHouse');
    if (!f) return;

    f.elements['editName'].value = house.title;
    f.elements['editStreet'].value = house.street;
    f.elements['editCategory'].value = house.category;
    f.elements['editHours'].value = house.hours || '19:00 - 22:30';
    f.elements['editVotes'].value = house.votes || 0;
    f.elements['editDesc'].value = house.description;
    f.elements['editImage'].value = house.image;

    document.getElementById('editCoordsText').innerHTML = `📍 Coordenadas: <b>${house.coords[0].toFixed(4)}, ${house.coords[1].toFixed(4)}</b> (Toca el mapa para cambiarlas)`;

    this.renderAdminEditIconsGrid(house.id, this.adminSelectedIconId);
    this.openModal('modalEditHouse');
  }

  // Renderiza el selector de los 50 iconos en la edición de Admin
  renderAdminEditIconsGrid(houseId, currentIconId) {
    const grid = document.getElementById('adminEditIconsGrid');
    if (!grid) return;

    const iconsWithStatus = this.getIconsWithStatus(houseId);

    grid.innerHTML = iconsWithStatus.map(icon => {
      const isSelected = icon.id === currentIconId || icon.emoji === currentIconId;
      const isTaken = !icon.isAvailable && !isSelected;
      const takenByTitle = icon.reservedBy ? icon.reservedBy.title : 'otra casa';

      return `
        <div class="icon-pick-card ${isSelected ? 'selected' : ''} ${isTaken ? 'taken' : ''}"
             data-icon-id="${icon.id}"
             title="${isTaken ? `🔒 Reservado por: ${takenByTitle}` : `${icon.name}`}"
             onclick="window.app.selectAdminEditIcon('${icon.id}', '${houseId}')">
          <span class="icon-glyph">${icon.emoji}</span>
          <span class="icon-name">${icon.name}</span>
          ${isTaken ? `<span class="icon-taken-tag">🔒</span>` : ''}
        </div>
      `;
    }).join('');
  }

  selectAdminEditIcon(iconId, houseId) {
    const status = this.getIconsWithStatus(houseId).find(i => i.id === iconId);
    if (!status || (!status.isAvailable && status.reservedBy?.id !== houseId)) {
      this.showToast(`🔒 Este icono ya está asignado a "${status?.reservedBy?.title}".`);
      return;
    }

    this.adminSelectedIconId = iconId;
    this.renderAdminEditIconsGrid(houseId, iconId);
  }

  saveEditedHouse() {
    if (!this.editingHouseId) return;

    const f = document.getElementById('formEditHouse');
    const chosenIconItem = HALLOWEEN_50_ICONS.find(i => i.id === this.adminSelectedIconId) || HALLOWEEN_50_ICONS[0];

    const updated = {
      title: f.elements['editName'].value,
      street: f.elements['editStreet'].value,
      category: f.elements['editCategory'].value,
      iconId: chosenIconItem.id,
      icon: chosenIconItem.emoji,
      hours: f.elements['editHours'].value,
      votes: parseInt(f.elements['editVotes'].value) || 0,
      description: f.elements['editDesc'].value,
      image: f.elements['editImage'].value || PHOTO_PRESETS[0],
      coords: this.tempCoords
    };

    this.store.update(this.editingHouseId, updated);
    this.refreshMapMarkers();
    this.renderAdminView();
    this.closeModal('modalEditHouse');
    this.showToast('Casa actualizada correctamente ✔️');

    if (this.selectedHouse?.id === this.editingHouseId) {
      this.openHouseCard(this.store.getById(this.editingHouseId));
    }
  }

  adminDeleteHouse(id) {
    const house = this.store.getById(id);
    if (!house) return;

    if (confirm(`¿Seguro que deseas eliminar permanentemente "${house.title}"?`)) {
      const freedIcon = house.icon || '🎃';
      this.store.delete(id);
      this.refreshMapMarkers();
      this.renderAdminView();
      if (this.selectedHouse?.id === id) {
        this.closeHouseCard();
      }
      this.showToast(`Casa eliminada. ¡El icono ${freedIcon} vuelve a estar disponible para todos! 🎃`);
    }
  }

  adminResetAllHouses() {
    if (confirm('¿Restablecer todas las casas a los ejemplos iniciales de Daganzo?')) {
      this.store.resetDefaults();
      this.refreshMapMarkers();
      this.renderAdminView();
      this.showToast('Casas restablecidas a los valores de muestra');
    }
  }

  // ========================================================
  // CLIC EN EL MAPA PARA POSICIONAR CASA
  // ========================================================
  handleMapClick(lat, lng) {
    // Si viene de fijar la baliza "Estoy aquí" manualmente
    if (this.isSettingUserLocationManually) {
      this.isSettingUserLocationManually = false;
      this.setUserLocationMarker(lat, lng, 10);
      this.showToast('📍 ¡Posición "Estoy aquí" fijada en el mapa!');
      return;
    }

    // Si viene del botón "Marcar en mapa grande" del Asistente
    if (this.isPickingOnMainMap) {
      this.isPickingOnMainMap = false;
      this.setWizardCoordinates(lat, lng);
      if (this.wizardMiniMap) {
        this.wizardMiniMap.setView([lat, lng], 17);
      }
      this.openModal('modalApunta');
      this.showToast('¡Ubicación fijada desde el mapa de Daganzo! ✔️');
      return;
    }

    const isEditing = document.getElementById('modalEditHouse')?.classList.contains('open');
    if (!isEditing) return;

    this.tempCoords = [lat, lng];

    if (this.tempPickerMarker) {
      this.map.removeLayer(this.tempPickerMarker);
    }

    const tempIcon = L.divIcon({
      html: `<div class="pin-bubble-glow pin-cat-caramelos" style="animation: pulseGps 1.5s infinite;"><span class="pin-inner-emoji">📍</span></div>`,
      className: 'spooky-pin-wrap',
      iconSize: [38, 38],
      iconAnchor: [19, 34]
    });

    this.tempPickerMarker = L.marker([lat, lng], { icon: tempIcon }).addTo(this.map);

    const textEl = document.getElementById('editCoordsText');
    if (textEl) {
      textEl.innerHTML = `📍 Ubicación fijada: <b>${lat.toFixed(4)}, ${lng.toFixed(4)}</b> ✔️`;
    }

    this.showToast('¡Ubicación fijada en el mapa!');
  }

  // ========================================================
  // PRESET PHOTOS
  // ========================================================
  renderPresetPhotosSelectors() {
    const container = document.getElementById('presetPhotosGrid');
    if (!container) return;

    container.innerHTML = PHOTO_PRESETS.map((url, i) => `
      <div class="preset-photo-thumb ${i === 0 ? 'selected' : ''}" data-url="${url}" onclick="window.app.selectPresetPhoto(this, '${url}')">
        <img src="${url}" alt="Preset ${i+1}">
      </div>
    `).join('');
  }

  selectPresetPhoto(el, url) {
    document.querySelectorAll('.preset-photo-thumb').forEach(t => t.classList.remove('selected'));
    el.classList.add('selected');
    this.selectedPresetPhoto = url;
  }

  // ========================================================
  // HALLOWEEN PASS & DIPLOMA DIGITAL
  // ========================================================
  toggleCheckinCurrent() {
    if (!this.selectedHouse) return;

    const id = this.selectedHouse.id;
    const index = this.state.visited.indexOf(id);

    if (index === -1) {
      this.state.visited.push(id);
      window.spookyAudio?.playStinger('unlock');
      this.showToast(`¡Check-in en ${this.selectedHouse.title}! 🎃`);
    } else {
      this.state.visited.splice(index, 1);
      this.showToast(`Check-in desmarcado.`);
    }

    localStorage.setItem('daganzo_visited', JSON.stringify(this.state.visited));
    this.updatePassCounters();
    this.refreshMapMarkers();
    this.openHouseCard(this.selectedHouse);
  }

  voteCurrent() {
    if (!this.selectedHouse) return;
    const id = this.selectedHouse.id;

    if (this.state.voted[id]) {
      this.showToast('Ya has votado por esta decoración.');
      return;
    }

    this.selectedHouse.votes = (this.selectedHouse.votes || 0) + 1;
    this.store.update(id, { votes: this.selectedHouse.votes });

    this.state.voted[id] = true;
    localStorage.setItem('daganzo_voted', JSON.stringify(this.state.voted));

    window.spookyAudio?.playStinger('unlock');
    this.showToast(`¡Voto sumado para ${this.selectedHouse.title}! ⭐`);
    this.openHouseCard(this.selectedHouse);
    this.renderPodium();
  }

  updatePassCounters() {
    const total = this.store.getAll().length;
    const visited = this.state.visited.length;
    const pct = total > 0 ? Math.round((visited / total) * 100) : 0;

    const progFill = document.getElementById('passProgFill');
    const progText = document.getElementById('passProgText');
    if (progFill) progFill.style.width = `${pct}%`;
    if (progText) progText.textContent = `${visited} de ${total} casas completadas (${pct}%)`;

    const aliasIn = document.getElementById('passAliasInput');
    if (aliasIn) aliasIn.value = this.state.alias;
  }

  updateGeneralCounters() {
    const total = this.store.getAll().length;
    const homeCount = document.getElementById('homeStatCount');
    const mapHeaderCount = document.getElementById('mapHeaderHouseCount');

    if (homeCount) homeCount.innerHTML = `<b>${total}</b> Casas registradas`;
    if (mapHeaderCount) mapHeaderCount.textContent = total;
  }

  generateCertificate() {
    const canvas = document.getElementById('diplomaCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 800;

    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, '#0c0a14');
    grad.addColorStop(0.5, '#1e112d');
    grad.addColorStop(1, '#09080e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    ctx.strokeStyle = '#ff6b00';
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, 1140, 740);

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.strokeRect(44, 44, 1112, 712);

    ctx.textAlign = 'center';
    ctx.font = 'bold 50px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ff6b00';
    ctx.fillText('DIPLOMA DEL TERROR DE DAGANZO', 600, 150);

    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Ruta Oficial de Casas Encantadas • Halloween 2026', 600, 200);

    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Se otorga el reconocimiento de SUPERVIVIENTE a:', 600, 280);

    ctx.font = 'bold 48px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#a855f7';
    ctx.fillText((this.state.alias || 'Explorador Valiente').toUpperCase(), 600, 360);

    ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`Por haber explorado ${this.state.visited.length} casas encantadas en Daganzo de Arriba,`, 600, 440);
    ctx.fillText('demostrando valentía ante fantasmas, brujas y repartos de caramelos.', 600, 480);

    ctx.font = '70px sans-serif';
    ctx.fillText('🎃', 600, 580);

    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ff6b00';
    ctx.fillText('AYUNTAMIENTO & VECINOS DE DAGANZO DE ARRIBA', 600, 640);

    const dateStr = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`Expedido en Daganzo • ${dateStr}`, 600, 680);

    const preview = document.getElementById('diplomaImgPreview');
    const dlBtn = document.getElementById('btnDownloadDiploma');
    if (preview && dlBtn) {
      const dataUrl = canvas.toDataURL('image/png');
      preview.src = dataUrl;
      preview.style.display = 'block';
      dlBtn.href = dataUrl;
      dlBtn.download = `Diploma_Halloween_Daganzo_${(this.state.alias).replace(/\s+/g, '_')}.png`;
      dlBtn.style.display = 'inline-flex';
    }
  }

  // ========================================================
  // SALÓN DE LA FAMA (PODIO)
  // ========================================================
  renderPodium() {
    const list = document.getElementById('podiumList');
    if (!list) return;

    const sorted = [...this.store.getAll()].sort((a, b) => b.votes - a.votes).slice(0, 5);
    const medals = ['🥇', '🥈', '🥉', '4º', '5º'];

    list.innerHTML = sorted.map((h, i) => `
      <div class="admin-house-item" style="cursor: pointer;" onclick="window.app.adminFocusHouse('${h.id}')">
        <div style="font-size: 1.4rem; width: 32px; text-align: center;">${medals[i]}</div>
        <img class="admin-thumb" src="${h.image}" alt="">
        <div class="admin-info">
          <h4>${h.title}</h4>
          <p>📍 ${h.street}</p>
        </div>
        <div style="color: var(--pumpkin); font-weight: 700; font-size: 0.95rem;">⭐ ${h.votes}</div>
      </div>
    `).join('');
  }

  // ========================================================
  // LOCALIZACIÓN DEL MÓVIL: "ESTOY AQUÍ"
  // ========================================================
  setUserLocationMarker(latitude, longitude, accuracy = 15) {
    this.userGpsLocation = [latitude, longitude];

    if (this.userGpsMarker) {
      this.map.removeLayer(this.userGpsMarker);
      this.userGpsMarker = null;
    }
    if (this.userGpsCircle) {
      this.map.removeLayer(this.userGpsCircle);
      this.userGpsCircle = null;
    }

    if (accuracy && accuracy < 600) {
      this.userGpsCircle = L.circle([latitude, longitude], {
        radius: Math.max(accuracy, 10),
        color: '#1a73e8',
        fillColor: '#1a73e8',
        fillOpacity: 0.14,
        weight: 1.5
      }).addTo(this.map);
    }

    const icon = L.divIcon({
      html: `
        <div class="google-blue-dot-marker">
          <div class="google-blue-dot-pulse"></div>
          <div class="google-blue-dot-inner"></div>
        </div>
      `,
      className: 'google-gps-pin',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    this.userGpsMarker = L.marker(this.userGpsLocation, { icon, zIndexOffset: 3000 }).addTo(this.map);
    this.userGpsMarker.bindPopup(`
      <div style="text-align:center; padding: 6px 4px; font-family: var(--font-body);">
        <div style="font-size: 1.05rem; font-weight: 700; color: #38bdf8; margin-bottom: 2px;">📍 ¡Estás aquí!</div>
        <div style="font-size: 0.76rem; color: #cbd5e1;">${accuracy ? `Precisión GPS: ±${Math.round(accuracy)}m` : 'Ubicación actual'}</div>
        <div style="font-size: 0.72rem; color: var(--neon-pumpkin); margin-top: 4px;">Explora las casas encantadas cercanas 🎃</div>
      </div>
    `);

    this.map.flyTo(this.userGpsLocation, 18, { animate: true, duration: 1.0 });
    document.getElementById('btnGpsLocate')?.classList.add('active');
    document.getElementById('btnFloatingGps')?.classList.add('active');
  }

  locateUser(silent = false) {
    if (!navigator.geolocation) {
      this.showToast('Tu navegador o dispositivo no soporta geolocalización');
      this.openModal('modalGpsHelp');
      return;
    }

    const btn = document.getElementById('btnGpsLocate');
    const floatBtn = document.getElementById('btnFloatingGps');
    if (!silent) {
      this.showToast('🛰️ Localizando tu posición con GPS...');
    }

    const handleSuccess = (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      this.setUserLocationMarker(latitude, longitude, accuracy);
      this.showToast(`🎯 ¡Estás aquí! Precisión GPS: ±${Math.round(accuracy)} metros`);
      this.closeModal('modalGpsHelp');
    };

    const handleFail = (err) => {
      btn?.classList.remove('active');
      floatBtn?.classList.remove('active');
      console.warn('GPS Error code:', err.code, err.message);

      if (err.code === 1) { // PERMISSION_DENIED
        this.openModal('modalGpsHelp');
      } else if (err.code === 2) { // POSITION_UNAVAILABLE
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          () => {
            this.showToast('⚠️ Señal GPS no disponible en este momento');
            this.openModal('modalGpsHelp');
          },
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
        );
      } else { // TIMEOUT
        this.showToast('⏱️ Tiempo de espera agotado buscando tu señal GPS');
        this.openModal('modalGpsHelp');
      }
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleFail,
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }

  // ========================================================
  // GESTIÓN DE SESIÓN DE VECINO
  // ========================================================
  updateUserSessionUI() {
    const userNameEl = document.getElementById('wizardUserName');
    const userEmailEl = document.getElementById('wizardUserEmail');
    const sessionBar = document.getElementById('wizardUserSessionBar');
    const optUserTitle = document.getElementById('optUserTitle');
    const optUserDesc = document.getElementById('optUserDesc');
    const optUserAction = document.getElementById('optUserActionBtn');

    if (this.currentUser) {
      if (sessionBar) sessionBar.style.display = 'flex';
      if (userNameEl) userNameEl.textContent = this.currentUser.name || 'Vecino Registrado';
      if (userEmailEl) userEmailEl.textContent = `(${this.currentUser.email || this.currentUser.phone || ''})`;
      if (optUserTitle) optUserTitle.textContent = this.currentUser.name || 'Mi Cuenta de Vecino';
      if (optUserDesc) optUserDesc.textContent = this.currentUser.email ? `Conectado: ${this.currentUser.email}` : 'Sesión iniciada';
      if (optUserAction) optUserAction.textContent = 'Cambiar';
    } else {
      if (sessionBar) sessionBar.style.display = 'none';
      if (optUserTitle) optUserTitle.textContent = 'Iniciar Sesión / Registro';
      if (optUserDesc) optUserDesc.textContent = 'Identifícate para apuntar tu casa o gestionar tu perfil';
      if (optUserAction) optUserAction.textContent = 'Entrar';
    }
  }

  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('daganzo_user');
    this.updateUserSessionUI();
    this.closeModal('modalApunta');
    this.closeModal('mapOptionsMenuBackdrop');
    this.openModal('modalUserAuth');
    this.showToast('Sesión cerrada. Ahora puedes registrarte o entrar con otra cuenta.');
  }

  // ========================================================
  // MODALES Y TOAST
  // ========================================================
  openModal(id) {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('open');
      if (id === 'modalApunta') this.initWizard();
      if (id === 'modalAdmin') this.renderAdminView();
      if (id === 'modalPass') this.updatePassCounters();
      if (id === 'modalPodio') this.renderPodium();
    }
  }

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
  }

  showToast(msg) {
    const toast = document.getElementById('spookyToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ========================================================
  // EVENT LISTENERS
  // ========================================================
  setupUIEvents() {
    // 1. Navegación entre vistas
    document.getElementById('btnHomeEnterMap')?.addEventListener('click', () => {
      this.switchView('map');
    });

    document.getElementById('btnBackHome')?.addEventListener('click', () => {
      this.switchView('home');
    });

    // 2. Menú lateral (Sidebar)
    document.getElementById('btnToggleSidebar')?.addEventListener('click', () => {
      this.toggleSidebar();
    });

    document.getElementById('btnCloseSidebar')?.addEventListener('click', () => {
      this.toggleSidebar(false);
    });

    // 3. Botones de Pantalla Inicial
    document.getElementById('btnHomeApunta')?.addEventListener('click', () => {
      this.openApuntaOrAuth();
    });

    document.getElementById('btnHomeShare')?.addEventListener('click', () => {
      this.shareMap();
    });

    document.getElementById('btnHomePass')?.addEventListener('click', () => {
      this.openModal('modalPass');
    });

    document.getElementById('btnHomePodio')?.addEventListener('click', () => {
      this.openModal('modalPodio');
    });

    document.getElementById('btnHomeAdmin')?.addEventListener('click', () => {
      this.openModal('modalAdmin');
    });

    // 4. Header del Mapa y Menú Flotante de Opciones
    document.getElementById('btnToggleMapOptions')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMapOptions();
    });

    document.getElementById('btnCloseMapOptions')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
    });

    document.getElementById('mapOptionsMenuBackdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'mapOptionsMenuBackdrop') {
        this.toggleMapOptions(false);
      }
    });

    // Opciones del Menú Flotante con Iconos y Texto
    document.getElementById('optGpsLocate')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
      this.locateUser();
    });

    document.getElementById('optUserAccount')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
      if (this.currentUser) {
        if (confirm(`¿Quieres cerrar la sesión de ${this.currentUser.name || this.currentUser.email} para registrarte o cambiar de cuenta?`)) {
          this.logoutUser();
        }
      } else {
        this.openModal('modalUserAuth');
      }
    });

    document.getElementById('optApuntaCasa')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
      this.openApuntaOrAuth();
    });

    document.getElementById('optAudioToggle')?.addEventListener('click', () => {
      const isPlaying = window.spookyAudio?.toggle();
      this.updateAudioMenuStatus();
      this.showToast(isPlaying ? '🔊 Sonido misterioso activado' : '🔇 Sonido desactivado');
    });

    document.getElementById('optShareMap')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
      this.shareMap();
    });

    document.getElementById('optPodio')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
      this.openModal('modalPodio');
    });

    document.getElementById('optPassport')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
      this.openModal('modalDiploma');
    });

    document.getElementById('optAdmin')?.addEventListener('click', () => {
      this.toggleMapOptions(false);
      this.openModal('modalAdmin');
    });

    // Botones de Ayuda GPS
    document.getElementById('btnGpsPlaceCenter')?.addEventListener('click', () => {
      this.closeModal('modalGpsHelp');
      this.setUserLocationMarker(DAGANZO_COORDS[0], DAGANZO_COORDS[1], 25);
      this.showToast('🎯 ¡Situado en el centro de Daganzo!');
    });

    document.getElementById('btnGpsPickOnMap')?.addEventListener('click', () => {
      this.closeModal('modalGpsHelp');
      this.switchView('map');
      this.isSettingUserLocationManually = true;
      this.showToast('👆 Toca en cualquier calle del mapa para situar tu punto azul.');
    });

    document.getElementById('btnGpsRetryPrompt')?.addEventListener('click', () => {
      this.closeModal('modalGpsHelp');
      this.locateUser();
    });

    // Cerrar sesión desde el Asistente de Apuntar Casa
    document.getElementById('btnWizardLogout')?.addEventListener('click', () => {
      this.logoutUser();
    });

    // Botones directos de respaldo (si existen en la vista)
    document.getElementById('btnMapApunta')?.addEventListener('click', () => {
      this.openApuntaOrAuth();
    });

    document.getElementById('btnMapShare')?.addEventListener('click', () => {
      this.shareMap();
    });

    document.getElementById('btnMapAdmin')?.addEventListener('click', () => {
      this.openModal('modalAdmin');
    });

    document.getElementById('btnAudioToggle')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const isPlaying = window.spookyAudio?.toggle();
      btn.classList.toggle('active', isPlaying);
      this.updateAudioMenuStatus();
      this.showToast(isPlaying ? '🔊 Sonido misterioso activado' : '🔇 Sonido desactivado');
    });

    document.getElementById('btnGpsLocate')?.addEventListener('click', () => {
      this.locateUser();
    });

    document.getElementById('btnFloatingGps')?.addEventListener('click', () => {
      this.locateUser();
    });

    // Botones del Modal de Compartir
    document.getElementById('btnShareCopyLink')?.addEventListener('click', () => {
      this.handleCopyShareUrl();
    });

    document.getElementById('btnShareQuickCopy')?.addEventListener('click', () => {
      this.handleCopyShareUrl();
    });

    document.getElementById('btnShareNative')?.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: '🎃 Mapa de Halloween de Daganzo 2026',
          text: '¡Descubre las casas más terroríficas, pasajes del terror y dónde dan caramelos en Daganzo de Arriba!',
          url: window.location.href
        }).catch(() => {});
      }
    });

    // 5. Filtros y Búsqueda en Sidebar
    document.getElementById('searchInput')?.addEventListener('input', () => {
      this.refreshMapMarkers();
    });

    document.querySelectorAll('.filter-pill, .tag-pill').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-pill, .tag-pill').forEach(c => c.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this.activeFilter = target.dataset.filter;
        this.refreshMapMarkers();
      });
    });

    // 6. Selector de capas del mapa
    document.querySelectorAll('.layer-btn, .layer-switch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setMapLayer(e.currentTarget.dataset.layer);
      });
    });

    // 7. Tarjeta flotante de casa
    document.getElementById('btnCloseCard')?.addEventListener('click', () => {
      this.closeHouseCard();
    });

    document.getElementById('houseDetailBackdrop')?.addEventListener('click', () => {
      this.closeHouseCard();
    });

    document.getElementById('btnCardCheckin')?.addEventListener('click', () => {
      this.toggleCheckinCurrent();
    });

    document.getElementById('btnCardVote')?.addEventListener('click', () => {
      this.voteCurrent();
    });

    document.getElementById('btnCardViewOnMap')?.addEventListener('click', () => {
      if (this.selectedHouse) {
        this.highlightHouseOnMap(this.selectedHouse.id);
      }
    });

    // ========================================================
    // 8. ASISTENTE WIZARD (EVENTOS)
    // ========================================================
    // Nodos indicadores del stepper
    document.querySelectorAll('.wizard-step-node').forEach(node => {
      node.addEventListener('click', (e) => {
        const targetStep = parseInt(e.currentTarget.dataset.step);
        // Permitir volver atrás libremente o avanzar con validación
        this.goToWizardStep(targetStep);
      });
    });

    // Botones Siguiente y Anterior
    document.getElementById('btnWizardPrev')?.addEventListener('click', () => {
      if (this.wizard.step > 1) this.goToWizardStep(this.wizard.step - 1);
    });

    document.getElementById('btnWizardNext')?.addEventListener('click', () => {
      if (this.wizard.step < 5) this.goToWizardStep(this.wizard.step + 1);
    });

    // Detección y sugerencias de calles y números de Daganzo en tiempo real
    let autocompleteTimer = null;
    const streetInput = document.getElementById('houseStreet');
    streetInput?.addEventListener('input', (e) => {
      const val = e.target.value;
      this.wizard.street = val;

      clearTimeout(autocompleteTimer);
      autocompleteTimer = setTimeout(() => {
        this.handleAddressAutocomplete(val);
      }, 200);
    });

    // Cerrar el menú desplegable de sugerencias al hacer clic fuera
    document.addEventListener('click', (e) => {
      const suggestions = document.getElementById('daganzoAddressSuggestions');
      if (suggestions && !e.target.closest('#houseStreet') && !e.target.closest('#daganzoAddressSuggestions')) {
        suggestions.style.display = 'none';
      }
    });

    // GPS en el Asistente
    document.getElementById('btnWizardLocGps')?.addEventListener('click', () => {
      if (!navigator.geolocation) {
        this.showToast('Geolocalización no disponible en tu navegador');
        return;
      }
      this.showToast('Obteniendo tu posición con GPS...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          this.setWizardCoordinates(lat, lng);
          if (this.wizardMiniMap) {
            this.wizardMiniMap.setView([lat, lng], 17);
          }
          this.showToast('¡Ubicación fijada con GPS! 🎯');
        },
        (err) => {
          this.showToast('No se pudo obtener el GPS. Puedes pinchar en el mapa.');
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    });

    // Marcar en mapa grande
    document.getElementById('btnWizardPickOnMainMap')?.addEventListener('click', () => {
      this.closeModal('modalApunta');
      this.switchView('map');
      this.isPickingOnMainMap = true;
      this.showToast('🗺️ Toca en el mapa de Daganzo para posicionar tu casa.');
    });

    // Filtros de categoría de iconos
    document.querySelectorAll('.icon-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.icon-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const cat = e.currentTarget.dataset.iconCat;
        this.renderWizardIconsGrid(cat);
      });
    });

    // Sustómetro selector
    document.querySelectorAll('.sustometro-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.sustometro-card').forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        this.wizard.sustoLevel = target.dataset.level;
        window.spookyAudio?.playStinger('creak');
      });
    });

    // Opciones de chuches
    document.querySelectorAll('.spooky-checkbox-chip[data-candy]').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.spooky-checkbox-chip[data-candy]').forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        this.wizard.candies = target.dataset.candy;
      });
    });

    // Efectos especiales
    document.querySelectorAll('.spooky-checkbox-chip[data-effect]').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const target = e.currentTarget;
        target.classList.toggle('selected');
        const effect = target.dataset.effect;
        if (target.classList.contains('selected')) {
          if (!this.wizard.effects.includes(effect)) this.wizard.effects.push(effect);
        } else {
          this.wizard.effects = this.wizard.effects.filter(ef => ef !== effect);
        }
      });
    });

    // Horarios rápidos
    document.querySelectorAll('.quick-hour-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.quick-hour-chip').forEach(c => c.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        const h = e.currentTarget.dataset.hours;
        this.wizard.hours = h;
        const inp = document.getElementById('houseHours');
        if (inp) inp.value = h;
      });
    });

    // Foto personalizada por URL
    document.getElementById('houseCustomImage')?.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        document.querySelectorAll('.preset-photo-thumb').forEach(t => t.classList.remove('selected'));
        this.wizard.image = val;
      }
    });

    // Envío del Asistente (Publicación definitiva de la casa)
    document.getElementById('formUserAddHouse')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleUserRegisterHouse();
    });

    document.getElementById('formEditHouse')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEditedHouse();
    });

    // 9. Admin y Pestañas
    document.getElementById('btnAdminLogin')?.addEventListener('click', () => {
      const pin = document.getElementById('adminPinInput')?.value;
      this.loginAdmin(pin);
    });

    document.getElementById('btnAdminLogout')?.addEventListener('click', () => {
      this.logoutAdmin();
    });

    document.getElementById('btnAdminResetHouses')?.addEventListener('click', () => {
      this.adminResetAllHouses();
    });

    document.getElementById('adminTabBtnPending')?.addEventListener('click', () => {
      this.setAdminTab('pending');
    });

    document.getElementById('adminTabBtnApproved')?.addEventListener('click', () => {
      this.setAdminTab('approved');
    });

    document.getElementById('adminTabBtnUsers')?.addEventListener('click', () => {
      this.setAdminTab('users');
    });

    // 9.5 Registro y Login de Vecino
    document.getElementById('tabBtnRegister')?.addEventListener('click', () => {
      const bReg = document.getElementById('tabBtnRegister');
      const bLog = document.getElementById('tabBtnLogin');
      if (bReg) {
        bReg.classList.add('active');
        bReg.style.background = 'var(--grad-pumpkin)';
        bReg.style.color = '#fff';
      }
      if (bLog) {
        bLog.classList.remove('active');
        bLog.style.background = 'transparent';
        bLog.style.color = 'var(--text-muted)';
      }
      const formR = document.getElementById('formUserRegister');
      const formL = document.getElementById('formUserLogin');
      if (formR) formR.style.display = 'block';
      if (formL) formL.style.display = 'none';
    });

    document.getElementById('tabBtnLogin')?.addEventListener('click', () => {
      const bReg = document.getElementById('tabBtnRegister');
      const bLog = document.getElementById('tabBtnLogin');
      if (bLog) {
        bLog.classList.add('active');
        bLog.style.background = 'var(--grad-pumpkin)';
        bLog.style.color = '#fff';
      }
      if (bReg) {
        bReg.classList.remove('active');
        bReg.style.background = 'transparent';
        bReg.style.color = 'var(--text-muted)';
      }
      const formR = document.getElementById('formUserRegister');
      const formL = document.getElementById('formUserLogin');
      if (formR) formR.style.display = 'none';
      if (formL) formL.style.display = 'block';
    });

    document.getElementById('formUserRegister')?.addEventListener('submit', (e) => {
      this.handleUserRegisterSubmit(e);
    });

    document.getElementById('formUserLogin')?.addEventListener('submit', (e) => {
      this.handleUserLoginSubmit(e);
    });

    // 10. Diploma
    document.getElementById('btnGenerateDiploma')?.addEventListener('click', () => {
      this.generateCertificate();
    });

    document.getElementById('passAliasInput')?.addEventListener('change', (e) => {
      this.state.alias = e.target.value.trim() || 'Vecino Valiente';
      localStorage.setItem('daganzo_alias', this.state.alias);
      this.showToast(`Alias guardado como "${this.state.alias}"`);
    });

    // 11. Cierre de modales
    document.querySelectorAll('.btn-modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new HalloweenApp();
});
