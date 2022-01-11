import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

//socket
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

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
  const [addMemberModal, setAddMemberModal] = useState(false);

  //context
  const {
    auth: { isAuthenticated },
  } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && getAllRooms();
  }, [isAuthenticated]);

  // When receive message from other user
  useEffect(() => {
    socket.on("receive-message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
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
        setRoom(res.data.room);
        console.log(room);
        setAddMemberModal(false);
      }
    } catch (err) {
      console.log(err);
    }
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
    joinRoom,
    getMessages,
    sendMessage,
    addMember,
  };
  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
