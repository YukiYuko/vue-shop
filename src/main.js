// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import {
  Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Toast, Tabbar, TabbarItem,
  NavBar, Field, Dialog, Tab, Tabs, Switch, PullRefresh
} from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

const options={
  duration: '0.3', //转场动画时长，默认为0.3，单位秒
  firstEntryDisable: true, //值为true时禁用首次进入应用时的渐现动画，默认为false
  firstEntryDuration: '.6', //首次进入应用时的渐现动画时长，默认为.6
  forwardAnim: 'fadeInRight', //前进动画，默认为fadeInRight
  backAnim: 'fadeInLeft', //后退动画，默认为fedeInLeft
  sameDepthDisable: false, //url深度相同时禁用动画，默认为false
  tabs: [{
    name:'home'
  },{
    name:'my'
  }], //默认为[]，'name'对应路由的name,以实现类似app中点击tab页面水平转场效果，如tabs[1]到tabs[0]    ，会使用backAnim动画，tabs[1]到tabs[2]，会使用forwardAnim动画
  tabsDisable: false, //值为true时，tabs间的转场没有动画，默认为false
  shadow:true, //值为false，转场时没有阴影的层次效果
  disable: false, //禁用转场动画，默认为false，嵌套路由默认为true
  nuxt: false //若使用后端渲染框架Nuxt，需要将此设为true，默认为false
};
// Vue.use(vueg, router, options);

Vue.use(VueAwesomeSwiper, /* { default global options } */);
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).
use(Lazyload).use(List).use(Toast).use(Tabbar).use(TabbarItem).
use(NavBar).use(Field).use(Dialog).use(Tab).use(Tabs).use(Switch).
use(PullRefresh);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
