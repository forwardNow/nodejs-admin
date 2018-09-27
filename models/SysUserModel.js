const uuidv1 = require('uuid/v1');

const mongoose = require('mongoose');

require('./dbConfig');

const { Schema } = mongoose;


const sysUserSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientPassword: {
    type: String,
    required: true,
  },
  clientTrueName: {
    type: String,
    default: '',
  },
  clientUserSex: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
  },
  allowLogin: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  clientUserIdCard: {
    type: String,
    default: '',
  },
  clientUserPhoneNum: {
    type: String,
    default: '',
  },
  clientUserEmail: {
    type: String,
    default: '',
  },
  createtime: {
    type: Date,
    default: Date.now,
  },
  createuserid: {
    type: String,
    default: '',
  },
  createusername: {
    type: String,
    default: '',
  },
  modifiedtime: {
    type: Date,
    default: Date.now,
  },
  modifieduserid: {
    type: String,
    default: '',
  },
  modifiedusername: {
    type: String,
    default: '',
  },
  isdeleted: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const SysUserModel = mongoose.model('SysUser', sysUserSchema);

/**
 * 添加 sysUser
 * @param {object} sysUser
 * @returns {Promise}
 */
SysUserModel.addSysUser = (sysUser) => {
  const newSysUser = {};
  Object.keys(sysUser).forEach((key) => {
    newSysUser[key] = sysUser[key];
  });
  newSysUser.clientId = uuidv1();
  return new Promise((resolve, reject) => {
    new SysUserModel(newSysUser).save((error) => {
      if (error) {
        reject(error);
      } else {
        resolve('ok');
      }
    });
  });
};

/**
 * 更新用户
 * @param {object} sysUser
 * @returns {Promise}
 */
SysUserModel.updateSysUser = sysUser => new Promise((resolve, reject) => {
  SysUserModel.updateOne(
    {
      clientId: sysUser.clientId,
    },
    sysUser,
    (error, res) => {
      if (error) {
        reject(error);
      } else if (res.modifiedCount !== 1) {
        reject(error);
      } else {
        resolve(res);
      }
    },
  );
});

/**
 * 删除用户
 * @param {object} sysUser
 * @returns {Promise}
 */
SysUserModel.deleteSysUser = sysUser => new Promise((resolve, reject) => {
  SysUserModel.deleteOne(
    {
      clientId: sysUser.clientId,
    },
    (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    },
  );
});


/**
 * 查询
 * @param {*} condition
 * @param {*} pager
 * @example
 * const pageNum = 1;
 * const pageSize = 20;
 *
 * const PAGER = {
 *   skip: (pageNum - 1) * pageSize, //
 *   limit: pageNum * pageSize, // pageSize
 * };
 */
SysUserModel.getSysUserList = (condition, pager = { skip: 0, limit: 20 }) => new Promise((resolve, reject) => {
  SysUserModel.find(condition, null, pager, (err, sysUserList) => {
    if (err) {
      reject(err);
    } else {
      resolve(sysUserList);
    }
  });
});


SysUserModel
  .getSysUserList({}, { skip: 3, limit: 3 })
  .then(res => console.log(res.map(item => item.clientName)));

module.exports = SysUserModel;
