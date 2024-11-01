const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para listar todas as categorias
router.get('/categorias', categoriaController.listarCategorias);

// Rota para criar uma nova categoria
router.post('/categorias', categoriaController.criarCategoria);



module.exports = router;
