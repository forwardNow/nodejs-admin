const BaseController = require('../../common/base/BaseController');
const service = require('./dept.service');

const moduleName = 'dept';

class DeptController extends BaseController {
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

module.exports = DeptController;
