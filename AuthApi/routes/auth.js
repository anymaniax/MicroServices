let router = require('express').Router()
let ctrl = require('../controllers/auth')

router.get('/check/', ctrl.checkToken)

router.post('/', ctrl.auth)
router.get('/', ctrl.actu)
router.get('/userid', ctrl.requireId)
router.get('/admin', ctrl.requireAdmin)

module.exports = router
