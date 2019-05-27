<template>
  <div class="about">
    about page
  </div>
</template>

<script>
// import * as test from '@/scripts/test'
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
    // // 测试 loadsh 是否被打包
    // let arr = _.chunk(['a', 'b', 'c', 'd', 'e'], 2)
    // console.log(arr)

    // // 测试是否抖掉了不需要的模块
    // test.say('function say is called!!!')

    // babel 测试对象的实例方法
    console.log(['a', 'b'].includes('a'))
    // babel 测试新对象
    const promise = new Promise(() => {})
    console.log(promise)
  }
}
</script>

<style lang="stylus">
.about {
  background: #a117;
}
</style>
