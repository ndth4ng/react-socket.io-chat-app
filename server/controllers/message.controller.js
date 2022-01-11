const Message = require("../models/message");

module.exports = {
  getMessagesByRoomId: async (req, res) => {
    try {
      const messages = await Message.find({ room: req.params.roomId }).populate(
        {
          path: "user",
          select: "username",
        }
      );

      res.status(200).json({
        success: true,
        messages: messages,
      });
    } catch (err) {
      console.log(err);
    }
  },

  addMessageByRoomId: async (req, res) => {
    const { room, content } = req.body;
    try {
      const newMessage = new Message({
        user: req.userId,
        room,
        content,
      });
      //   console.log(newMessage);

      await newMessage.save((err, result) => {
        if (err) {
          return console.log(err);
        }

        if (result) {
          Message.populate(
            result,
            {
              path: "user",
              select: "username",
            },
            (err, populateResult) => {
              if (err) {
                return console.log(err);
              }

              return res.status(200).json({
                success: true,
                msg: "Add message successfully.",
                message: populateResult,
              });
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
