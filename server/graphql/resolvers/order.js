const Drink = require('../../models/drink');
const Order = require('../../models/order');
const User = require('../../models/user');
const CollectionPoint = require('../../models/collectionPoint');
const {dateToString} = require("../../helpers/date");
const {transformOrder} = require('./merge');
const {processPayment} = require('../../helpers/stripe');
const uuid = require('uuid/v4');
const randomString = require('randomstring');

module.exports = {
    createOrder: async (args, req) => {
        try {
            // Find user
            const user = await User.findById(args.orderInput.userInfo);
            if (!user) throw new Error ('Invalid user account to process order');
            
            // Find collection point
            const collectionPoint = await CollectionPoint.findById(args.orderInput.collectionPoint);
            if (!collectionPoint) throw new Error ('Invalid collection point to process order');
            
            // Find drinks
            let foundDrinks = [];
            for (let i in args.orderInput.drinks) {
                const drink = await Drink.findById(args.orderInput.drinks[i]);
                if (!drink) throw new Error ('Drink with invalid ID entered');
                
                foundDrinks.push(drink);
            }

            // Generate a nice collection code
            const collectionId = randomString.generate({
                length: 4,
                charset: 'readable',
                capitalization: 'uppercase'
            });

            // Process payment with Stripe
            const token = await req.get('Payment');
            const orderPrice = await req.get('Checkout');
            const userPayment = await processPayment(token, parseInt(orderPrice), collectionId, 'gbp');
            if (!userPayment) throw new Error ('Attempt to process user payment failed.');

            // Build order object
            const createdOrder = new Order({
                drinks: foundDrinks,
                collectionPoint: collectionPoint,
                status: args.orderInput.status,
                orderAssignedTo: args.orderInput.orderAssignedTo,
                date: dateToString(args.orderInput.date),
                userInfo: user,
                collectionId: collectionId,
                transactionId: uuid()
            });

            // Save to server
            const result = await createdOrder.save();
            return transformOrder(result);
        } catch (err) {
            throw err;
        }
    },
    findOrdersByUser: async ({userInfo}) => {
        try {
            const foundOrders = await Order.find({userInfo})
                    .populate('userInfo collectionPoint drinks')
                    .populate({
                        path: 'userInfo',
                        select: '-password' // Explicitly exclude password field
                    });
            return foundOrders.reverse().map(async foundOrder => {
                foundOrder.date = dateToString(foundOrder._doc.date); // Convert date to string
                return foundOrder;
            });
        } catch (err) {
            throw err;
        }
    },
    findOrdersByCollectionPoint: async ({collectionPoint}) => {
        try {
            const foundCollectionPoint = await CollectionPoint.findById(collectionPoint);
            if (!foundCollectionPoint) {
                throw new Error(`Collection Point ${collectionPoint} does not exist`);
            }

            let foundOrders = await Order.find({$and: [{collectionPoint}, {status: ["AWAITING_COLLECTION", "PENDING", "IN_PROGRESS"]}]})
                    .populate('collectionPoint drinks')
                    .populate({
                        path: 'userInfo',
                        select: '-password' // Explicitly exclude password field
                    });
            
            return foundOrders.reverse().map(async foundOrder => {
                foundOrder.date = dateToString(foundOrder._doc.date); // Convert date to string
                return foundOrder;
            });
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    findOrders: async () => {
        try {
            const foundOrders = await Order.find().populate('userInfo collectionPoint drinks');
            return foundOrders.reverse().map(async foundOrder => {
                foundOrder.date = dateToString(foundOrder.date); // Convert date to string
                return foundOrder;
            });
        } catch (err) {
            throw err;
        }
    },
    findOrderById: async ({id}) => {
        try {
            const foundOrder = await Order.findById(id).populate('userInfo collectionPoint drinks');
            foundOrder.date = dateToString(foundOrder.date); // Convert date to string
            return foundOrder;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    updateOrder: async (args) => {
        try {
            // Find order and deep populate
            const foundOrder = await Order.findById(args.orderStatusInput.orderId).populate('orderAssignedTo drinks userInfo');
            
            // Update order and save
            foundOrder.status = args.orderStatusInput.status;
            if (args.orderStatusInput.barStaffId) {
                foundOrder.orderAssignedTo = args.orderStatusInput.barStaffId;
            }
            await foundOrder.save();
            
            foundOrder.date = dateToString(foundOrder._doc.date); // Convert date to string
            return foundOrder;
        } catch (err) {
            throw err;
        }
    },
    updateOrderAssignedTo: async (args) => {
        try {
            // Find order and reassign bartender
            const foundOrder = await Order.findById(args.orderAssignedToInput.orderId).populate('orderAssignedTo userInfo');
            if (args.orderAssignedToInput.barStaffId) {
                foundOrder.orderAssignedTo = args.orderAssignedToInput.barStaffId;
            } else {
                foundOrder.orderAssignedTo = null; // Unassign bartender
            }
            await foundOrder.save();

            foundOrder.date = dateToString(foundOrder._doc.date); // Convert date to string
            return foundOrder
        } catch (err) {
            throw err;
        }
    }
};