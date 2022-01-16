const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
