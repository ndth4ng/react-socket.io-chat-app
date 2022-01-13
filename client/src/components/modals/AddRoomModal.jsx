import { Modal, Form, Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthContext } from "../../contexts/AuthContext";

const AddRoomModal = () => {
  //context
  const { addRoomModal, setAddRoomModal, joinRoom } = useContext(AppContext);
  const {
    auth: { user },
  } = useContext(AuthContext);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const newRoom = form.getFieldValue();
    await joinRoom(newRoom, user);

    form.resetFields();
  };

  const handleCancel = () => {
    setAddRoomModal(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Join a room"
      visible={addRoomModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Room name" name="name">
          <Input autoFocus className="mb-4" placeholder="Enter room name..." />
        </Form.Item>
        <Form.Item label="Room description" name="description">
          <Input placeholder="Enter room description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
