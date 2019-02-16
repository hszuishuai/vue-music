// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
//加载mock 数据
//  import './mock/mockServer.js'


//vue-lazyload 懒加载
import loading from './common/img/loading.gif'
import Vuelazyload from'vue-lazyload'
Vue.use(Vuelazyload,{
  loading
})

import './filter/index.js' //引入过滤器

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


//导入axios
//Vue.prototype.axios=axios  //全局配置axios

// Vue.prototype.axios.defaults.baseURL = 'http://localhost:3000';    //默认请求地址
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials=true
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
