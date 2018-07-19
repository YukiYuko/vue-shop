<template>
  <div flex class="yuki-tabbar">
    <a class="yuki-tabbar-item" :class="{active: active === 'home'}" @click.prevent="switchItem('home', $event)" box="1" flex items="center" justify="center" dir="column">
      <i class="iconfont icon-zhuye"></i>
      <span>首页</span>
    </a>
    <a class="yuki-tabbar-item" :class="{active: active === 'type'}" @click.prevent="switchItem('type', $event)" box="1" flex items="center" justify="center" dir="column">
      <i class="iconfont icon-fenlei"></i>
      <span>分类</span>
    </a>
    <a class="yuki-tabbar-item" :class="{active: active === 'car'}" @click.prevent="switchItem('car', $event)" box="1" flex items="center" justify="center" dir="column">
      <i class="iconfont icon-gouwuche"></i>
      <span>购物车</span>
    </a>
    <a class="yuki-tabbar-item" :class="{active: active === 'mine'}" @click.prevent="switchItem('mine', $event)" box="1" flex items="center" justify="center" dir="column">
      <i class="iconfont icon-wode"></i>
      <span>我的</span>
    </a>
  </div>
</template>

<script>
  import anime from 'animejs'
  export default {
    name: "tabbar",
    data () {
      return {
        active: 'home'
      }
    },
    methods: {
      switchItem (active, e) {
        this.active = active;
        let target = e.target.className === 'yuki-tabbar-item' ? e.target : e.target.parentNode;
        anime({
          targets: target,
          scale: [
            {value: 1.1, duration: 200},
            {value: 1, duration: 200}
          ],
          easing: 'easeInOutCubic'
        });
        this.$emit('click', active);
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../../../styles/com";
.yuki-tabbar{
  height: 1rem; background-color: #ffffff;
  box-shadow: 0 -6px 4px -4px rgba(0,0,0,0.05);
  position: fixed; width: 100%; bottom: 0;
  left: 0;

  a{
    height: 100%;
    span{
      color: @base_text_color; font-size: 0.24rem;
    }
    i{
      color: @base_text_color; font-size: 0.4rem;
    }
    &.active{
      span, i{
        color: @base_color;
      }
    }
  }
}
</style>
