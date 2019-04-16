### 意义
通常而言，我们并不会为项目配置很多的入口，项目所有的 Javascript 文件都需要打包到有限的几个入口文件中，这就意味着当我们的项目有一定体量时，首屏加载时间过长的问题就将凸显，这时我们就需要进行代码分离。

代码分离优点：
- 首屏加载更快，不用加载不需要的代码
- 多个页面依赖同一段代码时，该代码不会被打包/加载多次
- 如果 A 文件 + B 文件 = 1M，C 文件 = 1M ，通常情况下同时加载 AB 比单独加载 C 所需时间更短

常用的代码分离方法有两种：
- 入口文件
- `SplitChunksPlugin`

> webpack 4 放弃使用 [CommonsChunkPlugin](https://www.webpackjs.com/plugins/commons-chunk-plugin/) 转而使用 [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

> 官网讲代码分离有[三种方式](https://webpack.js.org/guides/code-splitting/)，实际第二种和第三种都是由 [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 提供（通过对打包物名称分析）

### SplitChunksPlugin
webpack 本身集成了 SplitChunksPlugin ，webpack 4+ 版本只需配置 `mode: production` 就可以开启，低于 4 版本建议升级。

#### 默认配置 / 示例

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000, 
      maxSize: 0, 
      minChunks: 1, 
      maxAsyncRequests: 5,
      maxInitialRequests: 3, 
      automaticNameDelimiter: '~', 
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

#### splitChunks.chunks
`Function | String`

- `splitChunks.chunks: Function`
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
- `splitChunks.chunks: String`
    - `all`: 分割异步模块和同步模块
    - `async`: 分割异步模块，注意**异步模块中的同步导入也是该异步模块的一部分**
    - `initial`: 类似`all`，但异步模块不会有 `${cache group key}${automaticNameDelimiter}` 这样的文件前缀

#### splitChunks.minSize
限制最小打包体积，`splitChunks.minSize: 30000` 表示如果 import 代码或依赖小于 3kb 时不会分离

#### splitChunks.maxSize
限制最大打包体积，一般不设置（设置为 0），毕竟依赖越大越应该分离

#### splitChunks.minChunks
分离所需最小依赖数，`splitChunks.minChunks: 2` 表示代码或依赖被导入次数大于等于 2 才进行分离

#### splitChunks.maxAsyncRequests
一个文件最大拆分文件数，`splitChunks.minChunks: 5` 表示一个文件最多拆分成 5 个文件，超过的依赖即使按照规则应该拆分，也不再拆分


#### splitChunks.maxInitialRequests
入口文件最大拆分文件数，同上

#### splitChunks.name
`true | Function | String`

生成 chunk 的 name
- `splitChunks.name: true`: 以 `${cache group key}${automaticNameDelimiter}${module name}` 命名
- `splitChunks.name: Function`: 以 return 的 string 命名
- `splitChunks.name: String`: 以该 string 命名

> 默认异步模块导入时通过注释获取文件名，同步模块使用导入文件的文件名

#### splitChunks.automaticNameDelimiter
`splitChunks.name: true` 时，`cache group key` 和 `module name` 之间的连字符

#### splitChunks.cacheGroups
缓存组可以使用以上的所有配置并且优先级更高（示例如下），禁用缓存组`splitChunks.cacheGroups.default: false`
```javascript
splitChunks: {
  cacheGroups: {
    default: {
      minChunks: 2 // 覆盖 splitChunks.minChunks
    }
  }
}
```
另外他还有以下这些配置项

##### splitChunks.cacheGroups[groupName].test
`RegExp | Function | String`
验证是否属于该缓存组
- `RegExp`
  ```javascript
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/
    }
  }
  ```
- `Function`
  ```javascript
  cacheGroups: {
    vendors: {
      test(module, chunks) {
        return chunks[0].name === 'test'
      }
    }
  }
  ```
- `String` 模块绝对路劲或模块名
  ```javascript
  cacheGroups: {
    vendors: {
      test: 'test'
    }
  }
  ```

##### splitChunks.cacheGroups[groupName].reuseExistingChunk
`Boolean`
如果当前 chunk 依赖于已存在的 chunk，是否复用该 chunk 而不新打包该 chunk，一般设置为 `true`

##### splitChunks.cacheGroups[groupName].priority
`Number`
缓存组优先级，默认为 0 ，可以为数。当一个模块属于多个缓存组时，选用优先级高的缓存组。

##### splitChunks.cacheGroups[groupName].filename
设置 chunk 名，允许使用 webpack 的占位符，**不推荐使用**
```javascript
cacheGroups: {
  vendors: {
    filename: 'test-filename-[name]-[hash:8]'
  }
}
```
> This option can also be set globally in splitChunks.filename, but this isn't recommended and will likely lead to an error if splitChunks.chunks is not set to 'initial'. Avoid setting it globally. 

### 参考文档
- [Code Splitting Docs](https://www.webpackjs.com/guides/code-splitting/)
- [SplitChunksPlugin Docs](https://webpack.docschina.org/plugins/split-chunks-plugin/)