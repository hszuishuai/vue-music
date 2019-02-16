<template>
  <div class="serach_input">
    <div class="serach_input_content">
      <i class="iconfont icon-sousuo"></i>
      <input v-model="query" @blur="close" @focus="showRecommend_" placeholder="搜索歌曲、歌单、歌手">
      <button v-if="showList" @click="showRecommend">取消</button>
    </div>
  </div>
</template>

<script>
  import {debounce} from "../js/utils";
  export default {
        name: "serach-box",
        data(){
          return{
            query:'',
            showList:false
            }
        },
        methods:{
          showRecommend(){
            this.$emit('showlist')
            this.query=''
            this.showList=false
          },
          showRecommend_(){
            this.$emit('showlist')
            this.showList=true
          },
          close(){
            this.showList=false
          }
        },
      // created() {
      //   this.$watch('query', debounce((newQuery) => {
      //     this.$emit('query',newQuery)
      //   }, 200))
      // },
      watch:{
        query(newQuery){
          setTimeout(()=> {this.$emit('query',newQuery)},2000)
        }
      }
    }
</script>

<style scoped lang="less">
  .serach_input {
    width: 100%;
    height: 56px;
    border: 1px solid #f4f4f4;
    background: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    .serach_input_content {
      position: relative;
      background: white;
      line-height: 36px;
      height: 36px;
      width: 90%;
      i {
        display: inline-block;
        font-size: 20px;
      }
      input {
        width: 80%;
        border: none;
        padding: 5px 0;
        outline: none;
      }
      button{
        width: 36px;
        height: 36px;
        position: absolute;
        top: 0;
        right: 0;
      }

    }
  }

</style>
