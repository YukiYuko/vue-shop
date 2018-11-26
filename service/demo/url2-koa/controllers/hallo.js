const fn_hello = async (ctx, next) => {
  let name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = [
  {
    method: 'GET',
    path: '/hallo/:name',
    func: fn_hello
  }
];
