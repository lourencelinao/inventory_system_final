const axios = require('axios')

const url = 'http://localhost:3000/api/actions'

class ActionService{
    // get
    static getActions() {
        return new Promise((resolve, reject) => {
            try{
                let data = []
                axios.get(url)
                    .then(response => {
                        data = response.data
                        resolve(data)
                    })
                    .catch(err => console.error(err.message))
            }catch(err) {
                console.error(err.message)
            }
        })
    }

}

module.exports = ActionService