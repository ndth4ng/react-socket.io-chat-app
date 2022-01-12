import { notification } from "antd";

export const openNotification = (message) => {
  notification.open({
    message: message,
  });
};
