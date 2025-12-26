const db = require('../config/database');

exports.create = (userId, total, cb) => {
  const sql = `INSERT INTO orders (user_id, total, status, created_at) VALUES (?, ?, 'PENDING', NOW())`;
  db.query(sql, [userId, total], cb);
};

exports.addItemsBulk = (itemsData, cb) => {
  const sql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
  db.query(sql, [itemsData], cb);
};

exports.getByUser = (userId, cb) => {
  const sql = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`;
  db.query(sql, [userId], cb);
};

exports.cancel = (orderId, cb) => {
  const sql = `UPDATE orders SET status = 'CANCELLED' WHERE id = ? AND status = 'PENDING'`;
  db.query(sql, [orderId], cb);
};