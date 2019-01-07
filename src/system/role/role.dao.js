const BaseDao = require('../../common/base/BaseDao');
const bean = require('./role.bean');

class Dao extends BaseDao {
}

module.exports = new Dao('user_role', bean);
