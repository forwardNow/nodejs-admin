const mongoose = require('mongoose');

const MongodbUtil = {};
let mongodbClient = null;

const URI = 'mongodb://localhost/platform';

const OPTIONS = {
  useNewUrlParser: true,
  poolSize: 5, // Maintain up to 5 socket connections
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
};

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
    // console.log('Mongoose connected to ', URI);
  });

  /*
   * 连接失败回调
   */
  mongodbClient.on('error', (err) => {
    // console.log('Mongoose connection error: ', err);
    throw err;
  });

  /*
   * 关闭连接回调
   */
  mongodbClient.on('disconnected', () => {
    // console.log('Mongoose disconnected');
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
