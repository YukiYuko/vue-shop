const fn_hello = async (ctx, next) => {
  let name = ctx.params.name;
  ctx.cookies.set('username', name, {
    // domain:'127.0.0.1', // 写cookie所在的域名
    path:'/',       // 写cookie所在的路径
    maxAge:1000*60*60*24,   // cookie有效时长
    expires:new Date('2018-12-31'), // cookie失效时间
    httpOnly:false,  // 是否只用于http请求中获取
    overwrite:false  // 是否允许重写
  });
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = [
  {
    method: 'GET',
    path: '/hallo/:name',
    func: fn_hello
  }
];
