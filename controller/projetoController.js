const express = require("express")
const Projeto = require('../models/projeto');

const router = express.Router()

router.get("/projeto", (req, res) => {
    res.json(Projeto)
})

router.post("/projeto/:nome/:descricao", (req, res) => {
    let {nome, descricao} = req.params // params pega elementos pela url :)
    if(Projeto.length == 0){
        let id = 1
        var projeto = {
            id: id,
            nome: nome,
            descricao: descricao
        }
    }else{
        var projeto = {
            id: Projeto.length + 1,
            nome: nome,
            descricao: descricao
        }
    }
    
    Projeto.push(projeto)
    res.json(Projeto)
})

router.put("/projeto/:id/:nome/:descricao", (req, res) => {
    let {id, nome, descricao} = req.params
    let projeto = Projeto.find(p => p.id == id)
    if(projeto){
        let atualizar = {
            nome: nome,
            descricao: descricao
        }
        Object.assign(projeto,atualizar)  // assign att o json
    }
    res.json(Projeto)
})

router.delete("/projeto/:id", (req, res) => {
    let id = req.params.id
    let index = Projeto.findIndex(p => p.id == id)
    if(index != -1){
        Projeto.splice(index, 1)
    }
    res.json(Projeto)
})

module.exports = router