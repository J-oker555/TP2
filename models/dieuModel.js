const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/database'); 

const Dieu = sequelize.define('dieu', {
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
    description: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = Dieu;