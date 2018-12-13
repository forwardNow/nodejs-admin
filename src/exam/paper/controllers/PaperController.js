const PaperDao = require('../daos/PaperDao');
const BaseController = require('../../../common/controllers/BaseController');

class PaperController extends BaseController {
  constructor(router) {
    super('paper', 'id', router, PaperDao);
    this.registerBaseRoutes();
  }
}

module.exports = PaperController;
