const webpackConf = require('./webpack.config.dev-client');
module.exports = function(config) {
  config.set({

    basePath: '../src',

    frameworks: [ 'mocha', 'chai' ],

    files: [
      '../node_modules/babel-polyfill/dist/polyfill.js',
      '**/*.js',
      '**/*.jsx',
    ],

    exclude: [
      '**/*.css',
      'index.jsx'
    ],

    preprocessors: {
      '**/*.js': [ 'webpack' ],
      '**/*.jsx': [ 'webpack' ]
    },

    webpack: webpackConf,

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-webpack'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher')
    ],

    reporters: [ 'mocha', 'coverage' ],

    coverageReporter: {
      reporters: [
        {
          type: 'text-summary'
        }
      ]
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: [ 'PhantomJS' ],

    singleRun: false
  })
}
