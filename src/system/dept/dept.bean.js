const { Sequelize } = require('../../common/utils/MySqlUtil');

module.exports = {
  /** 此字段没有注释 */
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  /** 部门编号 */
  deptId: { type: Sequelize.STRING },
  /** 部门名称 */
  deptName: { type: Sequelize.STRING },
  /** 所属机构编号 */
  organId: { type: Sequelize.STRING },
  /** 创建部门的用户 */
  createDepartUser: { type: Sequelize.STRING },
  /** 创建部门的时间 */
  createDepartTime: { type: Sequelize.STRING },
  /** 修改部门的用户 */
  updateDepartUser: { type: Sequelize.STRING },
  /** 修改部门的时间 */
  updateDepartTime: { type: Sequelize.STRING },
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
