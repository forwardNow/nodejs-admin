const SubSystemsDao = require('../daos/SubSystemsDao');

module.exports = (router) => {
  // 列表（模糊查询）
  router.post('/api/subsys/list', (req, res) => {
    const {
      body: {
        SystemName,
        pager: {
          pageSize,
          currentPage,
        },
      },
    } = req;
    const condition = {
      SystemName: new RegExp(SystemName || '', 'i'),
    };
    const result = {
      items: null,
      pager: { pageSize, currentPage },
    };
    SubSystemsDao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return SubSystemsDao.getCountByCondition(condition);
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

  router.post('/api/subsys/get', (req, res) => {
    const { body: subsys } = req;
    SubSystemsDao.getByCondition({
      SystemId: subsys.SystemId,
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

  router.post('/api/subsys/update', (req, res) => {
    const { body: subsys } = req;

    subsys.ModifiedTime = Date.now();

    SubSystemsDao.updateSelectiveByCondition(
      { SystemId: subsys.SystemId },
      subsys,
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

  router.post('/api/subsys/insert', (req, res) => {
    const { body: subsys } = req;
    SubSystemsDao.insert(subsys)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '添加失败',
      }));
  });

  router.post('/api/subsys/delete', (req, res) => {
    const { body: subsys } = req;

    SubSystemsDao.deleteByCondition(subsys)
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
