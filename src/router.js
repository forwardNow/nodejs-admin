const express = require('express');
const { PREFIX } = require('./common/configs/Var');

const OrgController = require('./system/org/org.controller');
const DeptController = require('./system/dept/dept.controller');
const UserController = require('./system/user/user.controller');
const AreaController = require('./system/area/area.controller');
const RoleController = require('./system/role/role.controller');
const MenuController = require('./system/menu/menu.controller');

const router = express.Router(null);

function mountTo(app) {
  const controllers = [].concat(
    OrgController,
    DeptController,
    UserController,
    AreaController,
    RoleController,
    MenuController,
  );

  controllers.forEach(Constructor => new Constructor(router));

  app.use(`${PREFIX}/system`, router);
}

exports.mountTo = mountTo;
