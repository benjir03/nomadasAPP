// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/insertarLugar', verifyToken,planController.insertarLugar);
router.get('/obtenerPlan', verifyToken, planController.obtenerPlan);
router.delete('/deleteActividad', verifyToken, planController.deleteActividad);

module.exports = router;