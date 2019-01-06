const BaseDao = require('../../common/base/BaseDao');
const bean = require('./dept.bean');

class Dao extends BaseDao {
}

module.exports = new Dao('department', bean);
