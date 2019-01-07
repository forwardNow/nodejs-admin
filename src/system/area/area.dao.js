const BaseDao = require('../../common/base/BaseDao');
const bean = require('./area.bean');

class Dao extends BaseDao {
}

module.exports = new Dao('city_area', bean);
