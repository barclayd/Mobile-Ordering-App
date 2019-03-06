const mongoose = require('mongoose');

const barStaffSchema = mongoose.Schema({
    firstName : {
        type: 'String',
        required: true
    },
    surname: {
        type: 'String',
        required: true
    },
});

const barStaff = mongoose.model('barStaff', barStaffSchema);
module.exports = barStaff;