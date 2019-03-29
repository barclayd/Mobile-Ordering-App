const mongoose = require('mongoose');

const barStaffSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bar: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bar'
    }
});

module.exports = mongoose.model('BarStaff', barStaffSchema);
