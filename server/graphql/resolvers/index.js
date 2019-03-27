const authResolver = require('./auth');
const userResolver = require('./user');
const barResolver = require('./bar');
const drinksResolver = require('./drinks');
const ingredientsResolver = require('./ingredients');
const ordersResolver = require('./order');
const collectionPointResolver = require('./collectionPoint');
const barStaffResolver = require('./barStaff');

const rootResolver = {
  ...authResolver,
  ...barResolver,
  ...drinksResolver,
  ...ingredientsResolver,
  ...ordersResolver,
  ...collectionPointResolver,
  ...barStaffResolver,
  ...userResolver
};

module.exports = rootResolver;
