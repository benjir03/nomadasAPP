const express = require('express');
const router = express.Router();
const gustosController = require('../controllers/gustosController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Ruta para iniciar sesión (login)
router.post('/registrar', verifyToken, gustosController.registrar);
router.put('/modificar', verifyToken, gustosController.modificar);
router.get('/gustos', verifyToken, gustosController.gustos);

module.exports = router;