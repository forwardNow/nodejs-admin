const express = require('express');

const router = express.Router();

const initRoute = require('./initRoute');
const sessionRoute = require('./SessionController');
const usersRoute = require('./UserRoute');
const menusRoute = require('./MenuController');
const rolesRoute = require('./RoleController');
const subSystemsRoute = require('./SubSystemRoute');
const dicRoute = require('./DicRoute');
const externalPartyUsersRoute = require('./ExternalPartyUserRoute');


initRoute(router);

sessionRoute(router);

usersRoute(router);

menusRoute(router);

rolesRoute(router);

subSystemsRoute(router);

dicRoute(router);

externalPartyUsersRoute(router);

module.exports = router;
