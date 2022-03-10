const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackSkipAssetsPlugin =
  require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// template entries
const templateEntry = require('./src/entry');
const isDevMode = process.env.NODE_ENV !== 'production';

// template file name
const TEMPLATE_FILENAME = 'template_a';

// webpack.config.js
module.exports = {
  entry: templateEntry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      templates: path.resolve(__dirname, 'src/templates'),
      common: path.resolve(__dirname, 'src/common'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|mp4|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${TEMPLATE_FILENAME}.html`,
      template: path.resolve(
        __dirname,
        './src/templates/bottom-plus/template-a/index.template.html'
      ),
      excludeAssets: [/parent.js/],
    }),
  ].concat(
    isDevMode
      ? [
          // parent test html
          new HtmlWebpackPlugin({
            filename: 'index.html',
            previewUrl: `${TEMPLATE_FILENAME}.html`,
            template: path.resolve(__dirname, './src/index.parent.html'),
            excludeAssets: [/bundle.js/], // exclude style.js or style.[chunkhash].js
          }),
          new HtmlWebpackSkipAssetsPlugin(),
        ]
      : [new MiniCssExtractPlugin()]
  ),
};
