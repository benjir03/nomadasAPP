//  routes/opinionesRoutes
const express = require('express');
const router = express.Router();
const opinionesController = require('../controllers/opinionesController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Middleware para verificar token

router.get('/:id_actividad', verifyToken, opinionesController.getOpiniones);
router.post('/publicar', verifyToken, opinionesController.postOpinion);

module.exports = router;
