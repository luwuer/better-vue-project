### eslint
要使用 eslint 自然需要安装 eslint 这个依赖，它用于（静态）分析 js 代码并找到相应问题，配和编辑器插件，可以在代码内部提示错误。
- 安装
  ```bash
  yarn add eslint -D
  ```

### eslint-plugin-vue
eslint 只能检查 js 代码，并不能去分析 `.vue` 文件，所以我们需要使用 `eslint-plugin-vue` 这个插件来支持对 `.vue` 文件的分析。

- 安装
  ```bash
  yarn add eslint-plugin-vue -D
  ```
- 使用
  在根目录的 `eslintrc.js` 文件导出的对象中添加 `extends: ['plugin:vue/essential']`

*`extends: ['plugin:vue/essential']` 表示使用 `eslint-plugin-vue` 的 `essential` 模式对应的 `rules`（其他模式参考上方给出的官方文档）*

> extends 表示 eslint 从哪里继承 `rules`，并且其可以省略字符串`eslint-plugin- / eslint-config-`

### @vue/eslint-config-prettier
上方我们配置了 `eslint-plugin-vue` 用于分析 `.vue` 文件，并且设置 `extends: ['plugin:vue/essential']` 来继承一些插件预设的 `rules` ，但这些其实并不足以覆盖项目通常需要的规范校验。所以我们往往还需要依赖一些标准预设，比如本节提到的 `@vue/eslint-config-prettier`和下节提到的 `eslint-config-standard`
- 安装
  ```bash
  yarn add @vue/eslint-config-prettier -D
  ```
- 使用
  在根目录的 `eslintrc.js` 文件导出的对象中添加 `extends: ['@vue/prettier']`

### eslint-config-standard 
vue 项目有了上面的两个配置后，其预设配置已经足够齐全，只需要自定义部分 `rules` 就可以了。但实际上 `eslint-config-standard` 才是更常使用的预设配置，所以这里也讲一讲怎么使用。

- 安装
  ```bash
  yarn add eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D
  ```
- 使用
  在根目录的 `eslintrc.js` 文件导出的对象中添加 `extends: ['standard']`

### 参考文档
- [ESLint 官网](https://cn.eslint.org/docs/user-guide/configuring)
- [eslint-plugin-vue 官方文档](https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention)
- [eslint-config-standard 文档](https://www.npmjs.com/package/eslint-config-standard)