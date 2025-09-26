const express = require('express');
const router = express.Router();
const Widget = require('../models/weatherData');
const { getWeather } = require('../services/weatherService');

router.get('/', async (req, res, next) => {
  try {
    const widgets = await Widget.find().sort('-updatedAt');
    const withWeather = await Promise.all(
      widgets.map(async (w) => {
        try {
          const wdata = await getWeather(w.city);
          return { ...w.toObject(), weather: wdata };
        } catch (err) {
          return { ...w.toObject(), weather: null, weatherError: err.message };
        }
      })
    );
    res.json(withWeather);
  } catch (err) {
    console.error('Fehler in GET /api/widgets:', err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { city } = req.body;
    if (!city) return res.status(400).json({ error: 'city benötigt' });

    const weatherData = await getWeather(city);

    const widget = await Widget.findOneAndUpdate(
      { city: weatherData.city },
      {
        temperature: weatherData.temperature,
        windspeed: weatherData.windspeed,
        updatedAt: Date.now()
      },
      { upsert: true, new: true }
    );

    res.status(201).json(widget);
  } catch (err) {
    console.error('Fehler in POST /api/widgets:', err);
    res.status(500).json({ error: 'Fehler beim Hinzufügen oder Aktualisieren der Stadt' });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Widget.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    console.error('Fehler in DELETE /api/widgets/:id:', err);
    next(err);
  }
});

module.exports = router;
