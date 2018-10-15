const BaseDao = require('./BaseDao');
const RolesModel = require('../models/RolesModel');

class RolesDao extends BaseDao {
  constructor() {
    super(RolesModel);
  }
}

module.exports = new RolesDao();
