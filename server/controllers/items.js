const db = require('../database/database')
const { getActions, postAction } = require('./actions')
// get
const getItems = async (req, res) => {
    try{
        let sql = `SELECT * FROM items`
        await db.query(sql, (err, data) => {
            if(err){
                throw err
            }
            res.status(200).send(data)
        })
    }catch(err) {
        console.error(err.message)
    }
}

// get using id
const getItem = async (req, res) => {
    try{
        let sql = `SELECT * FROM items WHERE id = ${req.params.id}`
        await db.query(sql, (err, data) => {
            if(err){
                throw err
            }
            res.status(200).send(data)
        })
    }catch(err) {
        console.error(err.message)
    }
}
// post
const postItem = async (req, res) => {
    try{
        let sql = `INSERT INTO items(item_name, item_description, item_qty, item_price) 
        VALUES('${req.body.item_name}', '${req.body.item_description}', '${req.body.item_qty}', '${req.body.item_price}')`
        await db.query(sql, async (err, data, fields) => {
            if(err){
                throw err
            }
            await postAction(req.body.user_id, data.insertId, 'Created an item')
            res.status(201).send()
        })
    }catch(err) {
        console.error(err.message)
    }
}
// patch
const patchItem = async (req, res) => {
    try{
        let sql = `UPDATE items
            SET item_name = '${req.body.item_name}',
            item_description = '${req.body.item_description}',
            item_qty = ${req.body.item_qty},
            item_price = ${req.body.item_price}
            WHERE id = ${req.params.id}
        `
        db.query(sql, async (err, data, fields) => {
            if(err){
                throw err
            }
            await postAction(req.body.user_id, data.insertId, 'Updated an item')
            res.send()
        })
    }catch(err) {
        console.error(err.message)
    }
}

// patch subtract qty of an item in the db
const patchItemQty = async (item_qty, id) => {
    try{
        let sql = `UPDATE ITEMS SET item_qty = item_qty - ${item_qty} WHERE id = ${id}`
        db.query(sql, (err, data) => {
            if(err) throw err
            console.log('Item quantity updated!')
        })
    }catch(err) {
        console.error(err.message)
    }
}

// delete
const deleteItem = async (req, res) => {
    try{
        let sql = `DELETE FROM items WHERE id = ${req.params.id}`
        db.query(sql, async (err, data, fields) => {
            if(err){
                throw err
            }
            await postAction(req.query.user_id, data.insertId, 'Deleted an item')
            res.status(200).send()
        })
    }catch(err) {
        console.error(err.message)
    }
}
module.exports = {
    getItems,
    getItem,
    postItem,
    patchItem,
    patchItemQty,
    deleteItem
}