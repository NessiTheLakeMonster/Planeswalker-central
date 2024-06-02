const { Router } = require('express');
const MazosController = require('../controllers/MazosController');
const router = Router();
const checkJWT = require('../middlewares/validarJWT')

router.get('/:id', MazosController.getMazoById);
router.get('/user/:id', checkJWT.validarJWT, MazosController.getMazoByUsuario);
router.get('/cartas/:id', checkJWT.validarJWT, MazosController.getCartasInMazo);

module.exports = router;