const BaseDao = require('./BaseDao');
const ExternalPartyUsersModel = require('../models/ExternalPartyUsersModel');

class ExternalPartyUsersDao extends BaseDao {
  constructor() {
    super(ExternalPartyUsersModel);
    this.model = ExternalPartyUsersModel;
  }
}

module.exports = new ExternalPartyUsersDao();
