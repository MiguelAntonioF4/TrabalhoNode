const express = require("express")
const Usuario = require('../models/usuario')

const router = express.Router()

router.get("/usuario", (req, res) => {
    res.json(Usuario)
})

router.post("/usuario/:nome/:email/:senha", (req, res) => {
    let {nome, email, senha} = req.params // params pega elementos pela url :)
    if(Usuario.length == 0){
        let id = 1
        var usuario = {
            id: id,
            nome: nome,
            email: email,
            senha: senha
        }
    }else{
        var usuario = {
            id: Usuario.length + 1,
            nome: nome,
            email: email,
            senha: senha
        }
    }
    
    Usuario.push(usuario)
    res.json(Usuario)
})

router.put("/usuario/:id/:nome/:email/:senha", (req, res) => {
    let {id, nome, email, senha} = req.params
    let usuario = Usuario.find(p => p.id == id)
    if(usuario){
        let atualizar = {
            nome: nome,
            email: email,
            senha: senha
        }
        Object.assign(usuario,atualizar)  // assign att o json
    }
    res.json(Usuario)
})

router.delete("/usuario/:id", (req, res) => {
    let id = req.params.id
    let index = Usuario.findIndex(p => p.id == id)
    if(index != -1){
        Usuario.splice(index, 1)
    }
    res.json(Usuario)
})


module.exports = router