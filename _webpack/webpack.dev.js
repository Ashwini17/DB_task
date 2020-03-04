const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../_dist'),
    compress: true,
    port: 9000,
    proxy: {
      "/belegTypes": "http://localhost:8000",
      "/betrag": "http://localhost:8000",
    },
  },
  devtool: 'inline-source-map',
});