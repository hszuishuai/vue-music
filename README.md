# webapp 仿qq音乐

##开发目的  
>通过学习开发一个 Vue 全家桶项目，让自己更熟练的使用 Vue 全家桶、模块化开发、ES6 等等知识，提高自己的技术能力

##技术栈##
###前端###
*vue-cli：Vue 脚手架工具，快速初始化项目代码
*Vue：用于构建用户界面的 MVVM 框架
*vue-router：为单页面应用提供的路由系统，使用了 Lazy Loading Routes 技术来实现异步加载优化性能
*vuex：Vue 集中状态管理，实现多组件的相互通信
*vue-lazyload：实现图片懒加载，节省用户流量，优化页面加载速度
*better-scroll：解决移动端各种滚动场景需求的插件，使移动端滑动体验更加流畅
*less：css 预编译处理器
*ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用
*moment:时间处理类库，能更好的初始化时间格式
*mint-ui:一个vue的ui库
###后台
*Node.js：利用 Express 搭建的本地测试服务器
*vue-axios：用来请求后端 API 音乐数据

##实现的功能
*播放器内核、推荐页面、热榜页面、歌单详情、排行榜详情、搜索页面、播放列表等等功能。
##推荐页面
*1.推荐歌单：通过api请求数据，渲染到页面
##排行榜页面
*通过api请求渲染，flex布局
###播放器
>实现功能：顺序播放、单曲循环、随机播放等
###搜索功能
*实现功能：搜索歌手、歌单、歌曲、热门搜索、数据节流、上拉刷新、保存搜索记录。
*通过关键字请求 API 获取搜索数据，显示歌手、歌单、歌曲。
*实现了下拉刷新，因为搜索可以设置请求数据的条数，所以可以用来实现下拉刷新的功能。
*通过 localstorage 存储搜索数据
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


