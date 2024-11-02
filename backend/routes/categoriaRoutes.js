// Importa o framework Express
const express = require('express');
// Cria um roteador do Express
const router = express.Router();
// Importa o controlador de categorias
const categoriaController = require('../controllers/categoriaController');

// Rota para listar todas as categorias
router.get('/categorias', categoriaController.listarCategorias);

// Rota para criar uma nova categoria
router.post('/categorias', categoriaController.criarCategoria);

// Exporta o roteador para uso em outros módulos
module.exports = router;
