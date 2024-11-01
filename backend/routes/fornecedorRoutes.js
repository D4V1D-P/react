const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

// Rota para listar todos as fornecedores
router.get('/fornecedor', fornecedorController.listarFornecedor);

// Rota para criar uma novo fornecedor
router.post('/fornecedor', fornecedorController.criarFornecedor);



module.exports = router;