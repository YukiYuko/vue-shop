<template>
  <ul class="stack">
    <li class="stack-item" v-for="(item, index) in pages" :style="[transform(index)]">
      <img :src="item.src">
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      // pages数据包含基础的图片数据
      pages: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        // basicdata数据包含组件基本数据
        basicdata: {
          currentPage: 0 // 默认首图的序列
        },
        // temporaryData数据包含组件临时数据
        temporaryData: {
          opacity: 1, // 记录opacity
          zIndex: 10, // 记录zIndex
          visible: 3 // 记录默认显示堆叠数visible
        }
      }
    },
    methods: {
      // 遍历样式
      transform (index) {
        if (index >= this.basicdata.currentPage) {
          let style = {}
          let visible = this.temporaryData.visible
          let perIndex = index - this.basicdata.currentPage
          // visible可见数量前滑块的样式
          if (index <= this.basicdata.currentPage + visible - 1) {
            style['opacity'] = '1'
            style['transform'] = 'translate3D(0,0,' + -1 * perIndex * 60 + 'px' + ')'
            style['zIndex'] = visible - index + this.basicdata.currentPage
            style['transitionTimingFunction'] = 'ease'
            style['transitionDuration'] = 300 + 'ms'
          } else {
            style['zIndex'] = '-1'
            style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
          }
          return style
        }
      }
    }
  }
</script>
