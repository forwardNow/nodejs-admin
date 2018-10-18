const uuidv1 = require('uuid/v1');
const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');
const UsersDao = require('../daos/UserDao');

module.exports = (router) => {
  router.get('/api/init', (req, res, next) => {
    const externalPartyId = uuidv1();
    const userId = uuidv1();
    // 创建 admin 用户
    ExternalPartyUsersDao.insert({
      ExternalPartyId: externalPartyId,
      UserId: userId,
      ExternalIdentifier: 'admin',
      ExternalCredential: '7410',
      ExternalIdentityType: '1',
    })
      .then(() => UsersDao.insert({
        UserId: userId,
        UserTrueName: '超级管理员',
        UserNickname: '哇哈哈',
      }))
      .then(() => res.status(200).send('ok'), err => next(err));
  });
};
