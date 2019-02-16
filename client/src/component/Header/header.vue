<template>
    <div id="header">
      <div class="header-left">
        <i class="iconfont icon-yinle"></i>
        <div class="title">QQ音乐</div>
      </div>
      <i class="iconfont icon-yonghu"></i>
    </div>
</template>

<script>
    export default {
        name: "headers"
    }
</script>

<style scoped lang="less">
  #header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 40px;
    background: #31c27c;
    justify-content: space-between;
    align-items: center;
    z-index: 20;
    i{
      font-size: 20px;
    }
    .header-left{
      float: left;
      i{
        color: rgba(249, 158, 0, 0.86);
        float: left;
        margin:0  5px;
      }
      .title{
        color: white;
        float: left;
      }
    }

  }
</style>
