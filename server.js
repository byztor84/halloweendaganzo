// Servidor local con Base de Datos JSON y API de Moderación
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const HOUSES_FILE = path.join(DATA_DIR, 'houses.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Asegurar existencia del directorio data
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON(filePath, fallback = []) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(`Error leyendo ${filePath}:`, e);
  }
  return fallback;
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error(`Error escribiendo ${filePath}:`, e);
    return false;
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function sendJSON(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const [urlPath, queryString] = req.url.split('?');
  const query = new URLSearchParams(queryString || '');

  // ========================================================
  // API REST: CASAS, USUARIOS Y MODERACIÓN
  // ========================================================
  if (urlPath.startsWith('/api/')) {
    const route = urlPath.replace('/api/', '');

    // 1. OBTENER CASAS
    if (route === 'houses' && req.method === 'GET') {
      const houses = readJSON(HOUSES_FILE, []);
      const showAll = query.get('all') === 'true'; // Admin puede ver todas (aprobadas y pendientes)
      if (showAll) {
        return sendJSON(res, 200, { ok: true, houses });
      }
      // Público sólo ve las aprobadas
      const approvedHouses = houses.filter(h => h.status === 'approved');
      return sendJSON(res, 200, { ok: true, houses: approvedHouses });
    }

    // 2. REGISTRAR CASA (QUEDA EN ESTADO 'PENDING')
    if (route === 'houses' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.title || !body.street || !body.coords) {
        return sendJSON(res, 400, { ok: false, error: 'Faltan datos obligatorios' });
      }

      const houses = readJSON(HOUSES_FILE, []);

      // Verificar que el icono elegido no esté ocupado
      if (body.iconId) {
        const iconTaken = houses.some(h => (h.iconId === body.iconId || h.icon === body.icon) && h.id !== body.id);
        if (iconTaken) {
          return sendJSON(res, 409, { ok: false, error: 'Ese icono exclusivo de Halloween ya ha sido reservado por otra casa.' });
        }
      }

      const newHouse = {
        id: `casa-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: body.title.trim(),
        street: body.street.trim(),
        coords: body.coords,
        category: body.category || 'caramelos',
        iconId: body.iconId || 'calabaza',
        icon: body.icon || '🎃',
        hours: body.hours || '19:00 - 22:30',
        hasCandies: !!body.hasCandies,
        kidsFriendly: !!body.kidsFriendly,
        inContest: !!body.inContest,
        votes: 0,
        image: body.image || 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=700&q=80',
        description: body.description || '',
        status: 'pending', // ¡PENDIENTE DE APROBACIÓN POR EL ADMINISTRADOR!
        createdAt: Date.now(),
        ownerId: body.ownerId || null,
        ownerName: body.ownerName || 'Vecino anónimo',
        ownerContact: body.ownerContact || 'No especificado'
      };

      houses.push(newHouse);
      writeJSON(HOUSES_FILE, houses);

      return sendJSON(res, 201, {
        ok: true,
        house: newHouse,
        message: '¡Casa registrada con éxito! Está en revisión por el administrador y aparecerá en el mapa en cuanto sea aprobada.'
      });
    }

    // 3. ADMIN: APROBAR CASA
    if (route === 'admin/approve' && req.method === 'POST') {
      const body = await parseBody(req);
      const houses = readJSON(HOUSES_FILE, []);
      const houseIndex = houses.findIndex(h => h.id === body.id);
      if (houseIndex === -1) {
        return sendJSON(res, 404, { ok: false, error: 'Casa no encontrada' });
      }

      houses[houseIndex].status = 'approved';
      houses[houseIndex].approvedAt = Date.now();
      writeJSON(HOUSES_FILE, houses);

      return sendJSON(res, 200, { ok: true, house: houses[houseIndex], message: '¡Casa aprobada y publicada en el mapa!' });
    }

    // 4. ADMIN: RECHAZAR / ELIMINAR CASA
    if (route === 'admin/reject' && req.method === 'POST') {
      const body = await parseBody(req);
      let houses = readJSON(HOUSES_FILE, []);
      const houseToDelete = houses.find(h => h.id === body.id);
      if (!houseToDelete) {
        return sendJSON(res, 404, { ok: false, error: 'Casa no encontrada' });
      }

      houses = houses.filter(h => h.id !== body.id);
      writeJSON(HOUSES_FILE, houses);

      return sendJSON(res, 200, { ok: true, message: 'Casa eliminada. El icono ha vuelto a quedar disponible.' });
    }

    // 5. ADMIN: EDITAR CASA DIRECTAMENTE
    if (route === 'admin/edit' && req.method === 'POST') {
      const body = await parseBody(req);
      const houses = readJSON(HOUSES_FILE, []);
      const idx = houses.findIndex(h => h.id === body.id);
      if (idx === -1) {
        return sendJSON(res, 404, { ok: false, error: 'Casa no encontrada' });
      }

      houses[idx] = { ...houses[idx], ...body };
      writeJSON(HOUSES_FILE, houses);
      return sendJSON(res, 200, { ok: true, house: houses[idx] });
    }

    // 6. ADMIN: RESTABLECER A CASAS DE MUESTRA
    if (route === 'admin/reset' && req.method === 'POST') {
      // Recrea las casas iniciales
      const defaultHouses = [
        {
          id: "casa-1",
          title: "La Mansión de los Espíritus",
          street: "Calle de la Villa, 4",
          coords: [40.5448, -3.4572],
          category: "terror",
          iconId: "fantasma",
          icon: "👻",
          hours: "19:00 - 23:00",
          hasCandies: true,
          kidsFriendly: false,
          inContest: true,
          votes: 42,
          image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=700&q=80",
          description: "Pasaje del terror con actores en vivo, humo niebla y reparto de caramelos en el jardín.",
          status: "approved",
          ownerName: "Comisión Vecinal Daganzo",
          ownerContact: "600111222"
        },
        {
          id: "casa-2",
          title: "La Casa de las Chuches Encantadas",
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
          image: "https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?auto=format&fit=crop&w=700&q=80",
          description: "Reparto de chuches y golosinas sin gluten para todos los peques de Daganzo.",
          status: "approved",
          ownerName: "Familia García",
          ownerContact: "600222333"
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
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
          description: "Fachada completa esculpida a mano con cementerio temático y photocall para familias.",
          status: "approved",
          ownerName: "Familia Moreno",
          ownerContact: "600333444"
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
          image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=700&q=80",
          description: "Especial para los más peques (0 a 8 años). Sin sustos bruscos y con música festiva.",
          status: "approved",
          ownerName: "Vecinos Fresnedillas",
          ownerContact: "600444555"
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
          image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80",
          description: "Efectos luminosos, sonidos tenebrosos y animatronics activados por movimiento.",
          status: "approved",
          ownerName: "Grupo Amigos Calle Real",
          ownerContact: "600555666"
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
          image: "https://images.unsplash.com/photo-1476136236990-838240be4859?auto=format&fit=crop&w=700&q=80",
          description: "Ven disfrazado y di la frase mágica para llevarte una bolsa de dulces sorpresa.",
          status: "approved",
          ownerName: "Familia Serrano",
          ownerContact: "600666777"
        }
      ];
      writeJSON(HOUSES_FILE, defaultHouses);
      return sendJSON(res, 200, { ok: true, houses: defaultHouses, message: 'Casas restablecidas' });
    }

    // 7. AUTENTICACIÓN / REGISTRO DE VECINOS
    if (route === 'auth/register' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.name || !body.email || !body.password) {
        return sendJSON(res, 400, { ok: false, error: 'Por favor, completa nombre, email y contraseña' });
      }

      const users = readJSON(USERS_FILE, []);
      const emailLower = body.email.toLowerCase().trim();
      const existing = users.find(u => u.email.toLowerCase() === emailLower);
      if (existing) {
        return sendJSON(res, 409, { ok: false, error: 'Ya existe una cuenta con este correo electrónico.' });
      }

      const newUser = {
        id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: body.name.trim(),
        email: emailLower,
        phone: body.phone ? body.phone.trim() : '',
        password: body.password,
        createdAt: Date.now()
      };

      users.push(newUser);
      writeJSON(USERS_FILE, users);

      // Responder sin enviar la contraseña
      const { password, ...userSafe } = newUser;
      return sendJSON(res, 201, { ok: true, user: userSafe, message: '¡Cuenta creada correctamente!' });
    }

    if (route === 'auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const emailLower = (body.email || '').toLowerCase().trim();
      const users = readJSON(USERS_FILE, []);
      const user = users.find(u => u.email.toLowerCase() === emailLower && u.password === body.password);

      if (!user) {
        return sendJSON(res, 401, { ok: false, error: 'Correo o contraseña incorrectos.' });
      }

      const { password, ...userSafe } = user;
      return sendJSON(res, 200, { ok: true, user: userSafe, message: '¡Sesión iniciada!' });
    }

    if (route === 'users' && req.method === 'GET') {
      const users = readJSON(USERS_FILE, []);
      const houses = readJSON(HOUSES_FILE, []);

      const usersWithHouses = users.map(({ password, ...u }) => {
        const userHouses = houses.filter(h => {
          if (h.ownerId && h.ownerId === u.id) return true;
          if (h.ownerEmail && h.ownerEmail.toLowerCase() === u.email.toLowerCase()) return true;
          if (h.owner && h.owner.email && h.owner.email.toLowerCase() === u.email.toLowerCase()) return true;
          if (h.ownerContact && u.phone && h.ownerContact.replace(/\D/g, '') === u.phone.replace(/\D/g, '')) return true;
          if (h.ownerName && h.ownerName.toLowerCase() === u.name.toLowerCase()) return true;
          return false;
        }).map(h => ({
          id: h.id,
          title: h.title,
          street: h.street,
          category: h.category,
          iconId: h.iconId,
          icon: h.icon || '🎃',
          hours: h.hours,
          status: h.status,
          image: h.image,
          votes: h.votes || 0,
          description: h.description
        }));

        return {
          ...u,
          houses: userHouses,
          houseCount: userHouses.length
        };
      });

      return sendJSON(res, 200, { ok: true, users: usersWithHouses });
    }

    // 8. ADMIN: ELIMINAR USUARIO REGISTRADO
    if (route === 'admin/users/delete' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.id) {
        return sendJSON(res, 400, { ok: false, error: 'Falta el ID del usuario a eliminar' });
      }

      let users = readJSON(USERS_FILE, []);
      const userToDelete = users.find(u => u.id === body.id || u.email === body.id);
      if (!userToDelete) {
        return sendJSON(res, 404, { ok: false, error: 'Usuario no encontrado en la base de datos' });
      }

      users = users.filter(u => u.id !== userToDelete.id && u.email !== userToDelete.email);
      writeJSON(USERS_FILE, users);

      return sendJSON(res, 200, {
        ok: true,
        message: `Usuario "${userToDelete.name}" eliminado correctamente.`
      });
    }

    return sendJSON(res, 404, { ok: false, error: 'Endpoint API no encontrado' });
  }

  // ========================================================
  // SERVIDO DE ARCHIVOS ESTÁTICOS (HTML, CSS, JS, IMÁGENES)
  // ========================================================
  let reqPath = decodeURI(urlPath);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, reqPath);

  // Seguridad: evitar directory traversal fuera de ROOT_DIR
  if (!filePath.startsWith(ROOT_DIR)) {
    res.statusCode = 403;
    res.end('Acceso denegado');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('404 Archivo no encontrado');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎃 Servidor de Halloween Daganzo activo en el puerto ${PORT}`);
  
  const ifaces = os.networkInterfaces();
  console.log('\n📱 Para probar desde tu móvil (en la misma WiFi):');
  for (let dev in ifaces) {
    ifaces[dev].forEach(details => {
      if (details.family === 'IPv4' && !details.internal) {
        console.log(`   http://${details.address}:${PORT}`);
      }
    });
  }
  console.log(`\n💻 Para probar en este ordenador:`);
  console.log(`   http://localhost:${PORT}`);
});
