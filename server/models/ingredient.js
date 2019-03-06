const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true,
        unique: true
    },
    "allergy": {
        type: String,
        required: false
    },
    "containsAlcohol" : {
        type: Boolean
    }
});

const ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = ingredient;