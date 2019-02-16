import  Vue from 'vue'
import moment from 'moment'
Vue.filter('date',value=>{
  return moment(value).format('YYYY-MM-D' )
})

//歌曲时间格式化
Vue.filter('singTime',value=>{
  let min=pad(value/60 | 0);
  let Second=pad(value%60 |0)
  return `${min}:${Second}`
})

function pad(num) {
let len=num.toString().length
  if(len>=2){
    return num
  }else {
    return `0${num}`
  }
}
