const { convertToSnakeCase, convertToCamelCase } = require('../../common/utils/CaseUtil');

const { sequelize } = require('../../common/utils/MySqlUtil');

class BaseDao {
  constructor(tbName, bean) {
    // this.bean 是驼峰
    this.bean = bean;
    this.Model = sequelize.define(tbName, convertToSnakeCase(bean));
  }

  /**
   * 根据条件获取总数
   * @param condition
   * @return {Promise<Number>}
   */
  getCount(condition = {}) {
    return this.Model.count({ where: this.fmtCondition(condition) });
  }

  /**
   * 根据 id 获取记录
   * @param id
   * @return {Bluebird|Promise<object|null>}
   */
  getById(id) {
    return this.Model.findByPk(id)
      .then(result => BaseDao.fmtResult(result));
  }

  /**
   * 根据条件和分页器获取一页数据
   * @param condition
   * @param pager
   * @returns {Bluebird<{pager: {pageSize: number, currentPage: number, total}, items: array}>}
   */
  getPageResult(condition = {}, pager = { pageSize: 20, currentPage: 1 }) {
    const { pageSize, currentPage } = pager;
    const limit = pageSize;
    const offset = pageSize * (currentPage - 1);

    return this.Model.findAndCountAll({ where: this.fmtCondition(condition), offset, limit })
      .then((result) => {
        const { count, rows } = result;
        const newPager = { pageSize, currentPage, total: count };

        const items = BaseDao.fmtResult(rows);

        return { pager: newPager, items };
      });
  }

  /**
   * 根据 id 删除记录
   * @param id
   * @returns {Bluebird<any>}
   */
  deleteById(id) {
    return this.getById(id).then(model => model.destroy({ force: true }));
  }

  /**
   * 插入
   * @param bean
   * @returns {Promise<any>}
   */
  insert(bean) {
    return new Promise((resolve, reject) => {
      new this.Model(this.fmtCondition(bean)).save((error) => {
        if (error) {
          return reject(error);
        }
        return resolve('ok');
      });
    });
  }

  /**
   * 格式化 bean：
   *  1、剔除掉 Model 中不存在的字段
   *  2、将属性转换为下划线写法
   * @param condition
   */
  fmtCondition(condition) {
    const newBean = {};
    Object.keys(condition).forEach((prop) => {
      if (prop in this.bean) {
        newBean[convertToSnakeCase(prop)] = condition[prop];
      }
    });

    return newBean;
  }

  /**
   * 格式化结果
   *
   *    1、下划线属性名转驼峰
   *    2、从 dataValues 取出结果
   * @param result
   * @returns {*}
   */
  static fmtResult(result) {
    let newResult;

    if (!result) {
      return result;
    }

    if (Array.isArray(result)) {
      newResult = result.map(row => convertToCamelCase(row.dataValues));
    } else {
      newResult = convertToCamelCase(result.dataValues);
    }

    return newResult;
  }
}

module.exports = BaseDao;
