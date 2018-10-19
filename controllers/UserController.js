const assert = require('assert');
const uuidv1 = require('uuid/v1');
const UsersDao = require('../daos/UserDao');
const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');
const BaseRoute = require('./BaseRoute');

module.exports = (router) => {
  router.post('/api/user/delete', async (req, res) => {
    const { body: user } = req;

    assert(user.UserId);

    await UsersDao.deleteByCondition({ UserId: user.UserId });

    await ExternalPartyUsersDao.deleteByCondition({ UserId: user.UserId });

    res.status(200).json({
      errorCode: 0,
      reason: 'OK',
    });
  });

  router.post('/api/user/register', async (req, res) => {
    const {
      body: {
        User,
        ExternalPartyUser,
      },
    } = req;

    const UserId = uuidv1();
    const newUser = Object.assign({}, User, { UserId });
    const newExternalPartyUser = Object.assign({}, ExternalPartyUser, { UserId });

    await UsersDao.insert(newUser);

    await ExternalPartyUsersDao.insert(newExternalPartyUser);

    res.status(200).json({
      errorCode: 0,
      reason: 'OK',
    });
  });

  BaseRoute.setBaseRoute('user', 'UserId', router, UsersDao);
};
