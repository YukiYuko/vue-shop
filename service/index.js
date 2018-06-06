const Koa = require('koa');
const app = new Koa();
const port = 3000;
const mongoose = require('mongoose');
app.use((ctx) => {
  ctx.body = '<h1>Hello koa2</h1>';
});

//引入connect
const {connect , initSchemas} = require('./database/init.js')

//立即执行函数
;(async () =>{
  await connect();
  initSchemas();
  const User = mongoose.model('User');
  let oneUser = new User({userName:'Yukiko',password:'123456'});
  oneUser.save().then(()=>{
    console.log('插入成功')
  });

  let users = await User.findOne().exec();
  console.log('------------------');
  console.log(users);
  console.log('------------------');

})();



app.listen(port, () => {
  console.log(`服务启动成功，端口号： ${port}`);
});
