const BaseDao = require('./BaseDao');
const MenusModel = require('../models/MenusModel');

class MenusDao extends BaseDao {
  constructor() {
    super(MenusModel);
  }
}

module.exports = new MenusDao();
