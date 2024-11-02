// Importa o modelo de Categoria, que contém as funções relacionadas a categorias
const Categoria = require('../models/categoriaModel');

// Função para listar todas as categorias
exports.listarCategorias = (req, res) => {
  // Chama o método listar do modelo Categoria
  Categoria.listar((erro, resultados) => {
    if (erro) {
      // Se ocorrer um erro, responde com status 500 e uma mensagem de erro
      res.status(500).json({ erro: 'Erro ao buscar categorias.' });
    } else {
      // Se a busca for bem-sucedida, retorna os resultados em formato JSON
      res.json(resultados);
    }
  });
};

// Função para criar uma nova categoria
exports.criarCategoria = (req, res) => {
  // Obtém os dados da nova categoria do corpo da requisição
  const novaCategoria = req.body;
  
  // Chama o método criar do modelo Categoria, passando a nova categoria
  Categoria.criar(novaCategoria, (erro, resultados) => {
    if (erro) {
      // Se ocorrer um erro, responde com status 500 e uma mensagem de erro
      res.status(500).json({ erro: 'Erro ao criar categoria.' });
    } else {
      // Se a criação for bem-sucedida, responde com status 201 e o ID da nova categoria
      res.status(201).json({ id: resultados.insertId });
    }
  });
};
