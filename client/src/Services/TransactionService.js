const axios = require('axios')

const url = 'http://localhost:3000/api/transactions/'

class TransactionService {
	// get
	static getTransactions() {
		return new Promise((resolve, reject) => {
			try {
				let data = []
				axios
					.get(url)
					.then((response) => {
						data = response.data
						resolve(data)
					})
					.catch((err) => console.error(err.message))
			} catch (err) {
				reject(err)
			}
		})
	}
	// post
	static postTransaction(user_id, total_price, cart) {
		return axios.post(url, {
			user_id,
			total_price,
			cart,
		})
	}

		// get sum of all total prices
		static sumOfTotalPrices() {
			return new Promise((resolve, reject) => {
				try{
					let data = []
					axios.get(`${url}total`)
						.then(response => {
							data = response.data
							resolve(data)
						})
						.catch(err => {
							console.error(err.message)	
						})
				}catch(err) {
					reject(err)
				}
			})
		}
}

module.exports = TransactionService
