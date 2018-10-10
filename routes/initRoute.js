const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');

module.exports = (router) => {
  router.get('/api/init', (req, res, next) => {
    // 创建 admin 用户
    ExternalPartyUsersDao.insert({
      ExternalIdentifier: 'admin',
      ExternalCredential: '7410',
      ExternalIdentityType: '1',
    }).then(() => res.status(200).send('ok'), err => next(err));
  });
};
