import { Button, Form, Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Message from "./Message";

// import ScrollToBottom from "react-scroll-to-bottom";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatHeader from "./ChatHeader";

const ChatWindow = () => {
  //context
  const {
    appState: { room, messages, hasMore },
    loadMoreMessages,
    sendMessage,
  } = useContext(AppContext);
  const [form] = Form.useForm();

  const submitForm = async () => {
    const content = form.getFieldValue().content;
    form.resetFields();
    sendMessage(content, room);
  };

  let body;

  if (!room) {
    body = (
      <div className="flex items-center h-[calc(100%-56px)] justify-center md:mt-0 mt-[56px] w-screen md:w-full fixed md:static">
        <h1 className="text-xl font-bold text-green-500">Choose a room.</h1>
      </div>
    );
  } else {
    body = (
      <div className="overflow-hidden h-[calc(100%-56px)] w-screen md:w-full md:h-full md:mt-0 mt-[56px] fixed md:static">
        <ChatHeader />

        <div className="flex justify-end flex-col p-4 h-[calc(100%-56px)]">
          <div
            id="scrollableDiv"
            style={{
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {/*Put the scroll bar always on the bottom*/}
            <InfiniteScroll
              dataLength={messages.length}
              next={() => loadMoreMessages(room)}
              style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
              inverse={true} //
              hasMore={hasMore}
              loader={<h4 className="text-center">Loading...</h4>}
              scrollableTarget="scrollableDiv"
              // endMessage={
              //   <p style={{ textAlign: "center" }}>
              //     <b>Yay! You have seen it all</b>
              //   </p>
              // }
            >
              {messages.map((message, index) => {
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
            </InfiniteScroll>
          </div>

          <Form
            form={form}
            className="flex items-center justify-between mt-4 border"
          >
            <Form.Item name="content" className="w-full mb-0">
              <Input
                className="border-2 border-green-500"
                placeholder="Text here..."
                autoFocus
                onPressEnter={submitForm}
              />
            </Form.Item>
            <Form.Item className="m-0">
              <Button
                className="h-full border-2 border-green-500"
                onClick={submitForm}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  return <div className="h-screen">{body}</div>;
};

export default ChatWindow;
