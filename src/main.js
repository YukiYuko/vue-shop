// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/reset.less'
import { Button, Row, Col, Swipe, SwipeItem } from 'vant'
import ecslide from './components/common/index'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem)
Vue.use(ecslide)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
