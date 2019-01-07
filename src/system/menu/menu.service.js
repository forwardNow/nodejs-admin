const { Op } = require('sequelize');
const _ = require('lodash');
const BaseService = require('../../common/base/BaseService');
const MenuDao = require('./menu.dao');

class MenuService extends BaseService {
  constructor() {
    super(MenuDao);
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

module.exports = new MenuService();
