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
上文说到我们需要使用一些插件，但试着想想，筛选插件就要浪费巨量的时间，更别提还要一个个配置。为了在短时间内解决问题，我们就需要使用**预设**。

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

#### 官方预设

使用官方预设是最省时省力的方式，这里举例讲解最常用的 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)，除此之外还有：
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
              chrome: '60',
              ie: '11'
            },
            modules: false,
            useBuiltIns: 'usage',
            corejs: 2
          }
        ]
      ]
    }
    // +++
  }
  ```

- `@babel/preset-env` 默认会把所有的 ES6+ 代码的填充（语法、声明、表达式等）放到打包文件中，`useBuiltIns: 'usage'` 表示只填充用到的语法，缩小打包物体积
- 使用 `useBuiltIns` 选项后，需要指明 `corejs` 版本，否则会有警告


虽然 `@babel/preset-env` 方便好用，但遗憾的是它并不能覆盖所有开发场景，因为它存在两个缺点：
- **重复填充**: `@babel/preset-env` 会填充每一个文件，所以 a.js / b.js 如果同时用到了 Promise，那么翻译后两个文件均存在 Promise 的填充
- **全局污染**: `@babel/preset-env` 会将 `Promise` 翻译成全局变量 `var _Promise`

> 如果你打包生成的是公共库，请务必不要仅仅使用 `@babel/preset-env`，由于你不能控制使用这个包的环境，生成全局变量或许会制造一些问题。

#### 自定义预设
*如果设置多个预设，预设是从下往上执行的*

如果不能接受 `@babel/preset-env` 的缺点，那么我们需要借助其他插件

1. 安装
   ```bash
   npm install --save-dev @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2
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

> `'corejs': 2`表示使用 `@babel/runtime-corejs2` 来翻译填充代码

### 是否需要 @babel/plugin-transform-runtime

## 常用配置记录

```bash
npm install --save-dev babel-loader @babel/core @babel/plugin-transform-runtime @babel/plugin-syntax-dynamic-import
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
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime"
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
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ]
  }
}
```

## 参考文档

- [Babel Installation Docs](https://babeljs.io/setup#installation)
- [Babel Presets Docs](https://babeljs.io/docs/en/presets)
- [Babel Preset-env Docs](https://www.babeljs.cn/docs/babel-preset-env)
- [Bable Transform-runtime Docs](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)
