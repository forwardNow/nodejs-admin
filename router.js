const express = require('express');

const SessionController = require('./controllers/SessionController');
const MenuController = require('./controllers/MenuController');
const RoleController = require('./controllers/RoleController');

const router = express.Router(null);

function mountTo(app) {
  [
    SessionController,
    MenuController,
    RoleController,
  ].forEach(item => item(router));

  app.use(router);
}

exports.mountTo = mountTo;
