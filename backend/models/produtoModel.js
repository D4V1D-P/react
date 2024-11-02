// Importa a configuração da conexão com o banco de dados
const conexao = require('../config/db');

// Cria um objeto Produto com métodos para interagir com a tabela produtos
const Produto = {
  // Método para listar todos os produtos, incluindo o nome da categoria
  listar: (callback) => {
    // SQL para selecionar todos os produtos e o nome da categoria correspondente
    const sql = 'SELECT produtos.*, categorias.nome AS categoria FROM produtos JOIN categorias ON produtos.id_categoria = categorias.id';
    
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        // Se ocorrer um erro, registra o erro em um arquivo de log
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null); // Chama o callback com o erro
        return; // Sai da função
      }
      callback(null, resultados); // Chama o callback com os resultados
    });
  },

  // Método para criar um novo produto
  criar: (novoProduto, callback) => {
    const sql = 'INSERT INTO produtos SET ?'; // SQL para inserir um novo produto
    conexao.query(sql, novoProduto, (erro, resultados) => {
      if (erro) {
        // Se ocorrer um erro, registra o erro em um arquivo de log
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null); // Chama o callback com o erro
        return; // Sai da função
      }
      callback(null, resultados); // Chama o callback com os resultados
    });
  }
};

// Exporta o objeto Produto para uso em outros módulos
module.exports = Produto;
