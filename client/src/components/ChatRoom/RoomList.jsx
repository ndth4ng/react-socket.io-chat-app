import { Button, Collapse, Typography, Spin } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const { Panel } = Collapse;

const RoomList = () => {
  //context
  const {
    roomState: { rooms, isLoading },
    setAddRoomModal,
    getMessages,
  } = useContext(AppContext);

  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="Room list" key="1">
        {isLoading ? (
          <Spin />
        ) : (
          rooms.map((room, index) => {
            return (
              <Typography.Link
                onClick={() => getMessages(room)}
                key={index}
                className="block px-4 py-2 mb-2 text-white bg-green-500 rounded-lg"
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
