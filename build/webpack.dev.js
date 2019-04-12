const webpack = require('webpack')
const merge = require('webpack-merge')

const config = merge(require('./webpack.common.js'), {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    compress: true,
    port: 9001,
    hot: true,
    hotOnly: true // HMR 构建失败时也不刷新页面
  },
  optimization: {
    usedExports: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})

module.exports = config
