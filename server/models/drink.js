const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    drink: {
        ingredient: {
            type: 'String'
        },
        amount: {
            type: 'String'
        },
        allergy: {
            type: 'Mixed'
        },
        containsAlcohol: {
            type: 'Boolean'
        }
    },
    transactionId: {
        type: 'String'
    }
});

const drink = mongoose.model('drink', drinkSchema);
module.exports = drink;