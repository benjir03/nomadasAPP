// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware para verificar token

// Ruta para iniciar sesión (login)
router.post('/login', authController.login);

// Ruta para cerrar sesión (logout)
router.post('/logout', authController.logout);

// Ruta para obtener información del perfil (protegida)
router.get('/perfil', verifyToken, authController.getPerfil);

// Ruta para eliminar cuenta (protegida)
router.delete('/eliminar', verifyToken, authController.eliminarCuenta);

// Ruta para modificar el perfil del usuario (protegida)
router.put('/modificar', verifyToken, authController.modificarPerfil);

// Ruta para verificar el correo
router.put('/verificar', verifyToken, authController.verificar);

module.exports = router;