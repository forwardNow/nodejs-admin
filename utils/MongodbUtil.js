const mongoose = require('mongoose');

const { logger } = require('../utils/LogUtil');
const { URI, OPTIONS } = require('../configs/MongodbConfig');
const { LOG_NS } = require('../configs/Var');

const MongodbUtil = {};
let mongodbClient = null;

/**
 * 获取客户端
 * @return {*}
 */
MongodbUtil.getClient = () => {
  if (mongodbClient !== null) {
    return mongodbClient;
  }

  mongodbClient = mongoose.createConnection(URI, OPTIONS);


  /*
   * 连接成功回调
   */
  mongodbClient.on('connected', () => {
    logger.debug(`[${LOG_NS.DB}] connected to ${URI}`);
  });

  /*
   * 连接失败回调
   */
  mongodbClient.on('error', (err) => {
    logger.debug(`[${LOG_NS.DB}] connection error:  ${err}`);
    throw err;
  });

  /*
   * 关闭连接回调
   */
  mongodbClient.on('disconnected', () => {
    logger.debug(`[${LOG_NS.DB}] disconnected`);
  });

  return mongodbClient;
};

/**
 * 断开连接
 */
MongodbUtil.close = () => {
  mongodbClient.close();
  mongodbClient = null;
};

module.exports = MongodbUtil;
