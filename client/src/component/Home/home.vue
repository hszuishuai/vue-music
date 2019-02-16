<template>
    <div id="home">
      <ul class="list">
        <router-link to="/home/recommend" tag="li">推荐</router-link>
        <router-link to="/home/top" tag="li">排行榜</router-link>
        <router-link to="/home/serach" tag="li">搜索</router-link>
      </ul>
      <keep-alive>
        <router-view/>
      </keep-alive>

    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Play from '../Play/play.vue'
    export default {
      name: "home",
      created(){
        this.$store.dispatch('getRecommend')
      },
      computed:{
      ...mapState(['Recommendlist'])
      },

    }
</script>
<style scoped lang="less">
#home{
  padding-top: 80px;
  .list{
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    z-index: 20;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    li{
      width: 100%;
      text-align: center;
      position: relative;
    }
    .router-link-active{
      color: #31c27c;
      &:before{
        content: '';
        position: absolute;
        bottom: -10px;
        width: 100%;
        left: 0;
        height: 2px;
        display: inline-block;
        background:#31c27c ;
      }
    }
  }

}
</style>
