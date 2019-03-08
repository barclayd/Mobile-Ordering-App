const BarStaff = require('../../models/barStaff');

module.exports = {
    barStaff: async () => {
        try {
            const barStaff = await BarStaff.find();
            return barStaff.map(barStaff => {
            return barStaff.map(barStaff => {
                return {
                    ...barStaff._doc
                };
            });
        })
        } catch (err) {
            console.log(err);
            throw err;
        }
        },



};