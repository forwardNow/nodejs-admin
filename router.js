const express = require('express');

const initRoute = require('./controllers/initRoute');
const SessionController = require('./controllers/SessionController');
const MenuController = require('./controllers/MenuController');
const RoleController = require('./controllers/RoleController');
const UserController = require('./controllers/UserController');
const SubSystemController = require('./controllers/SubSystemController');
const DicController = require('./controllers/DicController');
const DicItemController = require('./controllers/DicItemController');

const router = express.Router(null);

function mountTo(app) {
  [
    SessionController,
    MenuController,
    RoleController,
    UserController,
    SubSystemController,
    DicController,
    DicItemController,
  ].forEach(Constructor => new Constructor(router));

  initRoute(router);

  app.use(router);
}

exports.mountTo = mountTo;
