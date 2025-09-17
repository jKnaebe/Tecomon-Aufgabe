const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema ({
    city: {type: String, require: true},
    temperature: Number,
    rain: Number,
    updateedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('weatherData', weatherSchema);