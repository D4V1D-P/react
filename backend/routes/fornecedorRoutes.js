// Importa o framework Express
const express = require('express');
// Cria um roteador do Express
const router = express.Router();
// Importa o controlador de fornecedores
const fornecedorController = require('../controllers/fornecedorController');

// Rota para listar todos os fornecedores
router.get('/fornecedor', fornecedorController.listarFornecedor);

// Rota para criar um novo fornecedor
router.post('/fornecedor', fornecedorController.criarFornecedor);

// Exporta o roteador para uso em outros módulos
module.exports = router;
