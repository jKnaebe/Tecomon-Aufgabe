const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Datenbank vebunden'))
.catch(err => console.error('Verbindungsfehler:', err));

app.get('/', (req, res) => {
    res.send('Backend läuft');
});

app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000; //Absicherung falls .env PORT nicht gesetzt ist
app.listen(PORT, () => console.log(`Server läuft auf Port: ${PORT}`));