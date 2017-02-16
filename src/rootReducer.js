/*eslint  import/no-unresolved: 0*/

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { listReducers } from './List';
import { homeReducers } from './Home';

export default combineReducers({
  ...homeReducers,
  ...listReducers,
  routing: routerReducer
});
