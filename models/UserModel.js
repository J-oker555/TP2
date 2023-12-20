const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/database'); 

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_super_admin: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = User;