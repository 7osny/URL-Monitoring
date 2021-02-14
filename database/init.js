/* eslint-disable linebreak-style */
const Sequelize = require('sequelize');
const configurations = require('../config/config');

const db = {};
const {
  name,
  username,
  password,
  host,
  port,
  logging,
  pool,
} = configurations.database;
const sequelize = new Sequelize(name, username, password, {
  host,
  port,
  logging,
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: 90000,
    idle: 60000,
  },
  dialect: 'mysql',
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
