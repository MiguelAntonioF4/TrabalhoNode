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
    allowNull: false,
    unique: {
      msg: 'Este e-mail já está em uso.'
    },
    validate: {
      isEmail: {
        msg: 'Formato de e-mail inválido.'
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});
 
module.exports = Usuario;