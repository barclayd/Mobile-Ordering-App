const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return {
                    ...user._doc
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    login: async ({email, password}) => {
        // does user exist
        const user = await User.findOne({
            email: email
        });
        // no user found
        if (!user) {
            throw new Error('Authentication failed');
        }
        // validate password
        const isEqual = await bcrypt.compare(password, user.password);
        // check if password is incorrect
        if (!isEqual) {
            throw new Error('Authentication failed');
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, process.env.PRIVATE_KEY, {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        };
    }
};

