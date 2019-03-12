const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true,
        unique: true
    },
    "amount": {
        type: String,
        enum: ["shot", "mixer", "small", "medium", "large", "half-pint", "pint"]
    },
    "allergy": {
        type: String,
        required: false
    },
    "containsAlcohol" : {
        type: Boolean
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
