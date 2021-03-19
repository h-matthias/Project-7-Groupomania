
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        contentComment: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    })
    return Comment;
}