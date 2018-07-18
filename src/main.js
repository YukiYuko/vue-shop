// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/reset.less'
import {
  Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Toast, Tabbar, TabbarItem,
  NavBar, Field, Dialog
} from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */);
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).
use(Lazyload).use(List).use(Toast).use(Tabbar).use(TabbarItem).
use(NavBar).use(Field).use(Dialog);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
