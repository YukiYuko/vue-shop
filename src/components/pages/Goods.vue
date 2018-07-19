<template>
  <div class="goods">
    商品详情页面
  </div>
</template>

<script>
  import {goods} from '../../ajax/api';
  export default {
    name: "Goods",
    data () {
      return {
        goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7'
      }
    },
    mounted () {
      this.getInfo()
    },
    methods: {
      getInfo () {
        let data = {goodsId: this.goodsId};
        goods(data).then((res) => {
          console.log(res)
        }).catch(() => {

        })
      }
    }
  }
</script>

<style lang="less" scoped>
.goods{

}
</style>
