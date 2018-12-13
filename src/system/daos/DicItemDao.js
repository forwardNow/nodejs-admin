const BaseDao = require('../../common/daos/BaseDao');
const DicItemBean = require('../beans/DicItemBean');

class DicItemDao extends BaseDao {
  constructor() {
    super('DicItem', new DicItemBean());
  }
}

module.exports = new DicItemDao();
