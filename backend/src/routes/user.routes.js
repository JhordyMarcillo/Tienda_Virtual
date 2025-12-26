const router = require("express").Router();
const ctrl = require("../controllers/user.controllers.js");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware.js");

router.get("/", verifyToken, isAdmin, ctrl.getAllUsers);
router.put("/block/:id", verifyToken, isAdmin, ctrl.blockUser);
router.put("/:id", verifyToken, isAdmin, ctrl.updateUser);
router.delete("/:id", verifyToken, isAdmin, ctrl.deleteUser);

module.exports = router;
