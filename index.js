const express = require('express')
const usuarioController = require("./controller/usuarioController");
const projetoController = require("./controller/projetoController");
const tarefaController = require("./controller/tarefaController");

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.use('/', projetoController)
app.use('/', tarefaController)
app.use('/', usuarioController)






app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})