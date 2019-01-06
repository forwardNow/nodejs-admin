const Sequelize = require('sequelize');

// table: organ

module.exports = {
  /** 主键ID */
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  /** 机构编号 */
  organId: { type: Sequelize.STRING },
  /** 机构名称 */
  organName: { type: Sequelize.STRING },
  /** 父级机构编号 */
  fatherId: { type: Sequelize.STRING },
  /** 机构等级 */
  organLevel: { type: Sequelize.STRING },
  /** 省份编码 */
  provinceCode: { type: Sequelize.STRING },
  /** 省份名称 */
  provinceName: { type: Sequelize.STRING },
  /** 城市编码 */
  cityCode: { type: Sequelize.STRING },
  /** 城市名称 */
  cityName: { type: Sequelize.STRING },
  /** 区县编码 */
  townCode: { type: Sequelize.STRING },
  /** 区县名称 */
  townName: { type: Sequelize.STRING },
  /** 创建机构的用户 */
  createOrganUser: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  createOrganTime: { type: Sequelize.STRING },
  /** 修改机构的用户 */
  updateOrganUser: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  updateOrganTime: { type: Sequelize.STRING },
  /** 创建人 */
  createUser: { type: Sequelize.STRING },
  /** 创建时间 */
  createTime: { type: Sequelize.STRING },
  /** 修改人 */
  updateUser: { type: Sequelize.STRING },
  /** 修改时间 */
  updateTime: { type: Sequelize.STRING },
  /** 删除状态 是否有效  0--无效  1 有效 */
  isDelete: { type: Sequelize.CHAR },
};
