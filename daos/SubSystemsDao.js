const BaseDao = require('./BaseDao');
const SubSystemBean = require('../beans/SubSystemBean');

class SubSystemsDao extends BaseDao {
  constructor() {
    super('SubSystems', new SubSystemBean());
  }
}

module.exports = new SubSystemsDao();
