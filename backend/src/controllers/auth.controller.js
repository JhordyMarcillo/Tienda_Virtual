const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const env = require('../config/env');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create({
      name,
      email,
      password: hashedPassword,
      role: 'client'
    }, (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, users) => {
    if (err) {
      return res.status(500).json({ error: "Error interno del servidor", details: err.message });
    }

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  });
};
