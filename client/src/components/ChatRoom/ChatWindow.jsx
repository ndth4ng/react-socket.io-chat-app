import { Button, Form, Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Message from "./Message";

import ScrollToBottom from "react-scroll-to-bottom";
import ChatHeader from "./ChatHeader";

const ChatWindow = () => {
  //context
  const { room, messages, sendMessage } = useContext(AppContext);

  const [form] = Form.useForm();

  const submitForm = async () => {
    const content = form.getFieldValue().content;
    await sendMessage(content, room);
    form.resetFields();
  };

  let body;

  if (!room) {
    body = (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-xl font-bold text-green-500">
          Choose a room to start.
        </h1>
      </div>
    );
  } else {
    body = (
      <>
        <ChatHeader />

        <div className="flex justify-end flex-col p-4 h-[calc(100%-56px)]">
          <ScrollToBottom className="max-h-full overflow-y-auto">
            {messages?.map((message, index) => {
              return (
                <Message
                  key={index}
                  text={message.content}
                  displayName={message.user.username}
                  photoUrl=""
                  createdAt={message.createdAt}
                />
              );
            })}
          </ScrollToBottom>

          <Form
            form={form}
            onFinish={submitForm}
            className="flex items-center justify-between mt-4 border"
          >
            <Form.Item name="content" className="w-full mb-0">
              <Input
                className="border-2 border-green-500"
                placeholder="Text here..."
                onKeyPress={(e) => {
                  e.key === "Enter" && submitForm();
                }}
              />
            </Form.Item>
            <Form.Item className="m-0">
              <Button
                className="h-full border-2 border-green-500"
                htmlType="submit"
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }

  return <div className="h-screen">{body}</div>;
};

export default ChatWindow;
