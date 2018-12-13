const SubSystemDao = require('../daos/SubSystemDao');
const BaseController = require('../../common/controllers/BaseController');

class SubSystemController extends BaseController {
  constructor(router) {
    super('subsys', 'SystemId', router, SubSystemDao);
    this.registerBaseRoutes();
  }
}

module.exports = SubSystemController;