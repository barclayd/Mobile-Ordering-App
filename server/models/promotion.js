const mongoose = require('mongoose');

const promotionSchema = mongoose.Schema({
    deal: [
        {
            name : {
                type: 'String'
            },
        },
    ],
    barId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bar'
        }
    ],
    drinkIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bar'
        }
    ],
});

const promotion = mongoose.model('promotion', promotionSchema);
module.exports = promotion;
