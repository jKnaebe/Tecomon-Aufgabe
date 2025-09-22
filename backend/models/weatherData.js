const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    temperature: {
        type: Number,
        required: true
    },
    windspeed: {
        type: Number,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

weatherDataSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('WeatherData', weatherDataSchema);