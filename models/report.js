/* eslint-disable linebreak-style */
const db = require('../database/init');

const options = {
  freezeTableName: true,
  tableName: 'reports',
  modelName: 'reports',
  createdAt: true,
  updatedAt: true,
};
const Report = db.sequelize.define(
  'Report',
  {
    reportId: {
      autoIncrement: true,
      type: db.Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: db.Sequelize.ENUM('up', 'down'),
      allowNull: false,
    },
    availability: {
      type: db.Sequelize.INTEGER(5).UNSIGNED,
      allowNull: false,
    },
    outages: {
      type: db.Sequelize.INTEGER(11),
      allowNull: false,
    },
    downTime: {
      type: db.Sequelize.INTEGER(11),
      allowNull: false,
    },
    upTime: {
      type: db.Sequelize.INTEGER(11),
      allowNull: false,
    },
  },
  options,
);

module.exports = Report;
