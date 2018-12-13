const express = require('express');

const InitController = require('./system/controllers/InitController');
const SessionController = require('./system/controllers/SessionController');
const MenuController = require('./system/controllers/MenuController');
const RoleController = require('./system/controllers/RoleController');
const UserController = require('./system/controllers/UserController');
const SubSystemController = require('./system/controllers/SubSystemController');
const DicController = require('./system/controllers/DicController');
const DicItemController = require('./system/controllers/DicItemController');

const router = express.Router(null);

function mountTo(app) {
  [
    InitController,
    SessionController,
    MenuController,
    RoleController,
    UserController,
    SubSystemController,
    DicController,
    DicItemController,
  ].forEach(Constructor => new Constructor(router));

  app.use(router);
}

exports.mountTo = mountTo;
