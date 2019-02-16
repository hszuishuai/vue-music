<template>
    <div ref="wrapper" class="scroll">
        <slot></slot>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "scroll",
      props:{
          probeType:{
            type:Number,
            default:1
          },
          click:{
            type: Boolean,
            default: true
          },
           data:{
            type:Array,
            default:null
        },
        listenScroll: {
          type: Boolean,
          default: false
        },
        //上拉刷新
        pullup:{
            type:Boolean,
            default:false
        }
      },
      mounted(){
        setTimeout(()=>{
          this._initScroll()
        },20)
      },
      methods:{
          _initScroll(){
            const {probeType,click} =this
            if(!this.scroll){
              this.scroll=new BScroll('.scroll',{probeType,click})
            }else {
              this.scroll.refresh()
            }
            if (this.listenScroll) {
              let me = this
              this.scroll.on('scroll', (pos) => {
                me.$emit('scroll', pos)
              })
            }
            if(!this.pullup){
              this.scroll.on('scrollEnd',()=>{
                if(this.scroll.y<=(this.scroll.maxScrollY+50)){
                  this.$emit('scrollToEnd')
                }
              })
            }
          },
        enable(){
            this.scroll && this.scroll.enable()
        },
        disable(){
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        }
      },
      watch:{
           data(){
             setTimeout(()=>{
               this.refresh()
             },20)
           }
      }
    }
</script>

<style scoped lang="less">
.scroll{
}
</style>
