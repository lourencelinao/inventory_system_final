const axios = require('axios')

const url = 'http://localhost:3000/api/users/'

class UserService{
    static getUser(email){
        return new Promise((resolve, reject) => {
            try{
                let data = []
                axios.get(`${url}${email}`)
                .then(response => {
                    data = response.data
                    resolve(data)
                })
                .catch( err => {
                    console.error(err.message)
                })
            }catch(err) {
                reject(error)
            }
        })
    }
}

module.exports = UserService;