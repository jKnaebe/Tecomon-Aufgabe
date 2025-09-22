const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Datenbank verbunden'))
  .catch(err => console.error('Verbindungsfehler:', err));

// Test-Route
app.get('/', (req, res) => res.send('Backend läuft'));

// Wetter-Routes
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port: ${PORT}`));