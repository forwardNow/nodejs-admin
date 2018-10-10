const BaseDao = require('./BaseDao');
const UsersModel = require('../models/UsersModel');

class UsersDao extends BaseDao {
  constructor() {
    super(UsersModel);
  }
}

module.exports = new UsersDao();
