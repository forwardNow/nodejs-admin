const express = require('express');

const systemControllers = require('./system/controllers/index');
const examPaperControllers = require('./exam/paper/controllers/index');

const router = express.Router(null);

function mountTo(app) {
  const controllers = [].concat(systemControllers, examPaperControllers);

  controllers.forEach(Constructor => new Constructor(router));

  app.use(router);
}

exports.mountTo = mountTo;
