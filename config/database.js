const { Sequelize } = require('sequelize');

                        //coloque aqui o nome do banco de dados 
const sequelize = new Sequelize('atividadeava2node', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

module.exports = sequelize;