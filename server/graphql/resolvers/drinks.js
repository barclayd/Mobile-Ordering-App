const Drink = require('../../models/drink');
const {transformDrink} = require('./merge');

module.exports = {
    drinks: async () => {
        try {
            const drinks = await Drink.find();
            return drinks.map(drink => {
                return {
                    ...drink._doc
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createDrink: async (args) => {
        try {
            const createdDrink = new Drink({
                name: args.drinkInput.name,
                category: args.drinkInput.category,
                nutritionInfo: args.drinkInput.nutritionInfo,
                price: args.drinkInput.price
            });
            const result = await createdDrink.save();
            return {
                ...result._doc,
                _id: result.id,
            };
        } catch (err) {
            throw err;
        }
    },
    findDrinks: async ({category}) => {
        try {
            const foundDrinks = await Drink.find({category: category});
            return foundDrinks.map(foundDrink => {
                return transformDrink(foundDrink)
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};

