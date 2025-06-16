const Produto = require('../models/produto');
const Categoria = require('../models/categoria');
 
exports.criarProduto = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
 
    const categoria = await Categoria.findByPk(categoryId);
    if (!categoria) return res.status(400).json({ error: 'Categoria não encontrada.' });
 
    const produto = await Produto.create({ name, description, price, stock, categoryId });
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar produto.' });
  }
};
 
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: { model: Categoria, attributes: ['id', 'name'] }
    });
    res.json(produtos);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar produtos.' });
  }
};
 
exports.buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id, {
      include: { model: Categoria, attributes: ['id', 'name'] }
    });
 
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado.' });
 
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar produto.' });
  }
};
 
exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, categoryId } = req.body;
 
  const produto = await Produto.findByPk(id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado.' });
 
  if (categoryId) {
    const categoria = await Categoria.findByPk(categoryId);
    if (!categoria) return res.status(400).json({ error: 'Categoria inválida.' });
    produto.categoryId = categoryId;
  }
 
  try {
    produto.name = name ?? produto.name;
    produto.description = description ?? produto.description;
    produto.price = price ?? produto.price;
    produto.stock = stock ?? produto.stock;
 
    await produto.save();
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar produto.' });
  }
};
 
exports.deletarProduto = async (req, res) => {
  const { id } = req.params;
 
  const produto = await Produto.findByPk(id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado.' });
 
  try {
    await produto.destroy();
    res.json({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir produto.' });
  }
};