module.exports = {
  development: {
    // 开发服务端口
    port: 8080,
    // 开发服务默认访问文件
    index: 'pa.html'
  },
  production: {
    // 是否生成渐进式WEB应用 (Progressive Web App)
    pwa: false,
    // 需要进行模块分析
    bundleAnalyzer: false,
    // 生成 sourceMap
    sourceMap: false
  }
}
