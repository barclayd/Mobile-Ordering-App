const Drink = require('../../../models/drink');

const drinks = async (drinkIds) => {
    try {
        const searchedDrinks = await Drink.find({_id: {$in: drinkIds}});
        searchedDrinks.map(drink => {
            return {
                ...drink.doc,
                _id: drink.id
            }
        });
        return searchedDrinks;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    drinks
};
