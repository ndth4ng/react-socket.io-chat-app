import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/ChatRoom/Sidebar";
import ChatWindow from "../components/ChatRoom/ChatWindow";

import { Row, Col } from "antd";
import AddRoomModal from "../components/modals/AddRoomModal";
import AddMemberModal from "../components/modals/AddMemberModal";
import { AppContext } from "../contexts/AppContext";
import LeaveRoomModal from "../components/modals/LeaveRoomModal";

const Home = () => {
  // state

  //context
  const {
    auth: { isAuthenticated },
  } = useContext(AuthContext);

  const { addRoomModal, addMemberModal, leaveRoomModal } =
    useContext(AppContext);

  const navigate = useNavigate();
  useEffect(() => {
    // Check auth user
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <>
      {addRoomModal && <AddRoomModal />}
      {leaveRoomModal && <LeaveRoomModal />}
      {addMemberModal && <AddMemberModal />}
      <Row>
        <Col sm={24} md={6}>
          <Sidebar />
        </Col>
        <Col sm={24} md={18}>
          <ChatWindow />
        </Col>
      </Row>
    </>
  );
};

export default Home;
