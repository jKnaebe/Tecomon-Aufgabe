const axios = require('axios');
const weatherData = require('../models/weatherData');

const cache = {};

async function geocodeCity(city) {
    const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: { name: city, count: 1 }
    });

    if (!geoRes.data.results || geoRes.data.results.length === 0) {
        throw new Error(`Stadt nicht gefunden: ${city}`);
    }

    const { latitude, longitude, name } = geoRes.data.results[0];
    return { latitude, longitude, name };
}

async function getWeather(city) {
    if (cache[city] && (Date.now() - cache[city].timestamp < 5 * 60 * 1000)) {  // 1000 = 1000 Milisekunden = 1 Sekunde * 60 = 1 Minute * 5 = 5 Minuten
        return cache[city].data;
    }

    const { latitude, longitude, name } = await geocodeCity(city);

    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude,
            longitude,
            current_weather: true
        }
    });

    const data = {
        city: name,
        temperature: response.data.current_weather.temperature,
        windspeed: response.data.current_weather.windspeed
    };

     await weatherData.findOneAndUpdate(
        { city: data.city },
        data,
        { upsert: true, new: true }
    );

    cache[city] = { data, timestamp: Date.now() };
    
    return data;
}

module.exports = { getWeather };