const webpack = require('webpack');
const PATH = require('./path');

const hmrScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'

module.exports = {
  devtool: 'eval',
  context: PATH.root,
  entry: {
    app: [ 'babel-polyfill', './index', hmrScript ]
  },
  output: {
    path: PATH.dist,
    filename: '[name].js',
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
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
    extensions: [ '.js', '.jsx', '.css' ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  "plugins": [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ])
  ]
}
