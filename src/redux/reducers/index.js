import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import resource from 'redux/reducers/resource';
import settings from 'redux/reducers/settings';
import quiz from 'redux/reducers/quiz';

export default combineReducers({
  routing: routeReducer,
  resource,
  settings,
  quiz,
});
