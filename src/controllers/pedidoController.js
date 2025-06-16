const Pedido = require('../models/pedido');
const Produto = require('../models/produto');
const PedidoProduto = require('../models/pedidoProduto');
const Usuario = require('../models/usuario');
 
exports.criarPedido = async (req, res) => {
  const userId = req.usuarioId;
  const { produtos } = req.body; // [{ produtoId, quantidade }]
 
  try {
    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({ error: 'Lista de produtos inválida.' });
    }
 
    // Cria o pedido
    const pedido = await Pedido.create({ userId });
 
    // Associa os produtos
    for (const item of produtos) {
      const produto = await Produto.findByPk(item.produtoId);
      if (!produto) {
        return res.status(400).json({ error: `Produto ID ${item.produtoId} não encontrado.` });
      }
 
      await PedidoProduto.create({
        pedidoId: pedido.id,
        produtoId: item.produtoId,
        quantidade: item.quantidade || 1
      });
    }
 
    res.status(201).json({ message: 'Pedido criado com sucesso.', pedidoId: pedido.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
};
 
exports.listarPedidosDoUsuario = async (req, res) => {
  const userId = req.usuarioId;
 
  try {
    const pedidos = await Pedido.findAll({
      where: { userId },
      include: {
        model: Produto,
        through: { attributes: ['quantidade'] }
      }
    });
 
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
};
 
exports.buscarPedidoPorId = async (req, res) => {
  const { id } = req.params;
 
  try {
    const pedido = await Pedido.findByPk(id, {
      include: {
        model: Produto,
        through: { attributes: ['quantidade'] }
      }
    });
 
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado.' });
 
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido.' });
  }
};
 
exports.cancelarPedido = async (req, res) => {
  const { id } = req.params;
 
  const pedido = await Pedido.findByPk(id);
  if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado.' });
 
  try {
    await PedidoProduto.destroy({ where: { pedidoId: id } });
    await pedido.destroy();
    res.json({ message: 'Pedido cancelado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cancelar pedido.' });
  }
};