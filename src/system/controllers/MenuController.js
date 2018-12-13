const MenuDao = require('../daos/MenuDao');
const BaseController = require('../../common/controllers/BaseController');

class MenuController extends BaseController {
  constructor(router) {
    super('menu', 'MenuId', router, MenuDao);
    this.registerBaseRoutes();
  }
}

module.exports = MenuController;
