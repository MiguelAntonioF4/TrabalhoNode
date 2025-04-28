const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); 

const router = express.Router();

// registro
router.post('/usuario', async (req, res) => {
  const { nome, email, senha } = req.body;

  // já está cadastrado?
  const usuarioExistente = await Usuario.findOne({ where: { email:email } });
  if (usuarioExistente) {
    return res.status(400).json({ error: 'Email já registrado.' });
  }

  // criptografando
  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(senha, salt);

  try {
    const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
});

// login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // ver se o usuário existe
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.status(400).json({ error: 'Usuário não encontrado.' });
  }

  // ver se a senha está correta
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(400).json({ error: 'Senha incorreta.' });
  }

  // gerando (token de autenticação)
  const token = jwt.sign({ id: usuario.id }, 'secreta_chave', { expiresIn: '1h' });

  res.json({ token });
});

// buscar todos os usuários
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar usuários.' });
  }
});

// atualizar um usuário
router.put('/usuario/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

 
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(400).json({ error: 'Usuário não encontrado.' });
  }

  // criptografando a senha
  if (senha) {
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);
    usuario.senha = senhaCriptografada;
  }

  // atualizando os dados do usuário
  usuario.nome = nome;
  usuario.email = email;

  try {
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// deletar um usuário
router.delete('/usuario/:id', async (req, res) => {
  const { id } = req.params;

  // ver se o usuário existe
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(400).json({ error: 'Usuário não encontrado.' });
  }

  try {
    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar usuário.' });
  }
});

module.exports = router;