'use strict'

const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const PATH = require('./path');

const hmrScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'

module.exports = {
  devtool: 'eval',
  context: PATH.root,
  entry: {
    app: [ './index', hmrScript ]
  },
  output: {
    path: PATH.dist,
    filename: '[name].js',
    publicPath: PATH.public
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATH.root
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', 'css' ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  "plugins": [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new htmlWebpackPlugin({
      template: '../src/index.html'
    })
  ]
}
