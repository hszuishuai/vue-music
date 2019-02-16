<template>
    <div id="play" v-show="Playlist.albumid">
      <transition
        name="normal"
      >
      <div class="normalplay" v-show="fullscreen" >
        <div class="hidd" @click="hidden"><i class="iconfont icon-xiangxia"></i></div>
        <div class="header">
          <div class="songname">{{Playlist.songname}}</div>
          <div class="singer">
            <span v-for="(item,index) in Playlist.singer" :key="index">&nbsp{{item.name}}&nbsp</span>
            </div>
        </div>
        <div class="backimg ">
          <img :class="cdCls"
               :src=" 'http://imgcache.qq.com/music/photo/album_300/'+(Playlist.albumid)%100+'/300_albumpic_'+Playlist.albumid+'_0.jpg'"
          >
        </div>
      <div class="button">
        <div class="progerss">
          <span class="left">{{currentTime | singTime}}</span>
          <div class="progerss_bar">
           <progress_bar
             :percent="percent"
             @precentChange='onPercentChange'
/>
          </div>
          <span class="right">{{duration | singTime}}</span>
        </div>
        <div class="icon i-left">
          <i class="iconfont" :class="IcomMode" @click="changMode"></i>
        </div>
        <div @click="prev" class="icon i-left">
          <i class="iconfont icon-houtui"></i>
        </div>
        <div class="icon i-center" @click="toPlaying">
          <i v-if="playing" class="iconfont icon-ai05"></i>
          <i v-else class="iconfont icon-zanting"></i>
        </div>
        <div @click="next" class="icon i-right">
          <i class="iconfont icon-qianjin"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont icon-shoucang"></i>
        </div>
      </div>
      </div>
      </transition>
      <transition name="min">
      <div class="minplay" v-show="!fullscreen" @click="open">
        <div class="titimg">
          <img
            :class="cdCls"
            :src=" 'http://imgcache.qq.com/music/photo/album_300/'+(Playlist.albumid)%100+'/300_albumpic_'+Playlist.albumid+'_0.jpg'"
          >
        </div>
        <div class="text">
              <span>{{Playlist.songname}}</span>
               <div><span v-for="(item,index) in Playlist.singer" :key="index">{{item.name}}</span></div>
        </div>
        <div class="icon" @click.stop="toPlaying">
          <i v-if="playing" class="iconfont icon-ai05"></i>
          <i  v-else class="iconfont icon-zanting"></i>
        </div>
      </div>
      </transition>
      <audio
        :src="'https://api.bzqll.com/music/tencent/url?key=579621905&id='+Playlist.songmid+'br=320'"
        ref="audio"
        @timeupdate="updateTime"
        @ended="end"
        @canplay="ready"
      >
      </audio>
    </div>
</template>

<script>
  import {mapState,mapGetters,mapMutations} from 'vuex'
  import {
    SET_FULLSCREEN,
    SET_CURRENTINDEX,
    SET_MODE,
    SET_SEQUENCELISR,
    SET_PLAYLIST
  } from "../../store/mutation-type";
  import {playMode} from "../../common/js/config";
  import Progress_bar from '../progress-bar/progress-bar.vue'
  import { MessageBox } from 'mint-ui';
  import {shuffle} from "../../common/js/utils";

  export default {
      name: "play",
     data(){
        return{
          playing:true,
          currentTime:0,
          duration:null,
          songReady:false
          // _playlist:this.Topdetail.songlist
        }
      },
      computed:{
          ...mapState([
            'Playlist',
            'fullscreen',
            'Topdetail',
            'currentIndex',
            'mode',
            'sequenceList'
          ]),
          ...mapGetters([
            'list',
            'oldList'
          ]),
        cdCls(){
            return this.playing ? 'play' :'play pause'
        },
        percent(){
            return this.currentTime/this.duration
        },
         IcomMode(){
            return this.mode===playMode.sequence ? 'icon-xunhuan' : this.mode===playMode.loop ? 'icon-danqu' :'icon-shunxubofang'
        }
      },
    components:{
      Progress_bar
    },
      created(){
      },
      methods:{
        ...mapMutations({
            setfullscreen:SET_FULLSCREEN,
            setcurrentIndex:SET_CURRENTINDEX,
            setMode:SET_MODE,
            setSequenceList:SET_SEQUENCELISR,
            setPlayList:SET_PLAYLIST
          }),
         hidden(){
            this.setfullscreen(false)
          },
         open(){
          this.setfullscreen(true)
        },
        //播放模式切换\
        changMode(){
          const  Mode =(this.mode+1)%3
          this.setMode(Mode)
          if(this.mode===playMode.random){
            // list=shuffle(this.Topdetail.songlist)
            this.setSequenceList(shuffle(this.oldList))

          }else {
           this.setSequenceList(this.Topdetail.songlist)
          }
          this._restPlaylist(this.sequenceList)
          this.setPlayList(this.sequenceList[this.currentIndex])
          this.mode===playMode.sequence ? this._tips('切换到顺序播放') : this.mode===playMode.loop ?  this._tips('切换到单曲循环'):this._tips('切换到随机播放')
        },
        //
        _restPlaylist(arr){
              let  index=arr.findIndex((item)=>{
                return item.data.albumid===this.Playlist.albumid
              })
          this.setcurrentIndex(index)
        },
        // 模式切换提示
        _tips(title){
        MessageBox({
          title: '提示',
          message: title,
        });
        },

        //拖动歌曲播放
        onPercentChange(percent){
          this.$refs.audio.currentTime=percent*this.duration
          if(!this.playing){
            this.toPlaying()
          }
        },
        //歌曲播放时间
        updateTime(e){
          this.currentTime=e.target.currentTime;
          this.duration=e.target.duration;
        },
        //控制歌曲的播放
        toPlaying(){
          if(!this.songReady){
            return
          }
            this.playing=!this.playing
        },
        //上一首
        prev(){
          if(!this.songReady){
            return
          }
            let index=this.currentIndex-1
          if(index===0){
            index=this.Topdetail.songlist.length-1
          }
          this.$store.dispatch('getPlaysong',{list:this.list,index})
          this.songReady=false
        },
        //下一首
        next(){
          if(!this.songReady){
            return
          }
          let index=this.currentIndex+1
          if(index>this.Topdetail.songlist.length-1){
            index=0
          }
          this.$store.dispatch('getPlaysong',{list:this.list,index})
          this.songReady=false
          // console.log(this.currentIndex)
        },
        //快速点击歌曲上下首
        ready(){
          this.songReady=true
        },
        //歌曲播放完后
        end() {
          if (this.mode === playMode.loop) {
            console.log(1)
            this.loop()
          }else {
            this.next();
          }
        },
        //单曲循环
        loop(){
          this.$refs.audio.currentTime=0
          this.$refs.audio.play()
        }
        //vue 钩子动画
        // enter(el,done){
        //
        //   },
        // afterEnter(){
        // },
        // leave(el,done){
        //
        // },
        // afterLeave(){
        // }
      },
    watch:{
      Playlist(){
        this.$nextTick(()=>{
          this.$refs.audio.play();
          this.playing=true
        })
      },
      playing(newplay){
        const audio=this.$refs.audio
        this.$nextTick(()=>{
          newplay ? audio.play():audio.pause()
        })
      }
    }
    }
</script>

<style scoped lang="less">
#play{
  color: white;
  .normalplay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 150;
    background: #222222;
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      text-align: center;
    }
    .hidd{
      position: absolute;
      top:20px;
      left: 20px;
    }
    .backimg {
      width: 100%;
      text-align: center;
      img {
        display: inline;
        border-radius: 100%;
        vertical-align: center;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause{
          animation-play-state: paused;
        }
      }
    }
    .button {
      position: absolute;
      bottom: 60px;
      display: flex;
      width: 100%;
      align-items: center;
      .progerss{
        position: fixed;
        bottom: 120px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          font-size: 12px;
          flex: 2;
        }
        .progerss_bar{
          flex: 6;
        }
        .left{
            text-align: right;
            padding-right: 10px;
        }
        .right{
          padding-left: 10px;
        }
      }
      .icon {
        flex: 1;
        color: #e28d00;
        i {
          font-size: 30px;
        }
      }
      .i-center {
        padding: 0 20px;
        text-align: center;
        i {
          font-size: 40px;
        }
      }
      .i-left{
        text-align: right;
      }
      .i-right{
        text-align: left;
      }
    }
    &.normal-enter-active,&.normal-leave-active{
      transition: all 0.5s ;
      .header,.button{
        transition: all 1s cubic-bezier(0.86,0.18,0.82,1.32);
      }
    }
    &.normal-enter,&.normal-leave-to{
      opacity: 0;
      .header{
        transform: translate3d(0,-100px,0);
      }
      .button{
        transform: translate3d(0,100px,0);
      }
    }
  }
    .minplay {
      position: fixed;
      bottom: 0;
      left: 0;
      background: rgb(28, 28, 28);
      width: 100%;
      height: 70px;
      z-index: 180;
      display: flex;
      align-items: center;
      &.min-enter-active,&.min-leave-active{
        transition: all 0.5s ;
      }
      &.min-enter,&.min-leave-to{
        opacity: 0;
      }
      .titimg{
        flex: 2;
        text-align: center;
        img{
          width: 50px;
          height: 50px;
          vertical-align: center;
          border-radius: 100%;
          &.play {
            animation: rotate 10s linear infinite;
          }
          &.pause{
            animation-play-state: paused;
          }
        }
      }
      .text{
        flex: 5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 13px;
      }
      .icon{
        flex: 3;
        i{
          font-size: 25px;
          color: orange;
        }
      }
    }
  @keyframes rotate{
0%{
  transform: rotate(0);
}
100%{
  transform: rotate(360deg);
}
    }
}
</style>
