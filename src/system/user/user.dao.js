const BaseDao = require('../../common/base/BaseDao');
const bean = require('./user.bean');

class Dao extends BaseDao {
}

module.exports = new Dao('user', bean);
