<template>
  <div class="divider">{{content}}</div>
</template>

<script>
  export default {
    name: "divider",
    props: ['content']
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/com";
  .divider{
    display: table;
    white-space: nowrap;
    height: auto;
    overflow: hidden;
    line-height: 1;
    text-align: center;
    padding: 10px 0;
    color: @base_sub_color;
    &:before{
      background-position: right 1em top 50%;
    }
    &:after{
      background-position: left 1em top 50%;
    }
    &:before,&:after{
      content: '';
      display: table-cell;
      position: relative;
      top: 50%;
      width: 50%;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFW…GBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC);
    }
  }
</style>
