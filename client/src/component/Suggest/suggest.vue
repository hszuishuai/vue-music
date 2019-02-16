<template>
    <Scroll
      id="suggest"
      :data="SerachList"
      @scrollToEnd="serachMore"
    >
      <div>
      <div class="suggest_s" v-for="(item,index) in SerachList" @click="getplay(item,index)" :key="index">
      <div class="icon">
        <i class="iconfont icon-yinle">
        </i>
      </div>
      <div class="suggest_content">
        <span class="suggest_name">{{item.songname}}</span>
        <span class="suggest_singer">{{item.singer[0].name}}</span>
      </div>
      </div>
        <Loading v-if="hasMore" title='正在加载...'/>
        <div v-if="!hasMore && SerachList.length<0" class="no_result">
          <div class="icon">
            <i class="iconfont icon-sousuo"></i>
          </div>
          <div class="content">
            <P>无匹配</P>
            <p>很抱歉，没有找到与“{{query}}”相关的结果。</p>
          </div>
        </div>
      </div>
    </Scroll>
</template>

<script>
    import {Serach} from "../../api";
    import {mapMutations} from 'vuex'
    import Scroll from '../../common/Scroll/scroll.vue'
    import Loading from '../Loading/loading.vue'

    export default {
        name: "suggest",
        props:{
          query: {
            type:String,
            default:'',
          }
        },
      data(){
          return{
            SerachList:[],
            page:1,
            hasMore:false
          }
      },
      methods:{
          ...mapMutations({

          }),
         serachQuery(){
           const  result=Serach(this.query,this.page)
           let that=this
           result.then((res)=>{
             const datas=res.data
             let num1 = datas.indexOf('(')
             let resultData = JSON.parse(datas.substring(num1 + 1, datas.length-1))
             that.SerachList=(resultData.data.song.list)
             that.$emit('serachquery')
             that._checkHasmore(resultData.data)
           })
         },
        //跳转到歌曲页面
        getplay(item,index){
           this.$store.dispatch('getPlaysong',{list:item,index,type:'suggest'})
        },
        //下拉加载更多
        serachMore(){
            if(!this.hasMore){
              return
            }
            this.page++
          const  result=Serach(this.query,this.page)
          let that=this
          result.then((res)=>{
            const datas=res.data
            let num1 = datas.indexOf('(')
            let resultData = JSON.parse(datas.substring(num1 + 1, datas.length-1))
            that.SerachList=that.SerachList.concat(resultData.data.song.list)
          })
        },
        _checkHasmore(data){
          const  song=data.song
          if(!song.list.length ||(this.page*20)>song.total_song_num){
            this.hasMore=false
          }else {
            this.hasMore=true
          }
        }
      },
      watch:{
          query(){
             this.serachQuery()
          }
      },
      components:{
          Scroll,
          Loading
      }
    }
</script>

<style scoped lang="less">
  #suggest {
    width: 100%;
    position: fixed;
    left: 0;
    top: 140px;
    bottom: 0;
    overflow: hidden;
    div {
      .suggest_s {
        width: 100%;
        height: 55px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d1d1d1;
        .icon {
          flex: 2;
          text-align: center;

          i {
            font-size: 30px;
          }
        }
        .suggest_content {
          flex: 8;
          display: flex;
          flex-direction: column;

          .suggest_singer {
            color: #808080;
            font-size: 12px;
          }
        }
      }
      .no_result{
        .icon{
          text-align: center;
          i{
            font-size: 40px;
          }
        }
        .content{
          p{
            text-align: center;
            margin-top: 10px;
            &:nth-of-type(2){
              font-size: 10px;
              color: #808080;
            }
          }
        }
      }
    }
  }

</style>
