const ModelUtils = require('../utils/ModelUtil');

module.exports = ModelUtils.getModel('Dic', {
  // 字典名称
  DicName: { type: String, required: true, default: '' },

  // 字典描述
  DicDesc: { type: String, default: '' },
});
