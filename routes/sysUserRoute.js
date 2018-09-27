const SysUserModel = require('../models/SysUserModel');

module.exports = (router) => {
  // 用户 / 添加
  router.post('/api/user/add', (req, res) => {
    const { body: user } = req;

    delete user._clientPassword;

    SysUserModel.addSysUser(user);

    return res.status(200).json({
      errorCode: 0,
      reason: 'OK',
    });
  });

  // 用户 / 列表（模糊查询）
  router.post('/api/user/list', (req, res) => {
    const { body } = req;
    const pager = body.pager;
    const pageSize = pager.pageSize;
    const currentPage = pager.currentPage;
    SysUserModel.getSysUserList(
      {
        clientName: new RegExp(body.clientName || '', 'i'),
      },
      {
        limit: body.pager.pageSize,
        skip: pager.pageSize * (pager.currentPage - 1),
      },
    ).then(data => res.status(200).json({
      errorCode: 0,
      reason: 'OK',
      result: {
        items: data,
        pager: pager,
      },
    }));
  });

  // 用户 / 登录名唯一性检查
  router.post('/api/user/unique', (req, res) => {
    const { body: user } = req;
    SysUserModel.findOne({
      clientName: user.clientName,
    }).then((data) => {
    // 找到了，则不唯一
      if (data) {
        return res.status(200).json({
          errorCode: 1,
          reason: '用户名已存在',
        });
      }
      return res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      });
    });
  });

  // 用户 / find by id
  router.post('/api/user/get', (req, res) => {
    const { body: user } = req;
    SysUserModel.findOne({
      clientId: user.clientId,
    }).then((data) => {
    // 找到了
      if (data) {
        return res.status(200).json({
          errorCode: 0,
          reason: 'OK',
          result: data,
        });
      }
      return res.status(200).json({
        errorCode: 1,
        reason: 'not exists',
      });
    });
  });

  // 用户 / 编辑
  router.post('/api/user/edit', (req, res) => {
    const { body: user } = req;

    user.modifiedtime = Date.now();

    SysUserModel.updateOne(
      {
        clientId: user.clientId,
      },
      user,
      (err) => {
        if (err) {
          return res.status(200).json({
            errorCode: 1,
            reason: '更新失败',
          });
        }
        return res.status(200).json({
          errorCode: 0,
          reason: 'OK',
        });
      },
    );
  });

  // 用户 / 删除
  router.post('/api/user/delete', (req, res) => {
    const { body: user } = req;
    SysUserModel.deleteOne({
      clientId: user.clientId,
    }, (error) => {
      if (!error) {
        return res.status(200).json({
          errorCode: 0,
          reason: 'OK',
        });
      }
      return res.status(200).json({
        errorCode: 1,
        reason: '删除失败',
      });
    });
  });
};
