import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/',name: 'ShoppingMall',component: ShoppingMall},
    {path: '/goods/:id',name: 'Goods',component: Goods},
    {path: '/categoryList',name: 'CategoryList',component: CategoryList},
    {path: '/register',name: 'register',component: Register},
    {path: '/login',name: 'login',component: Login}
  ]
})
