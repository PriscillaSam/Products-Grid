const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'webpack/hot/only-dev-server',
    './public/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
