const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/database'); 
const User = require('./UserModel');

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

Role.belongsToMany(User, {
    through: 'role_user',
    foreignKey: 'role_id'
});
User.belongsToMany(Role, {
    through: 'role_user',
    foreignKey: 'user_id'
});

module.exports = Role;