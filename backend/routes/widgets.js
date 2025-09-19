const express = require('express');
const router = express.Router();
const Widget = require('../models/weatherData');
const {getWeather} = require('../services/weatherService');

router.get('/', async (req, res, next) => {
    try {
        const widgets = await Widget.find().sort('-createdAt');
        const withWeather = await Promise.all(widgets.map(async w => {
            try {
                const wdata = await getWeather(w.location);
                return {...w.toObject(), weather: wdata};
            } catch (err) {
                return {...w.toObject(), weather: null, weatherError: err.message};
            }
        }));
        res.json(withWeather);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {location} = req.body;
        if (!location) return res.status(400).json({error: 'location benötigt'});

        const widget = new Widget({location});
        await widget.save();
        res.status(201).json(widget);
    } catch (err) {
        nect(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        await Widget.findByIdAndDelete(id);
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

module.exports = router;