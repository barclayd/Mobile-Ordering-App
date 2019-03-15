const Drink = require('../../../models/drink');
const {quantityCalculator} = require('../../../helpers/quantityCalculator');

const drinks = async (drinkIds) => {
    try {
        const searchedDrinks = await Drink.find({_id: {$in: drinkIds}});
        console.log(searchedDrinks);
        const drinkQuantity = quantityCalculator(drinkIds);
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
