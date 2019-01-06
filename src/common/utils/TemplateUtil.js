const template = require('art-template');
const _ = require('lodash');
const path = require('path');

const { database } = require('../configs/db.config');
const { sequelize, closeConnection } = require('./MySqlUtil');


async function getModel(dbName, tbName) {
  const sql = `
    SELECT COLUMN_NAME, COLUMN_COMMENT, IS_NULLABLE, DATA_TYPE, COLUMN_KEY, EXTRA
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
          throw new Error(`未映射处理的数据库类型：${DATA_TYPE}`);
        }
      }

      return { meta, comment: COLUMN_COMMENT || '此字段没有注释' };
    });

    closeConnection();

    // console.log(bean);
  });

  return beanProps;
}

const tplDir = path.join(__dirname, '../template');

getModel(database, 'organ').then((res) => {
  const tplPath = path.join(tplDir, 'model.art');
  const content = template(tplPath, { beanProps: res });

  console.log(content);

  return content;
});

