<template>
  <div class="module-info">
    <p class="module">
      <span class="lable">模块名：</span>
      <span class="value">{{this.name}}</span>
    </p>
    <p class="view">
      <span class="lable">页面名：</span>
      <span class="value">{{this.view}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'module-info',
  props: {
    name: {
      type: String,
      default: ''
    },
    view: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
.module-info {

}
</style>
