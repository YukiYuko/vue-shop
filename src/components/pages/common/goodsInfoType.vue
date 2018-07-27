<template>
  <div class="goods-info" @click="goGoodsPage()">
    <div class="goods-image">
      <img v-lazy="goodsImage" onerror="this.src = errorImg"/>
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">
      <span>￥{{goodsPrice | moneyFilter }}</span>
      <span class="oriPrice">￥{{goodsPriceOrigin | moneyFilter}}</span>
    </div>
  </div>
</template>

<script>
  import {toMoney} from '../../../filters/index'
  export default {
    props:['goodsImage', 'goodsName', 'goodsPrice', 'goodsId', 'goodsPriceOrigin'],
    filters:{
      moneyFilter(money){
        return toMoney(money)
      }
    },
    data () {
      return {
        errorImg:require('../../../assets/images/error.png')
      }
    },
    methods: {
      goGoodsPage () {
        this.$router.push({name:'Goods',params:{id:this.goodsId}})
      }
    }
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
    .goods-price{
      span:nth-child(1){ color: @base_color; }
      span:nth-child(2){ color: @base_thr_color; font-size: 12px;
        position: relative;
        &:after{
          content: "";
          position: absolute;
          z-index: 1;
          left: 0;
          width: 100%;
          border-top: 1px solid #8c8c8c;
          -webkit-transform: scaleY(.5);
          transform: scaleY(.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          top: auto;
          bottom: 50%;
        }
      }
    }
  }
</style>
