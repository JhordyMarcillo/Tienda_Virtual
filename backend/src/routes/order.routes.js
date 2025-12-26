const router = require("express").Router();
const ctrl = require("../controllers/order.controllers.js");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, ctrl.createOrder);
router.get("/", verifyToken, ctrl.getMyOrders);
router.delete("/:id", verifyToken, ctrl.cancelOrder);

module.exports = router;