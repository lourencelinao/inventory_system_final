const db = require("../database/database");

const postCart = async (transaction_id, item_id, item_qty) => {
  try{
    let sql = `INSERT INTO carts(transaction_id, item_id, item_qty) VALUES(${transaction_id}, ${item_id}, ${item_qty})`;
    db.query(sql, (err, data) => {
        if(err) throw err
        console.log('Cart Added')
    })
  }catch(err) {
      console.error(err.message)
  }
};

module.exports = {
    postCart
}