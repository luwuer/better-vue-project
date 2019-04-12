<template>
  <div class="about">
    about page
  </div>
</template>

<script>
import { say } from '@/scripts/test'

export default {
  name: 'about',
  data() {
    return {}
  },
  created() {
    say('function say is called')
  }
}
</script>

<style lang="stylus">
.about {
  background #a11
}
</style>

