'use strict'

const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
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
    new cleanWebpackPlugin(PATH.dist, {
      root: process.cwd()
    }),
    new htmlWebpackPlugin({
      template: path.join(PATH.root, 'index.html')
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
}
