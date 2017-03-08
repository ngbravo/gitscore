const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    background: path.join(__dirname, 'app', 'scripts.babel',
      'background', 'index.js'),
    content: path.join(__dirname, 'app', 'scripts.babel',
      'content', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist', 'scripts'),
    filename: '[name].bundle.js',
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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
