const conexao = require('../config/db');

const Produto = {
  listar: (callback) => {
    const sql = 'SELECT produtos.*, categorias.nome AS categoria FROM produtos JOIN categorias ON produtos.id_categoria = categorias.id';
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null);
        return;
      }
      callback(null, resultados);
    });
  },

  criar: (novoProduto, callback) => {
    const sql = 'INSERT INTO produtos SET ?';
    conexao.query(sql, novoProduto, (erro, resultados) => {
      if (erro) {
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null);
        return;
      }
      callback(null, resultados);
    });
  }
};

module.exports = Produto;
