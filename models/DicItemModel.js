const uuidv1 = require('uuid/v1');
const ModelUtils = require('../utils/ModelUtil');

module.exports = ModelUtils.getModel('DicItem', {
  // 主键 ID
  ItemId: { type: String, default: uuidv1 },

  // 字典名称
  DicName: { type: String, required: true, default: '' },

  // 编码
  ItemCode: { type: String, default: '' },

  // 值
  ItemValue: { type: String, default: '' },

  // 条目描述
  ItemDesc: { type: String, default: '' },
});
