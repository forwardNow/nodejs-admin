class BaseDao {
  constructor(Model) {
    /**
     * @type {any}
     */
    this.Model = Model;
  }

  /**
   * 根据条件获取总数
   * @param condition
   * @return {Promise<Number>}
   */
  getCountByCondition(condition = {}) {
    return this.Model.countDocuments(condition).exec();
  }

  /**
   * 根据条件删除
   * @param condition
   * @return {Promise<any>}
   */
  deleteByCondition(condition = {}) {
    return this.Model.deleteMany(condition).exec();
  }

  /**
   * 插入
   * @param bean
   * @returns {Promise<any>}
   */
  insert(bean) {
    return new Promise((resolve, reject) => {
      new this.Model(bean).save((error) => {
        if (error) {
          return reject(error);
        }
        return resolve('ok');
      });
    });
  }

  /**
   * 根据条件获取一条数据
   * @param condition
   * @returns {Promise<any>}
   */
  getByCondition(condition) {
    return this.Model.findOne(condition).exec();
  }


  /**
   * 根据条件和分页器获取列表
   * @param condition {Object} 条件
   * @param pager {{pageSize: Number, currentPage: Number}} 分页器
   * @return {Promise<Array>}
   */
  getListByConditionAndPager(condition = {}, pager = { pageSize: 20, currentPage: 1 }) {
    const { pageSize, currentPage } = pager;
    const limit = pageSize;
    const skip = pageSize * (currentPage - 1);

    return this.Model.find(condition).skip(skip).limit(limit).exec();
  }

  /**
   * 根据条件更新，只更新不为 null/undefined 的字段
   * @param condition
   * @param bean
   * @return {Promise<Array>}
   */
  updateSelectiveByCondition(condition = {}, bean) {
    const newBean = {};
    Object.keys(bean).forEach((key) => {
      if (bean[key] != null) {
        newBean[key] = bean[key];
      }
    });
    return this.Model.updateMany(condition, newBean).exec();
  }
}

module.exports = BaseDao;
