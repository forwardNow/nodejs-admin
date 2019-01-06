class BaseService {
  /**
   * 构造器
   * @param dao<BaseDao>
   */
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * 根据条件获取总数
   * @param condition
   * @return {Promise<Number>}
   */
  getCount(condition = {}) {
    return this.dao.getCount(condition);
  }

  /**
   * 根据 id（或包含 id 的 bean 对象） 获取记录
   * @param id {number | string | object}
   * @return {Bluebird|Promise<object|null>}
   */
  getById(id) {
    return this.dao.getById(id);
  }

  /**
   * 根据条件和分页器获取一页数据
   * @param condition
   * @param pager
   * @returns {Bluebird<{pager: {pageSize: number, currentPage: number, total}, items: array}>}
   */
  getPageResult(condition = {}, pager = { pageSize: 20, currentPage: 1 }) {
    return this.dao.getPageResult(condition, pager);
  }

  /**
   * 根据 id（或包含 id 的 bean 对象） 删除记录。
   * @param id {number | string | object}
   * @returns {Bluebird<any>}
   */
  deleteById(id) {
    return this.dao.deleteById(id);
  }

  /**
   * 更新一条记录，bean 中需要包含 id
   * @param bean
   * @return {Bluebird<any> | Promise}
   */
  update(bean) {
    return this.dao.update(bean);
  }

  /**
   * 插入一条记录
   * @param bean
   * @return {Promise}
   */
  insert(bean) {
    return this.dao.insert(bean);
  }
}

module.exports = BaseService;
