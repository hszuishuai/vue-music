/*
* 多个mutations的操作
* 将异步操作放于actions中
* */
import  vue from 'vue'
import {
  Recommendlist,
  Toprlist,
  Topdetail
} from "../api";
import {
  RECEIVE_RECOMMENDLIST,
  RECEIVE_TOPLIST,
  RECEIVE_TOPDETAIL,
  SET_PLAYLIST,
  SET_CURRENTINDEX,
  SET_FULLSCREEN,
  SET_PLAYLIST_SUGGERT,
  SET_SERACHHISTROY
} from "./mutation-type";

export default ({
  //异步获取推荐数据
  async getRecommend(context){
    const result=await  Recommendlist()
    context.commit(RECEIVE_RECOMMENDLIST,result.data)
  },
  //异步获取排行榜的数据
  async getToplist(context){
    const  result=await  Toprlist()
    context.commit(RECEIVE_TOPLIST,result.data)
  },
  //异步获取排行榜详情的数据
  async getTopdetail(context,data){
    const  result=await  Topdetail(data)
    context.commit(RECEIVE_TOPDETAIL,result.data)
  },
  //接受播放的单曲数据
  getPlaysong(context,data){
    context.commit(SET_PLAYLIST,data.list);
    context.commit(SET_CURRENTINDEX,data.index)
    context.commit(SET_FULLSCREEN,true)
    if(data.type==='suggest'){
      context.commit(SET_PLAYLIST_SUGGERT,data.list);
    }
  },
  //保存搜索历史
  saveSerachHiotroy(context,data){
    context.commit(SET_SERACHHISTROY,data)
    // console.log(_getHistroy(context.state.serachHistory,data))
  }
})

//   //异步得到商户信息
//    async getshop(context){
//      const result= await  reqShops()
//      context.commit('Receive_shop',result.data)
// },
//   //用户信息
//     getuserinfo(context){
//      const result=reqUserInfo().then(res=>{
//        context.commit('Receive_userinfo',res.data)
//      })
//     },
//   //用户退出登录
//   async loginout(context){
//     context.commit('Reset_userinfo')
//   },
//   //购物车中的商品信息
//   getcartnum(context,e){
//      if(!e.count){
//        //给数据绑定对象添加属性
//        vue.set(e,'count',1)
//      }
//      //console.log(e)
//      context.commit('Reseive_cartgoods',e)
//   },
//   //更改购物车中的数量
//   delnum(context,e){
//      if(e.count>1){
//        e.count--
//      }else {
//        context.state.cartgoods.splice(context.state.cartgoods.indexOf(e),1)
//      }
//   },
//   //获取用户评论
//   shopinfo(context,data){
//     context.commit('Reseive_shopinfo',data)
//   }

