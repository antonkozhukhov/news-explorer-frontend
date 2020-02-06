const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки
module.exports = {
  entry: {
    main: './src/index.js',
    saved: './src/saved.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[chunkhash].js',

  },
// указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
        },
      {
        test: /\.css$/i,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader',
          'postcss-loader'
      ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

       {
        test: /\.(svg|jpg|gif|ico|png)$/,
        use: [
             'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
             {
                 loader: 'image-webpack-loader',
                 options:{
                  esModule: false,}

                 },
        ],
        }

    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
 }),

 new HtmlWebpackPlugin({
  inject: false,
  hash: true,
  template: './src/index.html',
  filename: './index.html',
}),
new HtmlWebpackPlugin({
  inject: false,
  hash: true,
  template: './src/saved.html',
  filename: './saved.html',
}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
  }),
  new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
 }),
    new WebpackMd5Hash()
  ]
};