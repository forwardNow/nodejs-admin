const template = require('art-template');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const { database } = require('../configs/db.config');
const { sequelize, closeConnection } = require('./MySqlUtil');

/**
 * art template 模板目录的绝对路径（${root}/src/common/template）
 * @type {string}
 */
const templateDirAbsPath = path.join(__dirname, '../template');

/**
 * 业务模块所在目录的绝对路径（${root}/src/）
 * @type {string}
 */
const bizDirAbsPath = path.join(__dirname, '../../');

/**
 * 获取数据库表结构模型
 * @param dbName
 * @param tbName
 * @return {Promise<Array>}
 */
async function getTbCols(dbName, tbName) {
  const sql = `
    SELECT COLUMN_NAME, COLUMN_COMMENT, IS_NULLABLE, DATA_TYPE, COLUMN_KEY, EXTRA, TABLE_NAME
    FROM information_schema.columns AS cols
    WHERE table_schema ='${dbName}' AND table_name = '${tbName}'
    ORDER BY cols.ordinal_position
    `;

  let cols = [];

  await sequelize.query(sql).spread((results) => {
    if (results.length < 1) {
      throw new Error(`${dbName}.${dbName} 没有列`);
    }

    /*
      COLUMN_NAME: 'id',
      COLUMN_COMMENT: '主键ID',
      IS_NULLABLE: 'NO',
      DATA_TYPE: 'int',
      COLUMN_KEY: 'PRI',
      EXTRA: 'auto_increment'},
     */

    cols = results.map((column) => {
      const {
        COLUMN_NAME,
        COLUMN_COMMENT,
        IS_NULLABLE,
        DATA_TYPE,
        COLUMN_KEY,
        EXTRA,
        TABLE_NAME,
      } = column;

      const meta = { name: _.camelCase(COLUMN_NAME), tbName: TABLE_NAME };

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

    // 关闭连接
    closeConnection();

    // console.log(bean);
  });

  return cols;
}

/**
 * 根据模块文件所在目录，计算相对 common 的相对目录
 * @param dir
 * @returns {string}
 */
function getRelativePathPrefix(dir) {
  const relativePath = '../';
  let fileDirDepthFromSrc = 0;

  dir.split('/').forEach((item) => {
    if (item !== '') {
      fileDirDepthFromSrc += 1;
    }
  });

  return relativePath.repeat(fileDirDepthFromSrc);
}

/**
 * 根据模板类型生成对应文件
 * @param tbName 表明
 * @param moduleName 模块名
 * @param dir 模块所在的目录
 * @param type 模板类型
 * @return {Promise<string>}
 */
async function createFile(tbName, moduleName, dir, type) {
  const tplName = `${type}.art`;
  const fileExt = `.${type}.js`;

  const tplPath = path.join(templateDirAbsPath, tplName);
  const fileDirAbsPath = path.join(bizDirAbsPath, dir);
  const filePath = path.join(fileDirAbsPath, `${moduleName}${fileExt}`);
  let data;

  const relativePath = getRelativePathPrefix(dir);


  if (type === 'bean') {
    await getTbCols(database, tbName).then((res) => {
      data = res;
    });
  } else {
    data = {
      moduleName, tbName, className: _.capitalize(moduleName), relativePath,
    };
  }

  const fileContent = template(tplPath, { data });

  // 如果目录不存在，则创建
  if (!fs.existsSync(fileDirAbsPath)) {
    fs.mkdirSync(fileDirAbsPath);
  }

  // 写文件
  await new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileContent, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });

  return Promise.resolve(filePath);
}

/**
 * 创建组件
 * @param tbName {string} 表名
 * @param moduleName
 * @param dir
 * @param types {array} 要生成的模板类型
 */
function createComponent(
  tbName,
  moduleName,
  dir,
  types = ['bean', 'dao', 'service', 'controller'],
) {
  types.forEach((type) => {
    createFile(tbName, moduleName, dir, type)
      .then(msg => console.log(`【${msg}】创建成功`));
  });
}


// createComponent('organ', 'org', 'system/org'); // 创建 org 组件

// createComponent('organ', 'org', 'system/org', ['bean']); // // 创建 org 组件的 bean 文件


// createComponent('department', 'dept', 'system/dept');

// createComponent('user', 'user', 'system/user'); // 创建 user 组件

// createComponent('city_area', 'area', 'system/area'); // 创建 area 组件

// createComponent('user_role', 'role', 'system/role'); // 创建 role 组件

createComponent('upc_right', 'menu', 'system/menu'); // 创建 menu 组件
