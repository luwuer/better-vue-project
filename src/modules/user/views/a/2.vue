<template>
  <div class="user-a-2">

  </div>
</template>

<script>
// 注意保持公共模块的纯净
import { getHotAccount } from '@/assets/js/api-expand/main'

export default {
  name: 'user-a-2',
  created() {
    getHotAccount()
  }
}
</script>
