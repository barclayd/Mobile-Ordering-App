const Drink = require('../../models/drink');
const Order = require('../../models/order');
const User = require('../../models/user');
const BarStaff = require('../../models/barStaff');
const CollectionPoint = require('../../models/collectionPoint');
const {dateToString} = require("../../helpers/date");
const {transformOrder} = require('./merge');
const {drinks} = require('./mergeResolvers/drinks');
const {processPayment} = require('../../helpers/stripe');
const uuid = require('uuid/v4');
const {PubSub, withFilter} = require('graphql-subscriptions');
const randomString = require('randomstring');

const pubSub = new PubSub();

const ORDER_UPDATED = 'ORDER_UPDATED';

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
            const collectionPoint = await CollectionPoint.findById(args.orderInput.collectionPoint);
            if (!collectionPoint) {
                throw new Error ('Invalid collection point to process order');
            }
            const generatedTransactionId = uuid();
            const collectionId = randomString.generate({
                length: 4,
                charset: 'readable',
                capitalization: 'uppercase'
            });
            const token = await req.get('Payment');
            const orderPrice = await req.get('Checkout');
            // process payment with stripe
            const userPayment = await processPayment(token, parseInt(orderPrice), collectionId, 'gbp');
            if (!userPayment) {
                // userPayment failed
                throw new Error ('Attempt to process user payment failed.');
            }
            const createdOrder = new Order({
                drinks: foundDrinks,
                collectionPoint: collectionPoint,
                status: args.orderInput.status,
                orderAssignedTo: args.orderInput.orderAssignedTo,
                date: dateToString(args.orderInput.date),
                userInfo: user,
                collectionId: collectionId,
                transactionId: generatedTransactionId,
                price: args.orderInput.price
            });
            const result = await createdOrder.save();
            return transformOrder(result);
        } catch (err) {
            throw err;
        }
    },
    findOrdersByUser: async ({userInfo}) => {
        try {
            const foundOrders = await Order.find({userInfo}).populate('userInfo').populate('collectionPoint');
            return foundOrders.reverse().map(async foundOrder => {
                const modifiedUserInfo = {
                    ...foundOrder.userInfo._doc,
                    password: null
                };
                const returnedDrinks = await drinks(foundOrder.drinks);
                return {
                    _id: foundOrder._id,
                    drinks: returnedDrinks,
                    collectionPoint: foundOrder.collectionPoint,
                    collectionId: foundOrder.collectionId,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder._doc.date),
                    userInfo: modifiedUserInfo,
                    transactionId: foundOrder.transactionId
                };
            });
        } catch (err) {
            throw err;
        }
    },
    findOrdersByCollectionPoint: async ({collectionPoint}) => {
        try {
            const foundCollectionPoint = await CollectionPoint.findOne({_id: collectionPoint});
            if (!foundCollectionPoint) {
                throw new Error(`Collection Point ${collectionPoint} does not exist`);
            }
            const foundOrders = await Order.find({$and: [{collectionPoint}, {status: ["AWAITING_COLLECTION", "PENDING", "IN_PROGRESS"]}]}).populate('userInfo').populate('collectionPoint');
            return foundOrders.reverse().map(async foundOrder => {
                const modifiedUserInfo = {
                    ...foundOrder.userInfo._doc,
                    password: null
                };
                const returnedDrinks = await drinks(foundOrder.drinks);
                return {
                    _id: foundOrder._id,
                    drinks: returnedDrinks,
                    collectionPoint: foundOrder.collectionPoint,
                    collectionId: foundOrder.collectionId,
                    status: foundOrder.status,
                    orderAssignedTo: foundOrder.orderAssignedTo,
                    date: dateToString(foundOrder._doc.date),
                    userInfo: modifiedUserInfo,
                    transactionId: foundOrder.transactionId
                };
            });
            } catch (err) {
            throw err;
        }
    },
    findOrders: async () => {
        try {
            const foundOrders = await Order.find().populate('userInfo').populate('collectionPoint');
            return foundOrders.reverse().map(async foundOrder => {
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
            throw err;
        }
    },
    findOrderById: async ({id}) => {
        try {
            const foundOrder = await Order.findOne({_id: id}).populate('userInfo').populate('collectionPoint');
            const returnedDrinks = await drinks(foundOrder.drinks);
            return {
                _id: foundOrder._id,
                drinks: returnedDrinks,
                collectionPoint: foundOrder.collectionPoint,
                collectionId: foundOrder.collectionId,
                status: foundOrder.status,
                orderAssignedTo: foundOrder.orderAssignedTo,
                date: dateToString(foundOrder._doc.date),
                userInfo: foundOrder.userInfo,
                transactionId: foundOrder.transactionId,
                price: foundOrder.price
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    updateOrder: async (args) => {
        try {
            const foundOrder = await Order.findOne({_id: args.orderStatusInput.orderId}).populate('orderAssignedTo');
            foundOrder.status = args.orderStatusInput.status;
            const returnedDrinks = await drinks(foundOrder.drinks);
            if (args.orderStatusInput.barStaffId) {
                foundOrder.orderAssignedTo = args.orderStatusInput.barStaffId;
            }
            const barStaffMember = await BarStaff.findOne({_id: args.orderStatusInput.barStaffId});
            await foundOrder.save();
            await pubSub.publish(ORDER_UPDATED, {
                orderId: foundOrder._id,
                orderStatus: foundOrder.status
            });
            return {
                _id: foundOrder._id,
                drinks: returnedDrinks,
                collectionPoint: foundOrder.collectionPoint,
                collectionId: foundOrder.collectionPoint.collectionId,
                status: foundOrder.status,
                orderAssignedTo: barStaffMember,
                date: dateToString(foundOrder._doc.date),
                userInfo: foundOrder.userInfo,
                transactionId: foundOrder.transactionId
            }
        } catch (err) {
            throw err;
        }
    },
    orderUpdated: {
        subscribe: withFilter(
            () => pubSub.asyncIterator(ORDER_UPDATED),
            (payload, args) => payload.orderId === args.orderId,
        ),
    },
    updateOrderAssignedTo: async (args) => {
        try {
            const foundOrder = await Order.findOne({_id: args.orderAssignedToInput.orderId}).populate('orderAssignedTo');
            if (args.orderAssignedToInput.barStaffId) {
                foundOrder.orderAssignedTo = args.orderAssignedToInput.barStaffId;
            } else {
                foundOrder.orderAssignedTo = null;
            }
            const barStaffMember = await BarStaff.findOne({_id: args.orderAssignedToInput.barStaffId});
            await foundOrder.save();
            return {
                _id: foundOrder._id,
                drinks: foundOrder.drinks,
                collectionPoint: foundOrder.collectionPoint,
                collectionId: foundOrder.collectionPoint.collectionId,
                status: foundOrder.status,
                orderAssignedTo: barStaffMember,
                date: dateToString(foundOrder._doc.date),
                userInfo: foundOrder.userInfo,
                transactionId: foundOrder.transactionId
            }
        } catch (err) {
            throw err;
        }
    }
};



