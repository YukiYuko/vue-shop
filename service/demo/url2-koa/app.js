const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./controller');
const app = new Koa();
const port = 3000;
const mongoose = require('mongoose');
// log request URL:
app.use(async (ctx, next) => {
  console.log(__dirname);
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// mongoose.connect('mongodb://localhost/shop', (err) => {
//   if(err){
//     console.log('连接失败');
//   }else{
//     console.log('连接成功');
//     let schema = new mongoose.Schema({ num:Number, name: String, size: String });
//     // 为文档自定义方法
//     schema.methods.findSimilarSizes = function(cb){
//       return this.model('MyModel').find({size:this.size},cb);
//     };
//     let MyModel = mongoose.model('MyModel', schema);
//     let doc1 = new MyModel({ name:'doc1', size: 'small' });
//     let doc2 = new MyModel({ name:'doc2', size: 'small' });
//     let doc3 = new MyModel({ name:'doc3', size: 'big' });
//     doc1.save();
//     doc2.save();
//     doc3.save();
//     setTimeout(function(){
//       doc3.findSimilarSizes(function(err,docs){
//         docs.forEach(function(item,index,arr){
//           //doc1
//           //doc2
//           console.log('item.name',item)
//         })
//       })
//     },0)
//   }
// });
// setTimeout(() => {
//   mongoose.disconnect(function(){
//     console.log("断开连接");
//   })
// }, 2000);

app.use(bodyParser());
// add router middleware:
app.use(routes);
app.listen(port, () => {
  console.log(`服务启动成功，端口号： ${port}`);
});
