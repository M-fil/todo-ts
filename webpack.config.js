const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => (!isDev ? {} : {
  devServer: {
    open: true,
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  },
});

const esLintPlugin = (isDev) => (isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })]);

module.exports = ({ development }) => ({
  context: path.resolve(__dirname, './'),
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    ...esLintPlugin(development),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new HtmlWebpackPlugin({
      title: 'Match Match Game',
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
      ],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      assets: path.resolve(__dirname, './'),
    },
  },
  ...devServer(development),
});
