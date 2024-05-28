const {Router} = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const router = Router()

router.get('/', UsuarioController.getUsuarios)

router.get('/:id', UsuarioController.getRolesUsuario)

module.exports = router