const router = require("express").Router();
const auth_controller = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", auth_controller.register);
router.post("/login", auth_controller.login);
router.get("/", verifyToken, auth_controller.getAuth);

module.exports = router;
