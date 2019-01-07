const { Op } = require('sequelize');
const _ = require('lodash');
const BaseService = require('../../common/base/BaseService');
const UserDao = require('./user.dao');

class UserService extends BaseService {
  constructor() {
    super(UserDao);
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

  getUserByLoginAuth(user) {
    return this.dao.getOneByCondition(user);
  }
}

module.exports = new UserService();
