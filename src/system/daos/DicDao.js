const BaseDao = require('../../common/daos/BaseDao');
const DicBean = require('../beans/DicBean');

class DicDao extends BaseDao {
  constructor() {
    super('Dic', new DicBean());
  }
}

module.exports = new DicDao();
