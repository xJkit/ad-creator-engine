const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// template entries
const templateEntry = require('./src/templates/templateEntry');
const isDevMode = process.env.NODE_ENV !== 'production';

// webpack.config.js
module.exports = {
  entry: templateEntry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'script-loader',
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [].concat(
    isDevMode
      ? [
          new HtmlWebpackPlugin({
            template: './index.html',
          }),
        ]
      : [new MiniCssExtractPlugin()]
  ),
};
