const template = require('art-template');
const _ = require('lodash');
const path = require('path');

const { database } = require('../configs/db.config');
const { sequelize, closeConnection } = require('./MySqlUtil');


async function getModel(dbName, tbName) {
  const sql = `
    SELECT column_name, column_comment, is_nullable, data_type, column_key, extra
    FROM information_schema.columns AS cols
    WHERE table_schema ='${dbName}' AND table_name = '${tbName}'
    ORDER BY cols.ordinal_position
    `;

  let beanProps = [];

  await sequelize.query(sql).spread((results) => {
    if (results.length < 1) {
      throw new Error(`${dbName}.${dbName} 没有列`);
    }

    /*
     {
    COLUMN_NAME: 'id',
    COLUMN_COMMENT: '主键ID',
    IS_NULLABLE: 'NO',
    DATA_TYPE: 'int',
    COLUMN_KEY: 'PRI',
    EXTRA: 'auto_increment'},
     */
    // console.log(results);

    beanProps = results.map((column) => {
      const {
        COLUMN_NAME,
        COLUMN_COMMENT,
        IS_NULLABLE,
        DATA_TYPE,
        COLUMN_KEY,
        EXTRA,
      } = column;

      const meta = { name: _.camelCase(COLUMN_NAME) };

      // 是否 是主键
      meta.primaryKey = (COLUMN_KEY === 'PRI');

      // 是否 自增长
      meta.autoIncrement = (EXTRA === 'auto_increment');

      // 可为空设置
      meta.allowNull = (IS_NULLABLE === 'YES');


      // 类型
      switch (DATA_TYPE) {
        case 'int': {
          meta.type = 'Sequelize.INTEGER';
          break;
        }
        case 'varchar': {
          meta.type = 'Sequelize.STRING';
          break;
        }
        case 'char': {
          meta.type = 'Sequelize.CHAR';
          break;
        }
        case 'datetime': {
          meta.type = 'Sequelize.DATE';
          break;
        }
        default: {
          throw new Error('未映射处理的数据库类型');
        }
      }

      return { meta, comment: COLUMN_COMMENT };
    });

    closeConnection();

    // console.log(bean);
  });

  return beanProps;
}

getModel(database, 'organ').then((res) => {
  // console.log(res);
  const tplPath = `${path.join(__dirname, '..')}/template/model.art`
  console.log(template(tplPath, { beanProps: res }));
});


module.exports = {
  getModel,
};
