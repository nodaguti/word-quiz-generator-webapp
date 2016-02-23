import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import resource from 'redux/reducers/resource';
import setting from 'redux/reducers/setting';
import quiz from 'redux/reducers/quiz';

export default combineReducers({
  routing: routeReducer,
  resource,
  setting,
  quiz,
});
