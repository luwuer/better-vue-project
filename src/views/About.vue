<template>
  <div class="about">
    about page
  </div>
</template>

<script>
import * as test from '@/scripts/test'
import _ from 'lodash'

export default {
  name: 'about',
  data() {
    return {}
  },
  created() {
    test.say('function say is called!')
  }
}
</script>

<style lang="stylus">
.about {
  background: #a11;
}
</style>

