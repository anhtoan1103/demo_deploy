const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')

router.get('/', loginController.get)
// POST router
router.post('/', loginController.post)

module.exports = router