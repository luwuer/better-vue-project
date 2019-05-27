<template>
  <div>
    demo_1_2
  </div>
</template>

<script>
// 如果需要引用“基础模块” api, 注意不要直接引用 api.js，应该考虑到引用文件是否是纯净的
import { getHotAccount } from '@/assets/js/api-expand/main'

export default {
  name: 'demo_1_1',
  created() {
    getHotAccount()
  }
}
</script>
