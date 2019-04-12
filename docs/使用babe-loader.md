### Installation

```bash
npm install --save-dev babel-loader @babel/core
```

### Usage

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src')
  ]
}
```


### Config

上面的配置指明了使用babel翻译js文件，但仅仅是这样babel并不知道如何翻译，要让它正真工作起来，还需要一些配置。

> 配置可写在rule.options中（见下文示例代码），也可写在项目根目下的.babelrc文件中

##### Babel官方预设

这里推荐最常用的`@babel/preset-env`

1. Installation 
    ```bash
    npm install --save-dev @babel/preset-env
    ```
2. 入口文件顶部引入（webpack 4+ 可能会自动导入，不需要这一步）
    ```javascript
    import '@babel/preset-env' 
    ```
3. 配置预设
    ```javascript
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, '../src')
      ],
      // +++
      options: {
        presets: [ 
          [
            '@babel/preset-env',
            {
              targets: {
                chrome: '67',
                ie: '11'
              },
              useBuiltIns: 'usage' 
            }
          ]
        ]
      }
      // +++
    }

    ```
> `@babel/preset-env`配置默认会把所有的ES6+代码（语法、声明、表达式等）的填充放到打包文件中，`useBuiltIns: 'usage'`表示只填充用到的语法，缩小打包物体积

> 如果设置多个预设，预设是从下往上执行的

##### 自定义预设

我们这里主要会用到`@babel/plugin-transform-runtime`，它相比于上一种方式有两个优点：
- 避免重复的填充，`@babel/preset-env`会填充每一个文件，所以a.js / b.js如果同时用到了Promise，那么翻译后两个文件均存在Promise的填充
- 避免造成全局污染，依然以Promise举例，`@babel/preset-env`会将其翻译成`var _Promise`(全局变量)，所以如果你的打包物是公共库，请务必使用此种方式

1. Installation
    ```bash
    npm install --save-dev @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2
    ```
2. Config
    ```javascript
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, '../src')
      ],
      // +++
      options: {
        'plugins': [
          [
            '@babel/plugin-transform-runtime',
            {
              'absoluteRuntime': false,
              'corejs': 2,
              'helpers': true,
              'regenerator': true,
              'useESModules': false
            }
          ]
        ]
      }
      // +++
    }
    ```

> `'corejs': 2`表示使用`@babel/runtime-corejs2`来翻译填充代码


### 参考文档

- [preset-env docs](https://www.babeljs.cn/docs/babel-preset-env)
- [transform-runtime docs](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)
