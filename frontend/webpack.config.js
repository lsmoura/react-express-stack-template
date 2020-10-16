const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const TITLE = process.env.TITLE || 'Template';

const fileExtensions = [
  'jpg',
  'png',
  'gif',
  'svg',
  'woff',
  'woff2',
  'eot',
  'ttf',
  'otf',
];

if (!PRODUCTION) require('dotenv').config();

module.exports = {
  entry: './src/index.tsx',
  mode: PRODUCTION ? 'production' : 'development',
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        use: ['file-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html.ejs'),
      minify: PRODUCTION,
      title: TITLE,
      base: '/',
      hash: true,
    }),
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
  ].filter(Boolean),
  devServer: {
    host: HOST,
    contentBase: './dist',
    hot: true,
    port: PORT,
    sockPort: PORT,
    watchOptions: {
      poll: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, x-csrf-token',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: {'^/api' : ''},
      },
    },
  },
};
