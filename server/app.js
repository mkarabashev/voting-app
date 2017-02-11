const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const dist = require('../config/path').dist;

module.exports = () => {
  const app = express();

  // logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('common'));
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

    app.get('*', function (req, res) {
      res.send(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>react</title>
          </head>
          <body>
            <div id="app"></div>
            <script src="/app.js"></script>
          </body>
        </html>
        `
      );
    });

  // routes
  } else {
    app.use(express.static(dist));
    app.use('*', require('./routes'));
  }

  return app;
};
