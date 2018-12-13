const BaseDao = require('../../common/daos/BaseDao');
const ExternalPartyUserBean = require('../beans/ExternalPartyUserBean');

class ExternalPartyUsersDao extends BaseDao {
  constructor() {
    super('ExternalPartyUsers', new ExternalPartyUserBean());
  }
}

module.exports = new ExternalPartyUsersDao();
