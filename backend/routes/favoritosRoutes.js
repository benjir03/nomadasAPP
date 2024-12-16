const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas para Favoritos
router.post('/registrar', verifyToken, favoritosController.registrar);
router.get('/obtener', verifyToken, favoritosController.obtener);
router.delete('/eliminar', verifyToken, favoritosController.eliminar);

module.exports = router;
