// mac下 需要现在cmd里面运行   sudo mongod  启动服务

const mongoose = require('mongoose');
const db = "mongodb://localhost/vueshop";


mongoose.Promise =  global.Promise;

exports.connect = ()=>{
  //连接数据库
  mongoose.connect(db, (err) => {
    if(!err){
      // 创建 schema
      let schema = new mongoose.Schema({ num:Number, name: String, size: String });
      // 将schema 模型化
      let MyModel = mongoose.model('MyModel', schema);
      // 生成文档
      let doc1 = new MyModel({ size: 'small' });
      // 将文档保存为集合
      doc1.save(function (err,doc) {
        //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
        console.log(doc);
      })
    } else {
      console.log('链接失败');
    }
  });

  //断开数据库
  // setTimeout(() => {
  //   mongoose.disconnect(() => {
  //     console.log('断开链接');
  //   })
  // }, 2000);

  //增加数据库连接的事件监听
  mongoose.connection.on('disconnected',()=>{
    //进行重连
    mongoose.connect(db)
  });

  //数据库出现错误的时候
  mongoose.connection.on('error',err=>{
    console.log(err);
    mongoose.connect(db)
  });

  //链接打开的时候
  mongoose.connection.once('open',()=>{
    console.log('MongoDB Connected successfully!')
  })

};
