const BaseDao = require('./BaseDao');
const UsersModel = require('../models/UsersModel');

class UsersDao extends BaseDao {
  constructor() {
    super();
    this.Model = UsersModel;
  }
}

module.exports = new UsersDao();

// test

// const userDao = new UsersDao();

// userDao.insert({
//   UserId: '哇哈哈',
// }).then(() => {
//   console.log('insert success!');
// });


// userDao.getListByConditionAndPager({}).then(res => console.log(res));

// userDao.getCountByCondition().then(res => console.log(res));

// userDao.deleteByCondition().then(res => console.log(res));

// userDao.updateByCondition({}, { UserTrueName: 'hehe' }).then(res => console.log(res));
