<template>
    <div id="progress">
      <div class="progress-bar" ref="progressbar" @click="progressClick" >
        <div class="progerss-prog" ref="progerssPro"></div>
        <div class="progress-contronl">
          <div class="progress-btn"
               ref="progressBtn"
               @touchstart.prevent="progressTouchStart"
               @touchmove.prevent="progressTouchMove"
               @touchend="progressTouchEnd"
          >
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  const btnHeight=16;
    export default {
      name: "progress-bar",
      props: {
          percent:{
            type:Number,
            default:0
          }
      },
      methods:{
        progressTouchStart(e){
          this.touch.intided=true
          this.touch.startX=e.touches[0].pageX
          this.touch.left=this.$refs.progerssPro.clientWidth
        },
        progressTouchMove(e){
          if(!this.touch.intided){
            return
          }
          const  delX=e.touches[0].pageX-this.touch.startX
          const  offWidth=Math.min(this.$refs.progressbar.clientWidth-btnHeight,Math.max(0,this.touch.left+delX))
          this._offsetWidth(offWidth)
        },
        progressTouchEnd(){
          this.touch.intided=false
          this._trigger()
        },
        progressClick(e){
          this._offsetWidth(e.offsetX)
          this._trigger()
        },
        //派发事件给父组件 将歌曲跳转到指定的进度
        _trigger(){
         let percent= this.$refs.progerssPro.clientWidth/(this.$refs.progressbar.clientWidth-btnHeight)
          this.$emit('precentChange',percent)
        },
        _offsetWidth(offWidth){
          this.$refs.progerssPro.style.width =`${offWidth}px`
          //小球偏移
          this.$refs.progressBtn.style['transform']=`translate3d(${offWidth}px,0,0)`
        }
      },
      created(){
        this.touch={}
      },
      watch:{
        percent(newPercent) {
          if (newPercent >= 0 && !this.touch.intided) {
           // console.log(newPercent)
            let offWidth = (this.$refs.progressbar.clientWidth-btnHeight)*newPercent
            this._offsetWidth(offWidth)
          }
        }
      }
    }
</script>

<style scoped lang="less">
#progress{
  height: 30px;
  .progress-bar{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0,0,0,0.3);
    .progerss-prog{
      position: absolute;
      height: 100%;
      background: white;
    }
    .progress-contronl{
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid white;
        border-radius: 50%;
        background: white;
      }
    }
  }
}
</style>
