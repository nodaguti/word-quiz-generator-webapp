import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import rootReducer from 'redux/reducers';
import { Iterable } from 'immutable';
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

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) {
    return state.toJS();
  }
  return state;
};

export default function configureStore(initialState = {}) {
  const logger = createLogger({ stateTransformer });
  const createPersistentStore = compose(
    persistState(null, localStorageConfig),
    applyMiddleware(thunk, logger),
  )(createStore);

  return createPersistentStore(rootReducer, initialState);
}
