const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  email: {
    type: DataTypes.STRING,
    unique: true,  
    allowNull: false 
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false 
  }
},{
  timestamps: false
});

module.exports = Usuario;