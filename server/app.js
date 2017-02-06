
const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const path = require('path');

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
    const webpackConfig = require('../config/webpack.config.dev');
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
      var memoryFs = compiler.outputFileSystem;
      var index = path.join(webpackConfig.output.path, 'index.html');
      var html = memoryFs.readFileSync(index);
      res.end(html);
    });

  // routes
  } else {
    app.use(express.static(dist))
    app.use('/', require('./routes'));
  }

  return app;
};
