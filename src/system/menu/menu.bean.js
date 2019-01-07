const Sequelize = require('sequelize');

// table: upc_right

module.exports = {
  /** 主键ID */
  upcId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
  /** 权限对应的接口 */
  upcRight: { type: Sequelize.STRING },
  /** 权限说明 */
  upcRightName: { type: Sequelize.STRING },
  /** 父ID */
  fatherId: { type: Sequelize.INTEGER },
  /** 路径 */
  url: { type: Sequelize.STRING },
  /** 图标 */
  icon: { type: Sequelize.STRING },
  /** 描述 */
  desc: { type: Sequelize.STRING },
  /** 排序 */
  sort: { type: Sequelize.INTEGER },
  /** 创建人 */
  createUser: { type: Sequelize.STRING },
  /** 创建时间 */
  createTime: { type: Sequelize.STRING },
  /** 最后修改人 */
  lastUpdateUser: { type: Sequelize.STRING },
  /** 最后修改时间 */
  lastUpdateTime: { type: Sequelize.STRING },
  /** 删除状态 */
  isDelete: { type: Sequelize.CHAR },
};
