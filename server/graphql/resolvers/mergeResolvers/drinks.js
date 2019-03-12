const Drink = require('../../../models/drink');

const drinks = async (drinkIds) => {
    try {
        const drinks = await Drink.find({_id: drinkIds[0]});
        drinks.map(drink => {
            return {
                ...drink.doc,
                _id: drink.id
            }
        });
        return drinks;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    drinks
};
