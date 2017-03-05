const webpack = require('webpack');
const path = require('path');
const PATHS = require('./paths');

const hmrScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'

module.exports = {
  devtool: 'eval',
  context: PATHS.root,
  entry: {
    app: [ 'babel-polyfill', './index', hmrScript ]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
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
