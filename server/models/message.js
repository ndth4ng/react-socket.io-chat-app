const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
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
  createdAt: {
    type: String,
    default: () => {
      moment.locale("vi");
      return moment().format("L, h:mm");
    },
  },
});

module.exports = mongoose.model("Message", MessageSchema);
