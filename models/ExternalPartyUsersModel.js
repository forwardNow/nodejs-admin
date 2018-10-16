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
});
