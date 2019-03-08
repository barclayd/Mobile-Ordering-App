const authResolver = require('./auth');
const barResolver = require('./bar');
const drinksResolver = require('./drinks');
const ingredientsResolver = require('./ingredients');
const orderResolver = require('./order');

const rootResolver = {
  ...authResolver,
  ...barResolver,
  ...drinksResolver,
  ...ingredientsResolver,
  ...orderResolver
};

module.exports = rootResolver;
