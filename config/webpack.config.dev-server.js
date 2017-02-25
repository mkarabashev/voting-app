const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const noop = require('node-noop').noop;
const PATH = require('./path');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  name: 'server',
  devtool: 'source-map',
  context: PATH.root,
  entry: {
    server: [ 'babel-polyfill', '../server/server' ]
  },
  target: 'node',
  node: {
    __dirname: false
  },
  output: {
    path: path.join(PATH.dist, 'server'),
    filename: '[name].dev.js',
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
}
