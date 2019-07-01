<template>
  <div class="slot-specific-name">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'slot-specific-name',
  created() {
    console.log(this.$slots)
  }
}
</script>
