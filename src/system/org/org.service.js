const { Op } = require('sequelize');
const _ = require('lodash');
const BaseService = require('../../common/base/BaseService');
const OrgDao = require('./org.dao');

class OrgService extends BaseService {
  constructor() {
    super(OrgDao);
  }

  /**
   * @override
   */
  getPageResult(condition, pager) {
    const newCondition = _.merge({}, condition);

    if ('organName' in newCondition) {
      newCondition.organName = {
        [Op.like]: `%${newCondition.organName}%`,
      };
    }

    return super.getPageResult(newCondition, pager);
  }
}

module.exports = new OrgService();

// Dao.getCount({ organName: '湖北省公安局' }).then((res) => {
//   console.log(res);
// });

// OrgDao.getById(1).then((res) => {
//   console.log(res);
// });

// OrgDao.getPageResult({ id: 10 }).then((res) => {
//   console.log(res);
// });

// Dao.update({ id: 1, organId: '哇哈哈' }).then((res) => {
//   console.log(res);
// });

// Dao.insert({ organId: '哇哈哈4' }).then((res) => {
//   console.log(res);
// });
//
// Dao.deleteById(4).then((res) => {
//   console.log(res);
// });
