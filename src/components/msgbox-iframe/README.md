# MsgboxIFrame API

```javascript
import Vue from 'vue'
import msgboxIframe from '../components/msgbox-iframe'

Vue.prototype.$msgbox = msgboxIframe

// 当前设置值为组件默认值
this.$msgbox.iframe({
  title: '未定义',
  width: '100%',
  height: '100%',
  confirmText: '确认',
  cancelText: '取消',
  // iframe src
  url: '',
  // 显示右上角 ×
  showClose: true,
  // 显示 title
  showTitle: true,
  // 显示 footer
  showFooter: true,
  // 延时多少 ms 关闭
  duration: 0,
  // 关闭前调用函数，返回 false 表示不关闭弹框
  beforeClose: () => true,
  // 确认前调用函数，返回 false 表示不关闭弹框
  beforeConfirm: () => true,
  // 是否支持 esc 关闭
  escClose: false
})
```
