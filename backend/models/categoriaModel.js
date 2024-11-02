// Importa a configuração da conexão com o banco de dados
const conexao = require('../config/db');

// Cria um objeto Categoria com métodos para interagir com a tabela categorias
const Categoria = {
  // Método para listar todas as categorias
  listar: (callback) => {
    const sql = 'SELECT * FROM categorias'; // SQL para selecionar todas as categorias
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

  // Método para criar uma nova categoria
  criar: (novaCategoria, callback) => {
    const sql = 'INSERT INTO categorias SET ?'; // SQL para inserir uma nova categoria
    conexao.query(sql, novaCategoria, (erro, resultados) => {
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

// Exporta o objeto Categoria para uso em outros módulos
module.exports = Categoria;
