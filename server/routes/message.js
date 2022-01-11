const router = require("express").Router();
const message_controller = require("../controllers/message.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/:roomId", verifyToken, message_controller.getMessagesByRoomId);
router.post("/", verifyToken, message_controller.addMessageByRoomId);

module.exports = router;
