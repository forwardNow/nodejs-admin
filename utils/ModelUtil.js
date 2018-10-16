const mongoose = require('mongoose');
const MongodbUtil = require('./MongodbUtil');

const { Schema } = mongoose;

/**
 * 获取模型
 * @param tbName {string} 表名
 * @param tbStructure {Object} 表结构
 * @returns {Model}
 */
function getModel(tbName, tbStructure) {
  // 所有表都有的部分
  const tb = Object.assign({
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
  }, tbStructure);

  return MongodbUtil.getClient().model(tbName, new Schema(tb), tbName);
}

exports.getModel = getModel;
