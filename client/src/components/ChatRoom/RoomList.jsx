import { LoadingOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography, Spin } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const { Panel } = Collapse;

const RoomList = () => {
  //context
  const {
    // roomState: { rooms, isLoading },
    appState: { rooms, isLoadingRooms },
    setAddRoomModal,
    chooseRoom,
  } = useContext(AppContext);

  return (
    <Collapse defaultActiveKey={["1"]} className="">
      <Panel header="Room list" key="1">
        {isLoadingRooms ? (
          <Spin indicator={<LoadingOutlined style={{ color: "#22C55E" }} />} />
        ) : (
          rooms.map((room, index) => {
            return (
              <Typography.Link
                onClick={() => chooseRoom(room)}
                key={index}
                className="block px-4 py-2 mb-2 text-white truncate bg-green-500 rounded-lg"
              >
                {room.name}
              </Typography.Link>
            );
          })
        )}
        <Button onClick={() => setAddRoomModal(true)}>Add room</Button>
      </Panel>
    </Collapse>
  );
};

export default RoomList;
