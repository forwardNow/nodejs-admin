const { Op } = require('sequelize');
const _ = require('lodash');
const BaseService = require('../../common/base/BaseService');
const DeptDao = require('./dept.dao');

class DeptService extends BaseService {
  constructor() {
    super(DeptDao);
  }

  /**
   * @override
   */
  getPageResult(condition, pager) {
    const newCondition = _.merge({}, condition);

    Reflect.ownKeys(newCondition).forEach((key) => {
      if (newCondition[key] === '') {
        delete newCondition[key];
      }
    });

    if ('deptName' in newCondition) {
      newCondition.deptName = {
        [Op.like]: `%${newCondition.deptName}%`,
      };
    }

    return super.getPageResult(newCondition, pager);
  }
}

module.exports = new DeptService();
