const express = require('express')
const router = express.Router()

// import controller
const { getItems, getItem, postItem, patchItem, deleteItem } = require('../../controllers/items.js')

// get
router.get('/', getItems)
router.get('/:id', getItem)
// post
router.post('/', postItem)
// patch
router.patch('/:id', patchItem)
// delete
router.delete('/:id', deleteItem)

module.exports = router