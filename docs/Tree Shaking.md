tree shaking 是一个术语，用于描述移除 JavaScript 上下文中的未引用代码(dead-code)，它依赖于 ES2015 模块系统中的静态结构特性（只支持 import / export)

### 标记不需处理文件
webpack 4 会读取 `package.json` 的 `sideEffects` 属性，获取哪些文件不需要进行 tree shaking（不需要移除未引用的函数）。这种情形很常见，比如你有一个`windowUtils.js`其中的函数都是你需要挂载到window上的工具函数，那么你会在入口添加`import './windowUtils'`。

由于这里只是执行`windowUtils`而不引用任何东西，如果你不配置`sideEffects`，webpack 会 tree shaking 掉整个文件的内容，所以此时我们就需要在 `package.json` 中配置 `sideEffects`
- `sideEffects: false` 对所有文件进行 tree shaking
- `sideEffects: [Array]` 对 Array 以外的文件进行 tree shaking

```json
{
  "name": "test",
  "sideEffects": [
    "./src/windowUtils.js",
    "*.css"
  ]
}
```

> 任何导入的文件都会受到 tree shaking 的影响，如果在项目中使用类似`import 'h_ui/main.css'`，则也需将其添加到 `sideEffects` 列表中，以免在打包时被删除（所以上方我们添加了`"*.css"`）

### 压缩输出

通过如上方式，我们已经可以通过 import 和 export 语法，找出那些需要删除的“未使用代码(dead code)”，然而我们不只是要找出，还需要在 bundle 中删除它们。为此我们将使用 -p(production) 这个 webpack 编译标记，来启用 uglifyjs 压缩插件。

```javascript
{
  mode: 'production'
}
```

另外在开发环境，我们可以通过配置查看函数是否被使用，例如出现这样的注释`/*! exports provided: say, speak *//*! exports used: say */`
```javascript
{
  optimization: {
    usedExports: true
  }
}
```

### 参考文档
- [tree shaking docs](https://www.webpackjs.com/guides/tree-shaking/)