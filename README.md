### devServer
webpack

### webpack 打包方式

1. 命令行 `webpack`
2. node (devServer 实现原理)
    ```javascript
    const express = require('express')
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack-config.js')

    const compiler = webpack(config)

    const app = express()

    app.use(webpackDevMiddleware(compiler, {}))

    app.listen(8080, () => {
      console.log('mock dev server is running')
    })
    ```


### plugins

- BannerPlugin 为打包后代码添加版本信息、公司信息等
  ```javascript
  const webpack = require('webpack')

  // usage
  new webpack.BannerPlugin({
    banner: '@auther 莫得盐\n@version v0.0.1\n@info hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
  })
  ```
- HtmlWebpackPlugin 生成.html文件并自动引入打包后的js
  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  // usage
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve('index.html') // absolute/relative path of index.html
  })
  ```
- CopyWebpackPlugin 生成.html文件并自动引入打包后的js
  ```javascript
  const CopyWebpackPlugin = require('copy-webpack-plugin')

  // usage
  new CopyWebpackPlugin([
    // 默认输出 output.path
    {
      from: 'static/',
      to: 'static/'
    },
    {
      from: 'yarn.lock'
    }
  ])
  ```

### 注意点
1. 使用 HMR(Hot Module Replacement) 时需要告知 HMR 哪些模块需要在变化时进行热模块替换
    ```javascript
    import test from './test'

    if (module.hot) {
      module.hot.accept('./test', () => {
        // test.js 模块发生改变时需要执行逻辑
        console.log('更新 HTML 内容')
      })
    }
    ```
    > 我们在写 css/vue 等文件时不需要手动监听文件变化再进行处理，是因为它们的loader帮我们写了这一段代码