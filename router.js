const express = require('express');

const SessionController = require('./controllers/SessionController');
const MenuController = require('./controllers/MenuController');
const RoleController = require('./controllers/RoleController');
const UserController = require('./controllers/UserController');
const SubSystemController = require('./controllers/SubSystemController');

const router = express.Router(null);

function mountTo(app) {
  [
    SessionController,
    MenuController,
    RoleController,
    UserController,
    SubSystemController,
  ].forEach(item => item(router));

  // console.log(router);

  app.use(router);
}

exports.mountTo = mountTo;
