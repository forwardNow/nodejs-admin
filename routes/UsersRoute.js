const UsersDao = require('../daos/UsersDao');

module.exports = (router) => {
  // 用户 / 列表（模糊查询）
  router.post('/api/user/list', (req, res) => {
    const {
      body: {
        UserTrueName,
        pager: {
          pageSize,
          currentPage,
        },
      },
    } = req;
    const condition = {
      UserTrueName: new RegExp(UserTrueName || '', 'i'),
    };
    const result = {
      items: null,
      pager: { pageSize, currentPage },
    };
    UsersDao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return UsersDao.getCountByCondition(condition);
      })
      .then((count) => {
        result.pager.total = count;
        res.status(200).json({
          errorCode: 0,
          reason: 'OK',
          result,
        });
      });
  });

  // 用户 / find by id
  router.post('/api/user/get', (req, res) => {
    const { body: user } = req;
    UsersDao.getByCondition({
      UserId: user.UserId,
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
  router.post('/api/user/update', (req, res) => {
    const { body: user } = req;

    user.ModifiedTime = Date.now();

    UsersDao.updateSelectiveByCondition(
      { UserId: user.UserId },
      user,
    )
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '更新失败',
      }));
  });
};
