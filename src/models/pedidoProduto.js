const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PedidoProduto = sequelize.define('PedidoProduto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'pedido_produto',
  timestamps: false
});

module.exports = PedidoProduto;
