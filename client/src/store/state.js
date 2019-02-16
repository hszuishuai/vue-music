import {playMode} from "../common/js/config";

export default ({
   swiperlist:[],    //轮播数据
   Recommendlist:[],//推荐列表数据
   Toplist:[]  , //排行榜数据
   Topdetail:{songlist:[],topinfo:[]},  //排行榜详情数据
   Playlist:[] , //播放歌曲的数据
   fullscreen:false , //是否满屏播放
   sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    playing:false,
    serachHistory:[]

})
