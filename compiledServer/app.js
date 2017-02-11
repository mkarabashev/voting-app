'use strict';

var express = require('express');
var morgan = require('morgan');
var webpack = require('webpack');
var path = require('path');

var dist = require('../config/path').dist;

module.exports = function () {
  var app = express();

  // logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('common'));
  }

  // hide this is running on express
  app.disable('x-powered-by');

  // setup hmr in dev mode
  if (process.env.NODE_ENV === 'development') {
    (function () {
      var webpackConfig = require('../config/webpack.config.dev');
      var webpackDevMiddleware = require('webpack-dev-middleware');
      var webpackHotMiddleware = require('webpack-hot-middleware');

      var compiler = webpack(webpackConfig);
      app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
      }));

      app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
      }));

      app.get('*', function (req, res) {
        var memoryFs = compiler.outputFileSystem;
        var index = path.join(webpackConfig.output.path, 'index.html');
        var html = memoryFs.readFileSync(index);
        res.end(html);
      });

      // routes
    })();
  } else {
    app.use(express['static']('../src'));
    app.use('/', require('./routes'));
  }

  return app;
};