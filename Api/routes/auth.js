let router = require('express').Router()
let ctrl = require('../controllers/auth')

router.post('/', ctrl.auth)
router.get('/', ctrl.actu)


module.exports = router
