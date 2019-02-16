<template>
  <div id="app">
    <Headers v-if="$route.meta.show"/>
 <router-view/>
    <play></play>
  </div>
</template>

<script>
  import Headers from './component/Header/header.vue'
  import play from './component/Play/play.vue'
  export default {
    name: 'App',
    data(){
      return{
      }
    },
    components:{
      Headers,
      play
    }
  }
</script>

<style scoped lang="less">
  #app{

  }

</style>
