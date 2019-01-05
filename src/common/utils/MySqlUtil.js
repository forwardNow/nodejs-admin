const Sequelize = require('sequelize');

const {
  database, host, username, password,
} = require('../configs/db.config');

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },


  // 请参考 Querying - 查询 操作符 章节
  operatorsAliases: false,

  // 是否使用本地库的标志
  // 如果是 'pg' -- 设置为 true 将允许 SSL 支持
  // - 默认值: false
  native: true,

  // 指定在调用 sequelize.define 时使用的选项
  // 如下示例:
  //   define: { timestamps: false }
  // 这基本等同于:
  //   sequelize.define(name, attributes, { timestamps: false })
  // 没有必要像这样去定义每个模型的时间戳选项
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
    freezeTableName: true,

    // 禁用 createdAt 字段
    timestamps: false,
  },
});

function closeConnection() {
  return sequelize.close();
}

module.exports = { Sequelize, sequelize, closeConnection };
