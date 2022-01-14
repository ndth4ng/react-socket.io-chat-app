import { Tooltip, Avatar, Menu, Dropdown } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  MoreOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const ChatHeader = () => {
  const { room, setAddMemberModal, setLeaveRoomModal } = useContext(AppContext);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div className="flex items-center space-x-2">
          <UserAddOutlined />
          <span onClick={() => setAddMemberModal(true)}>Add member</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <div className="flex items-center space-x-2">
          <LogoutOutlined />
          <span onClick={() => setLeaveRoomModal(true)}>Leave room</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-between p-4 border-b h-14">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Tooltip title={room?.name}>
          <span className="font-bold">{room?.name}</span>
        </Tooltip>
        <Tooltip title={room?.description}>
          <span>{room?.description}</span>
        </Tooltip>
      </div>
      <div className="hidden md:flex items-center justify-center flex-1 space-x-2">
        <Avatar.Group className="md:block space-x-2" size="small" maxCount={5}>
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
      <div className="flex justify-end items-center flex-1">
        <Dropdown overlay={menu} trigger={["click"]}>
          <span className="text-2xl cursor-pointer">
            <MoreOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default ChatHeader;
