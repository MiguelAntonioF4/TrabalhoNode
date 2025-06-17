const Categoria = require('../models/categoria');
const Produto = require('../models/produto');

exports.criarCategoria = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ mensagem: 'Nome é obrigatório' });
    }

    const categoria = await Categoria.create({ name: name.trim() });
    res.status(201).json(categoria);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ mensagem: 'Erro ao criar categoria', erro: error.message });
  }
};

exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ mensagem: 'Erro ao listar categorias', erro: error.message });
  }
};

exports.buscarCategoriaPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ mensagem: 'ID inválido' });

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });

    res.status(200).json(categoria);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar categoria', erro: error.message });
  }
};

exports.atualizarCategoria = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ mensagem: 'ID inválido' });

    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ mensagem: 'Nome é obrigatório para atualização' });
    }

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });

    categoria.name = name.trim();
    await categoria.save();

    res.status(200).json(categoria);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar categoria', erro: error.message });
  }
};

exports.deletarCategoria = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ mensagem: 'ID inválido' });

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });

    const produtos = await Produto.findAll({ where: { categoriaId: id } });
    if (produtos.length > 0) {
      return res.status(400).json({ mensagem: 'Não é possível deletar: produtos vinculados à categoria.' });
    }

    await categoria.destroy();
    res.status(200).json({ mensagem: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ mensagem: 'Erro ao deletar categoria', erro: error.message });
  }
};
