const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Projeto = require('./projeto');

const Tarefa = sequelize.define('Tarefa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false  
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false  
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,  // Relacionamento 
      key: 'id'
    }
  },
  idProjeto: {
    type: DataTypes.INTEGER,
    references: {
      model: Projeto,  // Relacionamento
      key: 'id'
    }
  }
},{
  timestamps: false
});

// Definindo os relacionamentos
Tarefa.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Tarefa.belongsTo(Projeto, { foreignKey: 'idProjeto' });

module.exports = Tarefa;