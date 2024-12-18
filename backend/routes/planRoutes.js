// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/insertarLugar', verifyToken,planController.insertarLugar);
router.get('/obtenerPlan', verifyToken, planController.obtenerPlan);
router.get('/verPlanes', verifyToken, planController.verPlanes);
router.get('/obtenerFavorita', verifyToken, planController.obtenerFavorita)
router.get('/obtenerActividades', verifyToken, planController.obtenerActividades)
router.delete('/deleteActividad', verifyToken, planController.deleteActividad);
router.delete('/eliminarFavorita', verifyToken, planController.eliminarFavorita);

module.exports = router;