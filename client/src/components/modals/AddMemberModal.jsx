import { Modal, Form, Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const AddMemberModal = () => {
  //context
  const { addMemberModal, setAddMemberModal, addMember } =
    useContext(AppContext);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const username = form.getFieldValue().username;

    await addMember(username);

    form.resetFields();
  };

  const handleCancel = () => {
    setAddMemberModal(false);
    form.resetFields();
  };
  return (
    <Modal
      title="Add new member"
      visible={addMemberModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Username" name="username">
          <Input placeholder="Enter username..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;
