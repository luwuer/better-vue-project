*本文只是针对 PWA 项目打包的一个基础示例，故只提供基础配置和注册，实际项目复杂得多。*

### PWA 简介

PWA 全称 Progressive Web App，即渐进式 WEB 应用，相比于传统 WEB 应用它有三个优点：

- 离线缓存，即使服务器挂掉、就算是没有网络，用户依然可以使用一些离线功能
- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现了消息推送

> PWA 在正常的 WEB 应用上添加了 App Manifest 和 Service Worker 来实现一些功能的离线

### 注册 Service Worker

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful')
      }).catch(err => {
        console.log('ServiceWorker registration failed: ', err)
      })
  })
}
```

### 配置 
```bash
npm install workbox-webpack-plugin -D
```

```javascript
const WorkboxPlugin = require('workbox-webpack-plugin')

{
  //...
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
```