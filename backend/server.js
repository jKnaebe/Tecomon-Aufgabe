const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const widgetRoutes = require('./routes/widget');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Datenbank verbunden'))
  .catch(err => console.error('Verbindungsfehler:', err));

app.get('/', (req, res) => res.send('Backend läuft'));

app.use('/api/widgets', widgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port: ${PORT}`));
