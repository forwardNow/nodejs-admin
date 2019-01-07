const Sequelize = require('sequelize');

// table: user_role

module.exports = {
  /** 角色ID */
  roleId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  /** 角色编码 */
  userRoleId: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  roleLevel: { type: Sequelize.STRING },
  /** 角色名 */
  roleName: { type: Sequelize.STRING },
  /** 角色状态 */
  roleStatus: { type: Sequelize.STRING },
  /** 创建角色的用户 */
  createUserid: { type: Sequelize.STRING },
  /** 更新角色的用户 */
  updateUserid: { type: Sequelize.STRING },
  /** 创建时间 */
  createDate: { type: Sequelize.STRING },
  /** 更新时间 */
  updateDate: { type: Sequelize.STRING },
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
