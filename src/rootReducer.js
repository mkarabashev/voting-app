import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { listReducers } from './List';

export default combineReducers({
  ...listReducers,
  routing: routerReducer
});
