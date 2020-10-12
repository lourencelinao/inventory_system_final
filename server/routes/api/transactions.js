const express = require('express')
const router = express.Router()

// import controller
const {
	getTransactions,
	postTransaction,
	sumOfTotalPrices
} = require('../../controllers/transactions.js')


// get
router.get('/', getTransactions)
router.get('/total', sumOfTotalPrices)

// post
router.post('/', postTransaction)

module.exports = router
