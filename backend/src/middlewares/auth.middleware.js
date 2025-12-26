const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    req.user = decoded; 
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Acceso solo para administradores" });
  }
  next();
};
