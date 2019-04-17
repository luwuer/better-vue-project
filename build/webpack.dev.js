const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    compress: true,
    port: 9001,
    hot: true,
    hotOnly: false, // HMR 构建失败时刷新页面
    historyApiFallback: true // 任意的 404 响应都被替代为 index.html
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
