const db = require('../database/database')

// import cart controller
const { postCart } = require('./cart')
const { patchItemQty } = require('./items')

// get
const getTransactions = async (req, res) => {
	try {
		let sql = `SELECT transactions.id, transactions.total_price, transactions.created_at, users.firstname, users.lastname, users.position
    FROM transactions
    LEFT JOIN users
    ON transactions.user_id = users.id`
		db.query(sql, (err, data) => {
			if (err) throw err
			res.status(200).send(data)
		})
	} catch (err) {
		console.error(err.message)
	}
}

// post
const postTransaction = async (req, res) => {
	try {
		let sql = `INSERT INTO transactions(user_id, total_price) VALUES(${req.body.user_id}, ${req.body.total_price})`
		db.query(sql, async (err, data, fields) => {
			if (err) throw err
			req.body.cart.forEach(async (x) => {
				await postCart(data.insertId, x.item_id, x.item_qty)
				await patchItemQty(x.item_qty, x.item_id)
			})
			res.status(200).send()
		})
	} catch (err) {
		console.error(err.message)
	}
}

const sumOfTotalPrices = async (req, res) => {
    try{
        let sql = `SELECT SUM(total_price) as sum_of_all_total_price FROM transactions`
        db.query(sql, (err, data) => {
            if(err) throw err
            res.status(200).send(data)
        })
    }catch(err) {
        console.error(err.message)
    }
}


module.exports = {
	getTransactions,
	postTransaction,
	sumOfTotalPrices
}
