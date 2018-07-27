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

      </div>
    </div>
  </div>
</template>

<script>
  import {getCategoryList, getCategorySubList, getGoodsListByCategorySubID} from '../../ajax/api';
  export default {
    name: "CategoryList",
    data() {
      return {
        list: [],
        list_sub: [],
        type_index: 0,
        type_index_sub: 0,
        categoryId: 1,
        categoryId_sub: '',
        active: 0,
        checked_ceil: false,
        checked_price: false
      }
    },
    components: {},
    mounted() {
      this.getCategory();
    },
    methods: {
      // 初始化数据
      async init () {
      },
      // 获取大类
      async getCategory () {
        let toast = this.$toast.loading('加载中...');
        let res = await getCategoryList();
        this.list = res.data;
        toast.clear();
      },
      // 获取小类
      getCategorySub () {
        let toast = this.$toast.loading('加载中...');
        getCategorySubList({categoryId: this.categoryId}).then((res) => {
          this.list_sub = res.data;
          this.categoryId_sub = this.list_sub[0].ID;
          setTimeout(() => {
            toast.clear();
          }, 1000)
        }).catch(() => {

        })
      },
      // 切换大类
      switch_item (index, categoryId) {
        this.type_index = index;
        this.type_index_sub = 0;
        this.categoryId = categoryId;
        this.getCategorySub();
      },
      // 切换小类
      switch_item_sub (index, categoryId_sub) {
        this.type_index_sub = index;
        this.categoryId_sub = categoryId_sub;
      },
      // 获取列表
      getList () {
        getGoodsListByCategorySubID({categorySubId: this.categoryId_sub}).then((res) => {
          console.log(res)
        })
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
      width: 1.8rem; background-color: #ffffff;
      a{
        height: 44px; line-height: 44px; text-align: center;
        display: block; color: @base_sub_color; font-size: 0.3rem;
        &.active{
          background-color: @base_bg_color; color: @base_color;
        }
      }
    }
    .right{
      background-color: @base_bg_color;
    }
  }
}
</style>
