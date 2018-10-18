const assert = require('assert');

exports.setBaseRoute = (path, pkName, router, Dao) => {
  // 列表（模糊查询）
  router.post(`/api/${path}/list`, (req, res) => {
    const {
      body: {
        condition,
        pager: {
          pageSize,
          currentPage,
        },
      },
    } = req;

    const newCondition = {};

    Object.keys(condition).forEach((key) => {
      newCondition[key] = new RegExp(condition[key], 'i');
    });

    const result = {
      items: null,
      pager: { pageSize, currentPage },
    };
    Dao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return Dao.getCountByCondition(condition);
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

  router.post(`/api/${path}/get`, (req, res) => {
    const { body: bean } = req;

    assert(bean[pkName]);

    Dao.getByCondition({ pkName: bean[pkName] }).then((data) => {
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

  router.post(`/api/${path}/insert`, (req, res) => {
    const { body: bean } = req;

    Dao.insert(bean)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '添加失败',
      }));
  });

  router.post(`/api/${path}/update`, (req, res) => {
    const { body: bean } = req;

    assert(bean[pkName]);

    bean.ModifiedTime = Date.now();

    Dao.updateSelectiveByCondition({ pkName: bean[pkName] }, bean)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '更新失败',
      }));
  });

  router.post(`/api/${path}/delete`, (req, res) => {
    const { body: bean } = req;

    assert(bean[pkName]);

    Dao.deleteByCondition(bean)
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
