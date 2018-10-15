const uuidv1 = require('uuid/v1');
const ModelUtils = require('../utils/ModelUtil');

module.exports = ModelUtils.getModel('Roles', {
  // 角色ID
  RoleId: { type: String, required: true, default: uuidv1 },
  // 角色名称
  RoleName: { type: String, default: '' },
  // 角色类别
  RoleCategory: { type: Number, default: '' },
  // 角色状态：（1-启用；0-未启用）
  RoleState: { type: Number, default: 1 },
  // 排序
  Sort: { type: Number, default: 1 },
  // 角色描述
  RoleDes: { type: String, default: '' },
  // 新增时间
  CreateTime: { type: Date, default: Date.now },
  // 新增人编号
  CreateUserId: { type: String, default: '' },
  // 新增人姓名
  CreateUserName: { type: String, default: '' },
  // 修改时间
  ModifiedTime: { type: Date, default: Date.now },
  // 修改人编号
  ModifiedUserId: { type: String, default: '' },
  // 修改人姓名
  ModifiedUserName: { type: String, default: '' },
  // 注销标记：（1-注销；0-未注销）
  IsDeleted: { type: Number, default: 0 },
});
