const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada });

    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ mensagem: 'Credenciais inválidas' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: 'Credenciais inválidas' });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro no login', erro: error.message });
  }
};

exports.buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'nome', 'email'] });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar usuários', erro: error.message });
  }
};

exports.perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: ['id', 'nome', 'email']
    });

    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao obter perfil', erro: error.message });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (parseInt(id) !== req.usuarioId) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    await usuario.save();

    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: error.message });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) !== req.usuarioId) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    await usuario.destroy();
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar usuário', erro: error.message });
  }
};
