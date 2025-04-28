const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Projeto = sequelize.define('Projeto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false  // O nome do projeto não pode ser nulo
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
},{
  timestamps: false
});

module.exports = Projeto;