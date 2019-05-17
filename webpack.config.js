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
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      Components: path.resolve(__dirname, 'public/src/components'),
      Atoms: path.resolve(__dirname, 'public/src/components/atoms/'),
      Molecules: path.resolve(__dirname, 'public/src/components/molecules/'),
      Constants: path.resolve(__dirname, 'public/src/constants/'),
      Utilities: path.resolve(__dirname, 'public/src/utilities/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
