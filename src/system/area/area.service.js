const { Op } = require('sequelize');
const _ = require('lodash');
const BaseService = require('../../common/base/BaseService');
const AreaDao = require('./area.dao');

class AreaService extends BaseService {
  constructor() {
    super(AreaDao);
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

    // if ('organName' in newCondition) {
    //   newCondition.organName = {
    //     [Op.like]: `%${newCondition.organName}%`,
    //   };
    // }

    return super.getPageResult(newCondition, pager);
  }
}

module.exports = new AreaService();
