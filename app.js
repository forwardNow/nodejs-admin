const express = require('express');
const path = require('path');
const expressArtTemplate = require('express-art-template');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const routes = require('./routes/index.js');

const app = express();

// 签名
const SECRET = 'salt';

// 静态服务
app.use('/public/', express.static(path.join(__dirname, './public/')));

// 渲染引擎
app.engine('html', expressArtTemplate);

// 视图目录
app.set('views', path.join(__dirname, './views/'));

// 配置解析请求体插件（注意：一定要在挂载路由之前）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 接口服务：以 '/api' 打头的 url 都需要认证
app.use(
  '/api',
  expressJwt({
    secret: SECRET,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      //console.log(req.headers.token);
      if (req.headers.token) {
        return req.headers.token;
      }

      if (req.query && req.query.token) {
        return req.query.token;
      }

      return null;
    },
  }).unless({
    // 除了这些地址，其他的URL都需要验证
    path: [
      '/api/session/login',
      '/api/init',
    ],
  }),
  (req, res, next) => {
    //console.log('req.user', req.user);

    // 当访问 /api/session/login 时，req.user === undefined
    if (!req.user) {
      return next();
    }

    if (!req.user.userId) {
      return res.status(200).json({
        errorCode: 401,
        reason: '未登录',
      });
    }

    // TODO: 判断是否有权限

    return next();
  },
);

// 将路由挂载到 app
app.use(routes);

// 404
app.use((req, res) => {
  res.status(200).json({
    errorCode: 404,
    reason: 'not found',
  });
});

// 500：全局错误处理
app.use((err, req, res, next) => {
  console.log(err);

  if (err.name === 'TokenExpiredError' || err.name === 'UnauthorizedError') {
    res.status(200).json({
      errorCode: 401,
      reason: 'jwt expired',
    });

    return next();
  }

  res.status(200).json({
    errorCode: 500,
    reason: 'server error',
  });

  return next();
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
