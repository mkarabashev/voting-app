const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const compression = require('compression');
const dist = require('../config/path').dist;
const html = require('./render')();

module.exports = () => {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }

  // logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  // hide this is running on express
  app.disable('x-powered-by');

  // setup hmr in dev mode
  if (process.env.NODE_ENV === 'development') {
    const webpackConfig = require('../config/webpack.config.dev-client');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }));

    app.get('*', (req, res) => res.send(html));
  } else {
    // routes
    app.use(express.static(dist));
    app.use('*', require('./routes'));
  }

  return app;
};
