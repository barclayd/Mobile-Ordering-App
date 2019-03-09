const Ingredient = require('../../models/ingredient');
const {transformDrink} = require('./merge');

module.exports = {
    ingredients: async () => {
        try {
            const ingredients = await Ingredient.find();
            return ingredients.map(ingredient => {
                return {
                    ...ingredient._doc
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createIngredient: async (args) => {
        try {
            console.log("made it");
            const createdIngredient = new Ingredient({
                name: args.ingredientInput.name,
                amount: args.ingredientInput.amount,
                allergy: args.ingredientInput.allergy,
                containsAlcohol: args.ingredientInput.containsAlcohol
            });
            const result = await createdIngredient.save();
            console.log(result);
            return {
                ...result._doc,
                _id: result.id,
            };
        } catch (err) {
            throw err;
        }
    },
    findIngredients: async ({category}) => {
        try {
            const foundIngredients = await Ingredient.find({name: name});
            return foundIngredients.map(foundIngredients => {
                return {
                    ...foundIngredients._doc
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};


