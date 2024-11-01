const Produto = require('../models/produtoModel');

exports.listarProdutos = (req, res) => {
  Produto.listar((erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao buscar produtos.' });
    } else {
      res.json(resultados);
    }
  });
};

exports.criarProduto = (req, res) => {
  const novoProduto = req.body;

  // Calculando o preço de venda
  const precoVenda = novoProduto.custo * (1 + novoProduto.markup / 100);
  novoProduto.preco = precoVenda;

  Produto.criar(novoProduto, (erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao criar produto.' });
    } else {
      res.status(201).json({ id: resultados.insertId });
    }
  });
};
