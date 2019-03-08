const Order = require('../../models/order');
const Drink = require('../../models/drink');

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
            const foundDrinks = await Drink.find({id: ID});
            return foundDrinks.map(foundDrink => {
                return transformDrink(foundDrink)
            });
        } catch (err) {
            throw err;
        }
    },
    findCollectionPoint: async (args) => {
        try {
            const foundCollectionPoint = await Order.find({collectionPoint: collectionPoint}) ;
            return foundCollectionPoint.map(foundCollectionPoint => {
                return transformCollectionPoint(foundCollectionPoint)
            });
        } catch (err) {
            throw err;
        }
    },

    createOrder: async (args) => {
        try {
            const createOrder = new Order({
                drinks: args.drinkInputId.id,
                collectionPoint: args.collectionPoint,
                status: args.status,
            })
        } catch (err) {
            throw err;
        }
    },
};