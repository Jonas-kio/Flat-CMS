const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure directories exist
const dirs = ['content/posts', 'content/settings', 'uploads'];
dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

// Initialize settings if not exists
const settingsPath = path.join(__dirname, 'content/settings/site.json');
if (!fs.existsSync(settingsPath)) {
  fs.writeFileSync(settingsPath, JSON.stringify({
    title: 'PatitasSeguras',
    description: 'Refugio de animales con amor y dedicación',
    email: 'contacto@patitasseguras.org',
    phone: '+591 ',
    address: 'Cochabamba, Bolivia',
    facebook: '',
    instagram: '',
    heroTitle: 'Cada animal merece un hogar lleno de amor',
    heroSubtitle: 'Adoptá, apadriná o donä. Juntos hacemos la diferencia.',
    heroImage: ''
  }, null, 2));
}

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/media', require('./routes/media'));
app.use('/api/settings', require('./routes/settings'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🐾 PatitasSeguras backend corriendo en puerto ${PORT}`);
});
