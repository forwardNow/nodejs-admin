const express = require('express');

const OrgController = require('./system/org/org.controller');

const router = express.Router(null);

function mountTo(app) {
  const controllers = [].concat(OrgController);

  controllers.forEach(Constructor => new Constructor(router));

  app.use('/system', router);
}

exports.mountTo = mountTo;
