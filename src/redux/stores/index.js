const configureStore = process.env.NODE_ENV === 'development' ?
  './configureStore.dev.js' :
  './configureStore.js';

module.exports = require(configureStore);
