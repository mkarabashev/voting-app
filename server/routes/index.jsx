/*eslint no-unused-vars: 0*/

import React from 'react';
import { Router } from 'express';
import { match, createRoutes } from 'react-router';

import pageRenderer from '../render';
import routes from '../../src/routes';

const router = Router();

router.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      res.send(pageRenderer(props));
    } else {
      res.status(404).send('404 Not Found');
    }
    res.end();
  });
});

module.exports = router;
