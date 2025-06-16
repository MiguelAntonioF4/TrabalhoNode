require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

// Rotas base da API
app.use('/api', usuarioRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', produtoRoutes);
app.use('/api', pedidoRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API Backend funcionando com sucesso!');
});

module.exports = app;
