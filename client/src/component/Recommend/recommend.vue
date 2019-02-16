<template>
    <div id="recommend">
      <Swiper/>
      <p>热门歌单</p>
        <div class="songlist">
            <div class="songitem" v-for="(item,index) in Recommendlist[0]" :key="index">
            <img v-lazy="item.picUrl"/>
            <div>{{item.songListDesc}}</div>
            <div>{{item.songListAuthor}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import Swiper from '../Swiper/swiper.vue'
  import {mapState} from 'vuex'
    export default {
      name: "recommend",
      components:{
          Swiper
      },
      computed:{
        ...mapState(['Recommendlist'])
      }
    }
</script>

<style scoped lang="less">
#recommend{
  p{
    padding: 10px;
  }
  .songlist{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .songitem{
      width: 48%;
      margin-bottom: 5px;
      img{
        width: 100%;
      }
      div{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        &:nth-of-type(2){
          font-size: 12px;
        }
      }
    }
  }
}
</style>
