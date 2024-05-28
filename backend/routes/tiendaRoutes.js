const { Router } = require('express')
const TiendaController = require('../controllers/TiendaController')
const router = Router()
const checkJWT = require('../middlewares/validarJWT')
const { check } = require('express-validator')

router.get('/:id', TiendaController.getTiendaById)

router.route('/')
    .get(TiendaController.getTienda)
    .post(
        [
            check('id_vendedor', 'El id del vendedor es obligatorio').not().isEmpty(),
            check('id_carta', 'El id de la carta es obligatorio').not().isEmpty(),
            check('precio', 'El precio es obligatorio').not().isEmpty(),
            check('estado', 'El estado es obligatorio').not().isEmpty(),
        ],
        checkJWT.validarVendedor, TiendaController.postTienda)

module.exports = router