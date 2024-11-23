// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware para verificar token

router.post('/insertar', usuarioController.insertarUsuario);
router.post('/olvido', usuarioController.olvidoUsuario);

module.exports = router;
