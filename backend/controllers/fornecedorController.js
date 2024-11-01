const Fornecedor = require('../models/fornecedorModel');

exports.listarFornecedor = (req, res) => {
    Fornecedor.listar((erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao listar fornecedor.' });
    } else {
      res.json(resultados);
    }
  });
};

exports.criarFornecedor = (req, res) => {
  const novoFornecedor = req.body;
  Fornecedor.criar(novoFornecedor, (erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao cadastrar fornecedor.' });
    } else {
      res.status(201).json({ id: resultados.insertId });
    }
  });
};
