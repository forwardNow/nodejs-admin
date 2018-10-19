const assert = require('assert');
const uuidv1 = require('uuid/v1');
const UserDao = require('../daos/UserDao');
const ExternalPartyUsersDao = require('../daos/ExternalPartyUsersDao');
const BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor(router) {
    super('user', 'UserId', router, UserDao);
  }

  /**
   * @override
   */
  setRoute() {
    this.delete();
    this.register();
  }

  delete() {
    const { router } = this;

    router.post('/api/user/delete', async (req, res) => {
      const { body: user } = req;

      assert(user.UserId);

      await UserDao.deleteByCondition({ UserId: user.UserId });

      await ExternalPartyUsersDao.deleteByCondition({ UserId: user.UserId });

      res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      });
    });
  }

  register() {
    const { router } = this;

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

      await UserDao.insert(newUser);

      await ExternalPartyUsersDao.insert(newExternalPartyUser);

      res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      });
    });
  }
}

module.exports = UserController;
