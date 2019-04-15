### 意义

常用的代码分离方法有三种：
- 入口文件
- `SplitChunksPlugin`
- 动态导入

通常在使用webpack打包时，并不会配置很多的入口，项目所有的 Javascript 文件都需要打包到这几个入口文件中，这就意味着当我们的项目有一定体量时，首屏加载将会异常缓慢，这时就需要代码分离。




### SplitChunksPlugin
webpack 本身集成了 SplitChunksPlugin ，webpack 4+ 版本只需配置 `mode: production` 就可以开启，低于 4 版本建议升级。

##### 默认配置 / 示例

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // all 表示同步异步导入都要拆分（注意同步文件还会走到 cacheGroups），async 只拆分异步导入
      minSize: 30000, 
      maxSize: 0, 
      minChunks: 1, // 拆分要求的最小引用次数，一般 >= 2
      maxAsyncRequests: 5, // 同时加载的最大模块数，这里表示一个文件的引入最大拆分成5个文件
      maxInitialRequests: 3, // 入口文件加载的最大模块数，同上
      automaticNameDelimiter: '~', // 生成的[组]与[文件名]之间的连字符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```

##### splitChunks.chunks
`function | string`

- function
    ```javascript
    module.exports = {
      //...
      optimization: {
        splitChunks: {
          chunks (chunk) {
            // webpackChunkName 不等于 my-excluded-chunk 时候分
            return chunk.name !== 'my-excluded-chunk';
          }
        }
      }
    }
    ```
- string
    - `all` 分割异步模块和同步模块
    - `async` 分割异步模块，注意异步模块中的同步导入也视为异步模块
    - `initial` 类似`all`，但异步模块不会有 vendors 文件前缀

> 异步模块导入时通过注释获取文件名，同步模块使用导入文件的文件名

### 参考文档
- [SplitChunksPlugin docs](https://webpack.docschina.org/plugins/split-chunks-plugin/)