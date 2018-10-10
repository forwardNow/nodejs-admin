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
  return MongodbUtil.getClient().model(tbName, new Schema(tbStructure), tbName);
}

exports.getModel = getModel;
