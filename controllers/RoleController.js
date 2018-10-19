const RoleDao = require('../daos/RoleDao');
const BaseController = require('./BaseController');

class RoleController extends BaseController {
  constructor(router) {
    super('role', 'RoleId', router, RoleDao);
  }

  /**
   * @override
   */
  setRoute() {
    console.log(this.path);
  }
}

module.exports = RoleController;
