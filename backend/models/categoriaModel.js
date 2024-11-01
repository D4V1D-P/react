const conexao = require('../config/db');

const Categoria = {
  listar: (callback) => {
    const sql = 'SELECT * FROM categorias';
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null);
        return;
      }
      callback(null, resultados);
    });
  },

  criar: (novaCategoria, callback) => {
    const sql = 'INSERT INTO categorias SET ?';
    conexao.query(sql, novaCategoria, (erro, resultados) => {
      if (erro) {
        require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
        callback(erro, null);
        return;
      }
      callback(null, resultados);
    });
  }
};

module.exports = Categoria;