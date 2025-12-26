const Product = require("../models/product.model");

exports.getProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).json(err);
    res.json(products);
  });
};

exports.createProduct = (req, res) => {
  Product.create(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Producto creado" });
  });
};

exports.updateProduct = (req, res) => {
  Product.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Producto actualizado" });
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Producto eliminado" });
  });
};
