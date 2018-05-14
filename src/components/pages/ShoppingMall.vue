<template>
  <div class="home">
    <!--search bar layout-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3">
          <div class="address">
            <i class="iconfont icon-map"></i>
          </div>
        </van-col>
        <van-col span="16">
          <div class="search-box">
            <input type="text" class="search-input"/>
          </div>
        </van-col>
        <van-col span="5">
          <div class="search">
            <van-button size="mini">查找</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
    <!--banner layout-->
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item,index) in list" :key="index">
          <div class="bannerBox">
            <img :src="item.url" :alt="item.name">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type layout-->
    <ul class="type">
      <li v-for="(item, index) in type">
        <img :src="item.url" :alt="item.name">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {url: require('../../assets/images/1.jpg'), name: '1'},
          {url: require('../../assets/images/2.jpg'), name: '2'},
          {url: require('../../assets/images/3.jpg'), name: '3'},
          {url: require('../../assets/images/4.jpg'), name: '4'}
        ],
        type: [
          {url: require('../../assets/images/shuiguo.png'), name: '1'},
          {url: require('../../assets/images/jiu.png'), name: '1'},
          {url: require('../../assets/images/nai.png'), name: '1'},
          {url: require('../../assets/images/yinliao.png'), name: '1'},
          {url: require('../../assets/images/huli.png'), name: '1'},
        ]
      }
    },
    components:{
    },
    mounted () {
      // const customer = [
      //   {id: 1, count: 2},
      //   {id: 2, count: 89},
      //   {id: 3, count: 1}
      // ];
      // const all = customer.reduce((total, item) => total + item.count, 0);
      // console.log(all)
    }
  }
</script>

<style lang="less">
@import "../../styles/com";
.home{
  background-color: @base_bg_color;
  .search-bar{
    background-color: @base_color;
    padding: 0 0.2rem;
    .address{
      height: 0.9rem; line-height: 0.9rem;
      .iconfont{
        color: #FFFFFF; font-size: .5rem;
      }
    }
    .search-box{
      .search-input{
        margin: 0.2rem 0;
        color: #FFFFFF; padding: 0 0.3rem;
        width:100%; height: 0.5rem;
        border: none;
        border-bottom: 1px solid #FFFFFF;
        background-color: @base_color;
      }
    }
    .search{
      line-height: 0.9rem;
    }
  }
  .banner{
    width: 100%; margin-bottom: 0.1rem;
    img{ width: 100%; height: 4rem; }
  }
  .type{
    font-size: 0; background-color: #fff;
    padding: 0 0.2rem;
    li{
      width: 20%; min-height: 1rem; color: @base_text_color;
      text-align: center; display: inline-block;
      line-height: 1rem; font-size: 0.32rem;
      img{ width: 0.64rem; vertical-align: middle;}
    }
  }
}
</style>
