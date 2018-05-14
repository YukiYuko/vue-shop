<template>
  <div class="switch-img-box" id="ec-slide-box">
    <div class="switch-img-type switch-img-left">
      <ul :style="{'width':ulWidth,'transition-timing-function':slideChange}">
        <li v-for="(li,index) in list" :style="{'width':listWidth+'%'}">
          <a :href="li.href?li.href:'javascript:;'">
            <img :src="li.src" class="slider-img"/>
          </a>
        </li>
      </ul>
    </div>
    <!--如果需要显示对应的点-->
    <div class="switch-option" v-if="option">
      <div>
        <span v-for="(li,index) in list"></span>
      </div>
    </div>
    <!--如果需要显示箭头-->
    <div class="switch-arrow" v-if="arrowurl&&arrowsize">
      <div :class="{'arrow-left':direction==='left','arrow-top':direction==='top'}"
           :style="{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}"></div>
      <div :class="{'arrow-right':direction==='left','arrow-bottom':direction==='top'}"
           :style="{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        slideChange: '',
        arrowWidth: '',
        arrowHeight: '',
      }
    },
    computed: {
      //ul宽度
      ulWidth: function () {
        return (this.list.length) + "00%";

      },
      //li宽度
      listWidth: function () {
        return 100 / (this.list.length)
      }
    },
    mounted(){
      //设置各个数据初始值
      this.slideChange = this.sildetype || 'ease';
      if (this.arrowsize && this.arrowurl) {
        this.arrowWidth = this.arrowsize.split(',')[0];
        this.arrowHeight = this.arrowsize.split(',')[1];
      }
    },
    props: ['list', 'autoplay', 'type', 'time', 'sildetype', 'arrowurl', 'arrowsize', 'option', 'direction'],
    methods: {
    }
  }
</script>
<style lang="less">
  .ec-slide-img-box {
    width: 100%;
    height: 100%;
    position: relative;
    touch-action: none;
  }

  .ec-slide-img-type {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    &.ec-slide-img-top {
    }
    &.ec-slide-img-left {
      li {
        display: inline-block;
        font-size: 0;
      }
    }
    &.ec-slide-img-transparent {
      li {
        opacity: 0;
        transition: opacity 1s;
        width: 0;
        &.cur {
          width: auto;
        }
        &.show {
          opacity: 1;
        }
      }
    }
    ul {
      font-size: 0;
      &.tran {
        transition: all .4s;
      }
      li {
        text-align: center;
      }

      img {
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .ec-slide-arrow {
    div {
      position: absolute;
      z-index: 2;
      margin: auto;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      opacity: .5;
      &:hover {
        opacity: 1;
      }
      &.arrow-left {
        left: 10px;
        right: auto;
      }
      &.arrow-right {
        right: 10px;
        left: auto;
        transform: rotate(180deg);
      }
      &.arrow-top {
        top: 10px;
        bottom: auto;
      }
      &.arrow-bottom {
        bottom: 10px;
        top: auto;
        transform: rotate(180deg);
      }
    }
  }

  .ec-slide-option {
    position: absolute;
    font-size: 0;
    bottom: 10px;
    text-align: center;
    width: 100%;
    z-index: 5;
    &.isFirst {
      span:first-child {
        display: none;
      }
    }
    &.isLast {
      span:last-child {
        display: none;
      }
    }
    span {
      border-radius: 100%;
      margin: 0 5px;
      background: #fff;
      display: inline-block;
      width: 10px;
      height: 10px;
      &.active {
        background: #09f;
      }
    }
    &.ec-slide-option-top {
      display: table;
      width: 10px;
      height: 100%;
      top: 0;
      right: 10px;
      margin: auto;
      bottom: 0;
      span {
        margin: 5px 0;
      }
      div {
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
</style>
