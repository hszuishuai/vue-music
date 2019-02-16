<template>
    <div id="topdetail">
      <div class="header" ref="header">
        <i class="iconfont icon-fanhui" @click="back"></i>
        <div class="Listname">{{Topdetail.topinfo.ListName}}</div>
        <div></div>
      </div>
      <div class="bg" ref="bg">
        <div class="top_detail">
           <img
             :src="Topdetail.topinfo.pic_album"
             ref="bg_img"
           >
        <div class="top_detail_right">
          <div>{{Topdetail.topinfo.ListName}}</div>
          <div>第三周</div>
          <div>{{NewTime | date}}更新</div>
        </div>
        </div>
      </div>
      <div class="bg-scroll" ref="bgscroll"></div>
      <Scroll  @scroll="scrollOn"
               :data="Topdetail.songlist"
               :listen-scroll="listenScroll"
               :probe-type="probetype"
               class="list"
      >
       <ul class="topinfo">
        <p>排行榜 共{{Topdetail.songlist.length}}首</p>
        <li  class="songlist" v-for="(items,index) in Topdetail.songlist" :key="index" @click="play(items,index)">
          <div :class=" index>=3?'songnum color2':'songnum color1'">{{index+1}}</div>
          <div class="songinfo">
            <div class="songname">{{items.data.songname}}</div>
            <div class="singer">
              <span v-if="items.data.pay.payplay===1" class="vip">vip</span>
              <span>{{items.data.singer[0].name}}</span>
            </div>
          </div>
        </li>
        </ul>
      </Scroll>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Scroll from '../../common/Scroll/scroll.vue'
  const RESERVED_HEIGHT = 40
    export default {
      name: "topdetail",
      data(){
        return{
          NewTime:new Date().getTime(), //当前时间
          scrollY:0
        }
      },
      created(){
        this.listenScroll=true;
        this.probetype=3
      },
      mounted(){
        this.bgHeight=this.$refs.bg.clientHeight
        this.minTransalteY=-this.bgHeight
        this.$store.dispatch('getTopdetail',this.$route.params.tid)
      },
      methods:{
        scrollOn(pos){
          // console.log(pos.y)
          this.scrollY=pos.y
        },
        back(){
          this.$router.back()
        },
        play(item,index){
          this.$store.dispatch('getPlaysong',{list:item,index})
        }
      },
      computed:{
       ...mapState(['Topdetail'])
      },
      watch:{
        scrollY(newY){
          let translateY = Math.max(this.minTransalteY,newY)  //设置背景scroll 滚动的最大高度
          let zIndex=0
          this.$refs.bgscroll.style['transform']=`translate3d(0,${translateY}px,0)`
          if(newY<this.minTransalteY){
            zIndex=10
          }else {
            this.$refs.bg.style.height = `200px`
          }
            this.$refs.header.style.zIndex=zIndex
         }
      },
      components:{
        Scroll
      }
    }
</script>

<style scoped lang="less">
#topdetail{
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .header{
    width: 100%;
    position: relative;
    height: 40px;
    background:  #31c27c;
    line-height: 40px;
    i{
      color: white;
      font-size: 20px;
    }
    .Listname{
      color: white;
      position: absolute;
      top: 0;
      left: 36%;
    }
  }
  .bg{
    position: relative;
    width: 100%;
    height: 200px;
    background: #31c27c;
    .top_detail{
      display: flex;
      align-items: center;
      height: 125px;
      padding: 10px;
      img{
        flex: 2;
        width: 125px;
      }
      .top_detail_right{
        flex: 8;
        padding-left: 10px;
        color: white;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        div{
          padding-bottom: 10px;
          &:nth-of-type(1){
            font-size: 18px;
          }
        }
      }
    }
  }
  .bg-scroll{
    position: relative;
    height: 100%;
    background: white;
  }
  .list{
    position: fixed;
    top: 240px;
    bottom: 0;
    width: 100%;
    .topinfo{
      P{
         padding: 5px 0 5px 10px;
      }
    .songlist {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .songnum {
        flex: 2;
        text-align: center;
        &.color1 {
          color: red;
        }
        &.color2 {
          color: rgba(110, 110, 110, 0.74);
        }
      }
      .songinfo {
        flex: 8;
        .songname {
        }
        .singer {
          font-size: 12px;
          color: rgba(117, 117, 117, 0.88);
          padding-top: 5px;
          .vip {
            color: #31c27c;
            display: inline-block;
            border: 1px solid;
            padding: 0 1px;
          }
        }
      }
    }
    }
  }
}
</style>
