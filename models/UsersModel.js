const ModelUtils = require('./ModelUtils');

module.exports = ModelUtils.getModel('User', {
  // 用户ID
  UserId: { type: String, required: true },
  // 姓名
  UserTrueName: { type: String, default: '' },
  // 昵称
  UserNickname: { type: String, default: '' },
  // 头像
  UserHeadImage: { type: String, default: '' },
  // 性别('1'-男；'2'-女)
  Sex: { type: String, default: '' },
  // 联系电话
  Phone: { type: String, default: '' },
  // 人员类别
  PeopleCategory: { type: String, default: '' },
  // 住址
  Address: { type: String, default: '' },
  // 座机
  Landline: { type: String, default: '' },
  // QQ号码
  QqNumber: { type: String, default: '' },
  // 电子邮箱
  Email: { type: String, default: '' },
  // 所属实施机构
  MedicalCode: { type: String, default: '' },
  // 实施机构名称
  MedicalName: { type: String, default: '' },
  // 单位编码
  UnitCode: { type: String, default: '' },
  // 单位名称
  UnitName: { type: String, default: '' },
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
