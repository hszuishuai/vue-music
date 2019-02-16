<template>
    <div id="serach">
      <Serachbox @showlist="showRecommend" @query="OnqueryChange"/>
      <div v-if="!showList" class="hotserach">
        <p>热门搜索</p>
        <div class="hotSerachinfo">
          <ul>
            <li>Gai见面吧电台</li>
            <li>爱情有时很残忍 </li>
            <li>NEVER BE ALONE </li>
            <li>红尘来去一场梦 </li>
          </ul>
        </div>
      </div>
      <Suggest @serachquery="saveHistroy" :query="query" v-if="showList"/>
      <div v-show="serachHistory.length>0 &&!showList" class="serachhistroy">
        <p>搜索历史</p>
        <ul>
          <li v-for="(item,index) in serachHistory" :key="index">
            <i class="iconfont icon-yinle"></i>
            <span> {{item}}</span>
            <i class="iconfont icon-guanbi"></i>
          </li>
        </ul>
        <div class="empty">清空搜索记录</div>
        </div>
    </div>
</template>

<script>
    import Suggest from '../Suggest/suggest.vue'
    import  Serachbox from '../../common/Serach-box/serach-box.vue'
    import  {mapActions,mapState} from 'vuex'
    export default {
        name: "serach",
        data(){
          return{
            title:'',
            showList:false,
            query:''
          }
        },
      created(){

      },
      methods:{
        showRecommend() {
          this.showList=!this.showList
        },
        saveHistroy(){
          console.log(this.query)
          this.saveSerachHiotroy(this.query)
        },
        OnqueryChange(query){
         this.query=query
          console.log(query)
        },
        ...mapActions(['saveSerachHiotroy'])

      },
    computed:{
        ...mapState(['serachHistory'])
        },
      components:{
          Suggest,
          Serachbox
      }
    }
</script>

<style scoped lang="less">
#serach{
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  .hotserach{
    padding: 10px 10px;
    ul{
      li{
        margin: 10px 10px 10px 0;
        padding: 2px 2px;
        border: 1px solid black;
        display: inline-block;
        border-radius:5px;
      }
    }
  }
  .serachhistroy{
    P{
      padding:10px;
    }
    .empty{
      font-size: 12px;
      color: #31c27c;
      text-align: center;
      margin-top: 30px;
    }
    ul{
      li{
        height: 40px;
        border-top: 1px solid #ededed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          flex: 1;
          text-align: left;
          display: inline-block;
          padding-left: 20px;
          font-size: 14px;
        }
        i{
          &:nth-of-type(1){
            font-size: 25px;
            padding-left: 20px;
          }
          &:nth-of-type(2){
            font-size: 12px;
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>
