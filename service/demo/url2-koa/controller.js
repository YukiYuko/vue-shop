// __dirname追加了自身的目录路径，一般这样做的好处是，可以避免文件的混乱调用
const fs = require('fs');
const router = require('koa-router')();
const files = fs.readdirSync(__dirname + '/controllers');
const js_files = files.filter(file => {
  return file.endsWith('js')
});

// 遍历controllers，自动生成route
for(let f of js_files) {
  const mapping = require(__dirname + '/controllers/' + f);
  mapping.forEach(item => {
    let method = (item.method === 'DELETE') ? 'del' : item.method.toLowerCase()
    router[method](item.path, item.func)
  })
}

console.log(router.routes());

module.exports = router.routes();
