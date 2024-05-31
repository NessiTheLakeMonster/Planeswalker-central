const { Router } = require('express');
const MazosController = require('../controllers/MazosController');
const router = Router();

router.get('/:id', MazosController.getMazoById);
router.get('/user/:id', MazosController.getMazoByUsuario);
router.get('/cartas/:id', MazosController.getCartasInMazo);

module.exports = router;