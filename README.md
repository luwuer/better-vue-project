鉴于 vue-cli 3 不易修改 webpack
 配置，而 vue-cli 2 又不升级 webapck 4，于是基于 4 写了几个模板，便于今后取用。

分支介绍：
- `master`: 基础模板
- `pages`: 多页模板
- `modules`: 分模块打包且模块增量升级的模板，适合在此基础上构建大型（电商、后台系统）项目。

> 基础模板的页面就是 vue-cli 3 生成的页面，本模板的部分配置也是参考 vue-cli

```bash
# installation
yarn

# if scripts.dll exist
yarn dll

# development
yarn dev

# production
yarn build

# module
yarn module {moduleName}
```
