const BaseDao = require('./BaseDao');
const DicModel = require('../models/DicModel');

class DicDao extends BaseDao {
  constructor() {
    super(DicModel);
  }
}

module.exports = new DicDao();
