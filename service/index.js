const Koa = require('koa');
const app = new Koa();
const port = 3000;
app.use((ctx) => {
  ctx.body = '<h1>Hello koa2</h1>';
});

//引入connect
const {connect} = require('./database/init.js')

//立即执行函数
;(async () =>{
  await connect()
})();



app.listen(port, () => {
  console.log(`服务启动成功，端口号： ${port}`);
});
