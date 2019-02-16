var express = require('express');
var router = express.Router();
const Model=require('../db/index.js')
const orderModel=Model.getModel('Order')
const  userModel=Model.getModel('User')
const RecommendData=require('../mock/recommond.json')
const  axios= require('axios')
const Singerlist=require('../mock/singerlist.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/order',(req,res)=>{
  orderModel.find({},(err,data)=>{
   res.send({data})
  })
})
router.get('/user',(req,res)=>{
    userModel.find({},(err,data)=>{
        res.send({data})
    })
})

//
router.get('/list',(req,res)=>{
    const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    axios.get(url,{
        header:{
            referrer:'https://c.y.qq.com',
            host:'c.y.qq.com'
        },
        param:req.query
    }).then(responds=>{
        res.send({data:responds.data.data})
    })
})
//歌手数据
router.get('/singerlist',(req,res)=>{
        res.send({code:0,data:Singerlist})
})

//排行榜数据
router.get('/toplist',(req,res)=>{
    const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1547723270363'
    axios.get(url,{
        header:{
            referrer:'https://c.y.qq.com',
            host:'c.y.qq.com'
        },
        param:req.query
    }).then(responds=>{
        //console.log(typeof(responds.data))
        // const data=responds.data.substr(responds.data.indexOf('('))
       // console.log(data)
        res.send({data:responds.data})
    })
})

//排行榜详情数据
router.get('/topinfo',(req,res)=>{
    const tid=req.query.id;
    const url=`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=${tid}&_=1547908918073`
    axios.get(url,{
        header:{
            referrer:'https://c.y.qq.com',
            host:'c.y.qq.com'
        },
        param:req.query
    }).then(responds=>{
        //console.log(typeof(responds.data))
        // const data=responds.data.substr(responds.data.indexOf('('))
        // console.log(data)
        res.send({data:responds.data})
    })
})
//歌曲搜索
router.get('/serach',(req,res)=>{
    const sname= encodeURIComponent(req.query.sname);
    const page=req.query.page
    const url=`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=${page}&n=20&w=${sname}`
        axios.get(url, {
            headers: {
                referrer: 'https://c.y.qq.com',
                host: 'c.y.qq.com',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
            param: "jsonpCallback"
        }).then(responds=>{
        res.send({data:responds.data})
    })
})

// router.get('/addorder',(req,res)=>{
//  const order=new orderModel({
//       orderid: '222233446',
//       paytype: 1
//   })
//     order.save(()=>{
//         res.send({msg:'success'})
//     })
// })
// router.get('/adduser',(req,res)=>{
//     const user=new userModel({
//         name:'李wu',
//     })
//     user.save(()=>{
//         res.send({msg:'success'})
//     })
// })
// //连表查询
// router.get('/ou',(req,res)=>{
//   orderModel.find({orderid:'2222222446'}).
//   populate('User')
//       .exec((err,data)=>{
//     res.send({data})
//   })
// })
module.exports = router;
