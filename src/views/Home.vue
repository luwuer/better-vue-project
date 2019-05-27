<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    // babel 测试对象的实例方法
    console.log(['a', 'b'].includes('a'))
    // babel 测试新对象
    const promise = new Promise(() => {})
    console.log(promise)
  }
}
</script>
