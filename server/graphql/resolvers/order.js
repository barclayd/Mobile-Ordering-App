const Order = require('../../models/order');

module.exports = {
    order: async () => {
        try {
            const order = await Order.find();
            return order.map(order => {
                return {
                    ...order._doc
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    findDrinks: async (args) => {
        try {
            const foundDrinks = await Drink.find({category: category});
            return foundDrinks.map(foundDrink => {
                return transformDrink(foundDrink)
            });
        } catch (err) {
            throw err;
        }
    },
    findCollectionPoint: async (args) => {

    },

    createOrder: async (args) => {
        try {
            const createOrder = new Order({
                drinks: args.drinkInputId.id,
                collectionPoint: collectionPoint,

            })
        } catch (err) {
            throw err;
        }
    },
};