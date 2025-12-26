const router = require("express").Router();
const ctrl = require("../controllers/product.controllers.js");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

router.get("/", ctrl.getProducts);
router.post("/", verifyToken, isAdmin, ctrl.createProduct);
router.put("/:id", verifyToken, isAdmin, ctrl.updateProduct);
router.delete("/:id", verifyToken, isAdmin, ctrl.deleteProduct);

module.exports = router;
