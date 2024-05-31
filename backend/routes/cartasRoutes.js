const { Router } = require('express')
const CartasController = require('../controllers/CartasController')
const router = Router()
const checkJWT = require('../middlewares/validarJWT')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')

router.get('/:id', CartasController.getCartaById)

router.post('/',
    [
        check('nombre', 'El nombre de la carta es obligatorio').not().isEmpty(),
    ],
    /* validarCampos, */ CartasController.getCartaByNombreES)

router.post('/guardar', CartasController.guardarCarta)

module.exports = router