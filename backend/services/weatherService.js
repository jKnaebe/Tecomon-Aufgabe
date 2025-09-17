const axios = require('axios');
const weatherData = require('../models/weatherData');
const cache = {};

async function getWeather(city) {
    if (cache[city] && (Date.now() - cache[city].timestamp < 5 * 60 * 1000)) {  // 1000 = 1000 Milisekunden = 1 Sekunde * 60 = 1 Minute * 5 = 5 Minuten
        return cache[city].data;
    }

    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude,
            longitude,
            current: "temperature_2m,rain"
        }
    });

    const data = {
        city,
        temperature: response.data.current.temperature_2m,
        rain: response.data.current.rain
    };

    await weatherData.findOneAndUpdate(
        {city: data.city},
        data,
        {upset: true}
    );

    cache[city] = {data, timestamp: Date.now()};
    
    return data;
}

module.exports = {getWeather};