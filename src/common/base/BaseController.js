class BaseController {
  /**
   * @param service {BaseService}
   * @param moduleName {string}
   * @param router {express.router}
   */
  constructor(service, moduleName, router) {
    this.service = service;
    this.moduleName = moduleName;
    this.router = router;
  }

  /**
   * 根据 ID 获取记录
   * @example
   *
   * req body:
   *
   *  { id: 1 }
   *
   * res body:
   *
   *  // success
   *  { errorCode: 0, reason: 'ok', result: <bean> }
   *
   *  // fail
   *  { errorCode: 1, reason: 'not exists' }
   */
  get() {
    this.router.post(`/${this.moduleName}/get`, (req, res) => {
      const { body } = req;

      this.service.getById(body).then((bean) => {
        if (bean == null) {
          return res.status(200).json({
            errorCode: 1,
            reason: 'not exists',
          });
        }
        return res.status(200).json({
          errorCode: 0,
          reason: 'ok',
          result: bean,
        });
      });
    });
  }

  /**
   * 根据 condition 和 pager 获取分页
   * @example
   *
   * req body:
   *
   *  {
   *    condition: { id: 1 },
   *    pager: { currentPage: 1, pageSize: 20 }
   *  }
   *
   * res body:
   *
   *  // success
   *  {
   *    errorCode: 0, reason: 'ok',
   *    result: {
   *      pager: { currentPage: 1, pageSize: 20, total: 101 },
   *      items: Array<Bean>
   *    }
   *  }
   *
   *  // fail
   *  { errorCode: 1, reason: 'fail' }
   */
  list() {
    this.router.post(`/${this.moduleName}/list`, (req, res) => {
      const { body } = req;

      this.service.getPageResult(body)
        .then(result => res.status(200).json({
          errorCode: 0,
          reason: 'OK',
          result,
        }))
        .catch(e => res.status(200).json({
          errorCode: 1,
          reason: e.message || 'fail',
        }));
    });
  }

  /**
   * 插入一条记录
   * @example
   *
   * req body:
   *
   *  { name: '张三', gender: '0' } // bean
   *
   * res body:
   *
   *  // success
   *  { errorCode: 0, reason: 'ok', result: bean }
   *
   *  // fail
   *  { errorCode: 1, reason: 'fail' }
   */
  insert() {
    this.router.post(`/${this.moduleName}/insert`, (req, res) => {
      const { body } = req;

      this.service.insert(body)
        .then(result => res.status(200).json({
          errorCode: 0,
          reason: 'OK',
          result,
        }))
        .catch(e => res.status(200).json({
          errorCode: 1,
          reason: e.message || 'fail',
        }));
    });
  }

  /**
   * 根据 ID 删除一条记录
   * @example
   *
   * req body:
   *
   *  { id: 1 }
   *
   * res body:
   *
   *  // success
   *  { errorCode: 0, reason: 'ok', result: <bean> }
   *
   *  // fail
   *  { errorCode: 1, reason: 'not exists' }
   */
  delete() {
    this.router.post(`/${this.moduleName}/delete`, (req, res) => {
      const { body } = req;

      this.service.deleteById(body)
        .then(() => res.status(200).json({
          errorCode: 0,
          reason: 'OK',
        }))
        .catch(e => res.status(200).json({
          errorCode: 1,
          reason: e.message || 'fail',
        }));
    });
  }

  /**
   * 更新一条记录
   * @example
   *
   * req body:
   *
   *  { id: 1, name: '张三', gender: '0' } // bean
   *
   * res body:
   *
   *  // success
   *  { errorCode: 0, reason: 'ok' }
   *
   *  // fail
   *  { errorCode: 1, reason: 'fail' }
   */
  update() {
    this.router.post(`/${this.moduleName}/update`, (req, res) => {
      const { body } = req;

      this.service.insert(body)
        .then(() => res.status(200).json({
          errorCode: 0,
          reason: 'OK',
        }))
        .catch(e => res.status(200).json({
          errorCode: 1,
          reason: e.message || 'fail',
        }));
    });
  }
}

module.exports = BaseController;
