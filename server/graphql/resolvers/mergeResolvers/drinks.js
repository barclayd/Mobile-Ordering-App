const Drink = require('../../../models/drink');

const drinks = async (drinkIds) => {
    try {
        let foundDrinks = [];
        for (let i in drinkIds) {
            console.log(drinkIds[i]);
            const searchedDrinks = await Drink.findOne({_id: drinkIds[i]});
            if (searchedDrinks) {
                foundDrinks.push(searchedDrinks);
            }
        }
        foundDrinks.map(drink => {
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
