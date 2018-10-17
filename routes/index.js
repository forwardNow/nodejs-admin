const express = require('express');

const router = express.Router();

const initRoute = require('./initRoute');
const sessionRoute = require('./SessionRoute');
const usersRoute = require('./UsersRoute');
const menusRoute = require('./MenusRoute');
const rolesRoute = require('./RolesRoute');
const subSystemsRoute = require('./SubSystemsRoute');
const dicRoute = require('./DicRoute');
const externalPartyUsersRoute = require('./ExternalPartyUsersRoute');

// 首页
router.get('/', (req, res) => {
  const { session: { user } } = req;
  res.render('index.html', { user });
});

initRoute(router);

sessionRoute(router);

usersRoute(router);

menusRoute(router);

rolesRoute(router);

subSystemsRoute(router);

dicRoute(router);

externalPartyUsersRoute(router);

module.exports = router;
