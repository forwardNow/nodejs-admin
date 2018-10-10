const jwt = require('jsonwebtoken');
const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');

// 签名
const SECRET = 'salt';

module.exports = (router) => {
  // 登陆
  router.post('/api/session/login', (req, res, next) => {
    const { body: user } = req;
    ExternalPartyUsersDao.getByCondition({
      ExternalIdentifier: user.ExternalIdentifier,
      ExternalCredential: user.ExternalCredential,
    }).then((data) => {
      // 不存在
      if (!data) {
        return res.status(200).json({
          errorCode: 101001,
          reason: 'ExternalIdentifier or ExternalCredential is invalid.',
        });
      }

      // 存在
      // req.session.user = data;

      const token = jwt.sign(
        {
          userId: data.ExternalIdentifier,
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
        result: data,
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
