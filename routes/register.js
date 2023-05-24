const express = require('express')
const router = express.Router()
const registerController = require('../controller/registerController')

router.get('/', registerController.get)
// POST router
router.post('/', registerController.post)

module.exports = router