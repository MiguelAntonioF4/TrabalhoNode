const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis do .env
 
const sequelize = new Sequelize(
  process.env.DB_NAME || 'backend_db',      // nome do banco
  process.env.DB_USER || 'root',            // usuário do banco
  process.env.DB_PASS || '',                // senha do banco
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // desativa logs SQL no terminal
  }
);
 
module.exports = sequelize;