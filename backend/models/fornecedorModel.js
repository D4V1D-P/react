const conexao = require('../config/db');

const Fornecedor = {
  listar: (callback) => {
    const sql = 'SELECT * FROM fornecedor'; //fornecedor
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null);
        return;
      }
      callback(null, resultados);
    });
  },

  criar: (novoFornecedor, callback) => {
    const sql = 'INSERT INTO fornecedor SET ?';
    conexao.query(sql, novoFornecedor, (erro, resultados) => {
      if (erro) {
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null);
        return;
      }
      callback(null, resultados);
    });
  }
};

module.exports = Fornecedor;