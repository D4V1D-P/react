// Importa a configuração da conexão com o banco de dados
const conexao = require('../config/db');

// Cria um objeto Fornecedor com métodos para interagir com a tabela fornecedor
const Fornecedor = {
  // Método para listar todos os fornecedores
  listar: (callback) => {
    const sql = 'SELECT * FROM fornecedor'; // SQL para selecionar todos os fornecedores
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

  // Método para criar um novo fornecedor
  criar: (novoFornecedor, callback) => {
    const sql = 'INSERT INTO fornecedor SET ?'; // SQL para inserir um novo fornecedor
    conexao.query(sql, novoFornecedor, (erro, resultados) => {
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

// Exporta o objeto Fornecedor para uso em outros módulos
module.exports = Fornecedor;
