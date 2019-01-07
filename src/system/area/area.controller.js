const BaseController = require('../../common/base/BaseController');
const service = require('./area.service');

const moduleName = 'area';

class AreaController extends BaseController {
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

module.exports = AreaController;
