const BaseController = require('../../common/base/BaseController');
const service = require('./role.service');

const moduleName = 'role';

class RoleController extends BaseController {
  /**
   * @param router {express.router}
   */
  constructor(router) {
    super(service, moduleName, router);

    this.get();
    this.list();
    this.insert();
    this.update();
    this.delete();
  }
}

module.exports = RoleController;
