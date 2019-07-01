<template>
  <div class="slot-base">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'slot-base',
  created() {
    console.log(this.$slots)
  }
}
</script>
