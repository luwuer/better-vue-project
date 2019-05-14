const webpack = require('webpack')
const merge = require('webpack-merge')
const AddAssestHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')
const glob = require('glob')

const _memorize = fn => {
  const cache = {}
  return (...args) => {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.call(this, ...args))
  }
}

const _resolve = (...args) => {
  return path.join(__dirname, '..', ...args)
}

const resolve = _memorize(_resolve)

const generateDllReferences = function() {
  const manifests = glob.sync(`${resolve('dll')}/*.json`)

  return manifests.map(file => {
    return new webpack.DllReferencePlugin({
      // context: resolve(''),
      manifest: file
    })
  })
}

const generateAddAssests = function() {
  const dlls = glob.sync(`${resolve('dll')}/*.js`)

  return dlls.map(file => {
    return new AddAssestHtmlWebpackPlugin({
      filepath: file
    })
  })
}

const generateWebpackConfig = production => {
  if (production) {
    process.env.NODE_ENV = 'production'
    return merge(require('./webpack.common'), require('./webpack.prod'))
  } else {
    process.env.NODE_ENV = 'development'
    return merge(require('./webpack.common'), require('./webpack.dev'))
  }
}

const webpackStatsPrint = function(stats) {
  console.log(
    stats
      .toString({
        colors: true,
        modules: false,
        // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        children: false,
        chunks: false,
        chunkModules: false
      })
      .replace(/\n.*?static.*?(?=\n)/g, '') + '\n'
  )
}

module.exports = {
  resolve,
  generateDllReferences,
  generateAddAssests,
  generateWebpackConfig,
  webpackStatsPrint
}
