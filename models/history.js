const db = require("../database/init");
const options = {
  freezeTableName: true,
  tableName: "checkHistory",
  modelName: "checkHistory",
  createdAt: true,
  updatedAt: false,
};
const checkHistory = db.sequelize.define(
  "checkHistory",
  {
    id: {
      autoIncrement: true,
      type: db.Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    status: { 
       type: db.Sequelize.ENUM("up", "down"),
        allowNull: false,
    },
    checkId: {
      type: db.Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      references: {
        model: "checks",
        key: "id",
      }
    },
  },
  options
);

module.exports = checkHistory;