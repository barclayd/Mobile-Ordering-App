const Drink = require('../../../models/drink');
const {dateToString} = require('../../../helpers/date');

const transformDrink = drink => {
    return {
        ...drink._doc,
        _id: drink.id,
        type: drink._doc.type,
        nutritionInfo: drink._doc.nutritionInfo,
        price: drink._doc.price
    };
};

const drinks = async (drinkIds) => {
    try {
        const foundDrinks = [];
        await drinkIds.forEach(id => {
            const drink = Drink.findOne({_id: id});
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
    drinks,
    transformDrink,
    transformOrder
};
