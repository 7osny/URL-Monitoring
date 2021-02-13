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
    checkId: {
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
      type: db.Sequelize.STRING(255),
      allowNull: true,
    /*  set(val) {
        this.setDataValue('authentication', `${val.username},${val.password}`);
        },
        get() {
        const key = this.getDataValue('authentication').split(',');
        return { username: key[0], password: key[1]};
        },*/
    },
    httpHeaders: {
      type: db.Sequelize.STRING(255),
      allowNull: true,
    },
    assertStatusCode: {
      type: db.Sequelize.INTEGER(10),
      allowNull: true,
    },
    tags: {
      type: db.Sequelize.STRING(255),
      allowNull: true,
   /*   get() {
        return this.getDataValue('tags').split(',');
        },
        set(val) {
        this.setDataValue('tags', val.join(','));
        },*/
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