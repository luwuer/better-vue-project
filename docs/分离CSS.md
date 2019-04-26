## MiniCssExtractPlugin

`MiniCssExtractPlugin` 除在 plugins 中实例外，还需调用插件配套的 loader

```javascript
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    reles: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:5].css',
    chunkFilename: 'css/[name].[contenthash:5].css'
  })]
}
```
> 注意，如果你希望 CSS 文件都打包到 `css` 文件夹下（如上 `filename: 'css/[name].[contenthash:5].css'` ），那么需要在 loader.options 中设置对应的`publicPath`，否则打包后 css 文件中的 `url` （如 `url(/img/xx.jpg)` ）会找不到文件。

## OptimizeCSSAssetsPlugin
`MiniCssExtractPlugin` 生成的文件并不会被压缩，这显然是不符合生产环境要求的，我们需要用 `OptimizeCSSAssetsPlugin` 压缩分离的 CSS。

*示例代码基于上文配置*
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// +++
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// +++

module.exports = {
  // +++
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },  
  // +++
  module: {
    reles: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:5].css',
    chunkFilename: 'css/[name].[contenthash:5].css'
  })]
}
```

## TerserJSPlugin
依据上文配置好 CSS 压缩后，我们会惊讶地发现，以前会被压缩的 JS 代码现在不再被压缩了。因为我们配置的 `optimization.minimizer` 会覆盖默认的 `optimization.minimizer` 配置（默认的配置会在 `mode: production` 时压缩 JS），故我们需要为 JS 重新配置压缩插件，webpack 4 推荐使用 `TerserJSPlugin`，简单易配。

<!-- *示例代码基于上文配置* -->
$\color{#ccc}{*示例代码基于上文配置*}$

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// +++
const TerserJSPlugin = require('terser-webpack-plugin')
// +++

module.exports = {
  optimization: {
    minimizer: [
      // +++
      new TerserJSPlugin({
        parallel: true // 开启多线程
      }),
      // +++
      new OptimizeCSSAssetsPlugin({})
    ],
  },  
  module: {
    reles: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:5].css',
    chunkFilename: 'css/[name].[contenthash:5].css'
  })]
}
```

## 参考文档
- [MiniCssExtractPlugin Docs](https://webpack.js.org/plugins/mini-css-extract-plugin)
- [Optimization Docs](https://webpack.docschina.org/configuration/optimization/#optimization-minimizer)
