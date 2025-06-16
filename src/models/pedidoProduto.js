const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
 
const PedidoProduto = sequelize.define('PedidoProduto', {
  pedidoId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  produtoId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'pedido_produtos',
  timestamps: false
});
 
module.exports = PedidoProduto;