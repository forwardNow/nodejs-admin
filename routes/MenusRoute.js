const MenusDao = require('../daos/MenusDao');

module.exports = (router) => {
  // 菜单 / 列表（模糊查询）
  router.post('/api/menu/list', (req, res) => {
    const {
      body: {
        MenuName,
        pager: {
          pageSize,
          currentPage,
        },
      },
    } = req;
    const condition = {
      MenuName: new RegExp(MenuName || '', 'i'),
    };
    const result = {
      items: null,
      pager: { pageSize, currentPage },
    };
    MenusDao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return MenusDao.getCountByCondition(condition);
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

  // 菜单 / find by id
  router.post('/api/menu/get', (req, res) => {
    const { body: menu } = req;
    MenusDao.getByCondition({
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

  // 菜单 / 更新
  router.post('/api/menu/update', (req, res) => {
    const { body: menu } = req;

    menu.ModifiedTime = Date.now();

    MenusDao.updateSelectiveByCondition(
      { RoleId: menu.RoleId },
      menu,
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

  // 菜单 / 插入
  router.post('/api/menu/insert', (req, res) => {
    const { body: menu } = req;

    MenusDao.insert(menu)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '添加失败',
      }));
  });

  // 菜单 / 删除
  router.post('/api/menu/delete', (req, res) => {
    const { body: menu } = req;

    MenusDao.deleteByCondition(menu)
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
