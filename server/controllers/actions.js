const db = require("../database/database");

// get
const getActions = async (req, res) => {
  try {
    let sql = `SELECT actions.id as action_id, actions.action_type, actions.created_at, users.id as user_id, users.firstname, users.lastname, users.position
    FROM actions
    LEFT JOIN users
    ON actions.user_id = users.id ORDER BY actions.id DESC LIMIT 5`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      res.status(200).send(data);
    });
  } catch (err) {
    console.error(err.message);
  }
};

// this method is called in the item controller
const postAction = async (user_id, item_id, action_type) => {
  try {
    let sql = `INSERT INTO actions(user_id, item_id, action_type)
        VALUES(${user_id}, ${item_id}, '${action_type}')`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      console.log("New Action Created!");
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getActions,
  postAction,
};
