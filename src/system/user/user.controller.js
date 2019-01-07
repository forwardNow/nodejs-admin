const jwt = require('jsonwebtoken');
// const md5 = require('md5');
const BaseController = require('../../common/base/BaseController');
const service = require('./user.service');
const { JWT_SECRET } = require('../../common/configs/Var');

const moduleName = 'user';

class UserController extends BaseController {
  /**
   * @param router {express.router}
   */
  constructor(router) {
    super(service, moduleName, router);

    this.get();
    this.list();
    this.insert();
    this.update();
    this.delete();

    this.login();
    this.logout();
  }

  login() {
    this.router.post(`/${this.moduleName}/login`, async (req, res, next) => {
      try {
        const { body } = req;
        let bean = null;

        if (body.userPassword === '111111') {
          body.userPassword = 'lueSGJZetyySpUndWjMBEg==';
        }

        await service.getUserByLoginAuth(body).then((result) => {
          bean = result;

          if (bean == null) {
            return res.status(200).json({
              errorCode: 1,
              reason: 'not exists',
            });
          }

          const token = jwt.sign(
            {
              userId: bean.userId,
            },
            JWT_SECRET,
            {
              expiresIn: 60 * 60, // 秒到期时间
            },
          );

          res.setHeader('token', token);

          return res.status(200).json({
            errorCode: 0,
            reason: 'ok',
            result: bean,
          });
        });

        return null;
      } catch (e) {
        return next(e);
      }
    });
  }

  logout() {
    this.router.post(`/${this.moduleName}/logout`, (req, res) => {
      res.setHeader('token', 'none');

      return res.status(200).json({
        errorCode: 0,
        reason: 'OK',
      });
    });
  }
}

module.exports = UserController;