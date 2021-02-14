/* eslint-disable linebreak-style */
const db = require('../database/init');

const options = {
  freezeTableName: true,
  tableName: 'users',
  modelName: 'users',
  createdAt: false,
  updatedAt: false,
};
const User = db.sequelize.define(
  'User',
  {
    userId: {
      autoIncrement: true,
      type: db.Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: db.Sequelize.STRING(45),
      allowNull: false,
    },
    secondName: {
      type: db.Sequelize.STRING(45),
      allowNull: false,
    },
    email: {
      type: db.Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: db.Sequelize.STRING(100),
      allowNull: false,
    },
    verified: {
      type: db.Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    code: {
      type: db.Sequelize.INTEGER(6).UNSIGNED,
      allowNull: false,
    },
  },
  options,
);

module.exports = User;
