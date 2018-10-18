const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');

module.exports = (router) => {
  // 列表（模糊查询）
  router.post('/api/externalPartyUser/list', (req, res) => {
    const {
      body: {
        ExternalIdentifier,
        pager: {
          pageSize,
          currentPage,
        },
      },
    } = req;
    const condition = {
      ExternalIdentifier: new RegExp(ExternalIdentifier || '', 'i'),
    };
    const result = {
      items: null,
      pager: { pageSize, currentPage },
    };
    ExternalPartyUsersDao.getListByConditionAndPager(condition, result.pager)
      .then((list) => {
        result.items = list;
        return ExternalPartyUsersDao.getCountByCondition(condition);
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

  router.post('/api/externalPartyUser/get', (req, res) => {
    const { body: externalPartyUser } = req;
    ExternalPartyUsersDao.getByCondition({
      ExternalPartyId: externalPartyUser.ExternalPartyId,
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

  router.post('/api/externalPartyUser/getByCondition', (req, res) => {
    const { body: externalPartyUser } = req;
    ExternalPartyUsersDao.getByCondition(externalPartyUser).then((data) => {
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

  router.post('/api/externalPartyUser/update', (req, res) => {
    const { body: externalPartyUser } = req;

    externalPartyUser.ModifiedTime = Date.now();

    ExternalPartyUsersDao.updateSelectiveByCondition(
      { ExternalPartyId: externalPartyUser.ExternalPartyId },
      externalPartyUser,
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

  router.post('/api/externalPartyUser/insert', (req, res) => {
    const { body: externalPartyUser } = req;

    ExternalPartyUsersDao.insert(externalPartyUser)
      .then(() => res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      }))
      .catch(() => res.status(200).json({
        errorCode: 1,
        reason: '添加失败',
      }));
  });

  router.post('/api/externalPartyUser/delete', (req, res) => {
    const { body: externalPartyUser } = req;

    ExternalPartyUsersDao.deleteByCondition(externalPartyUser)
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
