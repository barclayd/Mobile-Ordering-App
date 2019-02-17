const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    name: {
        type: 'String'
    },
    ingredients: {
        type: [
            'Mixed'
        ]
    }
});

const drink = mongoose.model('drink', drinkSchema);
module.exports = drink;