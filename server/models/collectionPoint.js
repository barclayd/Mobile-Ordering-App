const mongoose = require('mongoose');

const collectionsPointSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bar: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ingredient'
    },
    collectionPointId: {
        type: String,
    }
});

module.exports = mongoose.model('CollectionPoint', collectionsPointSchema);
