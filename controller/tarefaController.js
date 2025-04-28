const express = require('express');
const Tarefa = require('../models/tarefa');

const router = express.Router();

// criar tarefa
router.post('/tarefa', async (req, res) => {
  const { titulo, status, idUsuario, idProjeto } = req.body;

  try {
    const tarefa = await Tarefa.create({ titulo, status, idUsuario, idProjeto });
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar tarefa.' });
  }
});

// buscar todas as tarefas
router.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar tarefas.' });
  }
});

// atualizar a tarefa escolida
router.put('/tarefa/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, status, idUsuario, idProjeto } = req.body;

  // ver se a tarefa ja existe
  const tarefa = await Tarefa.findByPk(id);
  if (!tarefa) {
    return res.status(400).json({ error: 'Tarefa não encontrada.' });
  }

  // atualizando os dados da tarefa
  tarefa.titulo = titulo;
  tarefa.status = status;
  tarefa.idUsuario = idUsuario;
  tarefa.idProjeto = idProjeto;

  try {
    await tarefa.save();
    res.json(tarefa);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar tarefa.' });
  }
});

// Deletar uma tarefa
router.delete('/tarefa/:id', async (req, res) => {
  const { id } = req.params;

  const tarefa = await Tarefa.findByPk(id);
  if (!tarefa) {
    return res.status(400).json({ error: 'Tarefa não encontrada.' });
  }

  try {
    await tarefa.destroy();
    res.json({ message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar tarefa.' });
  }
});

module.exports = router;