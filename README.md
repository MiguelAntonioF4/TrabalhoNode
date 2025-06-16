API Backend com Node.js, Sequelize e JWT
Descrição
API RESTful para gerenciar usuários, categorias, produtos e pedidos, com autenticação JWT.

-----------------------------------------------------------------------------------------------
Tecnologias:

Node.js

Express

Sequelize (MySQL)

JWT para autenticação

dotenv para variáveis de ambiente

Swagger para documentação

-----------------------------------------------------------

Você vai precisar ter instalado na sua máquina:
Node.js (versão recomendada: 18+)
MySQL

deve instalar no terminal:

npm install
npm install express sequelize mysql2 dotenv jsonwebtoken bcryptjs swagger-jsdoc swagger-ui-express cors
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

Banco de dados sincronizado!
Servidor rodando em http://localhost:3000


-----------------------------------------------------------
Endpoints principais
POST /usuarios/register — criar usuário

POST /usuarios/login — login e obtenção do token JWT

GET /usuarios — listar usuários (rota protegida)

POST /categorias — criar categoria (rota protegida)

GET /categorias — listar categorias

PUT /categorias/:id — atualizar categoria (rota protegida)

DELETE /categorias/:id — deletar categoria (rota protegida)

POST /produtos — criar produto (rota protegida)

GET /produtos — listar produtos

e outros conforme a API