<template>
  <div class="list">
    <a class="list__item" href="https://github.com/electerious/basicScroll" style="--x:282px; --y:63px;">
      <svg class="list__icon symbol"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#document"></use></svg>
      <span class="list__label">Documentation</span>
    </a>
    <a class="list__item" href="https://medium.com/@electerious/the-power-of-css-variables-6c4e4ebaf279" style="--x:112px; --y:41px;">
      <svg class="list__icon symbol"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#medium"></use></svg>
      <span class="list__label">The power of CSS variables</span>
    </a>
    <a class="list__item" href="https://medium.com/@electerious/parallax-scrolling-with-js-controlled-css-variables-63cfe96820c7" style="--x:388px; --y:14px;">
      <svg class="list__icon symbol"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#medium"></use></svg>
      <span class="list__label">Parallax scrolling with JS controlled CSS variables</span>
    </a>
    <a class="list__item" href="http://codepen.io/electerious/pen/QGNxxx" style="--x:147px; --y:53px;">
      <svg class="list__icon symbol"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#compass"></use></svg>
      <span class="list__label">Default demo</span>
    </a>
    <a class="list__item" href="http://codepen.io/electerious/pen/gLLozQ" style="--x:107px; --y:6px;">
      <svg class="list__icon symbol"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#compass"></use></svg>
      <span class="list__label">Parallax scene demo</span>
    </a>
    <a class="list__item" href="https://codepen.io/electerious/pen/goZRBv" style="--x:74px; --y:12px;">
      <svg class="list__icon symbol"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#compass"></use></svg>
      <span class="list__label">Callback demo</span>
    </a>
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
      // document.querySelector('.button').onmousemove = (e) => {
      //   const x = e.pageX - e.target.offsetLeft;
      //   const y = e.pageY - e.target.offsetTop;
      //   e.target.style.setProperty('--x', `${ x }px`);
      //   e.target.style.setProperty('--y', `${ y }px`);
      // }
    }
  }
</script>

<style lang="less" scoped>
  .list__item {
    --radius:5px;
    --aqua:#3cdddd;
    --pink:#ff1ac6;
    --white:#fff;
    --light:hsla(0,0%,100%,.7);
    --black:#131920;
    --dark:rgba(240,240,255,.06);
    --mid:rgba(240,240,255,.15);
    --gutter:2rem;
    --max-width:1500px;
    --font-size:131.25%;

    position:relative;
    display:-ms-flexbox;
    display:flex;
    -ms-flex-align:center;
    align-items:center;
    padding:calc(var(--gutter) / 2);
    background-clip:padding-box;
    box-shadow:0 1px 0 var(--dark);
    color:var(--white);
    text-decoration:none;
    overflow:hidden;
    transition:background .4s ease
  }
  .list__item:first-child {
    border-radius:calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0 0
  }
  .list__item:last-child {
    border-bottom:none;
    border-radius:0 0 calc(var(--radius) - 2px) calc(var(--radius) - 2px)
  }
  .list__item:hover {
    background:var(--aqua)
  }
  .list__item:before {
    --size:1000px;
    --scale:0;
    --opacity:0;
    content:"";
    position:absolute;
    left:calc(var(--x) - var(--size) / 2);
    top:calc(var(--y) - var(--size) / 2);
    width:var(--size);
    height:var(--size);
    background:radial-gradient(circle closest-side,var(--pink),transparent);
    transform:scale(var(--scale));
    opacity:var(--opacity);
    transition:transform .8s cubic-bezier(.22,1,.32,1),opacity .8s cubic-bezier(.22,1,.32,1)
  }
  .list__item:hover:before {
    --scale:1;
    --opacity:1
  }
</style>
