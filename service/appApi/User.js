const Router = require('koa-router');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let router = new Router();

//创建我们的用户Schema
const userSchema = new Schema({
  username:String,
  password:String
});
router.get('/', async(ctx) => {
  ctx.body = '用户操作首页';
});
router.post('/register',async(ctx)=>{

  // 取得model
  const User = mongoose.model('User', userSchema);
  //把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body);
  //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(()=>{
    //成功返回code=200，并返回成功信息
    ctx.body={
      code:200,
      message:'注册成功'
    }
  }).catch(error=>{
    //失败返回code=500，并返回错误信息
    ctx.body={
      code:500,
      message:error
    }
  })
});

module.exports = router;
