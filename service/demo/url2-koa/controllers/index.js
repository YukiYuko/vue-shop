// const fn_index = async (ctx, next) => {
//
// };

const fn_index = async (ctx, next) => {
  let name = ctx.cookies.get('username') || '';
  ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value=${name}></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};
const fn_signin = async (ctx, next) => {
  let name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'Yuki' && password === '123456') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
  }
};


module.exports = [
  {
    method: 'GET',
    path: '/',
    func: fn_index
  },
  {
    method: 'POST',
    path: '/signin',
    func: fn_signin
  }
];
