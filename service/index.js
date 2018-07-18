const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const port = 3000;
const mongoose = require('mongoose');
let user = require('./appApi/User');
let router = new Router();
router.use('/user',user.routes());
// app.use((ctx) => {
//   ctx.body = '<h1>Hello koa2</h1>';
// });

app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());
app.use(cors());
// //引入connect
// const {connect , initSchemas} = require('./database/init.js')
//
// //立即执行函数
// ;(async () =>{
//   await connect();
//   initSchemas();
//   const User = mongoose.model('User');
//   let oneUser = new User({userName:'Yukiko',password:'123456'});
//   oneUser.save().then(()=>{
//     console.log('插入成功')
//   });
//
//   let users = await User.findOne().exec();
//   console.log('------------------');
//   console.log(users);
//   console.log('------------------');
//
// })();



app.listen(port, () => {
  console.log(`服务启动成功，端口号： ${port}`);
});
