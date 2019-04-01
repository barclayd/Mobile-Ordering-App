const {dateToString} = require('../../helpers/date');

const transformDrink = drink => {
    return {
        ...drink._doc,
        _id: drink.id,
        type: drink._doc.type,
        nutritionInfo: drink._doc.nutritionInfo,
        price: drink._doc.price
    };
};


const transformOrder = order => {
    return {
        ...order._doc,
        _id: order.id,
        userInfo: order.userInfo,
        drinks: order.drinks,
        collectionPoint: order.collectionPoint,
        status: order.status,
        orderAssignedTo: order.orderAssignedTo,
        date: dateToString(order.date),
        transactionId: order.transactionId
    };
};

module.exports = {
    transformDrink,
    transformOrder
};
