const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './client/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),
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
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      Components: path.resolve(__dirname, 'client/src/components'),
      Atoms: path.resolve(__dirname, 'client/src/components/atoms/'),
      Molecules: path.resolve(__dirname, 'client/src/components/molecules/'),
      Constants: path.resolve(__dirname, 'client/src/constants/'),
      Utilities: path.resolve(__dirname, 'client/src/utilities/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './client/index.html' }),
  ],
};
