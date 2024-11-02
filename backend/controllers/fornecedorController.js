// Importa o modelo Fornecedor, que contém as funções relacionadas a fornecedores
const Fornecedor = require('../models/fornecedorModel');

// Função para listar todos os fornecedores
exports.listarFornecedor = (req, res) => {
  // Chama o método listar do modelo Fornecedor
  Fornecedor.listar((erro, resultados) => {
    if (erro) {
      // Se ocorrer um erro, responde com status 500 e uma mensagem de erro
      res.status(500).json({ erro: 'Erro ao listar fornecedor.' });
    } else {
      // Se a busca for bem-sucedida, retorna os resultados em formato JSON
      res.json(resultados);
    }
  });
};

// Função para criar um novo fornecedor
exports.criarFornecedor = (req, res) => {
  // Obtém os dados do novo fornecedor do corpo da requisição
  const novoFornecedor = req.body;
  
  // Chama o método criar do modelo Fornecedor, passando o novo fornecedor
  Fornecedor.criar(novoFornecedor, (erro, resultados) => {
    if (erro) {
      // Se ocorrer um erro, responde com status 500 e uma mensagem de erro
      res.status(500).json({ erro: 'Erro ao cadastrar fornecedor.' });
    } else {
      // Se a criação for bem-sucedida, responde com status 201 e o ID do novo fornecedor
      res.status(201).json({ id: resultados.insertId });
    }
  });
};
