# bable-loader 使用

## 安装

```bash
npm install --save-dev babel-loader @babel/core
```

## 使用

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src')
  ]
}
```

上方的配置指明了使用 babel 翻译 js 文件，但仅是这样 babel 并不知道该如何翻译、翻译什么，要让它正真工作起来，还需要其他插件支持。

## 预设
上文说到我们需要使用一些插件，但搜索和选择插件是一个很浪费时间的事，为了在短时间内解决问题，我们就需要使用**预设**。

预设就是指插件（及其配置）组成的数组，它可以包含插件和其他预设。

`yourPreset.js`
```javascript
module.exports = function() {
  return {
    presets: [
      require('@babel/preset-env'),
    ],
    plugins: [
      require('pluginA'),
      require('pluginB')
    ]
  }
}
```

babel 提供几个官方预设供用户使用，这里举例讲解最常用的 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)，除此之外还有：
- [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

`@babel/preset-env` 会根据你的环境配置，把 ES6+ 代码翻译成环境能支持的 ES5 代码，所以我们只需要配置项目的目标环境，就能放心地使用新语法特性。

1. 安装
    ```bash
    npm install --save-dev @babel/preset-env
    ```

2. 配置
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
                chrome: '51',
                ie: '9'
              },
              modules: false,
              useBuiltIns: 'entry',
              corejs: 2
            }
          ]
        ]
      }
      // +++
    }
    ```
    *`useBuiltIns` 值不为 `false` 时需要指明 `corejs` 版本，否则会有警告（虽然不设置也默认为 2）*

    *`corejs: 2` 表示使用 `core-js` 2 来翻译 / 填充代码*


`useBuiltIns` 选项说明：
- `false` 默认值，babel 不自动导入 polyfill ，你需要手动在项目全局环境中导入（不推荐）
  - 优点：可以自己控制，使用了什么导入什么
  - 缺点：每个语法都去找其对应的 polyfill 很麻烦，直接 `import babel-polyfill` 时同 `useBuiltIns: entry`
- `entry` babel 自动在入口文件执行 `import 'babel-polyfill'`，不需要手动导入（不推荐）
  - 优点：方便
  - 缺点：生成代码体积大，生成代码中存在所有的 polyfill ，即使你不需要它们
- `usage` 当每个文件里用到需要 polyfill 的特性时，在文件中添加对应的 polyfill ，可以保证每个 polyfill 只 load 一次，能有效缩小生产包体积（推荐）
  - 优点：只导入需要的 polyfill 并且是自动导入
  - 缺点：还在实验中，或许会存在未知问题

可以看到在使用 `@babel/preset-env` 时，如果我们不在意生成代码的提交，那么只需要设置 `useBuiltIns: entry` 就能正常使用 ES6+ 的新特性了，但遗憾的是它并不能覆盖所有开发场景，因为它存在两个缺点：
- **重复填充**: `@babel/preset-env` 会填充每一个文件，所以 a.js / b.js 如果同时用到了 Promise，那么翻译后两个文件均存在 Promise 的填充
- **全局污染**: `@babel/preset-env` 会将 `Promise` 翻译成全局变量 `var _Promise`

如果你打包生成的是公共库，就不能仅仅使用 `@babel/preset-env`，因为你不能控制这个包的使用环境，对全局变量的污染或许会制造一些问题。

## transform-runtime
以上两个问题我们可以借助插件 `@babel/plugin-transform-runtime` 来解决

> This is where the @babel/plugin-transform-runtime plugin comes in: all of the helpers will reference the module @babel/runtime to avoid duplication across your compiled output. The runtime will be compiled into your build.
> Another purpose of this transformer is to create a sandboxed environment for your code. If you use @babel/polyfill and the built-ins it provides such as Promise, Set and Map, those will pollute the global scope. While this might be ok for an app or a command line tool, it becomes a problem if your code is a library which you intend to publish for others to use or if you can't exactly control the environment in which your code will run.

1. 安装
    ```bash
    yarn add @babel/plugin-transform-runtime -D // 开发以来
    yarn add @babel/runtime-corejs2 // 生产依赖
    ```
2. 配置
    ```javascript
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, '../src')
      ],
      // +++
      options: {
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              'corejs': 2,
              'absoluteRuntime': false,
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
    *`'corejs': 2` 表示使用 `@babel/runtime-corejs2` 来翻译 / 填充代码，默认 `false` 表示自己引入 polyfill*

**需要注意的是， `@babel/plugin-transform-runtime` 由于其不污染全局变量的特性，无法翻译对象的示例方法，比如 `Array.includes` / `Array.from` 等**

## 如何选择
如果项目是公共库，使用 `@babel/plugin-transform-runtime` ，否则使用 `@babel/preset-env`

## 常用配置记录

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/plugin-syntax-dynamic-import
```

#### 在 .babelrc 中配置

_.babelrc 放在项目根目录_

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src')
  ],
  options: {
    cacheDirectory: true
  }
}
```

`.babelrc`
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "targets": {
          "chrome": "58"
        },
        "corejs": 2
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

#### 在 JS 中配置

```bash
npm install --save-dev babel-loader @babel/core @babel/plugin-transform-runtime @babel/plugin-syntax-dynamic-import
```

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src')
  ],
  options: {
    cacheDirectory: true,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          targets: {
            chrome: '58'
          },
          corejs: 2
        }
      ]
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import'
    ]
  }
}
```

## 参考文档

- [Babel Installation Docs](https://babeljs.io/setup#installation)
- [Babel Presets Docs](https://babeljs.io/docs/en/presets)
- [Babel Preset-env Docs](https://www.babeljs.cn/docs/babel-preset-env)
- [Bable Transform-runtime Docs](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)
- [了解 Babel 6 & 7 生态](https://github.com/creeperyang/blog/issues/25)
