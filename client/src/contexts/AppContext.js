import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { openNotification } from "../utils/openNotifycation";

import { socket } from "./AuthContext";
import { API_URL } from "../constants";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  //state
  const [appState, setAppState] = useState({
    isLoadingRooms: true,
    rooms: [],
    room: null,
    messages: [],
    page: 1,
    hasMore: false,
  });

  //modal
  const [addRoomModal, setAddRoomModal] = useState(false);
  const [leaveRoomModal, setLeaveRoomModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);

  // sidebar drawer
  const [sidebarDrawer, setSidebarDrawer] = useState(false);

  //context
  const {
    auth: { user, isAuthenticated },
  } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && getAllRooms();
    // reset state
    if (!isAuthenticated) {
      // edit here
      setAppState({
        isLoadingRooms: true,
        rooms: [],
        messages: [],
        room: null,
        page: 1,
        hasMore: false,
      });
    }
  }, [isAuthenticated]);

  // When receive message from other user
  useEffect(() => {
    socket.on("receive-message", (newMessage) => {
      setAppState((prev) => {
        const prevMessages = prev.messages;
        console.log(prevMessages);
        return {
          ...prev,
          messages: [newMessage, ...prevMessages],
        };
      });
    });

    //Reload list room when new member has been added to a room (new member)
    socket.on("reload-room", async (author) => {
      // console.log("reload room");
      await getAllRooms();
      openNotification(`${author} has added you into a room.`);
      console.log("render");
    });

    //Reload list room when new member has been added to a room (members in room)
    socket.on("reload-room-members-in", async (data) => {
      await getAllRooms();
      // reload chat room
      // setRoom(data.room);

      setAppState((prev) => {
        return {
          ...prev,
          room: data.room,
        };
      });

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

      // setRoom(data.room);

      setAppState((prev) => {
        return {
          ...prev,
          room: data.room,
        };
      });

      openNotification(`${data.username} has left this room.`);
    });
  }, []);

  const getAllRooms = async () => {
    const res = await axios.get(`${API_URL}/room/`);

    if (res.data.success) {
      // setRoomState({ isLoading: false, rooms: res.data.rooms });
      // edit here
      setAppState((prev) => {
        return {
          ...prev,
          isLoadingRooms: false,
          rooms: res.data.rooms,
        };
      });
    }
  };

  const joinRoom = async (room, user) => {
    const res = await axios.post(`${API_URL}/room/`, {
      room,
      user,
    });

    if (res.data.success) {
      await getAllRooms();
      setAddRoomModal(false);
      openNotification(res.data.msg);
    }
  };

  const loadMoreMessages = async (room) => {
    const res = await axios.get(
      `${API_URL}/message/${room._id}?page=${appState.page}&limit=10`
    );

    if (res.data.success) {
      // console.log(res.data);
      let prevMessage = appState.messages;

      // Load more messages
      if (Object.keys(res.data.next).length > 0) {
        setAppState((prev) => {
          return {
            ...prev,
            messages: [...prevMessage, ...res.data.messages],
            page: res.data.next.page,
            room: room,
            hasMore: true,
          };
        });
      } else {
        setAppState((prev) => {
          return {
            ...prev,
            messages: [...prevMessage, ...res.data.messages],
            page: 1,
            room: room,
            hasMore: false,
          };
        });
      }
    }
  };

  // console.log(appState);

  const chooseRoom = async (room) => {
    if (appState.room === room) {
      return;
    }

    const res = await axios.get(
      `${API_URL}/message/${room._id}?page=1&limit=10`
    );
    // console.log(room);
    // console.log(res.data);

    if (res.data.success) {
      if (Object.keys(res.data.next).length > 0) {
        setAppState((prev) => {
          return {
            ...prev,
            messages: res.data.messages,
            page: res.data.next.page,
            room: room,
            hasMore: true,
          };
        });
      } else {
        setAppState((prev) => {
          return {
            ...prev,
            messages: res.data.messages,
            page: 1,
            room: room,
            hasMore: false,
          };
        });
      }
    }

    socket.emit("join-room", room._id);
  };

  const sendMessage = async (content, room) => {
    try {
      const res = await axios.post(`${API_URL}/message/`, {
        content,
        room: room._id,
      });

      console.log(res.data);

      if (res.data.success) {
        await socket.emit("send-message", res.data.message);
        const prevMessages = appState.messages;
        // setMessages((prev) => [res.data.message, ...prev]);
        setAppState((prev) => {
          return {
            ...prev,
            messages: [res.data.message, ...prevMessages],
          };
        });
      }
    } catch (err) {}
  };

  const addMember = async (username) => {
    try {
      const res = await axios.post(`${API_URL}/room/add-member/`, {
        username,
        roomId: appState.room._id,
      });

      if (res.data.success) {
        await socket.emit("add-member", {
          username,
          author: user.username,
          room: res.data.room,
        });

        //reload room
        // setRoom(res.data.room);
        setAppState((prev) => {
          return {
            ...prev,
            room: res.data.room,
          };
        });

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
      const res = await axios.put(`${API_URL}/room/delete-member/`, {
        roomId: appState.room._id,
      });

      if (res.data.success) {
        await socket.emit("leave-room", {
          username: user.username,
          room: res.data.room,
        });

        // setRoom(null);

        setAppState((prev) => {
          return {
            ...prev,
            room: null,
          };
        });

        await getAllRooms();
      }
    } catch (error) {}
  };

  const appContextData = {
    loadMoreMessages,
    appState,
    setAppState,
    sidebarDrawer,
    setSidebarDrawer,
    getAllRooms,
    addRoomModal,
    setAddRoomModal,
    addMemberModal,
    setAddMemberModal,
    leaveRoomModal,
    setLeaveRoomModal,
    joinRoom,
    chooseRoom,
    sendMessage,
    addMember,
    leaveRoom,
  };
  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
