// Importa a biblioteca mysql2 para interagir com o banco de dados MySQL
const mysql = require('mysql2');

// Cria uma conexão com o banco de dados usando as credenciais fornecidas
const conexao = mysql.createConnection({
  host: 'localhost',      // Endereço do servidor MySQL
  user: 'root',           // Nome de usuário para autenticação
  password: '',           // Senha do usuário
  database: 'produtos_db' // Nome do banco de dados a ser utilizado
});

// Estabelece a conexão com o banco de dados
conexao.connect((erro) => {
  if (erro) {
    // Se ocorrer um erro ao conectar, exibe uma mensagem no console
    console.log('Erro ao conectar com o banco de dados:', erro);
    // Registra o erro em um arquivo de log
    require('fs').appendFileSync('./logs/sqlerros.log', `${new Date()} - Erro: ${erro}\n`);
    return; // Sai da função se houver erro
  }
  // Mensagem de sucesso se a conexão for bem-sucedida
  console.log('Conectado ao banco de dados MySQL.');
});

// Exporta a conexão para que possa ser utilizada em outros módulos
module.exports = conexao;
