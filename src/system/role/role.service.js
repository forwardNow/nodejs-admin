const { Op } = require('sequelize');
const _ = require('lodash');
const BaseService = require('../../common/base/BaseService');
const RoleDao = require('./role.dao');

class RoleService extends BaseService {
  constructor() {
    super(RoleDao);
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

    if ('roleName' in newCondition) {
      newCondition.roleName = {
        [Op.like]: `%${newCondition.roleName}%`,
      };
    }

    return super.getPageResult(newCondition, pager);
  }
}

module.exports = new RoleService();
