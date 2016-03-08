import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import resources from './resources';
import settings from './settings';
import quiz from './quiz';
import errors from './errors';

export default combineReducers({
  routing: routeReducer,
  resources,
  settings,
  quiz,
  errors,
});
