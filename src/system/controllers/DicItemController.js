const DicItemDao = require('../daos/DicItemDao');
const BaseController = require('../../common/controllers/BaseController');

class DicItemController extends BaseController {
  constructor(router) {
    super('dicItem', 'ItemId', router, DicItemDao);
    this.registerBaseRoutes();
  }
}

module.exports = DicItemController;
