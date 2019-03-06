const mongoose = require('mongoose');

const ingredientAmountSchema = mongoose.Schema({
    ingredientId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ingredient'
        }
    ],
    "measurement": {
        type: String,
        enum: ["shot", "mixer", "small", "medium", "large", "half-pint", "pint"]
    },
});

const ingredientAmount = mongoose.model('IngredientAmount', ingredientAmountSchema);
module.exports = ingredientAmount;