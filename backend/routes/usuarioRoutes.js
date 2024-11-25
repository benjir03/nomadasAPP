// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/insertar', usuarioController.insertarUsuario);
router.post('/olvido', usuarioController.olvidoUsuario);

module.exports = router;
