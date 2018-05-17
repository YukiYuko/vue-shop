<template>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodsImage"/>
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
  import {toMoney} from '../../../filters/index'
  export default {
    props:['goodsImage','goodsName','goodsPrice'],
    filters:{
      moneyFilter(money){
        return toMoney(money)
      }
    },
  }
</script>

<style lang="less" scoped>
  @import '../../../styles/com';
  @import '../../../styles/mixins';
  .goods-info{
    width: 50%;
    float: left;
    padding: .2rem;
    position: relative;
    z-index: 0;
    background-color: #fff;
    cursor: pointer;
    &:before{
      .bottom-line(@base_border_color)
    }
    &:nth-child(odd):after{
      .right-line(@base_border_color)
    }
    .goods-image{
      height: 0;
      width: 100%;
      padding: 50% 0;
      overflow: hidden;
      img{
        width: 100%;
        margin-top: -50%;
        border: none;
        display: block;
      }
    }
    .goods-name{
      .text-overflow();
    }
    .goods-price{ color: @base_color; }
  }
</style>
