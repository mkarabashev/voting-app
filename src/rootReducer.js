/*eslint  import/no-unresolved: 0*/

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { homeReducers } from './Home';
import { listReducers } from './List';
import { authReducers } from './Auth';
import { layoutReducers } from './Layout';

export default combineReducers({
  ...homeReducers,
  ...listReducers,
  ...authReducers,
  ...layoutReducers,
  routing: routerReducer
});
