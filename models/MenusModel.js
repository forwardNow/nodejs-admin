const uuidv1 = require('uuid/v1');
const ModelUtils = require('../utils/ModelUtil');

module.exports = ModelUtils.getModel('Menus', {
  // 主键ID
  RoleId: { type: String, required: true, default: uuidv1 },
  // 菜单编码
  MenuNo: { type: String, default: '' },
  // 菜单名称
  MenuName: { type: String, default: '' },
  // 菜单父编码
  MenuParentNo: { type: String, default: '' },
  // Url地址
  MenuUrl: { type: String, default: '' },
  // 是否最后一级：(1-是；0-否)
  IsLeaf: { type: Number, enum: [0, 1] },
  // 是否自动展开：(1-打开；0-不打开；)
  IsOpen: { type: Number, enum: [0, 1], default: 0 },
  // 菜单级别
  MenuLevel: { type: Number },
  // 节点图标
  MenuNodeIcon: { type: String, default: '' },
  // 排序
  Sort: { type: Number, default: 1 },
  // 子系统标识
  SystemsId: { type: String, default: '' },
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
  IsDeleted: { type: Number, enum: [0, 1], default: 0 },
});
