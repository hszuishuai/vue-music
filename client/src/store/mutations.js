/*
* 调用mutat中的方法来操作state中的数据
* */
import {
  RECEIVE_RECOMMENDLIST,
  RECEIVE_TOPLIST,
  RECEIVE_TOPDETAIL,
  SET_PLAYLIST,
  SET_CURRENTINDEX,
  SET_FULLSCREEN,
  SET_MODE,
  SET_SEQUENCELISR,
  SET_PLAYLIST_SUGGERT,
  SET_SERACHHISTROY
} from "./mutation-type";

export default({

  //获取推荐列表的数据
  [RECEIVE_RECOMMENDLIST](state,data){
    state.Recommendlist.push(data.songList)
    state.swiperlist.push(data.slider)
  },
  //将异步获取的数据存取到vuex中
  [RECEIVE_TOPLIST](state,data){
    state.Toplist.push(data.data.topList)
  },
  [RECEIVE_TOPDETAIL](state,data){
    state.Topdetail.songlist=data.songlist
    state.Topdetail.topinfo=data.topinfo
  },
  [SET_PLAYLIST](state,datas){
    state.Playlist=datas.data
  },
  [SET_PLAYLIST_SUGGERT](state,datas){
    state.Playlist=datas
  },
  [SET_CURRENTINDEX](state,index){
    state.currentIndex=index
  },
  [SET_FULLSCREEN](state,flag){
    state.fullscreen=flag
  },
  [SET_MODE](state,modeNum){
    state.mode=modeNum
  },
  [SET_SEQUENCELISR](state,list){
    state.sequenceList=list
  },
  [SET_SERACHHISTROY](state,data){
    console.log(data)
    state.serachHistory.push(data)
  }
})
function getHistroy(arr,query) {
    // const index = arr.findIndex((item) => {
    //   return item === query
    // })
  // console.log(arr)
  //   if (index === 0) {
  //     return
  //   }
  //   if (index > 0) {
  //     arr.slice(index, 1)
  //   }
  //   arr.push(query)
}
  //   Receive_shop(state,data){
  //     state.shops=data
  //  },
  //   Receive_userinfo(state,data){
  //      //console.log(data)
  //   state.userinfo=data
  // },
  //  Reset_userinfo(state){
  //     state.userinfo={}
  // },
  // Reseive_cartgoods(state,data){
  //   let flag=false
  //     state.cartgoods.some((good, index, arr) => {
  //    // console.log(arr)
  //       if (good.name ===data.name) {
  //        good.count++
  //         flag=true
  //         return flag
  //       }
  //     })
  //   if(!flag){
  //     state.cartgoods.push(data)
  //   }
  // },
  // //商家信息
  // Reseive_shopinfo(state,data){
  //     state.shopinfo=data
  // }

