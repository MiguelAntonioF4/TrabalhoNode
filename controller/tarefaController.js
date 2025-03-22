const express = require("express")
const Tarefa = require('../models/tarefa')

const router = express.Router()

router.get("/tarefa", (req, res) => {
    res.json(Tarefa)
})

router.post("/tarefa/:titulo/:status/:idUsuario/:idProjeto", (req, res) => {
    let {titulo, status, idUsuario, idProjeto} = req.params // params pega elementos pela url :)
    if(Tarefa.length == 0){
        let id = 1
        var tarefa = {
            id: id,
            titulo: titulo,
            status: status,
            idUsuario: idUsuario,
            idProjeto: idProjeto
        }
    }else{
        var tarefa = {
            id: Tarefa.length + 1,
            titulo: titulo,
            status: status,
            idUsuario: idUsuario,
            idProjeto: idProjeto
        }
    }
    
    Tarefa.push(tarefa)
    res.json(Tarefa)
})

router.put("/tarefa/:id/:titulo/:status/:idUsuario/:idProjeto", (req, res) => {
    let {id, titulo, status, idUsuario, idProjeto} = req.params
    let tarefa = Tarefa.find(p => p.id == id)
    if(tarefa){
        let atualizar = {
            titulo: titulo,
            status: status,
            idUsuario: idUsuario,
            idProjeto: idProjeto
        }
        Object.assign(tarefa,atualizar)  // assign att o json
    }
    res.json(Tarefa)
})

router.delete("/tarefa/:id", (req, res) => {
    let id = req.params.id
    let index = Tarefa.findIndex(p => p.id == id)
    if(index != -1){
        Tarefa.splice(index, 1)
    }
    res.json(Tarefa)
})

module.exports = router