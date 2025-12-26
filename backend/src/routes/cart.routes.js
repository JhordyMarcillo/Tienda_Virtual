const router = require("express").Router();
const ctrl = require("../controllers/cart.controllers.js");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, ctrl.getCart);
router.post("/", verifyToken, ctrl.addToCart);
router.put("/:id", verifyToken, ctrl.updateQuantity);
router.delete("/:id", verifyToken, ctrl.removeItem);
router.delete("/", verifyToken, ctrl.clearCart);

module.exports = router;
