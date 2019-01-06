const template = require('art-template');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const { database } = require('../configs/db.config');
const { sequelize, closeConnection } = require('./MySqlUtil');

const tplDir = path.join(__dirname, '../template');
const bizDir = path.join(__dirname, '../../');

/**
 * 获取数据库表结构模型
 * @param dbName
 * @param tbName
 * @return {Promise<Array>}
 */
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


/**
 * 根据模板类型生成对应文件
 * @param tbName 表明
 * @param moduleName 模块名
 * @param dir 模块所在的目录
 * @param type 模板类型
 * @return {Promise<void>}
 */
async function createFileByTplType(tbName, moduleName, dir, type) {
  let tplName = 'bean.art';
  let componentSuffix = '.bean.js';
  let data;

  switch (type) {
    case 'bean': {
      tplName = 'bean.art';
      componentSuffix = '.bean.js';

      await getModel(database, tbName).then((res) => {
        data = res;
      });
      break;
    }
    case 'dao': {
      tplName = 'dao.art';
      componentSuffix = '.dao.js';

      data = { moduleName, tbName };
      break;
    }
    case 'service': {
      tplName = 'service.art';
      componentSuffix = '.service.js';

      data = { moduleName, tbName, className: _.capitalize(moduleName) };
      break;
    }
    case 'controller': {
      tplName = 'controller.art';
      componentSuffix = '.controller.js';

      data = { moduleName, tbName, className: _.capitalize(moduleName) };
      break;
    }
    default: {
      throw new Error('未知类型');
    }
  }

  const tplPath = path.join(tplDir, tplName);
  const content = template(tplPath, { data });
  const dirAbsPath = path.join(bizDir, dir);
  const filePath = path.join(dirAbsPath, `${moduleName}${componentSuffix}`);

  // 如果目录不存在，则创建
  if (!fs.existsSync(dirAbsPath)) {
    fs.mkdirSync(dirAbsPath);
  }

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      throw err;
    }

    console.log(`${filePath} has been generated!`);
  });
}

/**
 * 生成组件的所有的文件
 * @param tbName
 * @param moduleName
 * @param dir
 */
function genComponent(tbName, moduleName, dir) {
  createFileByTplType(tbName, moduleName, dir, 'bean').then();
  createFileByTplType(tbName, moduleName, dir, 'dao').then();
  createFileByTplType(tbName, moduleName, dir, 'service').then();
  createFileByTplType(tbName, moduleName, dir, 'controller').then();
}


// genComponent('organ', 'org', 'system/org');
genComponent('department', 'dept', 'system/dept');
