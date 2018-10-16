const uuidv1 = require('uuid/v1');
const ModelUtils = require('../utils/ModelUtil');

module.exports = ModelUtils.getModel('Roles', {
  // 角色ID
  SystemId: { type: String, required: true, default: uuidv1 },

  // 角色名称
  SystemName: { type: String, default: '' },

  // 角色类别
  RoleCategory: { type: Number, default: '' },

  // 角色状态：（1-启用；0-未启用）
  RoleState: { type: Number, default: 1 },

  // 排序
  Sort: { type: Number, default: 1 },

  // 角色描述
  RoleDes: { type: String, default: '' },
});
