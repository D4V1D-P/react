const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'produtos_db'
});

conexao.connect((erro) => {
  if (erro) {
    console.log('Erro ao conectar com o banco de dados:', erro);
    require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = conexao;