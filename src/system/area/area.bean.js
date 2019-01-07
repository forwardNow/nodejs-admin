const Sequelize = require('sequelize');

// table: city_area

module.exports = {
  /** 此字段没有注释 */
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  /** 此字段没有注释 */
  provinceCode: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  provinceName: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  cityCode: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  cityName: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  townCode: { type: Sequelize.STRING },
  /** 此字段没有注释 */
  townName: { type: Sequelize.STRING },
};
