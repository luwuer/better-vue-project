<template>
  <div class="page-a-home">
    <!-- <h1>Page A Home View</h1> -->
    <h1>Slot Test</h1>

    <h2>1. Slot base</h2>
    <slot-base>456</slot-base>

    <h2>2. Slot specific name</h2>
    <!-- v-slot 指令只能使用在 template -->
    <slot-specific-name>
      <template v-slot:header>
        <h2>im header</h2>
      </template>
      im content
      <!-- <h3 slot="footer">im footer</h3> -->
      <template v-slot:footer>
        <h2>im footer</h2>
      </template>
    </slot-specific-name>

    <h2>3. Slot bench content</h2>
    <slot-bench-content>
      <template v-slot:header>
        <h2>im header</h2>
      </template>
      <template v-slot:footer>
        <h2>im footer</h2>
      </template>
    </slot-bench-content>

    <h1>4. slot scope</h1>
    <!-- 功能是让父组件能在插槽中使用子组件的数据 -->
    <!-- 1. 在子组件中为 slot 绑定 props   -->
    <!-- 2. 父组件调用时，把 props 指定到一个变量 -->
    <!-- <slot-scope v-slot="defaultProps">
      {{JSON.stringify(defaultProps)}}
      <p>my name is {{defaultProps.user.name}}</p>
      <p>im {{defaultProps.user.age}} years old</p>
    </slot-scope> -->
    <slot-scope v-slot="{user}">
      {{JSON.stringify(user)}}
      <p>my name is {{user.name}}</p>
      <p>im {{user.age}} years old</p>
    </slot-scope>
  </div>
</template>

<script>
import slotBase from './slot/base'
import slotSpecificName from './slot/specific-name'
import slotBenchContent from './slot/bench-content'
import slotScope from './slot/slot-scope'

export default {
  name: 'page-a-home',
  components: {
    slotBase,
    slotSpecificName,
    slotBenchContent,
    slotScope
  }
}
</script>
