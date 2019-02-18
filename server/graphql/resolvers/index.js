const authResolver = require('./auth');
const barResolver = require('./bar');

const rootResolver = {
  ...authResolver,
  ...barResolver
};

module.exports = rootResolver;
