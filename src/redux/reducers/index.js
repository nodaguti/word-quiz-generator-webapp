import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import resources from 'redux/reducers/resources';
import settings from 'redux/reducers/settings';
import quiz from 'redux/reducers/quiz';

export default combineReducers({
  routing: routeReducer,
  resources,
  settings,
  quiz,
});
