var merge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./webpack.helpers');

module.exports = merge(commonConfig, {

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    contentBase: helpers.root('dist'),
    port: 9000,
    historyApiFallback: true,
    stats: 'minimal'
  }
});
