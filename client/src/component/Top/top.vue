<template>
    <div id="top">
      <div @click="$router.push({name:'topdetail',params:{tid:items.id}})"
           class="toplist"
           v-for="(items,index) in Toplist[0]"
           :key="index"
      >
        <div class="top_left">
          <div class="listenCount">
            <i class="iconfont icon-yinle"></i>
            <span>{{items.listenCount}}</span>
          </div>
        <img
          v-lazy="items.picUrl"
        />
        </div>
        <div class="top_right">
          <div>
            {{items.topTitle}}
          </div>
          <div class="top_content" v-for="(item,index) in items.songList" :key="index">
            <div>
              <span>{{index+1}}</span>
              <span class="singname">{{item.songname}}--{{item.singername}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
    export default {
      name: "top",
      created(){
        this.getTop()
      },
      computed:{
        ...mapState(['Toplist'])
      },
      methods: {
        ...mapActions({getTop:'getToplist'})
      }
    }
</script>

<style scoped lang="less">
  #top{
    .toplist{
      padding:  5px;
      display: flex;
      .top_left{
        position: relative;
        flex: 3;
        img{
          width: 100%;
        }
        .listenCount{
          position: absolute;
          bottom: 8px;
          left: 20%;
          color: white;
          font-size: 10px;
        }
      }
      .top_right{
        flex: 7;
        padding-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .top_content{
          div{
            .singname{
              font-size: 13px;
            }
          }
        }
      }
    }
  }

</style>
