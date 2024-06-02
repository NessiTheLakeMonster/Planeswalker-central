const {Router} = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const router = Router()

router.get('/', UsuarioController.getUsuarios)

router.get('/:id', UsuarioController.getRolesUsuario)

router.get('/user/:id', UsuarioController.getUsuarioById)

module.exports = router