import { Avatar, Button, Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UserInfo = () => {
  const {
    auth: { user },
    logoutUser,
  } = useContext(AuthContext);
  return (
    <div className="flex justify-between px-4 py-3">
      <div className="flex items-center">
        <Avatar>{user?.username.charAt(0).toUpperCase()}</Avatar>
        <Typography.Text className="ml-2 text-white">
          {user?.username}
        </Typography.Text>
      </div>
      <Button onClick={() => logoutUser()}>Logout</Button>
    </div>
  );
};

export default UserInfo;
