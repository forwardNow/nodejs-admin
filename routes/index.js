const express = require('express');

const router = express.Router();

const sysUserRoute = require('./sysUserRoute');
const sessionRoute = require('./sessionRoute');
const initRoute = require('./initRoute');

// 首页
router.get('/', (req, res) => {
  const { session: { user } } = req;
  res.render('index.html', { user });
});

initRoute(router);

// session 路由
sessionRoute(router);

// sysUser 路由
sysUserRoute(router);

module.exports = router;
