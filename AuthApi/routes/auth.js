let router = require('express').Router()
let ctrl = require('../controllers/auth')


router.post('/', ctrl.auth)
router.get('/', ctrl.actu)
router.get('/userid', ctrl.requireId)
router.get('/admin', ctrl.requireAdmin)
router.get('/check/', ctrl.checkToken)


module.exports = router
