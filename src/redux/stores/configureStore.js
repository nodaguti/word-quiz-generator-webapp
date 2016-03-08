import { compose, applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import rootReducer from 'redux/reducers';
import transit from 'transit-immutable-js';
import { records as quizRecords } from 'redux/reducers/quiz';
import { records as resourcesRecords } from 'redux/reducers/resources';
import { records as settingsRecords } from 'redux/reducers/settings';
import { records as errorRecords } from 'redux/reducers/errors';

const recordTransit = transit.withRecords([
  ...quizRecords,
  ...resourcesRecords,
  ...settingsRecords,
  ...errorRecords,
]);

const localStorageConfig = {
  serialize: (subset) => recordTransit.toJSON(subset),
  deserialize: (serializedData) => recordTransit.fromJSON(serializedData),
};

export default function configureStore(initialState = {}) {
  const history = syncHistory(browserHistory);
  const createPersistentStore = compose(
    persistState(null, localStorageConfig),
    applyMiddleware(thunk, history)
  )(createStore);

  return createPersistentStore(rootReducer, initialState);
}
