/*eslint  import/no-unresolved: 0*/

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { homeReducers } from './Home';
import { listReducers } from './List';
import { loginReducers } from './Login';

export default combineReducers({
  ...homeReducers,
  ...listReducers,
  ...loginReducers,
  routing: routerReducer
});
