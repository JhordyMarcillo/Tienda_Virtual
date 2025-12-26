const Cart = require("../models/cart.model");
const env = require('../config/env');

exports.getCart = (req, res) => {
  Cart.getByUser(req.user.id, (err, items) => {
    if (err) return res.status(500).json(err);
    res.json(items);
  });
};

exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;

  Cart.add(req.user.id, product_id, quantity, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Producto agregado al carrito" });
  });
};

exports.updateQuantity = (req, res) => {
  Cart.updateQuantity(req.params.id, req.body.quantity, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cantidad actualizada" });
  });
};

exports.removeItem = (req, res) => {
  Cart.remove(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Producto eliminado" });
  });
};

exports.clearCart = (req, res) => {
  Cart.clear(req.user.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Carrito vaciado" });
  });
};
