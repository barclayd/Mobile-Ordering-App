const Bar = require('../../models/bar');
const User = require('../../models/user');

module.exports = {
    updateLastVisitedBar: async ({userId, barId}) => {
        try {
            let foundBar = null;
            const user = await User.findOne({_id: userId});
            if (!user) {
                throw new Error(`Bar could not be found with barId: ${userId}`);
            }
            if (barId) {
                foundBar = await Bar.findOne({_id: barId});
                if (!foundBar) {
                    throw new Error(`Bar could not be found with barId: ${barId}`);
                }
                user.lastVisitedBar = barId;
            }
            await user.save();
            return {
                _id: user._id,
                email: user.email,
                password: null,
                role: user.role,
                name: user.name,
                lastVisitedBar: foundBar
            };
        } catch (err) {
            throw err;
        }
    }
};

