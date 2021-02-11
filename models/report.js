const db = require("../database/init");
const options = {
  freezeTableName: true,
  tableName: "reports",
  modelName: "reports",
  createdAt: true,
  updatedAt: true,
};
const Report = db.sequelize.define(
  "Report",
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
    availability: {
      type: db.Sequelize.INTEGER(5).UNSIGNED,
      allowNull: false,
    },
    outages : {
       type: db.Sequelize.INTEGER(10),
      allowNull: false,
    },
    downTime: {
      type: db.Sequelize.INTEGER(10),
      allowNull: false,
    },
    upTime: {
      type: db.Sequelize.INTEGER(10),
      allowNull: false
    },
    responseTime:{
      type:db.Sequelize.INTEGER(10),
      allowNull:false,
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

module.exports = Report;