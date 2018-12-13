const DicDao = require('../daos/DicDao');
const BaseController = require('../../common/controllers/BaseController');

class DicController extends BaseController {
  constructor(router) {
    super('dic', 'DicId', router, DicDao);
    this.registerBaseRoutes();
  }
}

module.exports = DicController;
