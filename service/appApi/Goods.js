const Router = require ('koa-router');
const path = require('path');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');


//获取所有数据
router.get('/insertAllGoodsInfo',async(ctx)=>{

  fs.readFile(path.resolve(__dirname, '../data_json/newGoods.json'),'utf8',(err,data)=>{
    let _data=JSON.parse(data);
    let saveCount=0;
    const Goods = mongoose.model('Goods');
    _data.map((value,index)=>{
      console.log(value);
      let newGoods = new Goods(value);
      newGoods.save().then(()=>{
        saveCount++;
        console.log('成功'+saveCount)
      }).catch(error=>{
        console.log('失败：'+error)
      })
    })

  });
  ctx.body="开始导入数据"

});

//获取每个大类的数据
router.get('/insertAllCategory',async(ctx)=>{
  fs.readFile(path.resolve(__dirname, '../data_json/category.json'),'utf8',(err,data)=>{
    data=JSON.parse(data)
    let saveCount=0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value,index)=>{
      console.log(value)
      let newCategory = new Category(value)
      newCategory.save().then(()=>{
        saveCount++
        console.log('成功'+saveCount)
      }).catch(error=>{
        console.log('失败：'+error)
      })
    })


  })
  ctx.body="开始导入数据"

})

// 子类的数据

router.get('/insertAllCategorySub',async(ctx)=>{
  fs.readFile(path.resolve(__dirname, '../data_json/category_sub.json'),'utf8',(err,data)=>{
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value,index)=>{
      console.log(value)
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(()=>{
        saveCount++
        console.log('成功插入'+saveCount)
      }).catch(error=>{
        console.log('插入失败:'+error)
      })
    })
  })
  ctx.body="开始导入数据"
})

//***获取商品详细信息的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ID:goodsId}).exec()
    .then(async(result)=>{
      ctx.body={code:200,message:'成功', data: result}
    })
    .catch(error=>{
      console.log(error)
      ctx.body={code:500,message:'失败', data: error}
    })

})


module.exports=router;
