<template>
  <div class="about">
    <h-simple-select filterable
                     isArrow="false"
                     placeholder="123"
                     _showBottom
                     _multiple
                     style="width:200px"
                     transfer
                     v-model="value"
                     remote
                     :remote-method="remoteMethod"
                     widthAdaption>
      <h-select-block ref="block" :data="remoteData"></h-select-block>
      <!-- <h-select-block :data="v20190321.options2"></h-select-block> -->
    </h-simple-select>
    {{value}}
    <h-button @click="changValue">选中二三项</h-button>
    <h-button @click="selectedTop">已选置顶</h-button>
  </div>
</template>

<script>
let bigData = []
for (let i = 0; i < 160; i++) {
  let obj = {}
  obj.value = i + ''
  obj.label = 'lab' + i
  bigData.push(obj)
}

export default {
  name: 'about',
  data() {
    return {
      // value: ['1', '2'],
      value: '1',
      remoteData: []
    }
  },
  methods: {
    remoteMethod(query) {
      clearTimeout(this.timer)

      if (query !== '') {
        this.timer = setTimeout(() => {
          this.remoteData = bigData.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          )
        }, 200)
      } else {
        this.remoteData = bigData
      }
    },
    changValue() {
      this.value = ['2', '3']
    },
    selectedTop() {
      this.$refs.block.selectedTop()
    }
  },
  created() {
    console.log(module)
    console.log(module.hot)
  }
}
</script>

