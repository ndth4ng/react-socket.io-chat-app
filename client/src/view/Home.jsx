import io from "socket.io-client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Chat from "../components/Chat";

const socket = io.connect("http://localhost:5000");
const Home = () => {
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const {
    auth: { isAuthenticated, user },
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    // Check auth user
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  const joinRoom = () => {
    if (user.username !== "" && room !== "") {
      socket.emit("join-room", room);

      setShowChat(true);
    }
  };

  return (
    <div className="container">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={user.username} room={room} />
      )}
    </div>
  );
};

export default Home;
