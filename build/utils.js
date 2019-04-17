const webpack = require('webpack')
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

const generateDllReferences = function () {
  let manifests = glob.sync(`${resolve('dll')}/*.json`)

  return manifests.map(file => {
    return new webpack.DllReferencePlugin({
      context: resolve(''),
      manifest: file
    })
  })
}

module.exports = {
  resolve,
  generateDllReferences
}