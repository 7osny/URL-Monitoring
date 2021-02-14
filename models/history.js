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
    historyId: {
      autoIncrement: true,
      type: db.Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    status: { 
       type: db.Sequelize.ENUM("up", "down"),
        allowNull: false,
    }
  },
  options
);

module.exports = checkHistory;