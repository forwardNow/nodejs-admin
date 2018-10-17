const jwt = require('jsonwebtoken');
const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');
const UsersDao = require('../daos/UsersDao');

// 签名
const SECRET = 'salt';

module.exports = (router) => {
  // 登陆
  router.post('/api/session/login', async (req, res, next) => {
    try {
      const { body: bean } = req;
      let externalPartyUser = null;

      await ExternalPartyUsersDao.getByCondition(bean)
        .then((result) => {
          externalPartyUser = result;
        });

      // 不存在
      if (!externalPartyUser) {
        return res.status(200).json({
          errorCode: 1,
          reason: 'ExternalIdentifier or ExternalCredential is invalid.',
        });
      }

      let user = null;

      await UsersDao.getByCondition({ UserId: externalPartyUser.UserId })
        .then((result) => {
          user = result;
        });

      // 不存在
      if (!user) {
        return res.status(200).json({
          errorCode: 1,
          reason: '用户不存在',
        });
      }

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
    } catch (e) {
      return next(e);
    }
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
