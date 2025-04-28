const express = require('express');
const sequelize = require('./config/database');  // importando a configuração do banco
const usuarioController = require("./controller/usuarioController");
const projetoController = require("./controller/projetoController");
const tarefaController = require("./controller/tarefaController");

const app = express();

app.use(express.json());

// Rotas
app.use('/', projetoController);
app.use('/', tarefaController);
app.use('/', usuarioController);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

// Sincronizar o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
