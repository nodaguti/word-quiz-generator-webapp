import { combineReducers } from 'redux';
import resources from './resources';
import settings from './settings';
import quiz from './quiz';
import errors from './errors';

export default combineReducers({
  resources,
  settings,
  quiz,
  errors,
});
