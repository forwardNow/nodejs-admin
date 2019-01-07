const Sequelize = require('sequelize');

// table: user

module.exports = {
  /** 用户的ID */
  userId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  /** 用户登录名 */
  userName: { type: Sequelize.STRING },
  /** 用户真实姓名 */
  userRealName: { type: Sequelize.STRING },
  /** 身份证 */
  userCart: { type: Sequelize.STRING },
  /** 警官证 */
  userPoliceCart: { type: Sequelize.STRING },
  /** 用户密码 */
  userPassword: { type: Sequelize.STRING },
  /** 用户所属的部门 */
  userDepartment: { type: Sequelize.STRING },
  /** 创建该用户的用户id */
  fatherId: { type: Sequelize.STRING },
  /** 用户的等级 */
  userLevel: { type: Sequelize.INTEGER },
  /** 电话 */
  userPhone: { type: Sequelize.STRING },
  /** 用户的邮箱 */
  userEmail: { type: Sequelize.STRING },
  /** 用户状态，1:正常;2:锁定;3:注销 */
  userStatus: { type: Sequelize.INTEGER },
  /** 用户所属角色 */
  userRole: { type: Sequelize.STRING },
  /** 应用管理系统 */
  applicationSystem: { type: Sequelize.STRING },
  /** 厂商 */
  manufacturer: { type: Sequelize.STRING },
  /** 负责人 */
  personinCharge: { type: Sequelize.STRING },
  /** 修改该用户的用户ID */
  updateId: { type: Sequelize.INTEGER },
  /** 此字段没有注释 */
  userNumber: { type: Sequelize.INTEGER },
  /** 用户的注册时间 */
  userCreateTime: { type: Sequelize.STRING },
  /** 用户的修改时间 */
  userUpdateTime: { type: Sequelize.STRING },
  /** 用户最后一次登入时间 */
  userLastTime: { type: Sequelize.STRING },
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
