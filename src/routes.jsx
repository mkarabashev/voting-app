/*eslint react/prop-types:0*/

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { Layout } from './Layout';
import { Home } from './Home';
import { List } from './List';
import { Login, Logout } from './Login';
import About from './components/About';
import NotFound from './components/NotFound';

const createRoutes = (store) => {

  const requireAuth = (nextState, replace, callback) => {
    const { userReducer: { authenticated: auth } } = store.getState();
    if (!auth) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { userReducer: { authenticated: auth } } = store.getState();
    if (auth) {
      replace({
        pathname: '/'
      })
    }
    callback();
  };

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/list" component={List} />
      <Route path="/logout" component={Logout} />
      <Route path="/login" component={Login} onEnter={redirectAuth} />
      <Route path="/about" component={About} onEnter={requireAuth} />
      <Route path="*" component={NotFound} />
    </Route>
  );
}

export default createRoutes;
