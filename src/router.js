const express = require('express');
const { PREFIX } = require('./common/configs/Var');

const OrgController = require('./system/org/org.controller');
const DeptController = require('./system/dept/dept.controller');

const router = express.Router(null);

function mountTo(app) {
  const controllers = [].concat(
    OrgController,
    DeptController,
  );

  controllers.forEach(Constructor => new Constructor(router));

  app.use(`${PREFIX}/system`, router);
}

exports.mountTo = mountTo;
