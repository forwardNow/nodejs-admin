const jwt = require('jsonwebtoken');
const ExternalPartyUserDao = require('../daos/ExternalPartyUsersDao');
const UserDao = require('../daos/UserDao');

// 签名
const { JWT_SECRET } = require('../configs/Var');

class SessionController {
  constructor(router) {
    this.router = router;
    this.registerRoute();
  }

  registerRoute() {
    this.login();
    this.logout();
  }

  login() {
    const { router } = this;

    router.post('/api/session/login', async (req, res, next) => {
      try {
        const { body: bean } = req;
        let externalPartyUser = null;

        await ExternalPartyUserDao.getByCondition(bean)
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

        await UserDao.getByCondition({ UserId: externalPartyUser.UserId })
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
          JWT_SECRET,
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
  }

  logout() {
    const { router } = this;

    // 登出
    router.post('/api/session/logout', (req, res) => {
      // registerDeleteRoute req.session.user;

      res.setHeader('token', 'none');

      return res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      });
    });
  }
}

module.exports = SessionController;
