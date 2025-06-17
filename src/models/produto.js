const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  categoriaId: {             // <-- aqui mudou de categoryId para categoriaId
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias',   // nome da tabela no banco, ok
      key: 'id'
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

Produto.associate = (models) => {
  Produto.belongsTo(models.Categoria, {
    foreignKey: 'categoriaId',  // alinhado com a coluna acima
    onDelete: 'RESTRICT',       // opcional para proteger exclusão
    onUpdate: 'CASCADE'
  });

  Produto.belongsToMany(models.Pedido, {
    through: models.PedidoProduto,
    foreignKey: 'produtoId'
  });
};

module.exports = Produto;
