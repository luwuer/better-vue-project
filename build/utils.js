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


module.exports = {
  resolve,
  generateDllReferences,
  generateAddAssests,
  generateWebpackConfig
}