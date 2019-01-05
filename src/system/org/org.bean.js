const { Sequelize } = require('../../common/utils/MySqlUtil');

// 机构
module.exports = {
  /** 主键ID */
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

  /** 机构编号 */
  organId: { type: Sequelize.STRING, allowNull: true },

  /** 机构名称 */
  organName: { type: Sequelize.STRING, allowNull: true },

  /** 父级机构编号 */
  fatherId: { type: Sequelize.STRING, allowNull: true },

  /** 机构等级 */
  organLevel: { type: Sequelize.STRING, allowNull: true },

  /** 省份编码 */
  provinceCode: { type: Sequelize.STRING, allowNull: true },

  /** 省份名称 */
  provinceName: { type: Sequelize.STRING, allowNull: true },

  /** 城市编码 */
  cityCode: { type: Sequelize.STRING, allowNull: true },

  /** 城市名称 */
  cityName: { type: Sequelize.STRING, allowNull: true },

  /** 区县编码 */
  townCode: { type: Sequelize.STRING, allowNull: true },

  /** 区县名称 */
  townName: { type: Sequelize.STRING, allowNull: true },

  /** 创建机构的用户 */
  createOrganUser: { type: Sequelize.STRING, allowNull: true },

  /**  */
  createOrganTime: { type: Sequelize.STRING, allowNull: true },

  /** 修改机构的用户 */
  updateOrganUser: { type: Sequelize.STRING, allowNull: true },

  /**  */
  updateOrganTime: { type: Sequelize.STRING, allowNull: true },

  /** 创建人 */
  createUser: { type: Sequelize.STRING, allowNull: true },

  /** 创建时间 */
  createTime: { type: Sequelize.STRING, allowNull: true },

  /** 修改人 */
  updateUser: { type: Sequelize.STRING, allowNull: true },

  /** 修改时间 */
  updateTime: { type: Sequelize.STRING, allowNull: true },

  /** 删除状态 是否有效  0--无效  1 有效 */
  isDelete: { type: Sequelize.CHAR, allowNull: true },

};
