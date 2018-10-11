const UserDao = require('../daos/UsersDao');

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
    UserDao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return UserDao.getCountByCondition(condition);
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
    UserDao.getByCondition({
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
};
