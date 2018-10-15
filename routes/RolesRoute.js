const RolesDao = require('../daos/RolesDao');

module.exports = (router) => {
  // 列表（模糊查询）
  router.post('/api/role/list', (req, res) => {
    const {
      body: {
        RoleName,
        pager: {
          pageSize,
          currentPage,
        },
      },
    } = req;
    const condition = {
      RoleName: new RegExp(RoleName || '', 'i'),
    };
    const result = {
      items: null,
      pager: { pageSize, currentPage },
    };
    RolesDao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return RolesDao.getCountByCondition(condition);
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

  router.post('/api/role/get', (req, res) => {
    const { body: menu } = req;
    RolesDao.getByCondition({
      RoleId: menu.RoleId,
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

  router.post('/api/role/update', (req, res) => {
    const { body: role } = req;

    role.ModifiedTime = Date.now();

    RolesDao.updateSelectiveByCondition(
      { RoleId: role.RoleId },
      role,
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

  router.post('/api/role/insert', (req, res) => {
    const { body: role } = req;

    RolesDao.insert(role)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '添加失败',
      }));
  });

  router.post('/api/role/delete', (req, res) => {
    const { body: role } = req;

    RolesDao.deleteByCondition(role)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '删除失败',
      }));
  });
};
