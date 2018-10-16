const BaseDao = require('./BaseDao');
const SubSystemsModel = require('../models/SubSystemsModel');

class SubSystemsDao extends BaseDao {
  constructor() {
    super(SubSystemsModel);
  }
}

module.exports = new SubSystemsDao();
