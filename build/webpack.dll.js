const webpack = require('webpack')
const { resolve } = require('./utils')

const libs = {
  frame: ['vue/dist/vue.esm.js', 'vue-router'],
  ui: ['h_ui/dist/h_ui.min.js']
}

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: { ...libs },
  performance: false,
  output: {
    path: resolve('dll'),
    filename: '[name].dll.js',
    // filename: '[name].dll.js',
    library: '[name]_[chunkHash:5]' // 与 DllPlugin.name 保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[chunkHash:5]',
      path: resolve('dll', '[name].manifest.json'),
      context: resolve('')
    })
  ]
}
