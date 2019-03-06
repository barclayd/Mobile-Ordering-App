const authResolver = require('./auth');
const barResolver = require('./bar');
const drinksResolver = require('./drinks');
const ingredientsResolver = require('./ingredients');

const rootResolver = {
  ...authResolver,
  ...barResolver,
  ...drinksResolver,
  ...ingredientsResolver
};

module.exports = rootResolver;
