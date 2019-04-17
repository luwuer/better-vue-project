const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WorkboxPlugin = require('workbox-webpack-plugin')
const { resolve, generateDllReferences } = require('./utils')


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'none',
  // mode: 'development',
  // devtool: 'cheap-module-eval-source-map',
  // optimization: {
  //   usedExports: true
  // },
  output: {
    filename: '[name].[contentHash:5].js',
    chunkFilename: '[name].[contentHash:5].chunk.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
      chunkFilename: 'css/[name].[contenthash:5].css'
    }),
    new CleanWebpackPlugin(['dist'], {
      // 必须设置，否则会找不到dist
      root: resolve('')
    }),
    new CopyWebpackPlugin([
      // 默认输出 output.path
      {
        from: 'static/',
        to: 'static/'
      },
      {
        from: 'config.js',
        to: 'config.js'
      },
      {
        from: {
          glob:'dll/*.js',
          dot: true
        }
        // to: '[name].[ext]'
      }
    ]),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    ...generateDllReferences(),
    new webpack.BannerPlugin({
      banner: `@auther 莫得盐\n@version ${
        require('../package.json').version
        }\n@info hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]`
    }),
    new BundleAnalyzerPlugin()
  ]
}
