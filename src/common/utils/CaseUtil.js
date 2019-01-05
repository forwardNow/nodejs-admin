const _ = require('lodash');

/**
 * 转换普通对象的所有 key
 * @param type
 * @param po
 */
function convertPO(type = 'snake', po) {
  const newPO = {};
  let converter = _.snakeCase;

  if (type === 'camel') {
    converter = _.camelCase;
  }

  Reflect.ownKeys(po).forEach((key) => {
    const newKey = converter(String(key));
    newPO[newKey] = po[key];
  });

  return newPO;
}

/**
 * 转换
 * @param type
 * @param bean
 * @returns {*}
 */
function convert(type = 'snake', bean) {
  // 字符串
  if (typeof bean === 'string') {
    return type === 'snake' ? _.snakeCase(bean) : _.camelCase(bean);
  }

  // PO
  if (_.isPlainObject(bean)) {
    return convertPO(type, bean);
  }

  // 数组
  if (Array.isArray(bean)) {
    return bean.map(item => convertPO(item));
  }

  return null;
}

function convertToSnakeCase(bean) {
  return convert('snake', bean);
}

function convertToCamelCase(bean) {
  return convert('camel', bean);
}


module.exports = {
  convertToSnakeCase,
  convertToCamelCase,
};
