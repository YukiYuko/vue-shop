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
            <van-button @click="go" size="mini">查找</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
    <!--banner layout-->
    <div class="banner">
      <van-swipe :autoplay="6000">
        <van-swipe-item v-for="(item,index) in list" :key="index">
          <div class="bannerBox">
            <img :alt="item.name" v-lazy="item.url">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type layout-->
    <ul class="type">
      <li v-for="(item, index) in category" v-if="category.length">
        <img :src="item.image" :alt="item.mallCategoryName">
        <div>{{item.mallCategoryName}}</div>
      </li>
    </ul>
    <!--adBanner layout-->
    <div class="adBanner">
      <img v-lazy="adBanner.PICTURE_ADDRESS">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body" v-if="recommendGoods.length">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div class="title">{{item.goodsName}}</div>
              <div class="price">￥{{item.price | moneyFilter}} <span>(￥{{item.mallPrice | moneyFilter}})</span></div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor1 -->
    <div class="floor floor1" v-if="floor1.length">
      <div class="pb_title">
        {{floorName && floorName.floor1}}
      </div>
      <div class="head" flex>
        <div class="left" box="1">
          <img :src="floor1[0] && floor1[0].image" alt="">
        </div>
        <div class="right" box="1">
          <div> <img :src="floor1[1] && floor1[1].image" alt=""> </div>
          <div> <img :src="floor1[2] && floor1[2].image" alt=""> </div>
        </div>
      </div>
      <div class="foot" flex>
        <div> <img :src="floor1[3] && floor1[3].image" alt=""> </div>
        <div> <img :src="floor1[4] && floor1[4].image" alt=""> </div>
        <div> <img :src="floor1[5] && floor1[5].image" alt=""> </div>
      </div>
    </div>
    <!-- floor2 -->
    <div class="floor floor2" v-if="floor2.length">
      <div class="pb_title">
        {{floorName && floorName.floor2}}
      </div>
      <div class="yd-list">
        <div class="yd-list-item" v-for="(item, index) in floor2" :key="index">
          <a href="#">
            <img :src="item.image"/>
          </a>
        </div>
      </div>
    </div>
    <!-- floor3 -->
    <div class="floor floor3" v-if="floor3.length">
      <div class="pb_title">
        {{floorName && floorName.floor3}}
      </div>
      <div class="yd-list">
        <div class="yd-list-item" v-for="(item, index) in floor3" :key="index">
          <a href="#">
            <img :src="item.image"/>
          </a>
        </div>
      </div>
    </div>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="pb_title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
          <div class="goods-list" style="overflow: hidden;">
            <goods-info
              v-for="( item, index) in hotGoods" :key="index"
              :goodsImage="item.image"
              :goodsName="item.name"
              :goodsPrice="item.price"
              :goodsId="item.goodsId"
            ></goods-info>
          </div>
        </van-list>
        <divider v-if="finished" content="没有更多数据了QAQ"></divider>
      </div>
    </div>

    <!--tabbar-->
    <tabbar @click="switch_page"></tabbar>
  </div>
</template>

<script>
  import {toMoney} from '../../filters/index'
  import {getHome} from '../../ajax/api'
  import goodsInfo from './common/goodsInfo'
  import divider from '../public/divider/divider'
  import tabbar from '../public/Tabbar/Tabbar'
  import {goods} from '../../mock/index'
  import localForage from "localforage"
  export default {
    data() {
      return {
        loading: false,
        finished: false,
        swiperOption: {
          freeMode: true,
          slidesPerView: 'auto',
          freeModeSticky: true,
        },
        list: [
          {url: require('../../assets/images/simleVueDemoPic001.jpg'), name: '1'},
          {url: require('../../assets/images/simleVueDemoPic002.jpg'), name: '2'},
          {url: require('../../assets/images/simleVueDemoPic003.jpg'), name: '3'}
        ],
        category: [], // 分类数据
        adBanner: '',  // 广告数据
        recommendGoods: [], // 热门数据
        floor1: [],
        floor2: [],
        floor3: [],
        floorName:[],
        hotGoods:[]
      }
    },
    components:{
      goodsInfo, divider, tabbar
    },
    mounted () {
      const toast = this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      getHome().then((res) => {
        this.category = res.data.category;
        this.adBanner = res.data.advertesPicture;
        this.recommendGoods = res.data.recommend;
        this.floor1 = res.data.floor1;
        this.floor2 = res.data.floor2;
        this.floor3 = res.data.floor3;
        this.floorName = res.data.floorName;
        this.hotGoods = res.data.hotGoods;
        toast.clear()
      })
    },
    filters: {
      moneyFilter (money) {
        return toMoney(money)
      }
    },
    methods: {
      onLoad() {
        setTimeout(() => {
          this.loading = false;
          this.hotGoods = [...this.hotGoods, ...goods];
          if (this.hotGoods.length >= 60) {
            this.finished = true;
          }
        }, 2000);
      },
      go () {
        this.$router.push('/register')
      },
      // 切换页面
      switch_page (page) {
        let user_info = null;
        localForage.getItem('user_info').then((value) => {
          user_info = value;
          if (!user_info && (page === 'car' || page === 'mine')) {
            this.$router.push('login');
          } else {
            if (page === 'type') {
              this.$router.push('CategoryList');
            }
          }
        });
      }
    }
  }
</script>

<style lang="less">
@import "../../styles/com";
@import "../../styles/mixins";
.home{
  background-color: @base_bg_color;
  padding-bottom: 1rem;
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
    .mgb(10);
    li{
      width: 20%; color: @base_sub_color;
      text-align: center; display: inline-block;
      font-size: 0.28rem; padding: 0.2rem 0;
      img{ width: 0.64rem; vertical-align: middle; margin-bottom: .2rem;}
    }
  }
  .adBanner{
    .mgb(10);
    img{ width: 100%;}
  }
  .recommend-area{
    background-color: #fff; .mgb(10);
    .recommend-title{
      position: relative;
      font-size:14px;
      padding:.2rem;
      color:@base_color;
      &:before{
        .bottom-line(@base_border_color)
      }
    }
    .recommend-body{
      position: relative;
      &:before{
        .bottom-line(@base_border_color)
      }
    }
    .recommend-item{
      width:99%;
      position: relative;
      font-size: 12px;
      text-align: center;
      padding: 10/72rem 0;
      &:before{
        .right-line(@base_border_color)
      }
      .title{
        .mgb(10); color: @base_text_color; padding: 0 20/72rem;
        .text-overflow();
      }
      .price{
        span{ color: @base_hot_color;}
      }
    }
    .swiper-slide{ width: 40%;}
  }

  .floor{
    .mgb(10);
    background-color: #FFFFFF;
  }
  .floor1{
    background-color: #FFFFFF; .mgb(10);
    .head{
      position: relative;
      .left{
        position: relative;
        &:before{
          .right-line(@base_border_color)
        }
        img{ height: 4rem;}
      }
      .right{
        div:nth-child(1){
          position: relative;
          &:before{
            .bottom-line(@base_border_color)
          }
        }
        img{ height: 2rem;}
      }
      img{ width: 100%; cursor: pointer; }
      &:before{
        .bottom-line(@base_border_color)
      }
    }
    .foot{
      div{
        position: relative;
        &:before{
          .right-line(@base_border_color)
        }
      }
      img{ height: 1rem; width: 100%;}
    }
  }

  .yd-list{
    overflow: hidden;
    position: relative;
    .yd-list-item{
      width: 50%;
      float: left;
      padding: .2rem;
      position: relative;
      z-index: 0;
      background-color: #fff;
      a{
        height: 0;
        width: 100%;
        padding: 25% 0;
        overflow: hidden;
        display: block;
        position: relative;
        img{
          position: absolute;
          left: 0; top: 0;
          width: 100%;
          height: 100%;
        }
      }
      &:before{
        .bottom-line(@base_border_color)
      }
      &:nth-child(odd):after{
        .right-line(@base_border_color)
      }
    }
  }

  .hot-area{
    .hot-goods{

    }
  }

  .pb_title{
    position: relative;
    padding: .2rem;
    color: @base_color; .mgb(10);
    &:before{
      .bottom-line(@base_border_color)
    }
  }
}
</style>
