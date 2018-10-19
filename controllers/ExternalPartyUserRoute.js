const ExternalPartyUserDao = require('../daos/ExternalPartyUsersDao');
const BaseController = require('./BaseController');

class ExternalPartyUserController extends BaseController {
  constructor(router) {
    super('externalPartyUser', 'ExternalPartyUserId', router, ExternalPartyUserDao);
  }

  /**
   * @override
   */
  setRoute() {
    console.log(this.path);
  }
}

module.exports = ExternalPartyUserController;
