const db = require("../database/init");
const options = {
  freezeTableName: true,
  tableName: "checks",
  modelName: "checks",
  createdAt: false,
  updatedAt: false,
};
const Check = db.sequelize.define(
  "Check", {
    id: {
      autoIncrement: true,
      type: db.Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: db.Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    url: {
      type: db.Sequelize.STRING(100),
      allowNull: false,
    },
    protocol: {
      type: db.Sequelize.ENUM("HTTP", "HTTPS", "TCP"),
      allowNull: false,
    },
    path: {
      type: db.Sequelize.STRING(100),
      allowNull: true,
    },
    port: {
      type: db.Sequelize.INTEGER(8).UNSIGNED,
    },
    webhook: {
      type: db.Sequelize.STRING(100),
      allowNull: true,
    },
    timeOutInSeconds: {
      type: db.Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 5
    },
    interval: {
      type: db.Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 10
    },
    threshold: {
      type: db.Sequelize.INTEGER(10).UNSIGNED,
      defaultValue: 10
    },
    authentication: {
      type: db.Sequelize.STRING(200),
      allowNull: true,
    },
    httpHeaders: {
      type: db.Sequelize.STRING(1000),
      allowNull: true,
    },
    assertStatusCode: {
      type: db.Sequelize.INTEGER(10),
      allowNull: true,
    },
    tags: {
      type: db.Sequelize.STRING(1000),
      allowNull: true,
    },
    ignoreSSL: {
      type: db.Sequelize.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: db.Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      }
    },
  },
  options
);

module.exports = Check;