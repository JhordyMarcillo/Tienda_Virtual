const db = require("../config/database");
const User = {};

User.create = (user, callback) => {
  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;
  const role = user.role || 'client'; 
  db.query(sql, [user.name, user.email, user.password, role], callback);
};

User.findByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], callback);
};

User.findById = (id, callback) => {
  const sql = `SELECT id, name, email, role, blocked FROM users WHERE id = ?`;
  db.query(sql, [id], callback);
};

User.getAll = (cb) => {
  db.query("SELECT id, name, email, role, blocked FROM users", cb);
};

User.block = (id, cb) => {
  db.query("UPDATE users SET blocked = 1 WHERE id = ?", [id], cb);
};

User.delete = (id, cb) => {
  db.query("DELETE FROM users WHERE id = ?", [id], cb);
};

User.update = (id, data, cb) => {
  const fields = [];
  const values = [];

  if (data.name) {
    fields.push("name = ?");
    values.push(data.name);
  }
  if (data.email) {
    fields.push("email = ?");
    values.push(data.email);
  }
  if (data.role) {
    fields.push("role = ?");
    values.push(data.role);
  }

  if (fields.length === 0) return cb(null, { affectedRows: 0 });

  values.push(id);
  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  db.query(sql, values, cb);
};


module.exports = User;