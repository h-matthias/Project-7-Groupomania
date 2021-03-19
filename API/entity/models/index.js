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
db.post = require ("../post/post.model")(sequelize, Sequelize);
db.comment = require ("../comment/comment.model")(sequelize, Sequelize);

db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.post.hasMany(db.comment, {as: "comments"});
db.comment.belongsTo(db.user)
db.comment.belongsTo(db.post);

module.exports = db;