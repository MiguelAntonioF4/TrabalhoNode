const express = require('express');
const Projeto = require('../models/projeto');  // Importando o modelo de Projeto

const router = express.Router();

// Criar um novo projeto
router.post('/projeto', async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    const projeto = await Projeto.create({ nome, descricao });
    res.status(201).json(projeto);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar projeto.' });
  }
});

// Buscar todos os projetos
router.get('/projetos', async (req, res) => {
  try {
    const projetos = await Projeto.findAll();
    res.json(projetos);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar projetos.' });
  }
});

// Atualizar um projeto
router.put('/projeto/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  // Verificando se o projeto existe
  const projeto = await Projeto.findByPk(id);
  if (!projeto) {
    return res.status(400).json({ error: 'Projeto não encontrado.' });
  }

  // Atualizando os dados do projeto
  projeto.nome = nome;
  projeto.descricao = descricao;

  try {
    await projeto.save();
    res.json(projeto);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar projeto.' });
  }
});

// Deletar um projeto
router.delete('/projeto/:id', async (req, res) => {
  const { id } = req.params;

  // Ver se o projeto existe
  const projeto = await Projeto.findByPk(id);
  if (!projeto) {
    return res.status(400).json({ error: 'Projeto não encontrado.' });
  }

  try {
    await projeto.destroy();
    res.json({ message: 'Projeto deletado com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar projeto.' });
  }
});

module.exports = router;