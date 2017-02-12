/*eslint no-unused-vars: 0*/

const router = require('express').Router();
const React = require('react');
const match = require('react-router').match;
const createRoutes = require('react-router').createRoutes;
const html = require('../render');
const reactRenderer = require('../render/reactRenderer');
const AppRouter = require('../../src/router');
import { renderToString } from 'react-dom/server'

router.get('*', (req, res) => {
  const routes = createRoutes(AppRouter.default());
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      const reactString = reactRenderer(props);
      res.send(html(reactString));
    } else {
      res.status(404).send('404 Not Found');
    }
    res.end();
  });
});

module.exports = router;
