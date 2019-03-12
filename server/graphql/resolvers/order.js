const Drink = require('../../models/drink');
const Order = require('../../models/order');
const User = require('../../models/user');
const {dateToString} = require("../../helpers/date");


module.exports = {
    createOrder: async (args) => {
        try {
            let drinksIdCheck = false;
            for (let i in args.orderInput.drinks) {
                const searchedDrinks = await Drink.findOne({_id: args.orderInput.drinks[i]});
                if (searchedDrinks) {
                    drinksIdCheck = true;
                }
            }
            if (!drinksIdCheck) {
                throw new Error ('Drink with invalid ID entered');
            }
            const user = await User.findById(args.orderInput.userInfo);
            if (!user) {
                throw new Error ('Invalid user account to process order');
            }
            const createdOrder = new Order({
                drinks: args.orderInput.drinks,
                collectionPoint: args.orderInput.collectionPoint,
                status: args.orderInput.status,
                orderAssignedTo: args.orderInput.orderAssignedTo,
                date: dateToString(args.orderInput.date),
                userInfo: user._id
            });
            const result = await createdOrder.save();
            return {
                ...result._doc,
                _id: result.id,
            };
        } catch (err) {
            throw err;
        }
    },
    findOrdersById: async ({orderId}) => {
        try {
            const foundOrders = await Order.find({_id: orderId});
            return foundOrders.map(foundOrder => {
                return {
                    drinks: foundOrder.drinks,
                    collectionPoint: foundOrder.collectionPoint,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder.date),
                    userInfo: foundOrder.userInfo
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    findOrdersByUser: async ({userInfo}) => {
        try {
            const foundOrders = await Order.find({userInfo});
            console.log(userInfo);
            console.log(foundOrders);
            return foundOrders.map(foundOrder => {
                return {
                    drinks: foundOrder.drinks,
                    collectionPoint: foundOrder.collectionPoint,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder._doc.date),
                    userInfo: foundOrder.userInfo
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    findOrders: async () => {
        try {
            const foundOrders = await Order.find();
            return foundOrders.map(foundOrder => {
                console.log(foundOrder);
                return {
                    drinks: foundOrder.drinks,
                    collectionPoint: foundOrder.collectionPoint,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder.date),
                    userInfo: foundOrder.userInfo
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};

