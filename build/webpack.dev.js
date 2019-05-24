const webpack = require('webpack')
const config = require('./config')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    index: config.development.index,
    open: true,
    compress: true,
    port: config.development.port,
    serveIndex: true,
    hot: true,
    hotOnly: false, // HMR 构建失败时刷新页面
    historyApiFallback: {
      index: config.development.index
    },
    clientLogLevel: 'none',
    stats: 'minimal',
    inline: true,
    proxy: {
      // '/api': {
      //   target: 'http://10.20.23.209:8089/',
      //   pathRewrite: {
      //     '/api': ''
      //   }
      // }
    }
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
