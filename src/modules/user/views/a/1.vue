<template>
  <div class="user-a-1">
    <module-info name="user" view=""></module-info>
  </div>
</template>

<script>
import moduleInfo from '@/components/module-info'

export default {
  name: 'user-a-1',
  components: {
    moduleInfo
  }
}
</script>

<style lang="stylus">
.user-a-1 {
  background red
  font-size 24px
  font-weight bold
}
</style>
