const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const noop = require('node-noop').noop;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = require('./path');

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
  context: PATH.root,
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
    path: PATH.dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATH.root
      },
      {
        test: /\.css$/,
        exclude: './styles',
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
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
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor', 'manifest' ]
    }),
    new CleanWebpackPlugin(PATH.dist, {
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
  context: PATH.root,
  entry: {
    server: [ 'babel-polyfill', '../server/cluster' ]
  },
  target: 'node',
  node: {
    __dirname: false
  },
  output: {
    path: path.join(PATH.dist, 'server'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [PATH.root, path.join(__dirname, '..', 'server')]
      },
      {
        test: /\.css$/,
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.css$/,
        include: './styles',
        use: [
          'style-loader',
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
    extensions: [ '.js', '.jsx', '.css' ]
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
