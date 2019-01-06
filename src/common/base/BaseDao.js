const _ = require('lodash');
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
   * 根据 id（或包含 id 的 bean 对象） 获取记录
   *    1、获取到了返回 bean
   *    2、未获取到返回 null
   * @param id {number | string | object}
   * @return {Bluebird|Promise<object|null>}
   */
  getById(id) {
    const newId = this.getPkValue(id);

    return this.Model.findByPk(newId)
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
   * 根据 id（或包含 id 的 bean 对象） 删除记录。
   * @param id {number | string | object}
   * @returns {Bluebird<any>}
   */
  deleteById(id) {
    const newId = this.getPkValue(id);

    return this.Model.findByPk(newId).then((model) => {
      if (!model) {
        return Promise.reject(new Error(`can not get one bean with ${newId}`));
      }

      const pkName = convertToSnakeCase(this.getPkName());

      return this.Model.destroy({ force: true, where: { [pkName]: newId } })
        .then((affectedRows) => {
          if (affectedRows === 1) {
            return Promise.resolve();
          }

          return Promise.reject(new Error('delete fail'));
        });
    });
  }

  /**
   * 更新一条记录，bean 中需要包含 id
   * @param bean
   * @return {Bluebird<any> | Promise}
   */
  update(bean) {
    const newId = this.getPkValue(bean);

    if (newId == null) {
      return Promise.reject(new Error(`update fail: ${this.getPkName()} is not allow null`));
    }

    return this.getById(newId).then((model) => {
      if (!model) {
        return Promise.reject(new Error(`can not get one bean with ${newId}`));
      }
      const pkName = convertToSnakeCase(this.getPkName());
      return this.Model.update(this.fmtCondition(bean), { where: { [pkName]: newId } });
    });
  }

  /**
   * 插入一条记录
   * @param bean
   * @return {Promise}
   */
  insert(bean) {
    const newBean = this.fmtCondition(bean);
    return this.Model.create(newBean).then(res => BaseDao.fmtResult(res));
  }

  /**
   * 获取主键的名称（驼峰）
   * @return {*}
   */
  getPkName() {
    let pkName = null;

    Reflect.ownKeys(this.bean).some((key) => {
      if (this.bean[key].primaryKey === true) {
        pkName = key;
        return true;
      }
      return false;
    });

    return pkName;
  }

  /**
   * 获取 bean 中的 PK 的值
   * @param bean {object | number | string}
   * @return {*}
   */
  getPkValue(bean) {
    if (!_.isObject(bean)) {
      return bean;
    }
    const pkName = this.getPkName();

    return bean[pkName];
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
