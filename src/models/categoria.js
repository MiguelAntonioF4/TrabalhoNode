const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false
});

Categoria.associate = (models) => {
  Categoria.hasMany(models.Produto, {
    foreignKey: 'categoriaId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
};

module.exports = Categoria;
