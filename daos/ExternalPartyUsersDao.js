const BaseDao = require('./BaseDao');
const ExternalPartyUsersModel = require('../models/ExternalPartyUsersModel');

class ExternalPartyUsersDao extends BaseDao {
  constructor() {
    super(ExternalPartyUsersModel);
  }
}

module.exports = new ExternalPartyUsersDao();
