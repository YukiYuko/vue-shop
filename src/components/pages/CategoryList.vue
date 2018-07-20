<template>
  <div class="categoryList" flex dir="column">
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div flex class="content" box="1">
      <div class="left">
        <a :class="{active: type_index === index}" @click="switch_item(index, item.ID)" v-for="(item, index) in list" :key="index" href="javascript:;">
          {{item.MALL_CATEGORY_NAME}}
        </a>
      </div>
      <div box="1" class="right">
        <van-tabs v-model="active">
          <van-tab style="width: 150px;" v-for="(item, index) in list_sub" :key="index" :title="item.MALL_SUB_NAME">

          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCategoryList, getCategorySubList} from '../../ajax/api';
  export default {
    name: "CategoryList",
    data() {
      return {
        list: [],
        list_sub: [],
        type_index: 0,
        categoryId: '',
        active: 0
      }
    },
    components: {},
    mounted() {
      this.getCategory();
    },
    methods: {
      // 获取大类
      getCategory () {
        let toast = this.$toast.loading('加载中...');
        getCategoryList().then((res) => {
          this.list = res.data;
          console.log(this.list);
          setTimeout(() => {
            toast.clear();
          }, 1000)
        }).catch(() => {

        })
      },
      // 获取小类
      getCategorySub () {
        let toast = this.$toast.loading('加载中...');
        getCategorySubList({categoryId: this.categoryId}).then((res) => {
          this.list_sub = res.data;
          console.log(this.list_sub);
          setTimeout(() => {
            toast.clear();
          }, 1000)
        }).catch(() => {

        })
      },
      // 切换大类
      switch_item (index, categoryId) {
        this.type_index = index;
        this.categoryId = categoryId;
        this.getCategorySub();
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../../styles/com";
.categoryList{
  height: 100vh;
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
