<template>
  <div class="button">
    <span>hover me see it</span>
  </div>
</template>

<script>
  export default {
    name: "effectButton",
    data () {
      return {
      }
    },
    mounted () {

      // var div=document.getElementById('div');
      //
      // 第一种：用cssText
      //
      // div.style.cssText='width:250px;height:250px;border:1px red solid;';
      //
      // 第二种：用setProperty()
      //
      // div.style.setProperty('width','250px');
      // div.style.setProperty('height','250px');
      // div.style.setProperty('border','1px red solid');
      //
      // 第三种：使用css属性对应的style属性
      //
      // div.style.width = "250px";
      //
      // div.style.height = "250px";
      //
      // div.style.border = "1px solid red";

      document.querySelector('.button').onmousemove = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty('--x', `${ x }px`);
        e.target.style.setProperty('--y', `${ y }px`);
      }
    }
  }
</script>

<style lang="less" scoped>
  .button {
    position: relative;
    appearance: none;
    background: #f72359;
    padding: 1em 2em;
    border: none;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    border-radius: 100px;
    span {
      position: relative;
    }
    &::before {
      --size: 0;
      content: '';
      position: absolute;
      left: var(--x);
      top: var(--y);
      width: var(--size);
      height: var(--size);
      background: radial-gradient(circle closest-side, #4405f7, transparent);
      transform: translate(-50%, -50%);
      transition: width .2s ease, height .2s ease;
    }
    &:hover::before {
      --size: 600px;
    }
  }
</style>
