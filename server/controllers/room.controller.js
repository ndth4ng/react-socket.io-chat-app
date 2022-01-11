const Room = require("../models/room");
const { findUserIdByUsername } = require("./user.controller");

module.exports = {
  createRoom: async (req, res) => {
    const { room, user } = req.body;
    const newRoom = new Room({
      name: room.name,
      description: room.description,
      members: [{ member: user._id }],
    });
    // console.log(newRoom);
    if (user._id != req.userId) {
      return res
        .status(400)
        .json({ success: false, msg: "You are not allowed to do this." });
    }

    try {
      await newRoom.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            success: true,
            msg: "Create room successfully.",
            room: data,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  getAllRoom: async (req, res) => {
    try {
      const listRoom = await Room.find({
        members: {
          $elemMatch: { member: req.userId },
        },
      }).populate({ path: "members.member", select: "username" });

      res.status(200).json({
        success: true,
        rooms: listRoom,
      });
    } catch (err) {
      console.log(err);
    }
  },

  addMember: async (req, res) => {
    const { username, roomId } = req.body;
    const userId = await findUserIdByUsername(username);
    try {
      const room = await Room.findById(roomId);

      // check if member is already in room
      room.members.forEach((item) => {
        if (item.member.equals(userId)) {
          return res
            .status(400)
            .json({ success: false, msg: "Member is already in this room." });
        }
      });

      room.members.push({ member: userId });
      room.save((err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          Room.populate(
            result,
            { path: "members.member", select: "username" },
            (err, populateResult) => {
              if (err) {
                console.log(err);
              }

              return res.status(200).json({
                success: true,
                msg: "Add new member successfully.",
                room: populateResult,
              });
            }
          );
        }
      });
    } catch (error) {}
  },
};
