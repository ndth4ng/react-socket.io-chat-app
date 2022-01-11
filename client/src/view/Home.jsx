import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/ChatRoom/Sidebar";
import ChatWindow from "../components/ChatRoom/ChatWindow";

import { Row, Col } from "antd";
import AddRoomModal from "../components/modals/AddRoomModal";
import AddMemberModal from "../components/modals/AddMemberModal";

const Home = () => {
  // state

  //context
  const {
    auth: { isAuthenticated },
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    // Check auth user
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <>
      <AddRoomModal />
      <AddMemberModal />
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </>
  );
};

export default Home;
