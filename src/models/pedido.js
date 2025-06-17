const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'pedidos',
  timestamps: true,
  createdAt: 'dataCriacao',
  updatedAt: false
});

Pedido.associate = (models) => {
  Pedido.belongsTo(models.Usuario, {
    foreignKey: 'usuarioId'
  });

  Pedido.belongsToMany(models.Produto, {
    through: models.PedidoProduto,
    foreignKey: 'pedidoId'
  });
};

module.exports = Pedido;
