const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./controller');
const app = new Koa();
const port = 3000;
// log request URL:
app.use(async (ctx, next) => {
  console.log(__dirname);
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(bodyParser());
// add router middleware:
app.use(routes);
app.listen(port, () => {
  console.log(`服务启动成功，端口号： ${port}`);
});
