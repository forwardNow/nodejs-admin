const jwt = require('jsonwebtoken');
const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');
const UsersDao = require('../daos/UsersDao');

// 签名
const SECRET = 'salt';

module.exports = (router) => {
  // 登陆
  router.post('/api/session/login', (req, res, next) => {
    const { body: loginUser } = req;
    ExternalPartyUsersDao.getByCondition({
      ExternalIdentifier: loginUser.ExternalIdentifier,
      ExternalCredential: loginUser.ExternalCredential,
    }).then((externalPartyUser) => {
      // 不存在
      if (!externalPartyUser) {
        return res.status(200).json({
          errorCode: 101001,
          reason: 'ExternalIdentifier or ExternalCredential is invalid.',
        });
      }

      // 存在
      return UsersDao.getByCondition({
        UserId: externalPartyUser.UserId,
      });
    }).then((user) => {
      const token = jwt.sign(
        {
          userId: user.UserId,
        },
        SECRET,
        {
          expiresIn: 60 * 30, // 秒到期时间
        },
      );

      res.setHeader('token', token);

      return res.status(200).json({
        errorCode: 0,
        reason: 'OK',
        result: user,
      });
    }).catch((err) => {
    // 处理异常
      next(err);
    });
  });

  // 登出
  router.post('/api/session/logout', (req, res) => {
    // delete req.session.user;

    res.setHeader('token', 'none');

    return res.status(200).json({
      errorCode: 0,
      reason: 'OK',
    });
  });
};
