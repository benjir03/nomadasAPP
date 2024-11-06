// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/insertar', usuarioController.insertarUsuario);

module.exports = router;

// Ruta para actualizar un usuario
router.put('/actualizar/:id', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario
router.delete('/eliminar/:id', usuarioController.eliminarUsuario);

module.exports = router;
