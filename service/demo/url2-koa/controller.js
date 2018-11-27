// __dirname追加了自身的目录路径，一般这样做的好处是，可以避免文件的混乱调用
const fs = require('fs');
const glob = require('glob');
const router = require('koa-router')();

// 这下面两句和  用glob 的效果是一样的
// const files = fs.readdirSync(__dirname + '/controllers');
// const js_files = files.filter(file => {
//   return file.endsWith('js')
// });
const js_files = glob.sync('controllers/*.js');
console.log('js_files',js_files);



// 遍历controllers，自动生成route
for(let f of js_files) {
  // const mapping = require(__dirname + '/controllers/' + f);
  const mapping = require(__dirname + '/' + f);
  mapping.forEach(item => {
    let method = (item.method === 'DELETE') ? 'del' : item.method.toLowerCase()
    router[method](item.path, item.func)
  })
}

console.log(router.routes());

module.exports = router.routes();
