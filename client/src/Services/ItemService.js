const axios = require('axios')

const url = 'http://localhost:3000/api/items/'

class ItemService {
	// get
	static getItems() {
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

	// get using id
	static getItem(id) {
		return new Promise((resolve, reject) => {
			try {
				let data = []
				axios
					.get(`${url}${id}`)
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
	static postItem(name, description, qty, price, user_id) {
		// escaping apostrophes and backward slash
		name = name.replace(/\'/g, "''")
		description = description.replace(/\'/g, "''")

		return axios.post(url, {
			item_name: name,
			item_description: description,
			item_qty: qty,
			item_price: price,
			user_id,
		})
		// return new Promise((resolve, reject) => {
		//     try{
		//         let id
		//         axios.post()
		//     }catch(err) {
		//         console.error(err.message)
		//     }
		// })
	}

	// edit
	static patchItem(item) {
		// escaping apostrophes and backward slash
		item.item_name = item.item_name.replace(/\'/g, "''")
		item.item_description = item.item_description.replace(/\'/g, "''")
		return axios
			.patch(`${url}${item.id}`, {
				item_name: item.item_name,
				item_description: item.item_description,
				item_qty: item.item_qty,
				item_price: item.item_price,
				user_id: item.user_id,
			})
			.catch((err) => console.error(err.message))
	}

	// delete
	static deleteItem(id, user_id) {
		return axios.delete(`${url}${id}`, {
			params: {
				user_id,
			},
		})
	}
}

module.exports = ItemService
