var webpack = require('webpack');

var common = require('./webpack.config.common');

module.exports = Object.assign({}, common.commonConfig, {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  plugins: [
    common.localPlugins.constPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
});
