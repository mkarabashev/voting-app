import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import List from './components/List';
import About from './components/About';
import NotFound from './components/NotFound';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/list" component={List} />
      <Route path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default AppRouter;
