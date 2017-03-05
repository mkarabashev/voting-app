const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const noop = require('node-noop').noop;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = require('./paths');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [{
  name: 'browser',
  devtool: 'source-map',
  context: PATHS.root,
  entry: {
    app: [ 'babel-polyfill', './index' ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'redux-saga'
    ]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATHS.root
      },
      {
        test: /\.css$/,
        exclude: './styles',
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      },
      {
        test: /\.css$/,
        include: './styles',
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader'
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.css' ],
    alias: {
      react: path.join(process.cwd(), 'node_modules', 'react', 'dist', 'react.min.js'),
      'react-dom': path.join(process.cwd(), 'node_modules', 'react-dom', 'dist', 'react-dom.min.js'),
      HOComponents: path.join(process.cwd(), 'src', 'HOComponents', 'index.js'),
      components: path.join(process.cwd(), 'src', 'components', 'index.js')
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor', 'manifest' ]
    }),
    new CleanWebpackPlugin(PATHS.dist, {
      root: process.cwd()
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkHash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
},
{
  name: 'server',
  devtool: 'source-map',
  context: PATHS.root,
  entry: {
    server: [ 'babel-polyfill', '../server/cluster' ]
  },
  target: 'node',
  node: {
    __dirname: false
  },
  output: {
    path: path.join(PATHS.dist, 'server'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [PATHS.root, path.join(__dirname, '..', 'server')]
      },
      {
        test: /\.css$/,
        exclude: './styles',
        use: [
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
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
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
  plugins: [
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new webpack.NormalModuleReplacementPlugin(/\.css$/, noop),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.BannerPlugin(
      {
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }
    )
  ],
  externals: nodeModules
}]
