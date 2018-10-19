const SubSystemsDao = require('../daos/SubSystemDao');
const BaseRoute = require('./BaseRoute');

module.exports = (router) => {
  BaseRoute.setBaseRoute('subsys', 'SystemId', router, SubSystemsDao);
};
