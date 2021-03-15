
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type : Sequelize.INTEGER,
            defaultValue: 0
        }

    })
    return User;
}