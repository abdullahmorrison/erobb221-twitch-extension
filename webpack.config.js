var webpack = require('webpack');
var path = require('path');

const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: {
    overlay: './src/pages/overlay/index.tsx',
    panel: './src/pages/panel/index.tsx',
    mobile: './src/pages/panel/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'video_overlay.html',
      template: 'public/video_overlay.html',
      chunks: ['overlay']
    }),
    new HtmlWebpackPlugin({
      filename: 'panel.html',
      template: 'public/panel.html',
      chunks: ['panel']
    }),
    new HtmlWebpackPlugin({
      filename: 'mobile.html',
      template: 'public/mobile.html',
      chunks: ['mobile']
    }),
    new MiniCssExtractPlugin(),
  ],
}
