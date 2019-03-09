const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        unique: true
    },
    ingredients: [{
        type: Schema.ObjectId, ref: 'ingredient'
    }],

    category: {
        type: 'String',
        required: true
    },
    nutritionInfo: {
        type: 'String',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const drink = mongoose.model('drink', drinkSchema);
module.exports = drink;