module.exports = function(config) {
  config.set({

    basePath: 'src',

    frameworks: [ 'mocha', 'chai' ],

    files: [
      '**/*.js',
      '**/*.jsx'
    ],

    exclude: [
      '**/*.css',
      'index.jsx'
    ],

    preprocessors: {
      '**/*.js': [ 'webpack' ],
      '**/*.jsx': [ 'webpack' ]
    },

    webpack: {
      resolve: {
        extensions: [ ".js", ".jsx", ".json", ".css" ]
      },
      module: {
        loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader'
          ]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
        ]
      }
    },

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

    browsers: [ 'Chrome' ],

    singleRun: false
  })
}
