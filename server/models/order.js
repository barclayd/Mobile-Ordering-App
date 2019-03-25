const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    drinks: [{
        type: mongoose.Schema.ObjectId,
        ref:'Drink',
    }],
    collectionPoint: {
        type: mongoose.Schema.ObjectId,
        ref: 'CollectionPoint'
    },
    status: {
        type: String,
        enum: ["AWAITING_COLLECTION", "IN_PROGRESS", "PENDING"],
    },
    orderAssignedTo: {
        type: String,
        ref: 'barStaff'
    },
    date: {
        type: Date,
        required: true
    },
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    transactionId: {
        type: String,
    },
    collectionId: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Order', orderSchema);
