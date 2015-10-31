var webpack = require('webpack');

var common = require('./webpack.config.common');

module.exports = Object.assign({}, common.commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  plugins: [
    common.localPlugins.constPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
});
