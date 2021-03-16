
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        contentPost: {
            type: Sequelize.TEXT
        },
        imageUrl: {
            type: Sequelize.STRING
        }
    })
    return Post;
}