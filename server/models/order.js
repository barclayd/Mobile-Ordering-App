const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    drinks: [{
        type: Schema.ObjectId, ref:'drink'
    }],
    collectionPoint: {
        type: 'String',
        required: true,
    },
    status: {
        type: 'String',
        required: true,
    },
    promotionID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'promotion'
        }
    ],
    orderAssignedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'barStaff'
        }
    ]
});

const order = mongoose.model('order', orderSchema);
module.exports = order;