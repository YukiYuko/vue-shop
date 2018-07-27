<template>
  <div class="categoryList" flex dir="column">
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div class="menu" flex>
      <a box="1" :class="{active: type_index === index}" @click="switch_item(index, item.ID)" v-for="(item, index) in list" :key="index" href="javascript:;">
        {{item.MALL_CATEGORY_NAME}}
      </a>
    </div>
    <div class="choose" flex justify="center" items="center">
      <div class="ceil" flex items="center">
        <span>销量:</span> <van-switch size="20px" v-model="checked_ceil" />
      </div>
      <div class="price" flex items="center">
        <span>价格:</span> <van-switch size="20px" v-model="checked_price" />
      </div>
    </div>
    <div flex class="content" box="1">
      <div class="left">
        <a box="1" @click="switch_item_sub(index, item.ID)" :class="{active: type_index_sub === index}" v-for="(item, index) in list_sub" :key="index" href="javascript:;">
          {{item.MALL_SUB_NAME}}
        </a>
      </div>
      <div box="1" class="right">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <div class="goods-list" style="overflow: hidden;">
              <goods-info-type
                v-for="( item, index) in list_goods" :key="index"
                :goodsImage="item.IMAGE1"
                :goodsName="item.NAME"
                :goodsPrice="item.PRESENT_PRICE"
                :goodsId="item.ID"
                :goodsPriceOrigin="item.ORI_PRICE"
              ></goods-info-type>
            </div>
          </van-list>
          <divider v-if="finished" content="没有更多数据了QAQ"></divider>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
  import goodsInfoType from './common/goodsInfoType'
  import divider from '../public/divider/divider'
  import {getCategoryList, getCategorySubList, getGoodsListByCategorySubID} from '../../ajax/api';
  export default {
    name: "CategoryList",
    data() {
      return {
        list: [],
        list_sub: [],
        list_goods: [],
        type_index: 0,
        type_index_sub: 0,
        categoryId: 1,
        categoryId_sub: '',
        active: 0,
        checked_ceil: false,
        checked_price: false,
        loading: false,
        finished: false,
        isLoading: false,
        page: 1
      }
    },
    components: {
      goodsInfoType, divider
    },
    mounted() {
      this.init();
    },
    methods: {
      // 初始化数据
      async init () {
        let toast = this.$toast.loading('加载中...');
        let res_Category = await getCategoryList();
        this.list = res_Category.data;
        let res_CategorySub = await getCategorySubList({categoryId: this.categoryId});
        this.list_sub = res_CategorySub.data;
        this.categoryId_sub = this.list_sub[0].ID;
        let res_goods = await getGoodsListByCategorySubID({categorySubId: this.categoryId_sub, page: this.page});
        this.list_goods = res_goods.data;
        setTimeout(() => {
          toast.clear();
          this._initdata();
        }, 1000);
      },
      _initdata () {
        this.isLoading = false;
        this.page = 1;
      },
      // 上拉加载
      async onLoad() {
        if (this.page > 3) {
          return
        }
        this.page++;
        let toast = this.$toast.loading('加载中...');
        let res_goods = await getGoodsListByCategorySubID({categorySubId: this.categoryId_sub, page: this.page});
        if (!res_goods.data.length) {
          this.finished = true;
          this.loading = false;
        }
        this.list_goods = [...this.list_goods,...res_goods.data];
        toast.clear();
      },
      // 下拉刷新
      async onRefresh () {
        this.page = 1;
        let toast = this.$toast.loading('加载中...');
        let res_goods = await getGoodsListByCategorySubID({categorySubId: this.categoryId_sub, page: this.page});
        this.list_goods = res_goods.data;
        setTimeout(() =>{
          this.isLoading = false;
          toast.clear();
          this.loading = false;
          this.finished = false;
        }, 1000);
      },
      // 切换大类
      switch_item (index, categoryId) {
        this.type_index = index;
        this.type_index_sub = 0;
        this.categoryId = categoryId;
        this.init();
      },
      // 切换小类
      async switch_item_sub (index, categoryId_sub) {
        this.type_index_sub = index;
        this.categoryId_sub = categoryId_sub;
        let toast = this.$toast.loading('加载中...');
        let res_goods = await getGoodsListByCategorySubID({categorySubId: this.categoryId_sub});
        this.list_goods = res_goods.data;
        toast.clear();
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../../styles/com";
.categoryList{
  height: 100vh;
  .menu{
    height: 0.9rem; background-color: #ffffff; border-bottom: 1px solid @base_border_color;
    a{
      height: 100%; line-height: 0.9rem; text-align: center;
      &.active{
        border-bottom: 1px solid @base_color;
      }
    }
  }
  .choose{
    height: 0.9rem; background-color: #ffffff;
    > div{
      margin:0 0.2rem;
    }
  }
  .content{
    .left{
      width: 1.8rem; background-color: #ffffff; height: 100%;
      overflow: auto;
      a{
        height: 44px; line-height: 44px; text-align: center;
        display: block; color: @base_sub_color; font-size: 0.3rem;
        &.active{
          background-color: @base_bg_color; color: @base_color;
        }
      }
    }
    .right{
      background-color: @base_bg_color; overflow: auto;
      padding:5px;
    }
  }
}
</style>
