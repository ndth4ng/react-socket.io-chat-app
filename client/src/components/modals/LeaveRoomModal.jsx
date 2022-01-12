import { Modal } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const LeaveRoomModal = () => {
  //context
  const { leaveRoomModal, setLeaveRoomModal, leaveRoom } =
    useContext(AppContext);

  const handleOk = async () => {
    await leaveRoom();
    setLeaveRoomModal(false);
  };

  const handleCancel = () => {
    setLeaveRoomModal(false);
  };

  return (
    <Modal
      title="Leave room"
      visible={leaveRoomModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <span>Are you sure? Do you want to leave this room?</span>
    </Modal>
  );
};

export default LeaveRoomModal;
