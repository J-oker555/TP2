const { DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const User_role = sequelize.define('user_role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: { model: 'role' , key: 'id'},
    },
    utilisateur_id:{
        type: DataTypes.INTEGER,
        references: { model: 'utilisateur' , key: 'id'},
    }
}, {
    freezeTableName: true,
      // Désactiver les colonnes createdAt et updatedAt
    
});





module.exports = User_role;