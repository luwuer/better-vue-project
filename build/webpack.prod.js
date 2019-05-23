const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const config = require('./config')
const { resolve } = require('./utils')

const webpackConfig = {
  mode: process.env.NODE_ENV,
  // mode: 'development',
  devtool: config.production.sourceMap
    ? 'cheap-module-eval-source-map'
    : 'none',
  output: {
    filename: '[name].[contentHash:5].js',
    chunkFilename: '[name].[contentHash:5].chunk.js'
  },
  optimization: {
    //   usedExports: true
    minimizer: [
      new TerserJSPlugin({
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '/',
      name(mod, chunks) {
        return `${chunks[0].name}.vendor`
      },
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
      // 必须设置
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
      }
    ]),
    new webpack.BannerPlugin({
      banner: `@auther 莫得盐\n@version ${
        require('../package.json').version
      }\n@info hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]`
    })
  ]
}

if (config.production.pwa) {
  const WorkboxPlugin = require('workbox-webpack-plugin')
  webpackConfig.plugins.push(
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  )
}

if (config.production.bundleAnalyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
