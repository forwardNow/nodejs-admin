const uuidv1 = require('uuid/v1');
const ModelUtils = require('../utils/ModelUtil');

module.exports = ModelUtils.getModel('ExternalPartyUsers', {
  // 主键ID
  ExternalPartyId: { type: String, default: uuidv1 },
  // 用户ID
  UserId: { type: String, default: '' },
  // 登录类型： '1' - 基础支撑平台
  ExternalIdentityType: { type: String, default: '1' },
  // 标识
  ExternalIdentifier: { type: String, default: '' },
  // 密码凭证
  ExternalCredential: { type: String, default: '' },
  // 是否允许登陆
  IsAllowLogin: { type: Number, default: 1 },
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
  // 注销标记（1-注销；0-未注销）
  IsDeleted: { type: Number, enum: [0, 1], default: 0 },
});
