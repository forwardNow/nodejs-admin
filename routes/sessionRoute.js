const UserModel = require('../models/SysUserModel');

module.exports = (router) => {
  // 登陆
  router.post('/api/session/login', (req, res, next) => {
    const { body: user } = req;
    UserModel.findOne({
      clientName: user.clientName,
      clientPassword: user.clientPassword,
    }).then((data) => {
      // 不存在
      if (!data) {
        return res.status(200).json({
          errorCode: 101001,
          reason: 'clientName or clientPassword is invalid.',
        });
      }

      // 存在
      req.session.user = data;

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
    delete req.session.user;
    return res.status(200).json({
      errorCode: 0,
      reason: 'OK',
    });
  });
};
