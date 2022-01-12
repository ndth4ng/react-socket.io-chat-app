import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { openNotification } from "../utils/openNotifycation";

import { socket } from "./AuthContext";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  //state
  const [roomState, setRoomState] = useState({
    isLoading: true,
    rooms: [],
  });

  const [room, setRoom] = useState(null);

  const [messages, setMessages] = useState([]);

  const [addRoomModal, setAddRoomModal] = useState(false);
  const [leaveRoomModal, setLeaveRoomModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);

  //context
  const {
    auth: { user, isAuthenticated },
  } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && getAllRooms();
  }, [isAuthenticated]);

  // When receive message from other user
  useEffect(() => {
    socket.on("receive-message", (newMessage) => {
      // console.log("receive message");
      setMessages((prev) => [...prev, newMessage]);
    });

    //Reload list room when new member has been added to a room (new member)
    socket.on("reload-room", async (author) => {
      // console.log("reload room");
      await getAllRooms();
      openNotification(`${author} has added you into a room.`);
    });

    //Reload list room when new member has been added to a room (members in room)
    socket.on("reload-room-members-in", async (data) => {
      await getAllRooms();
      // reload chat room
      setRoom(data.room);

      openNotification(
        `${data.author} has added ${data.username} into this room.`
      );
    });

    //Reload list room when new member has been added to a room (members not in room)
    socket.on("reload-room-members-out", async () => {
      getAllRooms();
    });

    // Reload room when someone left a room (user not in room)
    socket.on("reload-leave-room-out", async () => {
      getAllRooms();
    });

    // Reload room when someone left a room (user in room)
    socket.on("reload-leave-room-in", async (data) => {
      await getAllRooms();

      setRoom(data.room);
      openNotification(`${data.username} has left this room.`);
    });
  }, []);

  const getAllRooms = async () => {
    const res = await axios.get(`http://localhost:5000/api/room/`);

    if (res.data.success) {
      setRoomState({ isLoading: false, rooms: res.data.rooms });
    }
  };

  const joinRoom = async (room, user) => {
    const res = await axios.post("http://localhost:5000/api/room/", {
      room,
      user,
    });

    if (res.data.success) {
      await getAllRooms();
      setAddRoomModal(false);
      openNotification(res.data.msg);
    }
  };

  const getMessages = async (room) => {
    const res = await axios.get(
      `http://localhost:5000/api/message/${room._id}`
    );

    if (res.data.success) {
      setRoom(room);
      setMessages(res.data.messages);

      socket.emit("join-room", room._id);
    }
  };

  const sendMessage = async (content, room) => {
    try {
      const res = await axios.post("http://localhost:5000/api/message/", {
        content,
        room: room._id,
      });

      if (res.data.success) {
        await socket.emit("send-message", res.data.message);
        setMessages((prev) => [...prev, res.data.message]);
      }
    } catch (err) {}
  };

  const addMember = async (username) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/room/add-member/",
        { username, roomId: room._id }
      );

      if (res.data.success) {
        await socket.emit("add-member", {
          username,
          author: user.username,
          room: res.data.room,
        });

        //reload room
        setRoom(res.data.room);
        setAddMemberModal(false);
        openNotification(res.data.msg);
        getAllRooms();
      } else {
        openNotification(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const leaveRoom = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/room/delete-member/",
        {
          roomId: room._id,
        }
      );

      if (res.data.success) {
        await socket.emit("leave-room", {
          username: user.username,
          room: res.data.room,
        });

        setRoom(null);
        await getAllRooms();
      }
    } catch (error) {}
  };

  const appContextData = {
    messages,
    room,
    roomState,
    getAllRooms,
    addRoomModal,
    setAddRoomModal,
    addMemberModal,
    setAddMemberModal,
    leaveRoomModal,
    setLeaveRoomModal,
    joinRoom,
    getMessages,
    sendMessage,
    addMember,
    leaveRoom,
  };
  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
