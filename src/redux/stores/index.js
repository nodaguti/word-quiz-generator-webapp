const configureStore = process.env.NODE_ENV === 'development' ?
  './configureStore.dev.js' :
  './configureStore.js';

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(configureStore);
