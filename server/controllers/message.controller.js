const Message = require("../models/message");

module.exports = {
  getMessagesByRoomId: async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const skip = (page - 1) * limit;

    try {
      const messages = await Message.find({ room: req.params.roomId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .populate({
          path: "user",
          select: "username",
        });

      let next = {};

      if (
        page * limit <
        (await Message.find({ room: req.params.roomId }).countDocuments())
      ) {
        next = { page: parseInt(page) + 1, limit: limit };
      }

      res.status(200).json({
        success: true,
        next: next,
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
