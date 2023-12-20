const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database');
const User = require('./UserModel'); 

const Role = sequelize.define('Role', {
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
    freezeTableName: true,
    timestamps: false, 
});

Role.belongsToMany(User, {
    through: 'user_role',
    foreignKey: 'role_id'
});
User.belongsToMany(Role, {
    through: 'user_role',
    foreignKey: 'user_id'
});

module.exports = Role; 