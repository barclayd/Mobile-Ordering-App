const authResolver = require('./auth');
const barResolver = require('./bar');
const drinksResolver = require('./drinks');
const ingredientsResolver = require('./ingredients');
const ordersResolver = require('./order');
const collectionPointResolver = require('./collectionPoint');

const rootResolver = {
  ...authResolver,
  ...barResolver,
  ...drinksResolver,
  ...ingredientsResolver,
  ...ordersResolver,
  ...collectionPointResolver
};

module.exports = rootResolver;
