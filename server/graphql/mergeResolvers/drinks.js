const Drink = require('../../models/drink');

const drinks = async (drinkIds) => {
    try {
        const foundDrinks = [];
        await drinkIds.forEach(id => {
            const drink = Drink.findById(id);
            foundDrinks.push(drink);
        });
        await foundDrinks.map(drink => {
            return {
                ...drink.doc,
                _id: drink.id
            }
        });
        return foundDrinks;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    drinks
};
