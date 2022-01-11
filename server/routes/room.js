const router = require("express").Router();
const room_controller = require("../controllers/room.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, room_controller.createRoom);
router.get("/", verifyToken, room_controller.getAllRoom);
router.post("/add-member/", verifyToken, room_controller.addMember);

module.exports = router;
