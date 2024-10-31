const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const path = require('path');

const app = express();

// Middleware CORS para permitir requisições de outros domínios
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Definir a pasta 'public' como estática para servir arquivos HTML (se necessário)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para produtos e categorias
app.use('/api', produtoRoutes);
app.use('/api', categoriaRoutes);

// Rota para a página principal, se necessário
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
