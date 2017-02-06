const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const PATH = require('./path');

module.exports = {
  devtool: 'source-map',
  context: PATH.root,
  entry: {
    app: './index.js',
    vendor: [
      'react',
      'react-dom'
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
      }
    ]
  },
  resolve: {
    extensions: [ 'js', 'jsx', 'css' ],
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
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new cleanWebpackPlugin(PATH.dist, {
      root: process.cwd()
    }),
    new htmlWebpackPlugin({
      template: path.join(PATH.root, 'index.html')
    })
  ]
}
