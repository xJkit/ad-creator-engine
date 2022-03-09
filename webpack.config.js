const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackSkipAssetsPlugin =
  require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// template entries
const templateEntry = require('./src/templates/templateEntry');
const isDevMode = process.env.NODE_ENV !== 'production';

// template file name
const TEMPLATE_FILENAME = 'template_a';

// common plugins
const commonConfigPlugIns = [
  new CopyPlugin({
    patterns: [path.resolve(__dirname, './src/parent.js')],
  }),
  // template html
  new HtmlWebpackPlugin({
    filename: `${TEMPLATE_FILENAME}.html`,
    template: path.resolve(
      __dirname,
      './src/templates/bottom-plus/template-a/index.template.html'
    ),
  }),
];
// webpack.config.js
module.exports = {
  entry: templateEntry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
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
  plugins: [...commonConfigPlugIns].concat(
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
