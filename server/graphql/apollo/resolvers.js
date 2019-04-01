const {dateToString} = require("../../helpers/date");
const Drink = require('../../models/drink');
const Menu = require('../../models/menu');
const {transformDrink} = require('./mergeResolvers/drinks');
const { PubSub, withFilter } = require('graphql-subscriptions');
const Order = require('../../models/order');
const BarStaff = require('../../models/barStaff');
const CollectionPoint = require('../../models/collectionPoint');
const Bar = require('../../models/bar');
const User = require('../../models/user');
const {drinks} = require('./mergeResolvers/drinks');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {processPayment} = require('../../helpers/stripe');
const uuid = require('uuid/v4');
const randomString = require('randomstring');

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
        },
        findBar: async (parent, {barCode}) => {
            // does bar exist with given bar code
            const bar = await Bar.findOne({
                barCode: barCode.toUpperCase()
            }).populate({
                path: 'menus',
                populate: {
                    path: 'drinks'
                }
            });
            // no bar found with given bar code
            if (!bar) {
                throw new Error(`Bar with bar code: ${barCode} does not exist`);
            }
            return {
                _id: bar.id,
                name: bar.name,
                barCode: bar.barCode,
                type: bar.type,
                description: bar.description,
                latitude: bar.latitude,
                longitude: bar.longitude,
                image: bar.image,
                logo: bar.logo,
                menus: bar.menus
            };
        },
        findBarStaffByBar: async (parent, {barId}) => {
            try {
                const bar = await Bar.findOne({_id: barId});
                if (!bar) {
                    throw new Error (`Bar with barId: ${barId} does not exist`);
                }
                const foundBarStaff = await BarStaff.find({bar: barId});
                return foundBarStaff.map(barStaff => {
                    return {
                        _id: barStaff._id,
                        firstName: barStaff.firstName,
                        lastName: barStaff.lastName,
                        bar: bar
                    };
                });
            } catch (err) {
                throw err;
            }
        },
        findCollectionPointById: async (parent, {collectionPointId}) => {
            // does collectionPoint exist with given id
            const collectionPoint = await CollectionPoint.findOne({
                collectionPointId: collectionPointId.toUpperCase()
            });
            // no collectionPoint found with given id
            if (!collectionPoint) {
                throw new Error(`Collection Point with collectionPointId: ${collectionPointId} does not exist`);
            }
            return {
                _id: collectionPoint.id,
                name: collectionPoint.name,
                bar: collectionPoint.bar,
                collectionPointId: collectionPoint.collectionPointId
            };
        },
        findCollectionPointsByBar: async (parent, {barId}) => {
            // does collectionPoint exist with given id
            const bar = await Bar.findOne({_id: barId});
            if (!bar) {
                throw new Error(`Bar with barId: ${barId} does not exist`);
            }
            const collectionPoints = await CollectionPoint.find({bar: barId});
            // no collectionPoint found with given id
            return collectionPoints.map(collectionPoint => (
                {
                    _id: collectionPoint.id,
                    name: collectionPoint.name,
                    bar: bar,
                    collectionPointId: collectionPoint.collectionPointId
                }
            ));
        },
        findDrinks: async (parent, {category}) => {
            try {
                const foundDrinks = await Drink.find({category: category});
                return foundDrinks.map(foundDrink => {
                    return transformDrink(foundDrink)
                });
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        findDrinkCategories: async () => {
            try {
                const foundCategories = await Drink.distinct('category');
                return foundCategories.map(category => {
                    return {
                        category: category
                    }
                });
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        findDrinkCategoriesByMenu: async (parent, {menuId}) => {
            try {
                const menu = await Menu.findOne({_id: menuId}).populate('drinks');
                // const returnedDrinks = await drinks(menu.drinks);
                const categories = [];
                menu.drinks.map(drink => {
                    if (!categories.includes(drink.category)) {
                        categories.push(drink.category);
                    }
                });
                return categories.map(category => {
                    return {
                        category: category
                    }
                });
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        findOrdersByUser: async (parent, {userInfo}) => {
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
        findOrdersByCollectionPoint: async (parent, {collectionPoint}) => {
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
    },
    Mutation: {
        createOrder: async (parent, args, {headers}) => {
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
                const token = await headers.payment;
                const orderPrice = await headers.checkout;
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
                return await createdOrder.save();
            } catch (err) {
                throw err;
            }
        },
        createBarStaffMember: async (parent, args) => {
            try {
                const bar = await Bar.findOne({_id: args.barStaffInput.barId});
                if (!bar) {
                    throw new Error (`Bar with barId: ${args.barStaffInput.barId} does not exist`);
                }
                const createdBarStaffMember = new BarStaff({
                    firstName: args.barStaffInput.firstName,
                    lastName: args.barStaffInput.lastName,
                    bar: args.barStaffInput.barId
                });
                const result = await createdBarStaffMember.save();
                return {
                    ...result._doc,
                    _id: result.id,
                    bar: bar
                };
            } catch (err) {
                throw err;
            }
        },
        createCollectionPoint: async (parent, args) => {
            try {
                let collectionPointId = Math.random().toString(36).substring(2, 6).toUpperCase();
                const collectionPoint = await CollectionPoint.findOne({
                    collectionPointId: collectionPointId
                });
                if (!collectionPoint) {
                    collectionPointId = Math.random().toString(36).substring(2, 6).toUpperCase();
                }
                const bar = await Bar.findOne({_id: args.collectionPointInput.bar});
                if (!bar) {
                    throw new Error(`Bar with provided id: ${collectionPointId} does not exist`);
                }
                const createdCollectionPoint = new CollectionPoint({
                    name: args.collectionPointInput.name,
                    bar: bar,
                    collectionPointId: collectionPointId,
                });
                const result = await createdCollectionPoint.save();
                return {
                    ...result._doc,
                    _id: result.id,
                    bar: bar
                };
            } catch (err) {
                throw err;
            }
        },
        createDrink: async (parent, args) => {
            try {
                const createdDrink = new Drink({
                    name: args.drinkInput.name,
                    category: args.drinkInput.category,
                    nutritionInfo: args.drinkInput.nutritionInfo,
                    price: args.drinkInput.price
                });
                const result = await createdDrink.save();
                return {
                    ...result._doc,
                    _id: result.id,
                };
            } catch (err) {
                throw err;
            }
        },
        createBar: async (parent, args) => {
            try {
                let barCode = Math.random().toString(36).substring(2, 6).toUpperCase();
                const bar = await Bar.findOne({
                    barCode: barCode
                });
                if (bar) {
                    barCode = Math.random().toString(36).substring(2, 6).toUpperCase();
                }
                const createdBar = new Bar({
                    name: args.barInput.name,
                    barCode: barCode,
                    type: args.barInput.type,
                    description: args.barInput.description,
                    latitude: args.barInput.latitude,
                    longitude: args.barInput.longitude,
                    image: args.barInput.image,
                    logo: args.barInput.logo,
                    menus: args.barInput.menus
                });
                const result = await createdBar.save();
                return {
                    ...result._doc,
                    _id: result.id,
                };
            } catch (err) {
                throw err;
            }
        },
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
        createMenu: async (parent, args) => {
            try {
                const returnedDrinks = await drinks(args.menuInput.drinks);
                if (!returnedDrinks) {
                    throw new Error('Error found whilst processing drinkIds');
                }
                const createdMenu = new Menu({
                    name: args.menuInput.name,
                    drinks: args.menuInput.drinks,
                    description: args.menuInput.description,
                    image: args.menuInput.image
                });
                const result = await createdMenu.save();
                return {
                    ...result._doc,
                    _id: result.id,
                    drinks: returnedDrinks
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
                    collectionId: foundOrder.collectionId,
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
        updateOrderAssignedTo: async (parent, args) => {
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
        },
        updateLastVisitedBar: async (parent, {userId, barId}) => {
            try {
                let foundBar = null;
                const user = await User.findOne({_id: userId});
                if (!user) {
                    throw new Error(`Bar could not be found with barId: ${userId}`);
                }
                if (barId) {
                    foundBar = await Bar.findOne({_id: barId});
                    if (!foundBar) {
                        throw new Error(`Bar could not be found with barId: ${barId}`);
                    }
                    user.lastVisitedBar = barId;
                }
                await user.save();
                return {
                    _id: user._id,
                    email: user.email,
                    password: null,
                    role: user.role,
                    name: user.name,
                    lastVisitedBar: foundBar
                };
            } catch (err) {
                throw err;
            }
        }
    }
};

module.exports = resolvers;
