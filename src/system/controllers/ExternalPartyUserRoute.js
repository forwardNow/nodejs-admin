const ExternalPartyUserDao = require('../daos/ExternalPartyUsersDao');
const BaseController = require('../../common/controllers/BaseController');

class ExternalPartyUserController extends BaseController {
  constructor(router) {
    super('externalPartyUser', 'ExternalPartyUserId', router, ExternalPartyUserDao);
    this.registerBaseRoutes();
  }
}

module.exports = ExternalPartyUserController;
