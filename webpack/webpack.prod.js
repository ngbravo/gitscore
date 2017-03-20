const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'background': path.join(__dirname, '..', 'app', 'scripts.babel',
      'background', 'index.js'),
    'github.content': path.join(__dirname, '..', 'app', 'scripts.babel',
      'github.content', 'index.js'),
    'options': path.join(__dirname, '..', 'app', 'scripts.babel',
      'options', 'index.js'),
    'popup': path.join(__dirname, '..', 'app', 'scripts.babel',
      'popup', 'index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'scripts/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app', 'options.html'),
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app', 'background.html'),
      filename: 'background.html',
      chunks: ['background'],
    }),
    new WriteFilePlugin({
      log: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
