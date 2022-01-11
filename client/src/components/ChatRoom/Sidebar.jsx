import { Col, Row } from "antd";

import RoomList from "./RoomList";
import UserInfo from "./UserInfo";

const Sidebar = () => {
  return (
    <div className="h-screen bg-green-500">
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </div>
  );
};

export default Sidebar;
