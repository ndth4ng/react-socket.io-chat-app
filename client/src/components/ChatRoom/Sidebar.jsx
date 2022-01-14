import { Col, Row, Drawer } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import DrawerRoomList from "./DrawerRoomList";

import RoomList from "./RoomList";
import UserInfo from "./UserInfo";

const Sidebar = () => {
  const { sidebarDrawer, setSidebarDrawer } = useContext(AppContext);

  const onClose = () => {
    setSidebarDrawer(false);
  };
  return (
    <div className="fixed md:static md:h-screen w-screen md:w-full z-10 bg-green-500">
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col xs={0} md={24} lg={24} sm={0}>
          <RoomList />
        </Col>
        <Drawer
          title="Room list"
          placement={"top"}
          height="400"
          visible={sidebarDrawer}
          onClose={onClose}
        >
          <DrawerRoomList />
        </Drawer>
      </Row>
    </div>
  );
};

export default Sidebar;
