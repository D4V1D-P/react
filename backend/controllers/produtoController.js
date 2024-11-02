// Importa o modelo Produto, que contém as funções relacionadas a produtos
const Produto = require('../models/produtoModel');

// Função para listar todos os produtos
exports.listarProdutos = (req, res) => {
  // Chama o método listar do modelo Produto
  Produto.listar((erro, resultados) => {
    if (erro) {
      // Se ocorrer um erro, responde com status 500 e uma mensagem de erro
      res.status(500).json({ erro: 'Erro ao buscar produtos.' });
    } else {
      // Se a busca for bem-sucedida, retorna os resultados em formato JSON
      res.json(resultados);
    }
  });
};

// Função para criar um novo produto
exports.criarProduto = (req, res) => {
  // Obtém os dados do novo produto do corpo da requisição
  const novoProduto = req.body;

  // Calculando o preço de venda com base no custo e no markup
  const precoVenda = novoProduto.custo * (1 + novoProduto.markup / 100);
  novoProduto.preco = precoVenda; // Adiciona o preço de venda ao objeto do produto

  // Chama o método criar do modelo Produto, passando o novo produto
  Produto.criar(novoProduto, (erro, resultados) => {
    if (erro) {
      // Se ocorrer um erro, responde com status 500 e uma mensagem de erro
      res.status(500).json({ erro: 'Erro ao criar produto.' });
    } else {
      // Se a criação for bem-sucedida, responde com status 201 e o ID do novo produto
      res.status(201).json({ id: resultados.insertId });
    }
  });
};
