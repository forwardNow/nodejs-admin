const BaseDao = require('../../common/daos/BaseDao');
const UserBean = require('../beans/UserBean');

class UserDao extends BaseDao {
  constructor() {
    super('Users', new UserBean());
  }
}

module.exports = new UserDao();
