const {dateToString} = require("../../helpers/date");
const { PubSub, withFilter } = require('graphql-subscriptions');
const Order = require('../../models/order');
const BarStaff = require('../../models/barStaff');
const Bar = require('../../models/bar');
const User = require('../../models/user');
const {drinks} = require('../resolvers/mergeResolvers/drinks');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pubSub = new PubSub();

const ORDER_UPDATED = 'ORDER_UPDATED';

const resolvers = {
    Subscription: {
        orderUpdated: {
            subscribe: withFilter(
                () => pubSub.asyncIterator([ORDER_UPDATED]),
                // == must be kept below due to issue with strings not being evaluated correctly
                (payload, args) => payload.orderId == args.orderId
            )
        }
    },
    Query: {
        login: async (parent, {email, password}) => {
            // does user exist
            const user = await User.findOne({email: email}).populate('lastVisitedBar');
            // no user found
            if (!user) {
                throw new Error('Authentication failed');
            }
            // validate password
            const isEqual = await bcrypt.compare(password, user.password);
            // check if password is incorrect
            if (!isEqual) {
                throw new Error('Authentication failed');
            }
            const token = jwt.sign({
                userId: user.id,
                email: user.email,
                role: user.role
            }, process.env.PRIVATE_KEY, {
                expiresIn: '1h'
            });
            return {
                userId: user.id,
                token: token,
                tokenExpiration: 1,
                name: user.name,
                lastVisitedBar: user.lastVisitedBar
            };
        },
        findOrderById: async (parent, {id}) => {
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
        findAllBars: async () => {
            try {
                const bars = await Bar.find();
                return bars.map(bar => {
                    return {
                        ...bar._doc
                    };
                });
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            try {
                const user = await User.findOne({
                    email: args.userInput.email
                });
                if (user) {
                    throw new Error('Email already in use');
                }
                const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
                const createdUser = new User({
                    email: args.userInput.email,
                    password: hashedPassword,
                    role: args.userInput.role,
                    name: args.userInput.name
                });
                const result = await createdUser.save();
                return {
                    ...result._doc,
                    _id: result.id,
                    password: null
                };
            } catch (err) {
                throw err;
            }
        },
        updateOrder: async (parent, args)  => {
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
