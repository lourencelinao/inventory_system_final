const express = require('express')
const router = express.Router()

// import controllers
const { getActions} = require('../../controllers/actions')
// get
router.get('/', getActions)


module.exports = router;