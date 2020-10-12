const db = require('../database/database')

// get
const getUser = async (req, res) => {
    try{
        let sql = `SELECT id, firstname, lastname, email, position, contact FROM users WHERE email = '${req.params.email}'`
        await db.query(sql, (err, data) => {
            if(err){
                throw err
            }
            res.status(200).send(data)
        })
    }catch(err){
        console.log(err.message)
    }
}

// const test = async (req, res) => {
//     try{
//         let sql = `SELECT * FROM users`
//         await db.query(sql, (err, data) => {
//             if(err){
//                 throw err
//             }
//             res.status(200).send(data)
//         })
//     }catch(err){
//         console.log(err)
//     }
// }

module.exports = {
    getUser
}