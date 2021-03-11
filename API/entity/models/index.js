/***
 * Initialisation de Sequelize
 *****/

const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER , dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require ("../user/user.model")(sequelize, Sequelize);



module.exports = db;