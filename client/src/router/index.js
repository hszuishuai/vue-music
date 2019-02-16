import Vue from 'vue'
import Router from 'vue-router'
import Home from '../component/Home/home.vue'
import Top from '../component/Top/top.vue'
import Topdetail from '../component/Topdetail/topdetail.vue'
import Recommend from '../component/Recommend/recommend.vue'
import Serach from '../component/Serach/serach.vue'
import Play from '../component/Play/play.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
        path:'/home/recommend',
        meta:{show:true},
        component:Recommend
        },
        {
          path:'/home/top',
          meta:{show:true},
          component:Top
        },
        {
          path:'/home/serach',
          meta:{show:true},
          component:Serach
        },
        {
          path:'/home',
          meta:{show:true},
          redirect:'/home/recommend'
        }
      ]
    },
    {
      path: '/home/top/:tid',
      name: 'topdetail',
      component: Topdetail
    },
    {
      path: '/home/play',
      name: 'play',
      component: Play
    },
  ]
})
