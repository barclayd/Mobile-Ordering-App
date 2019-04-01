const {dateToString} = require("../../helpers/date");
const { PubSub, withFilter } = require('graphql-subscriptions');
const Order = require('../../models/order');
const BarStaff = require('../../models/barStaff');
const {drinks} = require("../resolvers/drinks");

const pubSub = new PubSub();

const ORDER_UPDATED = 'ORDER_UPDATED';

const resolvers = {
    Subscription: {
        orderUpdated: {
            subscribe: withFilter(
                () => pubSub.asyncIterator([ORDER_UPDATED]),
                (payload, args) => payload.orderId == args.orderId
            )
        }
    },
    Query: {
        findOrderById: async (parent, {id}, {input}) => {
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
    },
    Mutation: {
        updateOrder: async (parent, args, {input})  => {
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
                    orderUpdated: foundOrder
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
    }
};

module.exports = resolvers;
