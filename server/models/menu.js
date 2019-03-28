const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    drinks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Drink'
    }],
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Menu', menuSchema);
