const Produto = require('../models/produto');
const Categoria = require('../models/categoria');

exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, categoriaId } = req.body;

    if (!nome || !preco || !categoriaId) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });

    const produto = await Produto.create({ nome, preco, categoriaId });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar produto', erro: error.message });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({ include: Categoria });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar produtos', erro: error.message });
  }
};

exports.buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id, { include: Categoria });

    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: error.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, categoriaId } = req.body;

    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });

    if (categoriaId) {
      const categoria = await Categoria.findByPk(categoriaId);
      if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }

    produto.nome = nome || produto.nome;
    produto.preco = preco || produto.preco;
    produto.categoriaId = categoriaId || produto.categoriaId;
    await produto.save();

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar produto', erro: error.message });
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });

    await produto.destroy();
    res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar produto', erro: error.message });
  }
};
