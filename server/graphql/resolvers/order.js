const Drink = require('../../models/drink');
const Order = require('../../models/order');
const User = require('../../models/user');
const {dateToString} = require("../../helpers/date");
const {transformOrder} = require('./merge');
const {drinks} = require('./mergeResolvers/drinks');
const {processPayment} = require('../../helpers/stripe');
const uuid = require('uuid/v4');

module.exports = {
    createOrder: async (args, req) => {
        try {
            let drinksIdCheck = false;
            let foundDrinks = [];
            for (let i in args.orderInput.drinks) {
                const searchedDrinks = await Drink.findOne({_id: args.orderInput.drinks[i]});
                if (searchedDrinks) {
                    foundDrinks.push(searchedDrinks);
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
            const generatedTransactionId = uuid();
            // process payment with stripe
            const userPayment = await processPayment(null, 9.99, generatedTransactionId, 'uk');
            if (!userPayment) {
                // userPayment failed
                throw new Error ('Attempt to process user payment failed.');
            }
            const createdOrder = new Order({
                drinks: foundDrinks,
                collectionPoint: args.orderInput.collectionPoint,
                status: args.orderInput.status,
                orderAssignedTo: args.orderInput.orderAssignedTo,
                date: dateToString(args.orderInput.date),
                userInfo: user,
                transactionId: generatedTransactionId
            });
            const result = await createdOrder.save();
            return transformOrder(result);
        } catch (err) {
            throw err;
        }
    },
    findOrdersByUser: async ({userInfo}) => {
        try {
            const foundOrders = await Order.find({userInfo}).populate('userInfo');
            return foundOrders.map(async foundOrder => {
                const modifiedUserInfo = {
                    ...foundOrder.userInfo._doc,
                    password: null
                };
                const returnedDrinks = await drinks(foundOrder.drinks);
                return {
                    _id: foundOrder._id,
                    drinks: returnedDrinks,
                    collectionPoint: foundOrder.collectionPoint,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder._doc.date),
                    userInfo: modifiedUserInfo,
                    transactionId: foundOrder.transactionId
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    findOrders: async () => {
        try {
            const foundOrders = await Order.find().populate('userInfo');
            return foundOrders.map(async foundOrder => {
                const returnedDrinks = await drinks(foundOrder.drinks);
                return {
                    ...foundOrder._doc,
                    drinks: returnedDrinks,
                    collectionPoint: foundOrder.collectionPoint,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder.date),
                    userInfo: foundOrder.userInfo,
                    transactionId: foundOrder.transactionId
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    findOrderById: async ({_id}) => {
        try {
            const foundOrder = await Order.findOne({_id});
            console.log('foundOrder',foundOrder.userInfo)
                const returnedDrinks = await drinks(foundOrder.drinks);
                return {
                    _id: _id,
                    drinks: returnedDrinks,
                    collectionPoint: foundOrder.collectionPoint,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder._doc.date),
                    userInfo: foundOrder.userInfo,
                    // transactionId: foundOrder.transactionId
                };
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};



