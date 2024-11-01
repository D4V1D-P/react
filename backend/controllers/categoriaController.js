const Categoria = require('../models/categoriaModel');

exports.listarCategorias = (req, res) => {
  Categoria.listar((erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao buscar categorias.' });
    } else {
      res.json(resultados);
    }
  });
};

exports.criarCategoria = (req, res) => {
  const novaCategoria = req.body;
  Categoria.criar(novaCategoria, (erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: 'Erro ao criar categoria.' });
    } else {
      res.status(201).json({ id: resultados.insertId });
    }
  });
};
