import { MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthContext } from "../../contexts/AuthContext";

const UserInfo = () => {
  const {
    auth: { user },
    logoutUser,
  } = useContext(AuthContext);
  const { setSidebarDrawer } = useContext(AppContext);
  return (
    <>
      <div className="flex justify-between px-6 py-3 z-10">
        <div className="flex items-center">
          <Avatar>{user?.username.charAt(0).toUpperCase()}</Avatar>
          <Typography.Text className="ml-2 text-white">
            {user?.username}
          </Typography.Text>
        </div>
        <Button onClick={() => logoutUser()}>Logout</Button>
        <div className="md:hidden" onClick={() => setSidebarDrawer(true)}>
          <MenuOutlined />
        </div>
      </div>
    </>
  );
};

export default UserInfo;
