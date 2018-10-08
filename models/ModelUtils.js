require('./dbConfig');
const mongoose = require('mongoose');

const { Schema } = mongoose;


/**
 * 获取模型
 * @param tbName {string} 表名
 * @param tbStructure {Object} 表结构
 * @returns {Model}
 */
function getModel(tbName, tbStructure) {
  return mongoose.model(tbName, new Schema(tbStructure));
}

exports.getModel = getModel;
