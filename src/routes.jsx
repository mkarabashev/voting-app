/*eslint react/prop-types:0*/

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './components/Layout';
import { Home } from './Home';
import { List } from './List';
import About from './components/About';
import NotFound from './components/NotFound';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/list" component={List} />
    <Route path="/about" component={About} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
