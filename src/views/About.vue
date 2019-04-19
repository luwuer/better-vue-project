<template>
  <div class="about">
    about page
  </div>
</template>

<script>
// import * as test from '@/scripts/test'
// import { add, pad } from '@/scripts/library-test'
// import _ from 'lodash'

export default {
  name: 'about',
  data() {
    return {
      addTest: 0,
      padEndTest: ''
    }
  },
  created() {
    // test.say('function say is called!!!')

    // this.addTest = add(11, 41)
    // console.log(this.addTest)
    // this.padEndTest = pad(this.padEndTest, 3, 'S')
    // console.log(this.padEndTest)
  }
}
</script>

<style lang="stylus">
.about {
  background: #a117;
}
</style>

