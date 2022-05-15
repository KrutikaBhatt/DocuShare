const Sequelize = require("sequelize");

const db = new Sequelize("docushare", "root", "Justchill2*", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
