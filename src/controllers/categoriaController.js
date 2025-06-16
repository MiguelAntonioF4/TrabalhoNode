const Categoria = require('../models/categoria');
const Produto = require('../models/produto');

// Cria categoria
exports.criarCategoria = async (req, res) => {
  try {
    const { name } = req.body;
    const categoria = await Categoria.create({ name });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar categoria.' });
  }
};

// Lista todas categorias
exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar categorias.' });
  }
};

// Busca categoria por ID
exports.buscarCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar categoria.' });
  }
};

// Atualiza categoria
exports.atualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const categoria = await Categoria.findByPk(id);
  if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada.' });

  try {
    categoria.name = name;
    await categoria.save();
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar categoria.' });
  }
};

// Deleta categoria
exports.deletarCategoria = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByPk(id);
  if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada.' });

  const produtos = await Produto.findAll({ where: { categoriaId: id } });
  if (produtos.length > 0) {
    return res.status(400).json({ error: 'Categoria possui produtos associados.' });
  }

  try {
    await categoria.destroy();
    res.json({ message: 'Categoria excluída com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir categoria.' });
  }
};
