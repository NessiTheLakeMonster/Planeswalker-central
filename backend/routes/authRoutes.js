const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const router = Router()
const { emailExiste } = require('../helpers/customUnique')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')

router.post('/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    AuthController.login)

router.post('/registro',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('nick', 'El nick es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        /* check('email').custom(emailExiste), */
        validarCampos
    ],
    AuthController.registro)

module.exports = router