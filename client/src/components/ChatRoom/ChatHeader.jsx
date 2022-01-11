import { Button, Tooltip, Avatar } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const ChatHeader = () => {
  const { room, setAddMemberModal } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between p-4 border-b h-14">
      <div className="flex flex-col">
        <span className="font-bold">{room?.name}</span>
        <span>{room?.description}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => setAddMemberModal(true)}>Add member</Button>
        <Avatar.Group size="small" maxCount={2}>
          {room?.members.map((member, index) => {
            return (
              <Tooltip title={member.member.username} key={index}>
                <Avatar>
                  {member?.member?.username?.charAt(0).toUpperCase()}
                </Avatar>
              </Tooltip>
            );
          })}
        </Avatar.Group>
      </div>
    </div>
  );
};

export default ChatHeader;
