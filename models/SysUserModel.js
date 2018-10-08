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
 */
SysUserModel.getSysUserList = (
  condition,
  pager = { pageSize: 20, currentPage: 1 },
) => new Promise((resolve, reject) => {
  const { pageSize, currentPage } = pager;
  const limit = pageSize;
  const skip = pageSize * (currentPage - 1);

  SysUserModel.find(
    condition,
    null,
    { limit, skip },
    (err, sysUserList) => {
      if (err) {
        reject(err);
      } else {
        // 查总数
        SysUserModel.countDocuments(condition, (err2, total) => {
          if (err2) {
            return reject(err2);
          }

          return resolve({
            sysUserList,
            pager: {
              total,
              pageSize,
              currentPage,
            },
          });
        });
      }
    },
  );
});


SysUserModel
  .getSysUserList({}, { skip: 3, limit: 3 })
  .then(res => console.log('测试分页：', res.sysUserList.map(item => item.clientName)));

module.exports = SysUserModel;
