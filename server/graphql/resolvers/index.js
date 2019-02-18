const authResolver = require('./auth');
const barResolver = require('./bar');
const drinksResolver = require('./drinks');

const rootResolver = {
  ...authResolver,
  ...barResolver,
  ...drinksResolver
};

module.exports = rootResolver;
