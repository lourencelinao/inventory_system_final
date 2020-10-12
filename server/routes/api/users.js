const express = require('express')
const router = express.Router()

// import controllers
const { getUser } = require('../../controllers/users')

// get
router.get('/:email', getUser)

// router.get('/', test)

module.exports = router