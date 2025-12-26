const db = require("../config/database");

exports.getAll = (cb) => {
  db.query("SELECT * FROM products", cb);
};

exports.create = (data, cb) => {
  const sql = `
    INSERT INTO products (name, description, price, stock, category_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [
    data.name,
    data.description,
    data.price,
    data.stock,
    data.category_id
  ], cb);
};

exports.update = (id, data, cb) => {
  db.query(
    "UPDATE products SET name=?, description=?, price=?, stock=?, category_id=? WHERE id=?",
    [data.name, data.description, data.price, data.stock, data.category_id, id],
    cb
  );
};

exports.delete = (id, cb) => {
  db.query("DELETE FROM products WHERE id = ?", [id], cb);
};

exports.decreaseStock = (id, quantity, cb) => {
  db.query(
    "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [quantity, id, quantity],
    cb
  );
};