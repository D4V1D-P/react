const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos
router.get('/produtos', produtoController.listarProdutos);

// Rota para criar um novo produto
router.post('/produtos', produtoController.criarProduto);

module.exports = router;
