const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: [
      // 'react-hot-loader/patch',
      './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/server/dist'
  },
  plugins: [
    new CleanWebpackPlugin(['server/dist']),
    new HtmlWebpackPlugin({
        template: 'index.template.html'
    }),
    new ExtractTextPlugin('style.css', {
        allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules|bower_components/,
        query: {
            presets: ['es2015', 'react', "stage-3"],
            plugins: ['react-hot-loader/babel']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
};
