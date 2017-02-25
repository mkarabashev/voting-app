/*eslint no-unused-vars: 0*/

import React from 'react';
import { Router } from 'express';
import { match, createRoutes } from 'react-router';
import { createStore } from 'redux';

import rootReducer from '../../src/rootReducer';
import pageRenderer from '../render/pageRenderer';
import makeRoutes from '../../src/routes';

const store = createStore(rootReducer);
const router = Router();
const routes = makeRoutes(store);

router.get('/redir', (req, res) => res.redirect('/'))

router.get('*', (req, res) => {
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

export default router;
