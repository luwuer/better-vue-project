const webpack = require('webpack')
const { resolve } = require('./utils')

const libs = {
  _frame: ['vue', 'vue-router'],
  _ui: ['h_ui/dist/h_ui.min.js'],
  _utils: ['jquery', 'lodash']
}

module.exports = {
  mode: 'production',
  entry: { ...libs },
  performance: false,
  output: {
    path: resolve('dll'),
    filename: '[name].dll.js',
    library: '[name]' // 与 DllPlugin.name 保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('dll', '[name].manifest.json'),
      context: resolve('')
    })
  ]
}
