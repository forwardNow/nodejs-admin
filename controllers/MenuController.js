const MenuDao = require('../daos/MenuDao');
const BaseController = require('./BaseController');

class MenuController extends BaseController {
  constructor(router) {
    super('menu', 'MenuId', router, MenuDao);
  }

  /**
   * @override
   */
  setRoute() {
    console.log(this.path);
  }
}

module.exports = MenuController;
