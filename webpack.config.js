const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const env = JSON.stringify(process.env.NODE_ENV || 'development');
const isDev = env === '"development"';

const defineConstPlugin = new webpack.DefinePlugin({
  __DEV__: isDev,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
});

module.exports = {
  devtool: isDev ? '#cheap-module-eval-source-map' : 'source-map',

  entry: isDev ? [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index',
  ] : [
    'babel-polyfill',
    './src/index',
  ],

  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  plugins: [ defineConstPlugin ].concat(isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        pure_getters: true,
        screw_ie8: true,
      },
    }),
  ]),

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]',
        'postcss-loader',
      ],
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192',
    }],
  },

  postcss: [
    autoprefixer({ browsers: [ 'last 2 versions' ] }),
  ],
};
