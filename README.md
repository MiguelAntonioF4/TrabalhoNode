Este projeto é uma API básica em Node.js usando Express e Sequelize para cadastro, login e gerenciamento de usuários.


Você vai precisar ter instalado na sua máquina:

Node.js (versão recomendada: 18+)
MySQL
-----------------------------------------------------------
deve instalar todas as dependências listadas no package.json, incluindo express, sequelize, mysql2, bcrypt, jsonwebtoken

npm install
-----------------------------------------------------------
 configure a conexão com o banco de dados no arquivo onde você inicializa o Sequelize

 Exemplo:

 const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome_do_seu_banco', 'usuario_mysql', 'senha_mysql', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;


-----------------------------------------------------------
caso de tudo certo essas mensagens vão aparecer:

Servidor rodando em http://localhost:3000
Conexão com o banco de dados bem-sucedida!
Banco de dados sincronizado!

-----------------------------------------------------------
rotas da API:

POST /usuario → Cadastrar novo usuário

Exemplo: http://localhost:3000/usuario  

POST /login → Login de usuário

GET /usuarios → Listar todos os usuários

PUT /usuario/:id → Atualizar usuário

DELETE /usuario/:id → Deletar usuário

-----------------------------------------------------------
Tecnologias usadas
Node.js

Express

Sequelize ORM

MySQL

bcrypt

JSON Web Token (JWT)