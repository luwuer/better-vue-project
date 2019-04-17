const { resolve } = require('./utils')

module.exports = {
  entry: [resolve('src/scripts/library-test/index')],
  output: {
    path: resolve('dist/library-test'),
    filename: 'index.js',
    library: '$test',
    libraryTarget: 'umd'
  }
}