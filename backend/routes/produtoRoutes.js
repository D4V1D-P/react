// Importa o framework Express
const express = require('express');
// Cria um roteador do Express
const router = express.Router();
// Importa o controlador de produtos
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos
router.get('/produtos', produtoController.listarProdutos);

// Rota para criar um novo produto
router.post('/produtos', produtoController.criarProduto);

// Exporta o roteador para uso em outros módulos
module.exports = router;
