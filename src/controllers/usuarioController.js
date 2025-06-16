const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
require('dotenv').config();
 
exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
 
  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) {
    return res.status(400).json({ error: 'Email já registrado.' });
  }
 
  const senhaCriptografada = await bcrypt.hash(senha, 10);
 
  try {
    const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};
 
exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
 
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) return res.status(400).json({ error: 'Usuário não encontrado.' });
 
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(400).json({ error: 'Senha incorreta.' });
 
  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
  res.json({ token });
};
 
exports.buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'nome', 'email'] });
    res.json(usuarios);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar usuários.' });
  }
};
 
exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
 
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
 
  if (senha) {
    usuario.senha = await bcrypt.hash(senha, 10);
  }
 
  usuario.nome = nome;
  usuario.email = email;
 
  try {
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário.' });
  }
};
 
exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;
 
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
 
  try {
    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar usuário.' });
  }
};
 
exports.perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: ['id', 'nome', 'email']
    });
 
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
 
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
};