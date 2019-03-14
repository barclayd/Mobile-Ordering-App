const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ingredients: [{
        type: Schema.ObjectId, ref: 'Ingredient'
    }],
    category: {
        type: String,
        required: true
    },
    nutritionInfo: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Drink', drinkSchema);
