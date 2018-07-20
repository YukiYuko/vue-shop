import api from './index'
const base_url = 'https://www.easy-mock.com/mock/5afbeb92f4cccf131049507b/mock';
const localurl = "http://localhost:3000/";
const user_prefix = 'user';
const goods_prefix = 'goods';
const url = {
  getShoppingMallInfo:base_url+'index',
  getGoodsInfo:base_url+'getGoodsInfo',
  registerUser:localurl+`${user_prefix}/register`,   //用户注册接口
  login:localurl+`${user_prefix}/login`,   //用户登录接口
  goods:localurl+`${goods_prefix}/getDetailGoodsInfo`,   //商品详情
  getCategoryList:localurl+`${goods_prefix}/getCategoryList`,  //得到大类信息
  getCategorySubList:localurl+`${goods_prefix}/getCategorySubList`,  //得到小类信息
};

/*
* 获取首页数据
* */
export const getHome = () => api.get(`${base_url}/home`);

/*
* 注册
* @params userName 用户名
* @params password 密码
* */
export const register = (param) => api.post(url.registerUser, param);

/*
* 登录
* @params userName 用户名
* @params password 密码
* */
export const login = (param) => api.post(url.login, param);

/*
* 获取商品详情
* @params goodsId
* */
export const goods = (param) => api.post(url.goods, param);

/*
* 获取商品大类
* */
export const getCategoryList = () => api.get(url.getCategoryList);

/*
* 获取商品小类
* @params categoryId
* */
export const getCategorySubList = (param) => api.post(url.getCategorySubList, param);
