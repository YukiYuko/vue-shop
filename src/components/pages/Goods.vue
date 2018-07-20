<template>
  <div class="goods">
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div class="goods-tab">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">

          </div>
        </van-tab>
        <van-tab title="评价">
          <p v-for="i in 110" style="margin-bottom: 0.5rem">正在制作中</p>
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div flex justify="between">
        <van-button size="large" type="primary">加入购物车</van-button>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {toMoney} from '../../filters/index'
  import {goods} from '../../ajax/api';

  export default {
    name: "Goods",
    data() {
      return {
        goodsId: '',
        goodsInfo: {}
      }
    },
    filters: {
      moneyFilter(money) {
        return toMoney(money)
      }
    },
    mounted() {
      this.goodsId = this.$route.params.id;
      this.getInfo()
    },
    methods: {
      getInfo() {
        let data = {goodsId: this.goodsId};
        let toast = this.$toast.loading('加载中...');
        goods(data).then((res) => {
          this.goodsInfo = res.data;
          console.log(this.goodsInfo);
          setTimeout(() => {
            toast.clear();
          }, 1000)
        }).catch(() => {

        })
      },
      onClickLeft() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/com';
  @import '../../styles/mixins';
  .goods {
    .detail {
      font-size: 0;
      padding: 0.3rem 0.2rem;
    }
    .goods-name {
      background-color: #fff;
      padding: 0.2rem;
      color: @base_text_color;
    }
    .goods-price {
      background-color: #fff;
      padding: 0 0.2rem 0.2rem;
      color: @base_sub_color;
    }
    .goods-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #FFF;
      width: 100%;
      padding: 0.2rem;
      .drop-shadow-top();
      > div{
        width: 100%; height: 100%;
      }
      button{
        width: 48%;
      }
    }
  }
</style>
