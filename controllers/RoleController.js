const RolesDao = require('../daos/RoleDao');
const BaseRoute = require('./BaseRoute');

module.exports = (router) => {
  BaseRoute.setBaseRoute('role', 'RoleId', router, RolesDao);
};
