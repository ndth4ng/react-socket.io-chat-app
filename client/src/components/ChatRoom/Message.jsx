import { Avatar, Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import moment from "moment";

const Message = ({ text, displayName, createdAt, photoUrl }) => {
  //context
  const {
    auth: { user },
  } = useContext(AuthContext);

  const formatedTime = moment(createdAt).format("MMMM Do YYYY, h:mm a");

  let body;

  if (user?.username === displayName) {
    body = (
      <div className="flex flex-col items-end mb-8 mr-4">
        <div className="space-x-2">
          <Typography.Text className="font-bold">{displayName}</Typography.Text>
          <Avatar src={photoUrl}>A</Avatar>
        </div>
        <div className="my-3">
          <Typography.Text className="px-6 py-2 text-white bg-green-500 rounded-2xl">
            {text}
          </Typography.Text>
        </div>
        <Typography.Text className="text-xs">{formatedTime}</Typography.Text>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col mb-8">
        <div className="space-x-2">
          <Avatar src={photoUrl}>A</Avatar>
          <Typography.Text className="font-bold">{displayName}</Typography.Text>
        </div>
        <div className="my-3">
          <Typography.Text className="px-6 py-2 text-white bg-gray-500 rounded-2xl">
            {text}
          </Typography.Text>
        </div>
        <Typography.Text className="text-xs">{formatedTime}</Typography.Text>
      </div>
    );
  }
  return body;
};

export default Message;
