const Pedido = require('../models/pedido');
const Produto = require('../models/produto');
const PedidoProduto = require('../models/pedidoProduto');

exports.criarPedido = async (req, res) => {
  try {
    const userId = req.usuarioId;
    const { produtos } = req.body;

    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({ mensagem: 'Lista de produtos inválida' });
    }

    const pedido = await Pedido.create({ usuarioId: userId });

    for (const item of produtos) {
      const produto = await Produto.findByPk(item.produtoId);
      if (!produto) continue;

      await PedidoProduto.create({
        pedidoId: pedido.id,
        produtoId: item.produtoId,
        quantidade: item.quantidade || 1,
      });
    }

    res.status(201).json({ mensagem: 'Pedido criado com sucesso', pedidoId: pedido.id });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar pedido', erro: error.message });
  }
};

exports.listarPedidosDoUsuario = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { usuarioId: req.usuarioId },
      include: {
        model: Produto,
        through: { attributes: ['quantidade'] }
      }
    });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar pedidos', erro: error.message });
  }
};

exports.buscarPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id, {
      include: {
        model: Produto,
        through: { attributes: ['quantidade'] }
      }
    });

    if (!pedido || pedido.usuarioId !== req.usuarioId) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado ou não autorizado' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar pedido', erro: error.message });
  }
};

exports.cancelarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);

    if (!pedido || pedido.usuarioId !== req.usuarioId) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado ou não autorizado' });
    }

    await PedidoProduto.destroy({ where: { pedidoId: id } });
    await pedido.destroy();

    res.status(200).json({ mensagem: 'Pedido cancelado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cancelar pedido', erro: error.message });
  }
};
