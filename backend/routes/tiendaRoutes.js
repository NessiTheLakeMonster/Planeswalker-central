const { Router } = require('express')
const TiendaController = require('../controllers/TiendaController')
const router = Router()

router.get('/', TiendaController.getTienda)
router.get('/:id', TiendaController.getTiendaById)

router.post('/', TiendaController.postTienda)

module.exports = router