const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    barCode: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    logo: {
        type: String
    },
    menus: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Menu'
    }]
});

module.exports = mongoose.model('Bar', barSchema);
