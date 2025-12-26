const db = require("../config/database");

exports.getByUser = (userId, cb) => {
  db.query(
    `SELECT c.id, c.product_id, p.name, p.price, c.quantity
     FROM cart c
     JOIN products p ON p.id = c.product_id
     WHERE c.user_id = ?`,
    [userId],
    cb
  );
};

exports.add = (userId, productId, quantity, cb) => {
  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + ?
  `;
  db.query(sql, [userId, productId, quantity, quantity], cb);
};

exports.updateQuantity = (id, quantity, cb) => {
  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ?",
    [quantity, id],
    cb
  );
};

exports.remove = (id, cb) => {
  db.query("DELETE FROM cart WHERE id = ?", [id], cb);
};

exports.clear = (userId, cb) => {
  db.query("DELETE FROM cart WHERE user_id = ?", [userId], cb);
};
