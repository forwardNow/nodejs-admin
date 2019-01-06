const BaseController = require('../../common/base/BaseController');
const service = require('./org.service');

const moduleName = 'org';

class OrgController extends BaseController {
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

module.exports = OrgController;
