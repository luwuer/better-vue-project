<template>
  <div class="slot-bench-content">
    <slot name="header">im header default</slot>
    <slot>im content default</slot>
    <slot name="footer">im footer default</slot>
  </div>
</template>

<script>
export default {
  name: 'slot-bench-content',
  created() {
    console.log(this.$slots)
  }
}
</script>
