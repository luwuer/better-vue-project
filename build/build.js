const merge = require('webpack-merge')

module.exports = env => {
  if (env && env.production) {
    process.env.NODE_ENV = 'production'
    return merge(require('./webpack.common'), require('./webpack.prod'))
  } else {
    process.env.NODE_ENV = 'development'
    return merge(require('./webpack.common'), require('./webpack.dev'))
  }
}