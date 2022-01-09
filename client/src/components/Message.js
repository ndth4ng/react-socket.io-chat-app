import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Message = ({ content }) => {
  const {
    auth: { user },
  } = useContext(AuthContext);

  return (
    <div
      className="message"
      id={content.author === user.username ? "you" : "other"}
    >
      <div>
        <div className="message-content">{content.message}</div>
        <div className="message-meta">
          <p id="time">{content.time}</p>
          <p id="author">{content.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
