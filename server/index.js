require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err.message);
  }
};

connectDB();

// Route
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const messageRouter = require("./routes/message");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/message", messageRouter);

// Socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://ndth4ng-chatapp.netlify.app",
    // origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  socket.on("login", (user) => {
    socket.join(user.username);
    console.log(`${user.username} is logged in.`);
  });

  let currentRoom;
  socket.on("join-room", (roomId) => {
    // leave current room then join a new room
    if (currentRoom) {
      socket.leave(currentRoom);
      console.log(`User ID: ${socket.id} leaved room ${currentRoom}`);
    }

    socket.join(roomId);
    console.log(`User ID: ${socket.id} joined room ${roomId}`);

    currentRoom = roomId;
  });

  socket.on("leave-room", (data) => {
    socket.leave(data.room._id);
    console.log(`${data.username} has leave room ${data.room._id}`);

    // for users not in this room
    data.room.members.forEach((item) => {
      if (item.member.username !== data.username) {
        socket.to(item.member.username).emit("reload-leave-room-out");
      }
    });

    // for users in this room
    socket.to(data.room._id).emit("reload-leave-room-in", data);
  });

  socket.on("send-message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive-message", data);
  });

  socket.on("add-member", (data) => {
    // for new member
    socket.to(data.username).emit("reload-room", data.author);

    //for members in this room (in the chat room)
    socket.to(data.room._id).emit("reload-room-members-in", data);

    // for members in this room  (not in the chat room)
    data.room.members.forEach((item) => {
      if (item.member.username !== data.author) {
        socket.to(item.member.username).emit("reload-leave-room-out");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

//////////////////

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
