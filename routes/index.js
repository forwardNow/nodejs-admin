const express = require('express');

const router = express.Router();

const sessionRoute = require('./SessionRoute');
const usersRoute = require('./UsersRoute');
const initRoute = require('./initRoute');

// 首页
router.get('/', (req, res) => {
  const { session: { user } } = req;
  res.render('index.html', { user });
});

initRoute(router);

sessionRoute(router);

usersRoute(router);

module.exports = router;
