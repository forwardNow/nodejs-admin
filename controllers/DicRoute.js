const DicDao = require('../daos/DicDao');

module.exports = (router) => {
  // 列表（模糊查询）
  router.post('/api/dic/list', (req, res) => {
    const {
      body: {
        DicName,
        pager: {
          pageSize,
          currentPage,
        },
      },
    } = req;
    const condition = {
      DicName: new RegExp(DicName || '', 'i'),
    };
    const result = {
      items: null,
      pager: { pageSize, currentPage },
    };
    DicDao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return DicDao.getCountByCondition(condition);
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

  router.post('/api/dic/get', (req, res) => {
    const { body: dic } = req;
    DicDao.getByCondition({
      DicName: dic.DicName,
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

  router.post('/api/dic/update', (req, res) => {
    const { body: dic } = req;

    dic.ModifiedTime = Date.now();

    DicDao.updateSelectiveByCondition(
      { DicName: dic.DicName },
      dic,
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

  router.post('/api/dic/insert', (req, res) => {
    const { body: dic } = req;
    DicDao.insert(dic)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '添加失败',
      }));
  });

  router.post('/api/dic/delete', (req, res) => {
    const { body: dic } = req;

    DicDao.deleteByCondition(dic)
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
