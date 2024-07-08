const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  TerserWebpackPlugin = require('terser-webpack-plugin'),
  OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"),
  webpack = require('webpack'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const buildPath = path.join(__dirname, 'docs');
const sourcePath = path.join(__dirname, 'src');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: "./index.tsx",
    context: sourcePath,
    output: {
      clean: true,
      filename: '[name].[contenthash].js',
      path: buildPath,
      publicPath: isProduction ? '' : '/',
      assetModuleFilename: 'assets/[name][ext]',
    },
    devtool: isProduction ? false : 'eval-source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.json', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.s?css$/i,
          use: [
            {
              loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
            }, {
              loader: 'resolve-url-loader',
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ],
        },
        {
          test: /\.(png|site\.webmanifest|svg|icon|xml)$/i,
          type: 'asset/resource',
        },
      ]
    },
    devServer: {
      static: {
        directory: isProduction ? buildPath : sourcePath,
      },
      historyApiFallback: true,
      port: 8080,
      compress: isProduction,
      hot: !isProduction,
      host: '0.0.0.0',
      https: false,
      allowedHosts: 'all',
    },
    optimization: {
      minimize: isProduction,
      minimizer: isProduction? [] : [new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()],
    },
    plugins: [
      new FaviconsWebpackPlugin({
        logo: path.join(__dirname, 'src', 'icon', 'app-icon.png'),
        favicons: {
          appName: "minesweeper-multiplayer",
          start_url: "/minesweeper-multiplayer",
          appDescription: "Minesweeper Multiplayer",
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          TOKEN_HEADER_NAME: JSON.stringify(process.env.TOKEN_HEADER_NAME || '')
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        path: buildPath,
        filename: 'index.html',
        inject: "head"
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
    ]}
}
