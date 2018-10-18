const MenusDao = require('../daos/MenuDao');
const BaseRoute = require('./BaseRoute');

module.exports = (router) => {
  BaseRoute.setBaseRoute('menu', 'MenuId', router, MenusDao);
};
