import api from './index'
const base_url = 'https://www.easy-mock.com/mock/5afbeb92f4cccf131049507b/mock';
const localurl = "http://localhost:3000/";
const url = {
  getShoppingMallInfo:base_url+'index',
  getGoodsInfo:base_url+'getGoodsInfo',
  registerUser:localurl+'user/register',   //用户注册接口
};

/*
* 获取首页数据
* */
export const getHome = () => api.get(`${base_url}/home`);

/*
* 注册
* @params username 用户名
* @params password 密码
* */
export const register = (param) => api.post(url.registerUser, param);
