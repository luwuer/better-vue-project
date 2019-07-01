<template>
  <div class="slot-scope">
    <!-- <slot name="header">im header default</slot> -->
    <slot :user="user">my name is {{user.name}}, im {{user.age}} years old.</slot>
    <!-- <slot name="footer">im footer default</slot> -->
  </div>
</template>

<script>
export default {
  name: 'slot-scope',
  data() {
    return {
      user: {
        name: 'hs',
        age: 20
      }
    }
  }
}
</script>
