const dbConfig = require("../config/db.config");

const Sequelize = require("sequilize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbCOnfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    OperatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;