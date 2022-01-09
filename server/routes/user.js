const router = require("express").Router();
const user_controller = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

module.exports = router;
