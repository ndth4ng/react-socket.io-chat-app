import { LoadingOutlined } from "@ant-design/icons";
import { Button, Typography, Spin } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const DrawerRoomList = () => {
  //context
  const {
    appState: { rooms, isLoadingRooms },
    setAddRoomModal,
    chooseRoom,
    setSidebarDrawer,
  } = useContext(AppContext);

  const onClick = (room) => {
    chooseRoom(room);
    setSidebarDrawer(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button onClick={() => setAddRoomModal(true)}>Add room</Button>
      {isLoadingRooms ? (
        <Spin indicator={<LoadingOutlined style={{ color: "#22C55E" }} />} />
      ) : (
        rooms.map((room, index) => {
          return (
            <Typography.Link
              onClick={() => onClick(room)}
              key={index}
              className="block px-4 py-2 text-white truncate bg-green-500 rounded-lg"
            >
              {room.name}
            </Typography.Link>
          );
        })
      )}
    </div>
  );
};

export default DrawerRoomList;
