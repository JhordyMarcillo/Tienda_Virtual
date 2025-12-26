const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.createOrder = (req, res) => {
  const userId = req.user.id;

  Cart.getByUser(userId, (err, cartItems) => {
    if (err) return res.status(500).json(err);
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    Order.create(userId, total, (err, result) => {
      if (err) return res.status(500).json(err);
      
      const orderId = result.insertId;

      const orderItemsData = cartItems.map(item => [
        orderId, 
        item.product_id, 
        item.quantity, 
        item.price
      ]);

      Order.addItemsBulk(orderItemsData, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error guardando items", error: err });
        }
        cartItems.forEach(item => {
          Product.decreaseStock(item.product_id, item.quantity, () => {}); 
        });

        Cart.clear(userId, (err) => {
          if (err) console.error("Error limpiando carrito", err);

          res.status(201).json({ 
            message: 'Pedido creado exitosamente', 
            orderId,
            total
          });
        });
      });
    });
  });
};

exports.getMyOrders = (req, res) => {
  Order.getByUser(req.user.id, (err, orders) => {
    if (err) return res.status(500).json(err);
    res.json(orders);
  });
};

exports.cancelOrder = (req, res) => {
  const orderId = req.params.id;
  
  Order.cancel(orderId, (err, result) => {
    if (err) return res.status(500).json(err);
    
    if (result.affectedRows === 0) {
      return res.status(400).json({ 
        error: 'No se puede cancelar: El pedido no existe o ya fue enviado' 
      });
    }
    
    res.json({ message: 'Pedido cancelado correctamente' });
  });
};