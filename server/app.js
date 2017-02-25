import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { urlencoded } from 'body-parser';
import session from 'express-session';

import { dist } from '../config/path';

module.exports = () => {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(compression());

    // hide this is running on express
    app.disable('x-powered-by');

    // assets
    app.use(express.static(dist));
  }

  // logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  // passport
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

  // setup hmr in dev mode
  if (process.env.NODE_ENV === 'development') {
    const webpackConfig = require('../config/webpack.config.dev-client');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true
    }));

    app.use(webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }));
  }

  // auth routing
  app.use('/', require('./routes/auth').default);

  // app routing
  app.use('*', require('./routes/react').default);

  return app;
};
