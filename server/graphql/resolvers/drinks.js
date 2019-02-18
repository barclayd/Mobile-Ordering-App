const Drink = require('../../models/drink');

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
                type: args.drinkInput.type,
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
    findDrinks: async ({type}) => {
        // does bar exist with given bar code
        const category = await Drink.find({
            type: type
        });
        // no bar found with given bar code
        if (!category) {
            throw new Error(`Drinks dont exist with type ${category}`);
        }
        return {
            _id: category.id,
            name: category.name,
            type: category.type,
            nutitionInfo: category.nutritionInfo,
            price: category.price
        };
    }
};

