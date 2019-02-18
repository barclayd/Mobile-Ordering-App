const transformDrink = drink => {
    return {
        ...drink._doc,
        _id: drink.id,
        type: drink._doc.type,
        nutritionInfo: drink._doc.nutritionInfo,
        price: drink._doc.price
    };
};

module.exports = {
    transformDrink
};
