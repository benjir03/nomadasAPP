// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware para verificar token

// Ruta para iniciar sesión (login)
router.post('/login', authController.login);

// Ruta para cerrar sesión (logout)
router.post('/logout', authController.logout);

// Ruta para obtener el perfil del usuario autenticado
router.get('/perfil', verifyToken, authController.getPerfil);

module.exports = router;

