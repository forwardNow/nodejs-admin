const SysUserModel = require('../models/SysUserModel');

module.exports = (router) => {
  router.get('/api/init', (req, res, next) => {
    //console.log(req.url);
    // 创建 admin 用户
    SysUserModel.addSysUser({
      clientName: 'admin',
      clientPassword: '7410',
      clientTrueName: '超级管理员',
    }).then(() => res.status(200).send('ok'), err => next(err));
  });
};
