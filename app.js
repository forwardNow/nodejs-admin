const express = require('express');
const path = require('path');
const expressArtTemplate = require('express-art-template');
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = require('./routes/index.js');

const app = express();

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

// session 服务
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// 接口服务：以 '/api' 打头的 url 都需要认证
app.use('/api', (req, res, next) => {
  switch (req.url) {
    case '/init':
    case '/session/login': {
      next();
      break;
    }
    default: {
      if (req.session.user) {
        next();
        break;
      }
      res.status(200).json({
        errorCode: 401,
        reason: '未登录',
      });
    }
  }
});

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
  res.status(200).json({
    errorCode: 500,
    reason: 'server error',
  });
  next();
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
