const uuidv1 = require('uuid/v1');
const ModelUtils = require('../utils/ModelUtil');

module.exports = ModelUtils.getModel('SubSystems', {
  // 主键ID
  SystemId: { type: String, required: true, default: uuidv1 },

  // 系统名称
  SystemName: { type: String, default: '' },

  // 系统编号
  SystemIdenty: { type: String, default: '' },

  // 系统描述
  SystemDesc: { type: String, default: '' },

  // 系统级别
  SystemLevel: { type: String, default: '' },

  // 系统所属行政区划
  UnitCode: { type: String, default: '' },
});
