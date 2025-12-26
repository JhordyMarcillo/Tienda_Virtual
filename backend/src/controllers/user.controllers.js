const User = require("../models/user.model.js");
const env = require('../config/env');

exports.getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) return res.status(500).json(err);
    res.json(users);
  });
};

exports.blockUser = (req, res) => {
  User.block(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Usuario bloqueado" });
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Usuario eliminado" });
  });
};

exports.updateUser = (req, res) => {
  User.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0)
      return res.status(400).json({ error: "Nada para actualizar" });

    res.json({ message: "Usuario actualizado" });
  });
};
