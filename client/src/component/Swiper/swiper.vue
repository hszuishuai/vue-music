<template>
    <div id="swiper">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="(item,index) in swiperlist[0]" :key="index">
          <img :src="item.picUrl"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "swiper",
    //   props:{
    //       slider: Array
    //   },
      computed: {
        ...mapState(['swiperlist'])
      }
     }
</script>

<style scoped lang="less">
#swiper{
  .mint-swipe{
    height: 200px;
    .mint-swipe-items-wrap {
      width: 100%;
      .mint-swipe-item {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
