const BarStaff = require('../../models/barStaff');
const Bar = require('../../models/bar');

module.exports = {
    createBarStaffMember: async (args) => {
        try {
            const bar = await Bar.findOne({_id: args.barStaffInput.barId});
            if (!bar) {
                throw new Error (`Bar with barId: ${args.barStaffInput.barId} does not exist`);
            }
            const createdBarStaffMember = new BarStaff({
                firstName: args.barStaffInput.firstName,
                lastName: args.barStaffInput.lastName,
                bar: args.barStaffInput.barId
            });
            const result = await createdBarStaffMember.save();
            return {
                ...result._doc,
                _id: result.id,
                bar: bar
            };
        } catch (err) {
            throw err;
        }
    },
    findBarStaffByBar: async ({barId}) => {
        try {
            const bar = await Bar.findOne({_id: barId});
            if (!bar) {
                throw new Error (`Bar with barId: ${barId} does not exist`);
            }
            const foundBarStaff = await BarStaff.find({bar: barId});
            return foundBarStaff.map(barStaff => {
                return {
                    _id: barStaff._id,
                    firstName: barStaff.firstName,
                    lastName: barStaff.lastName,
                    bar: bar
                };
            });
        } catch (err) {
            throw err;
        }
    }
};

