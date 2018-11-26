const Koa = require('koa');
const app = new Koa();
const port = 3000;

// logger

app.use(async (ctx, next) => {
  console.log('第一、1');
  await next();
  console.log('第一、2');
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('第二、1');
  await next();
  console.log('第二、2')
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx, next) => {
  console.log('第三、1');
  await next();
  console.log('第三、2')
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(port, () => {
  console.log(`服务启动成功，端口号： ${port}`);
});
