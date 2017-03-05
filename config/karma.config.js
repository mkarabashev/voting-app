const path = require('path');

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

    webpack: {
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
          },
          {
            test: /\.css$/,
            exclude: './styles',
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  camelCase: 'Dashes',
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              'postcss-loader'
            ]
          },
          {
            test: /\.css$/,
            include: './styles',
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader'
            ]
          }
        ]
      },
      resolve: {
        extensions: [ '.js', '.jsx', '.css' ],
        alias: {
          HOComponents: path.join(process.cwd(), 'src', 'HOComponents', 'index.js'),
          components: path.join(process.cwd(), 'src', 'components', 'index.js')
        }
      },
      externals: {
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': true
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

    browsers: [ 'PhantomJS' ],

    singleRun: false
  })
}
