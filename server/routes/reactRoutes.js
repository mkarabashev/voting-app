/*eslint no-unused-vars: 0*/

import React from 'react';
import { Router } from 'express';
import { match, createRoutes } from 'react-router';
import { createStore } from 'redux';

import rootReducer from '../../src/rootReducer';
import pageRenderer from '../render/pageRenderer';
import makeRoutes from '../../src/routes';


export default function reactRoutes(app) {
  const route = Router();

  route.get('*', (req, res) => {
    const store = createStore(rootReducer);
    const routes = makeRoutes(store);

    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } else if (props) {
        res.send(pageRenderer(props, store, req.user));
      } else {
        res.status(404).send('404 Not Found');
      }
      res.end();
    });
  });

  app.use('*', route);
}
