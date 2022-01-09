import { useEffect, useState } from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };

      setCurrentMessage("");

      await socket.emit("send-message", messageData);
      setMessageList((prev) => [...prev, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>
          User: {username} - Room ID: {room}
        </p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return <Message key={index} content={messageContent} />;
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Message here..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
