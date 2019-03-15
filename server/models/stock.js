const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    collectionPointId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'collectionPoint'
        }
    ],
    ingredientId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'promotion'
        }
    ],
    inStock : {
        type: Boolean,
        required: true
    },
});

const stock = mongoose.model('Stock', stockSchema);
module.exports = stock;
