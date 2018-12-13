const BaseDao = require('../../../common/daos/BaseDao');
const PaperBean = require('../beans/PaperBean');

class PaperDao extends BaseDao {
  constructor() {
    super('Paper', new PaperBean());
  }
}

module.exports = new PaperDao();
